import { useEffect } from "react";
import { motion, Variants } from "motion/react";
import { springTransition } from "../lib/transitions";
import InfoBlock from "../components/InfoBlock";


const images = [
  {
    id: "1",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899901/Tennis_Illustration_lb6fgp.png",

  },
  {
    id: "2",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899899/Jake_illustration_welkzu.png",

  },
  {
    id: "3",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899894/illustration_f5fi66.png"
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899899/illustration-1_esjizz.png",

  },
  {
    id: "5",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899893/Cassette_illustration_Isometriic_kkvkn8.png",

  },

]
export default function illustrations() {
  useEffect(() => {
    document.title = "barthkosi - illustrations";
  }, []);

  const imageCount = images.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 4,
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

  return (
    <main>
      <motion.div
        className="flex flex-col w-full gap-7 lg:gap-8 h-auto items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-[480px]"><InfoBlock
          variant="centered"
          title="Illustrations"
          number={imageCount}
          description="A visual diary of forms. I believe only in continued iteration. This page is a snapshot of my ever growing dialogue with color, light, and composition."
        />
        </div>
        <motion.div
          className="w-full columns-2 lg:columns-3 gap-2 md:gap-4"
          variants={containerVariants}
        >
          {images.map((item) => (
            <motion.div
              key={item.id}
              className="mb-4 break-inside-avoid"
              variants={cardVariants}
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}