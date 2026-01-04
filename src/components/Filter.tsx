import { motion, Variants } from "motion/react";

interface FilterProps {
    tags: string[];
    activeTag: string | null;
    onTagSelect: (tag: string | null) => void;
    animate?: boolean;
    onAnimationComplete?: () => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function Filter({ tags, activeTag, onTagSelect, animate = false, onAnimationComplete }: FilterProps) {
    if (tags.length === 0) return null;

    return (
        <motion.div
            className="flex flex-wrap max-w-[680px] justify-center lg:justify-start gap-2 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            onAnimationComplete={() => onAnimationComplete && onAnimationComplete()}
        >
            <motion.button
                variants={itemVariants}
                onClick={() => onTagSelect(null)}
                className={`px-4 py-2 rounded-full label-s transition-colors ${activeTag === null
                    ? "bg-[var(--background-inverse)] text-[var(--content-primary-inverse)]"
                    : "bg-[var(--background-secondary)] text-[var(--content-secondary)] hover:bg-[var(--background-tertiary)]"
                    }`}
            >
                All
            </motion.button>
            {tags.map((tag) => (
                <motion.button
                    key={tag}
                    variants={itemVariants}
                    onClick={() => onTagSelect(tag === activeTag ? null : tag)}
                    className={`px-4 py-2 rounded-full label-s transition-colors ${activeTag === tag
                        ? "bg-[var(--background-inverse)] text-[var(--content-primary-inverse)]"
                        : "bg-[var(--background-secondary)] text-[var(--content-secondary)] hover:bg-[var(--background-tertiary)]"
                        }`}
                >
                    {tag}
                </motion.button>
            ))}
        </motion.div>
    );
}
