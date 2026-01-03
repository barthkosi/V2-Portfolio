import { useEffect } from "react";
import InfoBlock from "../components/InfoBlock";
import ProjectShowcase from "../components/ProjectShowcase";

export default function Projects() {
  useEffect(() => {
    document.title = "barthkosi - projects";
  }, []);

  return (
    <main className="flex flex-col lg:flex-row gap-7">

      <InfoBlock

        title="Projects"
        number="3"
        description="I craft visual identities and brand systems, from logos and campaigns to print and packaging."
              />
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <h5 className="w-full max-w-[520px]">An <span className="text-[#31449B]">AI</span> powered <span className="text-[#31449B]">Trip Planner</span> and document organizer
              </h5>
              <ProjectShowcase
                variant="left"
                items={[
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/explrar-logo.webp',
                    alt: 'project cover',
                  },
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-2.webp',
                    alt: 'project screenshot',
                  },
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-1.webp',
                    alt: 'project screenshot',
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-5">
              <h5 className="w-full max-w-[520px]">A fully customizable graphic interface for <span className="text-[#B98D00]">manga</span> and <span className="text-[#7497BB]">comics</span>.
              </h5>
              <ProjectShowcase
                variant="right"
                items={[
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-1.webp',
                    alt: 'project screenshot',
                  },
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/bw-logo.webp',
                    alt: 'project cover',
                  },
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-3.webp',
                    alt: 'project screenshot',
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-5">
              <h5 className="w-full max-w-[520px]">Graphics and event banners for the <span className="text-[#0396FF]">sui</span> x <span className="text-[#FE6100]">axelar</span> event in Lagos, NG.
              </h5>
              <ProjectShowcase
                variant="right"
                items={[
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-1.webp',
                    alt: 'project screenshot',
                  },
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-logo.png',
                    alt: 'suiXaxelar collab logo',
                  },
                  {
                    type: 'image',
                    src: 'https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-2.webp',
                    alt: 'project screenshot',
                  },
                ]}
              />
            </div>
          </div>
    </main>
  );
}