import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete?: () => void;
  progress: number; // Kept for prop compatibility
}

export default function LoadingScreen({ onComplete, progress }: LoadingScreenProps) {
  // Trigger onComplete when progress hits 100
  if (progress >= 100) {
    setTimeout(() => onComplete?.(), 500);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-end justify-start bg-[var(--background-primary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4 p-4 md:p-8">
        <span className="display text-[var(--content-primary)] animate-pulse">
          loading...
        </span>
      </div>
    </motion.div>
  );
}