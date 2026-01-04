import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react"
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import { springTransition } from "../lib/transitions";
import archive from "../data/archive.json";

interface ArchiveItem {
  id: string;
  image: string;
}

export default function Archive() {
  const [areCardsVisible, setAreCardsVisible] = useState(false);

  useEffect(() => {
    document.title = "barthkosi - archive";
  }, []);


  const cardCount = archive.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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
  }

  return (
    <main>
      <div
        className="flex flex-col my-auto items-center w-full gap-7"
      >

        <InfoBlock
          variant='centered'
          title="Archive"
          number={cardCount}
          description=""
          onComplete={() => setAreCardsVisible(true)}
        />
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={areCardsVisible ? "visible" : "hidden"}
        >
          {archive.map((card: ArchiveItem) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
            >
              <Card
                image={card.image}
                aspectRatio="aspect-video"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}