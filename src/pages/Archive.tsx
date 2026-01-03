import { useEffect } from "react";
import { motion, Variants } from "motion/react"
import InfoBlock from "../components/InfoBlock";
import SimpleCard from "../components/SimpleCard";

const card = [
  {
    id: "1",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756281622/bookworms_f3dtzz.png",
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360174/bookworm_-_cover_kc0pcr.png",
  },
  {
    id: "3",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360901/atoms_-_3_memhte.png",
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360900/atoms_-_2_nu2b6z.png",
  },
  {
    id: "5",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360408/Screens_rhp8oe.png",
  },
  {
    id: "6",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360410/Screens-1_vf2tnw.png",
  },
  {
    id: "7",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756281200/polarcam_bmcbvy.png",
  },
  {
    id: "8",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756359979/file_cover_-_1_l75xvi.png",
  },
  {
    id: "9",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1756359953/cover_lnaewc.png",
  },
];

export default function Archive() {
  useEffect(() => {
    document.title = "barthkosi - archive";
  }, []);


  const cardCount = card.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 1.4,
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
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <main>
      <motion.div
        className="flex flex-col my-auto items-center w-full gap-7"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}>

        <InfoBlock
          variant='centered'
          title="Archive"
          number={cardCount}
          description=""
        />
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
          variants={containerVariants}
        >
          {card.map(card => (
            <motion.div
              key={card.id}
              variants={cardVariants}
            >
              <SimpleCard

                image={card.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}