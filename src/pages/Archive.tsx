import { useRef, useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import archive from "../data/archive.json";

const GAP = 32;
const MIN_COLS = 4;

export default function Archive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  // Responsive sizing
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ITEM_WIDTH = isMobile ? 250 : 400;
  const COLS = Math.max(MIN_COLS, Math.ceil(Math.sqrt(archive.length)));

  // Preload images to get their natural dimensions
  // Card has p-2 (8px) padding on top and bottom = 16px total
  const CARD_PADDING = 16;

  useEffect(() => {
    const loadedHeights: Record<string, number> = {};
    let loadedCount = 0;

    archive.forEach((item) => {
      const img = new Image();
      img.onload = () => {
        // Calculate height based on aspect ratio at ITEM_WIDTH + Card padding
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        loadedHeights[item.id] = ITEM_WIDTH * aspectRatio + CARD_PADDING;
        loadedCount++;
        if (loadedCount === archive.length) {
          setImageHeights({ ...loadedHeights });
        }
      };
      img.onerror = () => {
        // Fallback to square if image fails
        loadedHeights[item.id] = ITEM_WIDTH + CARD_PADDING;
        loadedCount++;
        if (loadedCount === archive.length) {
          setImageHeights({ ...loadedHeights });
        }
      };
      img.src = item.image;
    });
  }, [ITEM_WIDTH]);

  // Calculate masonry positions for each item
  const itemPositions = useMemo(() => {
    if (Object.keys(imageHeights).length < archive.length) {
      return null; // Not ready yet
    }

    const positions: { id: string; x: number; y: number; height: number; image: string; colIndex: number }[] = [];
    const columnHeights = Array(COLS).fill(0);

    archive.forEach((item) => {
      // Find the column index for this item (fill columns sequentially)
      const colIndex = positions.length % COLS;
      const x = colIndex * (ITEM_WIDTH + GAP);
      const y = columnHeights[colIndex];
      const height = imageHeights[item.id] || ITEM_WIDTH;

      positions.push({
        id: item.id,
        x,
        y,
        height,
        image: item.image,
        colIndex
      });

      columnHeights[colIndex] += height + GAP;
    });

    return positions;
  }, [imageHeights, COLS, ITEM_WIDTH]);

  // Calculate total dimensions based on actual content - track per-column heights
  const { totalDimensions, columnTotalHeights } = useMemo(() => {
    if (!itemPositions) return { totalDimensions: { width: 0, height: 0 }, columnTotalHeights: [] };

    const colHeights = Array(COLS).fill(0);
    itemPositions.forEach((pos) => {
      colHeights[pos.colIndex] = Math.max(colHeights[pos.colIndex], pos.y + pos.height + GAP);
    });

    return {
      totalDimensions: {
        width: COLS * (ITEM_WIDTH + GAP),
        height: Math.max(...colHeights)
      },
      columnTotalHeights: colHeights
    };
  }, [itemPositions, COLS, ITEM_WIDTH]);

  // Physics refs
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    document.title = "barthkosi - archive";
  }, []);

  // Physics loop
  useEffect(() => {
    if (!itemPositions || columnTotalHeights.length === 0) return;

    const { width: TOTAL_WIDTH } = totalDimensions;
    if (TOTAL_WIDTH === 0) return;

    const loop = () => {
      if (!isDragging.current) {
        velocity.current.x *= 0.92;
        velocity.current.y *= 0.92;
        position.current.x += velocity.current.x;
        position.current.y += velocity.current.y;
      }

      if (Math.abs(velocity.current.x) < 0.01) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.01) velocity.current.y = 0;

      if (containerRef.current) {
        const children = containerRef.current.children;

        for (let i = 0; i < children.length; i++) {
          const item = children[i] as HTMLElement;
          const pos = itemPositions[i];
          if (!pos) continue;

          // Use per-column height for Y wrapping
          const colHeight = columnTotalHeights[pos.colIndex] || totalDimensions.height;

          let currentX = (pos.x + position.current.x) % TOTAL_WIDTH;
          let currentY = (pos.y + position.current.y) % colHeight;

          if (currentX < 0) currentX += TOTAL_WIDTH;
          if (currentY < 0) currentY += colHeight;

          if (currentX > TOTAL_WIDTH - ITEM_WIDTH) currentX -= TOTAL_WIDTH;
          if (currentY > colHeight - pos.height) currentY -= colHeight;

          item.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [itemPositions, totalDimensions, columnTotalHeights, ITEM_WIDTH]);

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
        {itemPositions?.map((pos) => (
          <div
            key={pos.id}
            className="absolute flex items-center justify-center overflow-visible"
            style={{
              width: `${ITEM_WIDTH}px`,
              top: 0,
              left: 0,
              willChange: 'transform'
            }}
          >
            <Card
              image={pos.image}
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