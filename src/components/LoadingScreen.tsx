import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
    progress: number;
    onComplete?: () => void;
}

const MIN_DURATION = 1500;

export default function LoadingScreen({ progress: targetProgress, onComplete }: LoadingScreenProps) {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const startTimeRef = useRef<number | null>(null);
    const progressRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;

            const elapsed = timestamp - startTimeRef.current;
            const timeProgress = Math.min((elapsed / MIN_DURATION) * 100, 100);

            const nextProgress = Math.min(timeProgress, targetProgress);


            if (nextProgress !== progressRef.current) {
                progressRef.current = nextProgress;
                setDisplayProgress(nextProgress);
            }

            if (nextProgress < 100) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                // We reached 100.
                // Start exit sequence.
                // Small buffer to ensure user sees 100
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

    // Handle exit completion
    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                onComplete?.();
            }, 800); // Wait for exit animation
            return () => clearTimeout(timer);
        }
    }, [isExiting, onComplete]);

    if (displayProgress >= 100 && !isExiting && !onComplete) return null; // Safety

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-end justify-start p-8 bg-[var(--background-secondary)]"
            initial={{ x: '-100%' }}
            animate={{ x: isExiting ? '100%' : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <AnimatePresence>
                {!isExiting && (
                    <motion.div
                        className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none text-[var(--content-primary)] tabular-nums"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {Math.floor(displayProgress)}
                        <span className="text-[0.5em] text-[var(--content-secondary)]">%</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
