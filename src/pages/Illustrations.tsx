import { useState } from "react";
import { motion, Variants } from "motion/react";
import Head from "../components/Head";
import { springBouncy } from "../lib/transitions";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import illustrations from "../data/illustrations.json";

export default function Illustrations() {
  const [areImagesVisible, setAreImagesVisible] = useState(false);



  const imageCount = illustrations.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      transition: springBouncy,
    },
  };

  return (
    <main>
      <div
        className="flex flex-col w-full gap-7 lg:gap-8 h-auto items-center justify-center"
      >
        <Head title="barthkosi - illustrations" description="A visual diary of forms. I believe only in continued iteration." />
        <div className="max-w-[480px]"><InfoBlock
          variant="centered"
          title="Illustrations"
          number={imageCount}
          description="A visual diary of forms. I believe only in continued iteration. This page is a snapshot of my ever growing dialogue with color, light, and composition."
          onComplete={() => setAreImagesVisible(true)}
        />
        </div>
        <motion.div
          className="w-full columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={areImagesVisible ? "visible" : "hidden"}
        >
          {illustrations.map((item) => (
            <motion.div
              key={item.id}
              className="mb-4 break-inside-avoid"
              variants={cardVariants}
            >
              <Card
                image={item.image}
                aspectRatio="auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
