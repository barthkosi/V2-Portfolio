import Head from "../components/Head";
import { motion, Variants } from "motion/react";
import Button from "../components/Button";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLoading } from "../context/LoadingContext";
import ProjectShowcase from "../components/ProjectShowcase";
import { Motion, springMarquee } from "@/lib/transitions";

const simple = [
  { id: "1", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756281622/bookworms_f3dtzz.webp" },
  { id: "2", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360174/bookworm_-_cover_kc0pcr.webp" },
  { id: "3", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360901/atoms_-_3_memhte.webp" },
  { id: "4", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360900/atoms_-_2_nu2b6z.webp" },
  { id: "5", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360408/Screens_rhp8oe.webp" },
  { id: "6", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756360410/Screens-1_vf2tnw.webp" },
  { id: "7", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756281200/polarcam_bmcbvy.webp" },
  { id: "metal-logo", image: "https://res.cloudinary.com/barthkosi/image/upload/metal-logo.webp" },
  { id: "explrar-explorations-2025", image: "https://res.cloudinary.com/barthkosi/image/upload/explrar-explorations-2025.webp" },
  { id: "image-cards", image: "https://res.cloudinary.com/barthkosi/image/upload/image-cards.webp" },
  { id: "9", image: "https://res.cloudinary.com/barthkosi/image/upload/v1756359953/cover_lnaewc.webp" },
];

const marqueeDesktopVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springMarquee,
  },
};

const marqueeMobileVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springMarquee,
  },
};

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { isContentReady } = useLoading();

  return (
    <>
      <main className='overflow-hidden flex flex-col items-center gap-8 lg:gap-16'>
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
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            <div className="flex flex-col gap-2 pt-4 lg:pt-0 text-left">
              <Motion type="upSnappy">
                <h1 className='md:max-w-[640px] lg:max-w-[1440px]'>
                  Barth creates visual systems and digital experiences
                </h1>
              </Motion>
              <Motion type="upSnappy">
                <p className="body-m max-w-[380px] md:max-w-[640px] lg:max-w-[520px] text-[var(--content-secondary)]">
                  Explore my portfolio of web interactions, engineered solutions, and dynamic motion design that aims to inject joy into the digital world.
                </p>
              </Motion>
            </div>
            
            <Motion type="upSnappy" className="flex flex-row items-center gap-3 flex-wrap">
              <Button
                href="https://cal.com/barthkosi/intro"
                openInNewTab
              >
                Schedule a Call
              </Button>
              <Button to="/work" variant="secondary">
                View Work
              </Button>
            </Motion>
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
                      {[...simple.slice(0, 5), ...simple.slice(0, 5), ...simple.slice(0, 5)].map((item, index) => (
                        <div key={`col1-${item.id}-${index}`} className="w-full flex-shrink-0">
                          <img src={item.image} alt={`Project ${item.id}`} className="w-full aspect-video object-cover rounded-[var(--radius-lg)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative w-[280px] h-[600px] overflow-hidden" style={{ maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)' }}>
                    <div className="flex flex-col gap-1 animate-scroll-down">
                      {[...simple.slice(5), ...simple.slice(0, 3), ...simple.slice(5), ...simple.slice(0, 3), ...simple.slice(5), ...simple.slice(0, 3)].map((item, index) => (
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
                    {simple.slice(0, 5).map((item) => (
                      <img key={item.id} src={item.image} alt={`Project ${item.id}`} className="h-40 md:h-52 aspect-video object-cover rounded-[var(--radius-lg)] gap-[2px] mx-[1px]" />
                    ))}
                  </Marquee>
                  <Marquee direction="right" speed={50} autoFill style={{ maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)' }}>
                    {simple.slice(5).map((item) => (
                      <img key={item.id} src={item.image} alt={`Project ${item.id}`} className="h-40 md:h-52 aspect-video object-cover rounded-[var(--radius-lg)] gap-[2px] mx-[1px]" />
                    ))}
                  </Marquee>
                </>
              )}
            </div>
          </motion.div>
        </section>

        <section className="flex flex-col gap-12 p-4 md:px-[80px]">
          <div className="flex flex-col gap-8">
            <h6 className="label-l">Select Work</h6>
            <div className="flex flex-col gap-5">
              <Motion type="rightSnappy" useInView className="w-full max-w-[520px]">
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
              <Motion type="rightSnappy" useInView className="w-full max-w-[520px]">
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
              <Motion type="rightSnappy" useInView className="w-full max-w-[520px]">
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
      </main>
    </>
  );
}
