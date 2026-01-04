import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { getContent, getAllTags, ContentItem } from "../lib/content";
import { springTransition } from "@/lib/transitions";

export default function Writing() {
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ContentItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    document.title = "barthkosi - writing";

    // Load posts
    const loadPosts = async () => {
      const items = await getContent('writing');
      setPosts(items);
      setFilteredPosts(items);
      setTags(getAllTags(items));
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (activeTag) {
      setFilteredPosts(posts.filter(post => post.tags?.includes(activeTag)));
    } else {
      setFilteredPosts(posts);
    }
  }, [activeTag, posts]);


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: springTransition,
    },
  };

  const shouldShow = isIntroComplete && posts.length > 0;

  return (
    <main>
      <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 h-auto lg:justify-left lg:row justify-center">
        <InfoBlock
          title="Writing"
          number={posts.length}
          description="Thoughts, tutorials, and tales from my journey."
          onComplete={() => setIsIntroComplete(true)}
        />

        <div className="w-full items-center lg:items-start flex flex-col">
          <Filter tags={tags} activeTag={activeTag} onTagSelect={setActiveTag} />

          {shouldShow && (
            <motion.div
              className="w-full gap-4 flex flex-col"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.slug} variants={cardVariants}>
                  <Card
                    image={post.coverImage || ""}
                    title={post.title}
                    description={post.description}
                    link={`/writing/${post.slug}`}
                    tags={post.tags}
                    variant="list"
                    aspectRatio="aspect-video"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {posts.length === 0 && (
            <div className="flex flex-col my-auto items-center w-full gap-4">
              <h3 className="my-auto h-full text-[var(--content-tertiary)]"></h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
