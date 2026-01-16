import { motion, HTMLMotionProps, Variants, Transition } from "framer-motion";

/**
 * 1. THE GLOBAL CONFIG (PROJECT DNA)
 * Edit these values to change the feel of the entire site instantly.
 */
export const DEFAULT_EASE = [0.23, 1, 0.32, 1] as const; // Your custom curve
export const DEFAULT_DURATION = 0.35;
export const DEFAULT_DISTANCE = 20;

/**
 * 2. THE PHYSICS (THE "FEEL")
 */
export const physics = {
  // Ease-Based (inherits your custom curve)
  standard: { type: "tween", ease: DEFAULT_EASE, duration: DEFAULT_DURATION },
  fast: { type: "tween", ease: DEFAULT_EASE, duration: 0.2 },
  slow: { type: "tween", ease: DEFAULT_EASE, duration: 0.8 },

  // Spring-Based (Tactile & Bouncy)
  bouncy: { type: "spring", stiffness: 265, damping: 22, mass: 2 },
  snappy: { type: "spring", stiffness: 400, damping: 28, mass: 1 },
} as const;

export const springBouncy = physics.bouncy;
export const springSnappy = physics.snappy;
export const springBase = physics.snappy;
export const springMarquee = { type: "spring", stiffness: 100, damping: 20, mass: 1 } as const;

/**
 * 3. THE GEOMETRY (THE "MOVE")
 */
const directions = {
  up: { y: DEFAULT_DISTANCE },
  down: { y: -DEFAULT_DISTANCE },
  left: { x: -DEFAULT_DISTANCE },
  right: { x: DEFAULT_DISTANCE },
  in: { x: 0, y: 0 }
};

/**
 * 4. THE SMART FACTORY (PROXY)
 * Parses names like 'upScaleBouncy', 'slowFadeUp', or 'inFast'.
 */
export const anim = new Proxy({} as any, {
  get(_, prop: string) {
    const key = prop.toLowerCase();

    // Geometry logic
    const isScale = key.includes("scale");
    const isFade = key.includes("fade") || (!isScale && !key.includes("slide"));

    // Map direction and physics
    const dirKey = (Object.keys(directions).find(d => key.includes(d)) || 'in') as keyof typeof directions;
    const physKey = (Object.keys(physics).find(p => key.includes(p)) || 'standard') as keyof typeof physics;

    const offset = directions[dirKey];
    const transition = physics[physKey] as Transition;

    const result = {
      initial: {
        opacity: isFade ? 0 : 1,
        ...(isScale ? { scale: 0.95 } : {}),
        ...offset
      },
      animate: {
        opacity: 1, scale: 1, x: 0, y: 0, transition
      },
      exit: {
        opacity: 0,
        ...(isScale ? { scale: 0.95 } : {}),
        ...offset,
        transition
      },
    };

    return {
      ...result,
      hidden: result.initial,
      visible: result.animate
    };
  }
});

/**
 * 5. THE WRAPPER COMPONENT
 */
interface MotionProps extends HTMLMotionProps<"div"> {
  type?: string;
  delay?: number;
  y?: number;
  scaleTo?: number;
  useInView?: boolean;
  transition?: Transition;
}

export const Motion = ({
  type = "fadeIn",
  delay = 0,
  y,
  scaleTo,
  useInView = false,
  transition,
  children,
  ...props
}: MotionProps) => {
  const baseVariant = anim[type];

  const variant: Variants = {
    ...baseVariant,
    initial: {
      ...baseVariant.initial,
      ...(y !== undefined && { y })
    } as any,
    animate: {
      ...baseVariant.animate,
      ...(scaleTo !== undefined && { scale: scaleTo })
    } as any
  };

  return (
    <motion.div
      initial="initial"
      {...(useInView ? { whileInView: "animate", viewport: { once: true, margin: "-10%" } } : { animate: "animate" })}
      exit="exit"
      variants={variant}
      transition={transition || { ...(variant.animate as any)?.transition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 6. ORCHESTRATION HELPERS
 */
export const stagger = (interval = 0.1, delay = 0) => ({
  animate: {
    transition: {
      staggerChildren: interval,
      delayChildren: delay,
    },
  },
});