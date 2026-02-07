import { useEffect, useRef } from "react";
import Head from "../components/Head";
import { motion, Variants, useScroll, useTransform } from "motion/react";
import Button from "../components/Button";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLoading } from "../context/LoadingContext";
import { Motion, anim, stagger } from "@/lib/transitions";
import heroMarquee from "../data/heroMarquee.json";
import Card from "@/components/Card";
import ScrollReveal from "../components/ScrollReveal";
import illustrations from "../data/illustrations.json";


const marqueeDesktopVariants: Variants = {
  hidden: anim.fadeRightBouncy.hidden,
  visible: {
    ...anim.fadeRightBouncy.visible,
    transition: { ...anim.fadeRightBouncy.visible.transition, delay: 1.4 },
  },
};

const marqueeMobileVariants: Variants = {
  hidden: anim.FadeUpBouncyBouncy.hidden,
  visible: {
    ...anim.FadeUpBouncyBouncy.visible,
    transition: { ...anim.FadeUpBouncyBouncy.visible.transition, delay: 1.4 },
  },
};

function IllustrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const illustrationItems = illustrations.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]"
    >
      <div className="sticky top-4 px-4 md:px-8 lg:px-20 py-8 md:py-12 overflow-hidden">
        {/* Header */}
        <div className="w-full max-w-[400px] flex flex-col gap-2 mb-8">
          <h3>Illustrations</h3>
          <p className="text-[var(--content-secondary)]">Lorem ipsum dolor sit amet consectetur. Venenatis hendrerit felis sed consectetur.</p>
        </div>

        {/* Cards container - padding-bottom reserves space for absolute cards (60% width × ~1.5 aspect ratio = 90%) */}
        <div className="w-full relative pb-[90%]">
          {illustrationItems.map((item, index) => {
            // Stagger the animation timing for each card
            const start = 0.1 + (index * 0.12);
            const end = 0.2 + (index * 0.12);

            return (
              <IllustrationCardAnimated
                key={item.id}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </div>

        {/* Button - appears at the end */}
        <motion.div
          className="mt-8"
          style={{
            opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1])
          }}
        >
          <Button to="/illustrations" variant="secondary">
            See More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Card component with scroll-linked animation
function IllustrationCardAnimated({
  item,
  index,
  scrollYProgress,
  start,
  end
}: {
  item: { id: string; image: string };
  index: number;
  scrollYProgress: any;
  start: number;
  end: number;
}) {
  // Calculate offset as percentage: 6 cards at 60% width, remaining 40% / 5 gaps = 8% per card
  const offsetPercent = index * 8;

  const x = useTransform(
    scrollYProgress,
    [start, end],
    ['100%', `${offsetPercent}%`]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05],
    [0, 1]
  );

  return (
    <motion.div
      className="absolute top-0 w-[60%]"
      style={{
        x,
        opacity,
        zIndex: index + 1
      }}
    >
      <div className="w-full p-2 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
        <img
          src={item.image}
          alt={item.id}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { isContentReady, addBlocker, removeBlocker } = useLoading();

  useEffect(() => {
    const BLOCKER_KEY = 'home-images';
    addBlocker(BLOCKER_KEY);

    const imagesToPreload = [
      ...heroMarquee.map(item => item.image),
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        removeBlocker(BLOCKER_KEY);
      }
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = checkComplete;
      img.onerror = checkComplete; // Don't block on failed images
      img.src = src;
    });

    return () => removeBlocker(BLOCKER_KEY);
  }, [addBlocker, removeBlocker]);

  return (
    <>
      <main>
        <div className='overflow-hidden flex flex-col items-center gap-8 lg:gap-16'>
          <Head
            title="barthkosi - design & engineering"
            description="Barth creates visual systems and digital experiences. Explore my portfolio of web interactions, engineered solutions, and dynamic motion design."
          />
          <section className="flex flex-col pl-4 md:pl-8 pr-4 md:pr-8 lg:pr-0 lg:flex-row lg:gap-8 items-center ">
            {/* Hero Content */}
            <motion.div
              className="w-full items-start flex flex-col justify-center gap-4"
              initial="hidden"
              animate={isContentReady ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.8,
                  },
                },
              }}
            >
              <motion.div
                className="flex flex-col gap-2 pt-4 lg:pt-0 text-left"
                variants={{
                  hidden: anim.FadeUpBouncyBouncy.hidden,
                  visible: anim.FadeUpBouncyBouncy.visible,
                }}
              >
                <h1 className='md:max-w-[640px] lg:max-w-[1440px]'>
                  Barth creates visual systems and digital experiences
                </h1>
              </motion.div>
              <motion.div
                variants={{
                  hidden: anim.FadeUpBouncyBouncy.hidden,
                  visible: anim.FadeUpBouncyBouncy.visible,
                }}
              >
                <p className="body-m max-w-[380px] md:max-w-[640px] lg:max-w-[520px] text-[var(--content-secondary)]">
                  Explore my portfolio of web interactions, engineered solutions, and dynamic motion design that aims to inject joy into the digital world.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-row items-center gap-3 flex-wrap"
                variants={{
                  hidden: anim.FadeUpBouncyBouncy.hidden,
                  visible: anim.FadeUpBouncyBouncy.visible,
                }}
              >
                <Button
                  href="https://cal.com/barthkosi/intro"
                  openInNewTab
                >
                  Schedule a Call
                </Button>
                <Button to="/work" variant="secondary">
                  View Work
                </Button>
              </motion.div>
            </motion.div>

            {/* Marquee Section */}
            <motion.div
              className="w-[140%] lg:w-[100%] flex justify-center items-start"
              initial="hidden"
              animate={isContentReady ? "visible" : "hidden"}
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
                    <div className="relative w-[280px] h-[600px] overflow-hidden" style={{ maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)' }}>
                      <div className="flex flex-col gap-1 animate-scroll-up">
                        {[...heroMarquee.slice(0, 5), ...heroMarquee.slice(0, 5), ...heroMarquee.slice(0, 5)].map((item, index) => (
                          <div key={`col1-${item.id}-${index}`} className="w-full flex-shrink-0">
                            <img src={item.image} alt={`Project ${item.id}`} className="w-full aspect-video object-cover rounded-[var(--radius-lg)]" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative w-[280px] h-[600px] overflow-hidden" style={{ maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)' }}>
                      <div className="flex flex-col gap-1 animate-scroll-down">
                        {[...heroMarquee.slice(5), ...heroMarquee.slice(0, 3), ...heroMarquee.slice(5), ...heroMarquee.slice(0, 3), ...heroMarquee.slice(5), ...heroMarquee.slice(0, 3)].map((item, index) => (
                          <div key={`col2-${item.id}-${index}`} className="w-full flex-shrink-0">
                            <img src={item.image} alt={`Project ${item.id}`} className="w-full aspect-video object-cover rounded-[var(--radius-lg)]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Marquee direction="left" speed={50} autoFill style={{ maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)' }}>
                      {heroMarquee.slice(0, 5).map((item) => (
                        <img key={item.id} src={item.image} alt={`Project ${item.id}`} className="h-40 md:h-52 aspect-video object-cover rounded-[var(--radius-lg)] gap-[2px] mx-[1px]" />
                      ))}
                    </Marquee>
                    <Marquee direction="right" speed={50} autoFill style={{ maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)' }}>
                      {heroMarquee.slice(5).map((item) => (
                        <img key={item.id} src={item.image} alt={`Project ${item.id}`} className="h-40 md:h-52 aspect-video object-cover rounded-[var(--radius-lg)] gap-[2px] mx-[1px]" />
                      ))}
                    </Marquee>
                  </>
                )}
              </div>
            </motion.div>
          </section>

          {/*Projects*/}
          <section className="flex flex-col items-center px-4 md:px-8 lg:px-20 py-8 md:py-12 pt-20 gap-8">
            <motion.div
              className="flex flex-col gap-4 w-full text-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -150px 0px" }}
              variants={stagger(0.1)}
            >
              <motion.div
                variants={{
                  hidden: anim.fadeUpBouncy.hidden,
                  visible: anim.fadeUpBouncy.visible,
                }}
              >
                <h2 className="h4">Featured Work</h2>
              </motion.div>
            </motion.div>
            <div className="flex flex-col gap-4 md:gap-6">
              {/* First row - staggered */}
              <motion.div
                className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                variants={stagger(0.1)}
              >
                <motion.div
                  className="col-span-2"
                  variants={{
                    hidden: anim.fadeUpBouncy.hidden,
                    visible: anim.fadeUpBouncy.visible,
                  }}
                >
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/explrar-logo.webp"
                    title="Explrar"
                    description="An AI powered trip planner and document organizer"
                    link=""
                    tags={["UI/UX", "Product Design"]}
                    variant="list-stacked"
                  />
                </motion.div>
                <motion.div
                  className="col-span-1"
                  variants={{
                    hidden: anim.fadeUpBouncy.hidden,
                    visible: anim.fadeUpBouncy.visible,
                  }}
                >
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/sui-image-v1.webp"
                    title="Sui x Axelar event graphics"
                    description="Posters and event banners for the sui x axelar event in Lagos, NG."
                    link=""
                    tags={["Graphic Design"]}
                    aspectRatio="auto"
                    variant="list-stacked"
                  />
                </motion.div>
              </motion.div>

              {/* Second row - staggered */}
              <motion.div
                className="flex flex-col md:flex-row gap-4 md:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                variants={stagger(0.1)}
              >
                <motion.div
                  className="w-full"
                  variants={{
                    hidden: anim.fadeUpBouncy.hidden,
                    visible: anim.fadeUpBouncy.visible,
                  }}
                >
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-1.webp"
                    title="Bookworm"
                    description="An AI powered trip planner and document organizer"
                    link=""
                    tags={["UI/UX", "Branding"]}
                    aspectRatio="auto"
                    variant="list-stacked"
                  />
                </motion.div>
                <motion.div
                  className="w-full"
                  variants={{
                    hidden: anim.fadeUpBouncy.hidden,
                    visible: anim.fadeUpBouncy.visible,
                  }}
                >
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/lillup.webp"
                    title="Lillup"
                    description="Posters and event banners for the sui x axelar event in Lagos, NG."
                    link=""
                    tags={["UX Design"]}
                    variant="list-stacked"
                  />
                </motion.div>
              </motion.div>
            </div>
            <Motion
              type="FadeUpBouncy"
              useInView={true}
              viewport={{ once: true, margin: "0px 0px -150px 0px" }}
              className="w-fit"
            >
              <Button to="/work" variant="secondary">View All Work</Button>
            </Motion>
          </section>
        </div>

        {/*explorations*/}
        <section className="flex flex-col items-center px-4 md:px-8 lg:px-20 py-8 md:py-12 gap-8">
          <motion.div
            className="flex flex-col gap-2 max-w-[640px] text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={stagger(0.1)}
          >
            <motion.div
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <h3>Explorations</h3>
            </motion.div>
            <motion.div
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <p className="text-[var(--content-secondary)]">Experiments, tests, and unfinished ideas.</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full flex flex-col md:flex-row gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={stagger(0.1)}
          >
            <motion.div
              className="w-full"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <Card
                image="https://res.cloudinary.com/barthkosi/image/upload/liquid-glass-ring.webp"
                title="Liquid glass shader"
                description="Recreated liquid glass in the browser with shaders."
                link="/explorations/glass"
                variant="list-stacked"
              />
            </motion.div>
            <motion.div
              className="w-full"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <Card
                image="https://res.cloudinary.com/barthkosi/image/upload/vinyl-player-cover.webp"
                title="Vinyl player"
                description="A fully functioning vinyl player built in framer."
                link="/explorations/vinyl"
                variant="list-stacked"
              />
            </motion.div>
          </motion.div>
          <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="w-fit"
          >
            <Button to="/explorations" variant="secondary">
              See More
            </Button>
          </Motion>
        </section>

        {/*Writing*/}
        <section className="overflow-visible flex flex-col lg:flex-row items-center gap-8 px-4 md:px-8 lg:px-20 py-8 md:py-12">
          <motion.div
            className="w-full max-w-[400px] flex flex-col gap-2 items-center lg:items-start text-center lg:text-left lg:top-[134px] sticky self-start mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={stagger(0.1)}
          >
            <motion.div
              className="w-full"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <h3>Writing</h3>
            </motion.div>
            <motion.div
              className="w-full"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <p className="text-[var(--content-secondary)]">Lorem ipsum dolor sit amet consectetur. Venenatis hendrerit felis sed consectetur.</p>
            </motion.div>
            <motion.div
              className="hidden lg:block"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <Button to="/writing" variant="secondary">
                See Writing
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full flex flex-col gap-5 lg:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={stagger(0.15)}
          >
            <motion.div
              className="lg:top-[134px] lg:sticky self-start"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <Card
                image="https://res.cloudinary.com/barthkosi/image/upload/replacement.webp"
                title="What is the benchmark for replacement?"
                description="On taste, agency and the death of average"
                link="/writing/replacement"
                variant="list-stacked"
              />
            </motion.div>
            <motion.div
              className="lg:top-[134px] sticky self-start"
              variants={{
                hidden: anim.fadeUpBouncy.hidden,
                visible: anim.fadeUpBouncy.visible,
              }}
            >
              <Card
                image="https://res.cloudinary.com/barthkosi/image/upload/unproductive.webp"
                title="Productivity as performance"
                description="The intricacies of perfomative success."
                link="/writing/unproductive"
                variant="list-stacked"
              />
            </motion.div>
          </motion.div>
          <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="w-fit lg:hidden"
          >
            <Button to="/writing" variant="secondary">
              See Writing
            </Button>
          </Motion>
        </section>

        {/*About*/}
        <section className="w-full flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 h-fit px-4 md:px-8 lg:px-20 py-8 md:py-12">
          <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="w-full">
            <h6>About Me</h6>
          </Motion>
          <ScrollReveal className="w-full md:col-span-2">
                        I’m obsessed with the 'why' behind digital experiences. For me, good design isn't about shipping features—it's about removing friction and rejecting manipulation. I want to build software that feels human, helpful, and properly optimized for the individual. The long term goal is simple: turn these ideas into a framework that others can use to build better, kinder tools.
          </ScrollReveal>
        </section>

        {/*Illustrations*/}
        <IllustrationsSection />
      </main>
    </>
  );
}
