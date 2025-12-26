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
      <main >
        <div className="w-full mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:h-[calc(100vh-102px)] lg:sticky top-[134px] lg:max-w-[380px] flex flex-col gap-4">
              <div className="items-center text-center lg:text-start lg:items-start flex flex-col gap-2">
                <h1 className="h3">Barth creates visual systems and digital experiences</h1>
                <p className="body-m max-w-[360px] lg:max-w-full text-[var(--content-secondary)]"> I work with founders who know the best products feel alive.</p>
              </div>
              <div className="flex flex-row lg:mx-0 mx-auto items-center start gap-3 flex-wrap">

                <Button to="/projects">
                  View Projects
                </Button>

                <Button
                  variant="secondary"
                  href="https://cal.com/barthkosi/intro"
                  openInNewTab
                >
                  Contact Me
                </Button>

              </div>
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