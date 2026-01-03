// Shared transition configurations for Framer Motion

export const springTransition = {
    type: "spring",
    stiffness: 265,
    damping: 22,
    mass: 3,
} as const;

export const springMarquee = {
    type: "spring",
    delay: 2.4,
    stiffness: 265,
    damping: 22,
    mass: 3,
} as const;
 
// Lighter/snappier version (mass: 1)
export const springSnappy = {
    type: "spring",
    stiffness: 265,
    damping: 22,
    mass: 1,
} as const;
