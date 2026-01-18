import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "./Button";
import Card from "./Card";
import { physics } from "@/lib/transitions";
import { useMediaQuery } from "../hooks/useMediaQuery";

export interface ExtraItem {
    id: string;
    image: string;
    sidebarTitle: string;
    sidebarDescription: string;
    cardTitle?: string;
    cardDescription?: string;
    link: string;
}

interface ExtrasSectionProps {
    items: ExtraItem[];
    label?: string;
}

const createSwap = (
    direction: "vertical" | "horizontal" = "vertical",
    distance = 20,
    config: any = physics.standard
) => {
    const isVertical = direction === "vertical";
    return {
        initial: { opacity: 0, ...(isVertical ? { y: distance } : { x: distance }) },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, ...(isVertical ? { y: -distance } : { x: -distance }) },
        transition: config,
    };
};

export default function ExtrasSection({ items, label = "Extras" }: ExtrasSectionProps) {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const isTablet = useMediaQuery('(min-width: 768px)');
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    // Extra offset for mobile/tablet navigation
    // Desktop: 134px, Tablet: 334px (134+160+40), Mobile: 294px (134+160)
    const stickyBaseTop = isDesktop ? 134 : isTablet ? 340 : 320;

    useEffect(() => {
        const handleScroll = () => {
            let newActiveIndex = 0;

            cardRefs.current.forEach((cardRef, index) => {
                if (!cardRef) return;
                const rect = cardRef.getBoundingClientRect();
                // Use stickyBaseTop to match when each card actually becomes sticky
                if (rect.top <= stickyBaseTop + (index * 20) + 10) {
                    newActiveIndex = index;
                }
            });

            setActiveCardIndex(newActiveIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [stickyBaseTop]);

    return (
        <section ref={sectionRef} className="w-full flex flex-col lg:flex-row gap-6 lg:gap-12 py-8 px-4 md:px-[80px]">
            <div className="w-full lg:max-w-[400px] flex flex-col gap-3 top-[64px] md:top-[134px] sticky self-start">
                <div className="label-m px-2 py-1 bg-[var(--background-secondary)] rounded-[var(--radius-lg)] text-[var(--content-primary)] w-fit">
                    {label}
                </div>
                <div className="flex flex-col gap-4 overflow-visible">
                    <div className="flex flex-col gap-2 overflow-visible">
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={items[activeCardIndex].sidebarTitle}
                                {...createSwap("vertical", 20, physics.standard)}
                            >
                                {items[activeCardIndex].sidebarTitle}
                            </motion.h3>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={items[activeCardIndex].sidebarDescription}
                                className="body-m text-[var(--content-primary)]"
                                {...createSwap("vertical", 20, physics.standard)}
                            >
                                {items[activeCardIndex].sidebarDescription}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    <Button to={items[activeCardIndex].link} variant="secondary" className="w-fit">Open</Button>
                </div>
            </div>

            <div className="w-full lg:px-40 flex flex-col">
                {items.map((item: ExtraItem, index: number) => (
                    <div
                        key={`${item.id}-${index}`}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        className="sticky self-start items-center"
                        style={{ top: `${stickyBaseTop + index * 20}px`, zIndex: index + 1 }}
                    >
                        <Card image={item.image} variant="default" aspectRatio="auto" title={item.cardTitle} description={item.cardDescription} />
                    </div>
                ))}
            </div>
        </section>
    );
}
