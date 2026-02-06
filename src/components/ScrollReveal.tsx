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
        offset: ["start 0.9", "start 0.25"],
    });

    const chars = children.split("");

    return (
        <div ref={containerRef} className={className}>
            <p className="h4 break-words" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {chars.map((char, i) => {
                    const start = i / chars.length;
                    const end = start + 1 / chars.length;
                    return (
                        <Char key={i} progress={scrollYProgress} range={[start, end]}>
                            {char}
                        </Char>
                    );
                })}
            </p>
        </div>
    );
}