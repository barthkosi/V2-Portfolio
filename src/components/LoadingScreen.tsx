import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, useMemo } from "react";

interface LoadingScreenProps {
    progress: number;
    onComplete?: () => void;
}

const MIN_DURATION = 2500; // Increased to ensure 0-100 feels substantial

function Digit({ values, currentIndex }: { values: number[]; currentIndex: number }) {
    // values is an array of numbers to display in order.
    // currentIndex is the index in that array to scroll to.
    // Logic: Item at values.length - 1 is the "start" (000), so it's disabled.
    // All others (above it) are active.

    return (
        <div className="relative h-[1em] w-[1ch] overflow-hidden">
            <motion.div
                initial={false}
                animate={{ y: `-${currentIndex}em` }}
                transition={{
                    duration: 0.8, // Slightly slower smoothing
                    ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
                    type: "tween" // Force tween for direct control, or use spring? Tween is smoother for OD.
                }}
                className="absolute top-0 left-0 w-full flex flex-col items-center"
            >
                {values.map((num, i) => (
                    <div
                        key={i}
                        className={`h-[1em] flex items-center justify-center transition-colors duration-300 ${i < values.length - 1 ? 'text-[var(--content-primary)]' : 'text-[var(--content-disabled)]'
                            }`}
                    >
                        {num}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function LoadingScreen({ progress: targetProgress, onComplete }: LoadingScreenProps) {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const startTimeRef = useRef<number | null>(null);
    const progressRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // Generate Reels (Reversed for "Falling" effect)

    // Hundreds: 0 -> 1. To slide DOWN, we need [1, 0].
    // Start Index (0): 1 -> Value 0.
    // End Index (1): 0 -> Value 1.
    const hundredsReel = useMemo(() => [1, 0], []);

    // Tens: 0 -> 1 -> ... -> 9 -> 0.
    // Reversed: [0, 9, 8, ... 1, 0].
    // Index 10: 0 (Start).
    // Index 0: 0 (End).
    const tensReel = useMemo(() => [0, ...Array.from({ length: 10 }, (_, i) => 9 - i)], []);

    // Units: 0-9 repeated.
    // We need indices 100 -> 0.
    // Index 100: 0. Index 99: 1. ...
    const unitsReel = useMemo(() => Array.from({ length: 101 }, (_, i) => (100 - i) % 10), []);

    useEffect(() => {
        // Reset animation if progress resets (e.g. navigation without remount)
        if (targetProgress === 0) {
            startTimeRef.current = null;
            setIsExiting(false);
        }

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;

            const elapsed = timestamp - startTimeRef.current;
            const timeProgress = Math.min((elapsed / MIN_DURATION) * 100, 100);

            // Ensure we don't exceed target
            const nextProgress = Math.min(timeProgress, targetProgress);

            if (nextProgress !== progressRef.current) {
                progressRef.current = nextProgress;
                setDisplayProgress(nextProgress);
            }

            if (elapsed < MIN_DURATION || nextProgress < 100) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                // Animation complete
                setTimeout(() => {
                    setIsExiting(true);
                }, 200);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [targetProgress]);

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                onComplete?.();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isExiting, onComplete]);

    if (displayProgress >= 100 && !isExiting && !onComplete) return null;

    // Calculate Indices (Reversed)
    // Hundreds: 0 -> 1. Mapped to Index 1 -> 0.
    const hundredsVal = Math.min(Math.floor(displayProgress / 100), 1);
    const hundredsIndex = 1 - hundredsVal;

    // Tens: 0 -> ... -> 10. Mapped to Index 10 -> ... -> 0.
    const tensVal = Math.min(Math.floor(displayProgress / 10), 10);
    const tensIndex = 10 - tensVal;

    // Units: 0 -> 100. Mapped to Index 100 -> 0.
    const unitsIndex = 100 - Math.floor(displayProgress);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-end justify-start p-8 bg-[var(--background-primary)]"
            initial={{ x: '-100%' }}
            animate={{ x: isExiting ? '100%' : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <AnimatePresence>
                {!isExiting && (
                    <motion.div
                        className="flex text-[clamp(4rem,15vw,12rem)] font-bold leading-none tabular-nums"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex">
                            <Digit values={hundredsReel} currentIndex={hundredsIndex} />
                            <Digit values={tensReel} currentIndex={tensIndex} />
                            <Digit values={unitsReel} currentIndex={unitsIndex} />
                        </div>
                        <span className="text-[0.5em] text-[var(--content-secondary)] self-start ml-2">%</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

