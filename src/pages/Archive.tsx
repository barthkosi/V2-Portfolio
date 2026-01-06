import { useRef, useEffect, useState } from "react";
import Card from "../components/Card";
import archive from "../data/archive.json";

// 1. SETUP: Create a grid of items
const MIN_ROWS = 6;
const MIN_COLS = 6;
const GAP = 20;

// Dynamic Grid Calculation
const count = archive.length;
// Calculate the side length needed to fit all unique items in a roughly square grid
// For 100 items -> sqrt(100) = 10 -> 10x10 grid
// For 9 items -> sqrt(9) = 3 -> but we enforce MIN 6x6 for smooth infinite wrapping
const neededSide = Math.ceil(Math.sqrt(count));
const ROWS = Math.max(MIN_ROWS, neededSide);
const COLS = Math.max(MIN_COLS, neededSide);

// Generate data grid
// If archive.length is small (e.g. 9), we repeat it to fill the MIN_ROWS*MIN_COLS (36)
// If archive.length is large (e.g. 100), we fill the 10x10 (100) with unique items (plus maybe a few repeats if row*col > count)
const ITEMS = Array.from({ length: ROWS * COLS }, (_, i) => {
  const archiveItem = archive[i % archive.length];
  return {
    ...archiveItem,
    uniqueId: `item-${i}` // Unique ID for React key
  };
});


export default function Archive() {
  // 2. STATE: Refs for 2D Physics
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive Item Size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine size based on state
  const ITEM_SIZE = isMobile ? 250 : 400;

  // Total dimensions need to be recalculated when sizing changes
  const TOTAL_WIDTH = COLS * (ITEM_SIZE + GAP);
  const TOTAL_HEIGHT = ROWS * (ITEM_SIZE + GAP);

  // We track X and Y separately
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const animationFrameId = useRef<number | null>(null);


  useEffect(() => {
    document.title = "barthkosi - archive";
  }, []);

  // 3. CORE LOGIC: The Physics Loop
  useEffect(() => {
    const loop = () => {
      // A. Inertia (Friction)
      if (!isDragging.current) {
        // Friction: 0.92 provides a smooth "Lenis-like" glide. 
        // 0.6 is too abrupt (stops instantly).
        velocity.current.x *= 0.92;
        velocity.current.y *= 0.92;

        position.current.x += velocity.current.x;
        position.current.y += velocity.current.y;
      }

      // Stop if velocity is negligible (optimization)
      if (Math.abs(velocity.current.x) < 0.01) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.01) velocity.current.y = 0;

      // B. Rendering & Wrapping
      if (containerRef.current) {
        const children = containerRef.current.children;

        for (let i = 0; i < children.length; i++) {
          const item = children[i] as HTMLElement;

          // Calculate grid position (Row/Col) based on index
          const row = Math.floor(i / COLS);
          const col = i % COLS;

          // Base offsets
          const startX = col * (ITEM_SIZE + GAP);
          const startY = row * (ITEM_SIZE + GAP);

          // 1. Add scroll position
          // 2. Modulo by total size to wrap
          // 3. Handle negative numbers logic

          let currentX = (startX + position.current.x) % TOTAL_WIDTH;
          let currentY = (startY + position.current.y) % TOTAL_HEIGHT;

          if (currentX < 0) currentX += TOTAL_WIDTH;
          if (currentY < 0) currentY += TOTAL_HEIGHT;

          // CENTER OFFSET: 
          // Shifts the wrap-around point so items don't pop exactly at x=0 but off-screen.
          if (currentX > TOTAL_WIDTH - ITEM_SIZE) currentX -= TOTAL_WIDTH;
          if (currentY > TOTAL_HEIGHT - ITEM_SIZE) currentY -= TOTAL_HEIGHT;

          // Apply translation
          item.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
  }, [ITEM_SIZE, TOTAL_WIDTH, TOTAL_HEIGHT]);

  // 4. EVENTS: 2D Dragging Handlers
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    lastMouse.current = { x: clientX, y: clientY };
    velocity.current = { x: 0, y: 0 }; // Reset inertia
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - lastMouse.current.x;
    const deltaY = clientY - lastMouse.current.y;

    position.current.x += deltaX;
    position.current.y += deltaY;

    // Velocity is the difference between frames
    velocity.current = { x: deltaX, y: deltaY };
    lastMouse.current = { x: clientX, y: clientY };
  };

  return (
    <div
      className="w-full h-full overflow-visible relative cursor-move touch-none"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={() => isDragging.current = false}
      onMouseLeave={() => isDragging.current = false}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={() => isDragging.current = false}
      onWheel={(e) => {
        // Optional: prevent default if you want to stop browser history swipe etc.
        // e.preventDefault(); 

        // Lower sensitivity significantly (0.1) for smoother control
        velocity.current.x -= e.deltaX * 0.1;
        velocity.current.y -= e.deltaY * 0.1;
      }}
    >
      {/* Container is just a reference point, items are absolutely positioned */}
      <div ref={containerRef} className="w-full h-full pointer-events-none overflow-visible">
        {ITEMS.map((item) => (
          <div
            key={item.uniqueId}
            className="absolute flex items-center justify-center overflow-visible"
            style={{
              width: `${ITEM_SIZE}px`,
              // Height will be determined by Card aspect ratio, but we set a base here or let CSS handle it
              // Since card handles its own aspect ratio, we just position the container
              // But for wrapping logic, we treated it as square-ish or fixed grid. 
              // Let's assume ITEM_SIZE equates to the 'cell' size.
              // If Card is aspect-video (16:9), and ITEM_SIZE is width, height might be smaller.
              // Let's stick to using ITEM_SIZE as the cell width/height for placement logic.

              // top/left 0 is important as translate3d moves it relative to this
              top: 0,
              left: 0,
              willChange: 'transform'
            }}
          >
            <Card
              image={item.image}
              aspectRatio="auto"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 w-full text-center text-[var(--content-tertiary)] pointer-events-none select-none label-s">
        Drag to explore
      </div>
    </div>

  );
}