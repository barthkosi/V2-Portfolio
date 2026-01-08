import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";
import Head from "../components/Head";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { getContent, getAllTags, ContentItem } from "../lib/content";

import { springTransition } from "@/lib/transitions";

export default function Explorations() {
    const [explorations, setExplorations] = useState<ContentItem[]>([]);
    const [filteredExplorations, setFilteredExplorations] = useState<ContentItem[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    // InfoBlock triggers this when ready
    const [introFinished, setIntroFinished] = useState(false);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {


        const loadExplorations = async () => {
            const items = await getContent('explorations');
            setExplorations(items);
            setFilteredExplorations(items);
            setTags(getAllTags(items));
        };

        loadExplorations();
    }, []);

    useEffect(() => {
        if (activeTag) {
            setFilteredExplorations(explorations.filter(e => e.tags?.includes(activeTag)));
        } else {
            setFilteredExplorations(explorations);
        }
    }, [activeTag, explorations]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: springTransition
        },
    };

    return (
        <main className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center">
            <Head title="barthkosi - explorations" description="Personal experiments and creative explorations, from concept designs to visual studies." />
            <InfoBlock
                title="Explorations"
                number={explorations.length}
                description="Personal experiments and creative explorations, from concept designs to visual studies."
                onComplete={() => setIntroFinished(true)}
            />

            <div className="w-full flex flex-col">
                <Filter
                    tags={tags}
                    activeTag={activeTag}
                    onTagSelect={setActiveTag}
                    animate={introFinished}
                    onAnimationComplete={() => setShowCards(true)}
                />

                {explorations.length > 0 && (
                    <motion.div
                        className="w-full flex flex-col gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={introFinished && showCards ? "visible" : "hidden"}
                    >
                        {Object.entries(
                            filteredExplorations.reduce((acc, exploration) => {
                                const year = exploration.date ? `${exploration.date.substring(2, 4)}'` : "Unknown";
                                if (!acc[year]) acc[year] = [];
                                acc[year].push(exploration);
                                return acc;
                            }, {} as Record<string, typeof explorations>)
                        )
                            .sort((a, b) => b[0].localeCompare(a[0])) // Sort years descending
                            .map(([year, yearExplorations]) => (
                                <div key={year} className="w-full flex flex-col md:flex-row gap-4 relative">
                                    {/* Desktop Year Label */}
                                    <div className="md:w-[0px] shrink-0 z-[2]">
                                        <span className="h3 text-[var(--content-primary)] sticky top-[134px] hidden md:block">
                                            {year}
                                        </span>
                                    </div>

                                    <div className="w-full flex flex-col gap-4">
                                        {/* Mobile Year Label */}
                                        <div className="md:hidden pb-2 select-none">
                                            <span className="h3 text-[var(--content-primary)]">{year}</span>
                                        </div>

                                        {yearExplorations.map((exploration) => (
                                            <motion.div key={exploration.slug} variants={cardVariants}>
                                                <Card
                                                    image={exploration.coverImage || ""}
                                                    title={exploration.title}
                                                    description={exploration.description}
                                                    link={`/explorations/${exploration.slug}`}
                                                    tags={exploration.tags}
                                                    variant="list"
                                                    aspectRatio="aspect-video"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                )}

                {explorations.length === 0 && (
                    <div className="flex flex-col my-auto items-center w-full gap-7">
                        <h5 className="my-auto h-full text-[var(--content-primary)]">Explorations are coming soon!</h5>
                    </div>
                )}
            </div>
        </main>
    );
}
