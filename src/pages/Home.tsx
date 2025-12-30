import { useEffect } from "react";
import { motion, Variants } from "motion/react";
import Button from "../components/Button";
import SimpleCard from "../components/SimpleCard";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "../hooks/useMediaQuery";

const simple = [
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

// Hero section animations
const mainContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const wordContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      when: "beforeChildren",
    },
  },
};

const descriptionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.4,
      when: "beforeChildren",
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const buttonContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1,
    },
  },
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Marquee - desktop slides from right
const marqueeDesktopVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 2.2,
    },
  },
};

// Marquee - mobile slides from bottom
const marqueeMobileVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 2.2,
    },
  },
};

// Work section - matches InfoBlock mainContainerVariants
const workTitleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

// Work section title text - matches InfoBlock textContainerVariants
const workTitleTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      when: "beforeChildren",
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Work cards - matches ReadingList stagger
const workCardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
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
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Helper functions for text animation
const animateText = (text: string) => {
  return text.split('').map((char, index) => (
    <motion.span
      key={`${char}-${index}`}
      variants={letterVariants}
      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </motion.span>
  ));
};

const animateWords = (text: string) => {
  return text.split(' ').map((word, index) => (
    <motion.span
      key={`${word}-${index}`}
      variants={wordVariants}
      style={{ display: 'inline-block', marginRight: '0.25em' }}
    >
      {word}
    </motion.span>
  ));
};

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    document.title = "barthkosi - design & engineering";
  }, []);

  return (
    <>
      <main className='flex flex-col items-center gap-8 lg:gap-16'>
        <div className="flex flex-col pl-4 md:pl-8 pr-4 md:pr-8 lg:pr-0 lg:flex-row lg:gap-8">
          {/* Hero Content */}
          <motion.div 
            className="flex flex-col justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={mainContainerVariants}
          >
            <div className="flex flex-col gap-2 pt-4 lg:pt-0 text-left">
              <motion.h1 
                className='md:max-w-[640px] lg:max-w-[1440px]'
                variants={wordContainerVariants}
              >
                {animateWords("Barth creates visual systems and digital experiences")}
              </motion.h1>
              <motion.p 
                className="body-m max-w-[380px] md:max-w-[640px] lg:max-w-[520px] text-[var(--content-secondary)]"
                variants={descriptionContainerVariants}
              >
                {animateWords("Explore my portfolio of web interactions, engineered solutions, and dynamic motion design that aims to inject joy into the digital world.")}
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-row items-center gap-3 flex-wrap"
              variants={buttonContainerVariants}
            >
              <motion.div variants={buttonVariants}>
                <Button
                  href="https://cal.com/barthkosi/intro"
                  openInNewTab
                >
                  Schedule a Call
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants}>
                <Button to="/projects"
                  variant="secondary"
                >
                  View Projects
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Marquee Section - slides from right on desktop, bottom on mobile */}
          <motion.div 
            className="w-full flex justify-center items-start"
            initial="hidden"
            animate="visible"
            variants={isDesktop ? marqueeDesktopVariants : marqueeMobileVariants}
          >
            <div
              className={`flex gap-1 ${isDesktop ? 'flex-row -mt-20' : 'flex-col'}`}
              style={{
                transform: 'perspective(500px) rotate(-4deg) rotateX(25deg) skewX(-16deg) skewY(6deg)',
              }}
            >
              {isDesktop ? (                
                <>
                  <div
                    className="relative w-[280px] h-[600px] overflow-hidden"
                    style={{
                      maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                      WebkitMaskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  >
                    <div className="flex flex-col gap-1 animate-scroll-up">
                      {[...simple.slice(0, 5), ...simple.slice(0, 5), ...simple.slice(0, 5)].map((item, index) => (
                        <div key={`col1-${item.id}-${index}`} className="w-full flex-shrink-0">
                          <img
                            src={item.image}
                            alt={`Project ${item.id}`}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="relative w-[280px] h-[600px] overflow-hidden"
                    style={{
                      maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                      WebkitMaskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  >
                    <div className="flex flex-col gap-1 animate-scroll-down">
                      {[...simple.slice(5), ...simple.slice(0, 3), ...simple.slice(5), ...simple.slice(0, 3), ...simple.slice(5), ...simple.slice(0, 3)].map((item, index) => (
                        <div key={`col2-${item.id}-${index}`} className="w-full flex-shrink-0">
                          <img
                            src={item.image}
                            alt={`Project ${item.id}`}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Marquee
                    direction="left"
                    speed={50}
                    autoFill={true}
                    style={{
                      maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  >
                    {simple.slice(0, 5).map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={`Project ${item.id}`}
                        className="h-40 md:h-52 aspect-video object-cover rounded-lg mx-[2px]"
                      />
                    ))}
                  </Marquee>
                  <Marquee
                    direction="right"
                    speed={50}
                    autoFill={true}
                    style={{
                      maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  >
                    {simple.slice(5).map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={`Project ${item.id}`}
                        className="h-40 md:h-52 aspect-video object-cover rounded-lg mx-[2px]"
                      />
                    ))}
                  </Marquee>
                </>
              )}
            </div>
          </motion.div>

        </div>

        {/* Work Examples Section */}
        <div className="w-full mx-auto">
          <div className="flex flex-col lg:flex-row p-4 md:p-8 lg:pt-[96px] gap-8">
            <motion.div 
              className="lg:h-[calc(100vh-102px)] lg:sticky top-[134px] lg:max-w-[380px] flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={workTitleContainerVariants}
            >
              <motion.h2 className="w-[280px] h4 md:h3" variants={workTitleTextVariants}>
                {animateText("Work preview")}
              </motion.h2>
            </motion.div>
            <motion.div 
              className="w-full flex flex-col gap-2 md:gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={workCardsContainerVariants}
            >
              {simple.map((simplecard) => (
                <motion.div key={simplecard.id} variants={cardVariants}>
                  <SimpleCard
                    image={simplecard.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}