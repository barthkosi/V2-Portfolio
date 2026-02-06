import { useEffect } from "react";
import Head from "../components/Head";
import { motion, Variants } from "motion/react";
import Button from "../components/Button";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLoading } from "../context/LoadingContext";
import ProjectShowcase from "../components/ProjectShowcase";
import { Motion, anim } from "@/lib/transitions";
import heroMarquee from "../data/heroMarquee.json";
import Card from "@/components/Card";
import ScrollReveal from "../components/ScrollReveal";


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
          {/*Projects section*/}
          <section className="flex flex-col items-center px-4 md:px-8 lg:px-20 py-12 gap-8">
            <div className="flex flex-col gap-4 w-full text-start">
            <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            className="w-full items-start">
                <h3>Featured Work</h3>
              </Motion>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">
                <div className="col-span-2">
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/explrar-logo.webp"
                    title="Explrar"
                    description="An AI powered trip planner and document organizer"
                    link=""
                    tags={["UI/UX", "Product Design"]}
                    variant="list-stacked"
                  />
                </div>
                <Motion
                  type="FadeUpBouncy"
                  useInView={true}
                  viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                  className="col-span-1"
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
                </Motion>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full">
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-1.webp"
                    title="Bookworm"
                    description="An AI powered trip planner and document organizer"
                    link=""
                    tags={["UI/UX", "Branding"]}
                    aspectRatio="auto"
                    variant="list-stacked"
                  />
                </div>
                <div className="w-full">
                  <Card
                    image="https://res.cloudinary.com/barthkosi/image/upload/lillup.webp"
                    title="Lillup"
                    description="Posters and event banners for the sui x axelar event in Lagos, NG."
                    link=""
                    tags={["UX Design"]}
                    variant="list-stacked"
                  />
                </div>
              </div>
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
          <section className="flex flex-col gap-12 p-4 md:px-[80px] mt-10 md:mt-20">
            <div className="flex flex-col gap-8">

              <Motion type="fadeRight" useInView className="w-full max-w-[520px]">
                <h6 className="label-l">Select Work</h6>
              </Motion>
              <div className="flex flex-col gap-5">
                <Motion type="fadeRight" useInView className="w-full max-w-[520px]">
                  <h5>An <span className="text-[#31449B]">AI</span> powered <span className="text-[#31449B]">Trip Planner</span> and document organizer.</h5>
                </Motion>
                <ProjectShowcase
                  variant="left"
                  items={[
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/explrar-logo.webp', alt: 'project cover' },
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-2.webp', alt: 'project screenshot' },
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-1.webp', alt: 'project screenshot' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-5">
                <Motion type="fadeRight" useInView className="w-full max-w-[520px]">
                  <h5>A fully customizable graphic interface for <span className="text-[#B98D00]">manga</span> and <span className="text-[#7497BB]">comics</span>.</h5>
                </Motion>
                <ProjectShowcase
                  variant="right"
                  items={[
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-1.webp', alt: 'project screenshot' },
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/bw-logo.webp', alt: 'project cover' },
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-3.webp', alt: 'project screenshot' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-5">
                <Motion type="fadeRight" useInView className="w-full max-w-[520px]">
                  <h5>Graphics and event banners for the <span className="text-[#0396FF]">sui</span> x <span className="text-[#FE6100]">axelar</span> event in Lagos, NG.</h5>
                </Motion>
                <ProjectShowcase
                  variant="right"
                  items={[
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-1.webp', alt: 'project screenshot' },
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-logo.webp', alt: 'suiXaxelar collab logo' },
                    { type: 'image', src: 'https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-2.webp', alt: 'project screenshot' },
                  ]}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button to="/work" variant="secondary">View All Work</Button>
              </div>
            </div>
          </section>

        </div>

        {/*explorations section*/}
        <section className="flex flex-col gap-8 items-center px-4 md:px-8 lg:px-20 py-12">
          <div className="flex flex-col gap-2 max-w-[640px] text-center">
            <Motion
              type="FadeUpBouncy"
              useInView={true}
              viewport={{ once: true, margin: "0px 0px -150px 0px" }}
              className="w-full">
              <h3>Explorations</h3>
            </Motion>
            <Motion
              type="FadeUpBouncy"
              useInView={true}
              viewport={{ once: true, margin: "0px 0px -150px 0px" }}
              className="w-full">
              <p className="text-[var(--content-secondary)]">Experiments, tests, and unfinished ideas.</p>
            </Motion>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-5">
            <Card
              image="https://res.cloudinary.com/barthkosi/image/upload/liquid-glass-ring.webp"
              title="Liquid glass shader"
              description="Recreated liquid glass in the browser with shaders."
              link="/explorations/glass"
              variant="list-stacked"
            />
            <Card
              image="https://res.cloudinary.com/barthkosi/image/upload/vinyl-player-cover.webp"
              title="Vinyl player"
              description="A fully functioning vinyl player built in framer."
              link="/explorations/vinyl"
              variant="list-stacked"
            />
          </div>
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

        {/*Writing section*/}
        <section className="overflow-visible flex flex-col lg:flex-row items-center gap-8 px-4 md:px-8 lg:px-20 py-12">
          <div className="w-full max-w-[400px] flex flex-col gap-2 items-center lg:items-start text-center lg:text-left lg:top-[134px] sticky self-start mx-auto">
            <Motion
              type="FadeUpBouncy"
              useInView={true}
              viewport={{ once: true, margin: "0px 0px -150px 0px" }}
              className="w-full">
              <h3>Writing</h3>
            </Motion>
            <Motion
              type="FadeUpBouncy"
              useInView={true}
              viewport={{ once: true, margin: "0px 0px -150px 0px" }}
              className="w-full">
              <p className="text-[var(--content-secondary)]">Lorem ipsum dolor sit amet consectetur. Venenatis hendrerit felis sed consectetur.</p>
            </Motion>
            <div className="hidden lg:block">
              <Button to="/writing" variant="secondary">
                See More
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 lg:gap-20">
            <div className="lg:top-[134px] lg:sticky self-start">
              <Card
                image="https://res.cloudinary.com/barthkosi/image/upload/replacement.webp"
                title="What is the benchmark for replacement?"
                description="On taste, agency and the death of average"
                link="/writing/replacement"
                variant="list-stacked"
              />
            </div>
            <div className="lg:top-[134px] sticky self-start">
              <Card
                image="https://res.cloudinary.com/barthkosi/image/upload/unproductive.webp"
                title="Productivity as performance"
                description="The intricacies of perfomative success."
                link="/writing/unproductive"
                variant="list-stacked"
              />
            </div>
          </div>

        </section>

        {/*About section*/}
        <section className="w-full flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-0 h-fit px-4 md:px-8 lg:px-20 py-20">
          <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="w-full">
            <h6>About Me</h6>
          </Motion>
          <ScrollReveal className="w-full md:col-span-2">
            Lorem ipsum dolor sit amet consectetur. Venenatis hendrerit felis sed consectetur. Id lobortis venenatis fringilla fringilla ultrices nisi faucibus viverra. Morbi faucibus enim nulla suscipit nulla eget eu. Gravida dignissim purus posuere aenean gravida viverra.
          </ScrollReveal>
        </section>

        {/*Illustrtaions*/}
        <section className="overflow-visible flex flex-col items-start gap-8 px-4 md:px-8 lg:px-20 py-12">
          <div className="w-full max-w-[400px] flex flex-col gap-2">
          <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="w-full">
              <h3>Illustrations</h3>
            </Motion>
          <Motion
            type="FadeUpBouncy"
            useInView={true}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="w-full">
              <p className="text-[var(--content-secondary)]">Lorem ipsum dolor sit amet consectetur. Venenatis hendrerit felis sed consectetur.</p>
            </Motion>
          </div>

          <div className="w-full flex flex-col gap-5">

          </div>

          <div>
            <Button to="/illustrations" variant="secondary">
              See More
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
