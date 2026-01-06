import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { getContent, getAllTags, ContentItem } from "../lib/content";

import { springTransition } from "@/lib/transitions";

export default function Work() {
    const [projects, setProjects] = useState<ContentItem[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ContentItem[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    // InfoBlock triggers this when ready
    const [introFinished, setIntroFinished] = useState(false);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        document.title = "barthkosi - work";

        const loadProjects = async () => {
            const items = await getContent('work');
            setProjects(items);
            setFilteredProjects(items);
            setTags(getAllTags(items));
        };

        loadProjects();
    }, []);

    useEffect(() => {
        if (activeTag) {
            setFilteredProjects(projects.filter(p => p.tags?.includes(activeTag)));
        } else {
            setFilteredProjects(projects);
        }
    }, [activeTag, projects]);

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
            <InfoBlock
                title="Work"
                number={projects.length}
                description="These entries document my process of building and refining tools that serve a purpose."
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

                {projects.length > 0 && (
                    <motion.div
                        className="w-full flex flex-col gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={introFinished && showCards ? "visible" : "hidden"}
                    >
                        {Object.entries(
                            filteredProjects.reduce((acc, project) => {
                                const year = project.date ? `${project.date.substring(2, 4)}'` : "Unknown";
                                if (!acc[year]) acc[year] = [];
                                acc[year].push(project);
                                return acc;
                            }, {} as Record<string, typeof projects>)
                        )
                            .sort((a, b) => b[0].localeCompare(a[0])) // Sort years descending
                            .map(([year, yearProjects]) => (
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

                                        {yearProjects.map((project) => (
                                            <motion.div key={project.slug} variants={cardVariants}>
                                                <Card
                                                    image={project.coverImage || ""}
                                                    title={project.title}
                                                    description={project.description}
                                                    link={`/work/${project.slug}`}
                                                    tags={project.tags}
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

                {projects.length === 0 && (
                    <div className="flex flex-col my-auto items-center w-full gap-7">
                        <h5 className="my-auto h-full text-[var(--content-primary)]">Work is coming soon!</h5>
                    </div>
                )}
            </div>
        </main>
    );
}
