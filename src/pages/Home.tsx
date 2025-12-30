import { useEffect } from "react";
import Button from "../components/Button";
import SimpleCard from "../components/SimpleCard";

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
]
export default function Home() {
  useEffect(() => {
    document.title = "barthkosi - design & engineering";
  }, []);

  return (
    <>
      <main className='flex flex-col items-center gap-8 lg:gap-16' >
        <div className="flex flex-col pl-4 md:pl-8 pr-4 md:pr-8 lg:pr-0 lg:flex-row lg:gap-8">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-2 pt-4 lg:pt-0 text-left">
              <h1>Barth creates visual systems and digital experiences</h1>
              <p className="body-m text-[var(--content-secondary)]">
                Explore my portfolio of web interactions, engineered solutions,
                and dynamic motion design that aims to inject joy into the digital world.
              </p>
            </div>
            <div className="flex flex-row items-center gap-3 flex-wrap">
              <Button
                href="https://cal.com/barthkosi/intro"
                openInNewTab
              >
                Schedule a Call
              </Button>

              <Button to="/projects"
                variant="secondary"
              >
                View Projects
              </Button>

            </div>
          </div>
          {/* Mobile/Tablet: Horizontal Marquee - Hidden on lg+ */}
          <div className="lg:hidden w-full flex justify-center">
            <div
              className="flex flex-col gap-1"
              style={{
                transform: 'perspective(500px) rotate(-4deg) rotateX(25deg) skewX(-16deg) skewY(6deg)',
              }}
            >
              <div
                className="overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                }}
              >
                <div className="flex gap-1 animate-scroll-left">
                  {[...simple, ...simple, ...simple].map((item, index) => (
                    <img
                      key={`h1-${item.id}-${index}`}
                      src={item.image}
                      alt={`Project ${item.id}`}
                      className="h-40 md:h-52 aspect-video object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
              <div
                className="overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                }}
              >
                <div className="flex gap-1 animate-scroll-right">
                  {[...simple.slice(4), ...simple.slice(0, 4), ...simple.slice(4), ...simple.slice(0, 4), ...simple.slice(4), ...simple.slice(0, 4)].map((item, index) => (
                    <img
                      key={`h2-${item.id}-${index}`}
                      src={item.image}
                      alt={`Project ${item.id}`}
                      className="h-40 md:h-52 aspect-video object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Vertical Ticker - Hidden below lg */}
          <div className="hidden lg:flex w-full justify-center items-start">
            <div
              className="flex gap-1 -mt-20"
              style={{
                transform: 'perspective(500px) rotate(-4deg) rotateX(25deg) skewX(-16deg) skewY(6deg)',
              }}
            >
              {/* Column 1 - Scrolling Up */}
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

              {/* Column 2 - Scrolling Down */}
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
            </div>
          </div>

        </div>
         <div className="w-full mx-auto">
          <div className="flex flex-col lg:flex-row p-4 md:p-8 lg:pt-[96px] gap-8">
            <div className="lg:h-[calc(100vh-102px)] lg:sticky top-[134px] lg:max-w-[380px] flex flex-col gap-4">
                <h1 className="h3">Work Examples</h1>         
            </div>
            <div className="w-full flex flex-col gap-2 md:gap-3">
              {simple.map(simplecard => (
                <SimpleCard
                  key={simplecard.id}
                  image={simplecard.image}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

    </>
  );
}