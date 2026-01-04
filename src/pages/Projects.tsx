import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { getContent, getAllTags, ContentItem } from "../lib/content";

import { springTransition } from "@/lib/transitions";

export default function Projects() {
  const [projects, setProjects] = useState<ContentItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ContentItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // InfoBlock triggers this when ready
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    document.title = "barthkosi - projects";

    const loadProjects = async () => {
      const items = await getContent('projects');
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

  const shouldShow = isIntroComplete && projects.length > 0;

  return (
    <main className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center">
      <InfoBlock
        title="Projects"
        number={projects.length}
        description="I craft visual identities and brand systems, from logos and campaigns to print and packaging."
        onComplete={() => setIsIntroComplete(true)}
      />

      <div className="w-full flex flex-col">
        <Filter tags={tags} activeTag={activeTag} onTagSelect={setActiveTag} />

        <motion.div
          className="w-full gap-4 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate={shouldShow ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.slug} variants={cardVariants}>
              <Card
                image={project.coverImage || ""}
                title={project.title}
                description={project.description}
                link={`/projects/${project.slug}`}
                tags={project.tags}
                variant="list"
                aspectRatio="aspect-video"
              />
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <div className="flex flex-col my-auto items-center w-full gap-7">
            <h3 className="my-auto h-full text-[var(--content-tertiary)]">.</h3>
          </div>
        )}
      </div>
    </main>
  );
}