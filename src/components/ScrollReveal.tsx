import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollRevealProps {
    children: string;
    className?: string;
}

interface CharProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}

const Char = ({ children, progress, range }: CharProps) => {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline text-[var(--content-primary)]"
        >
            {children === " " ? "\u00A0" : children}
        </motion.span>
    );
};

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.55", "start 0.25"],
    });

    const words = children.split(" ");
    const chars = children.split("");

    return (
        <div ref={containerRef} className={className}>
            <p className="h4 break-words" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {words.map((word, wordIndex) => {
                    // Calculate the starting index of the current word in the original string
                    // We sum the lengths of all previous words plus the spaces between them
                    let startIndex = 0;
                    for (let i = 0; i < wordIndex; i++) {
                        startIndex += words[i].length + 1; // +1 for the space
                    }

                    return (
                        <span key={wordIndex} className="inline-block whitespace-nowrap">
                            {word.split("").map((char, charIndex) => {
                                const globalIndex = startIndex + charIndex;
                                const start = globalIndex / chars.length;
                                const end = start + 1 / chars.length;
                                return (
                                    <Char key={globalIndex} progress={scrollYProgress} range={[start, end]}>
                                        {char}
                                    </Char>
                                );
                            })}
                            {wordIndex < words.length - 1 && (
                                <span className="inline-block">&nbsp;</span>
                            )}
                        </span>
                    );
                })}
            </p>
        </div>
    );
}