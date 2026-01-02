import { useEffect } from "react";
import InfoBlock from "../components/InfoBlock";

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
          <div className="flex flex-col md:flex-row gap-1 md:gap-2">
            <div className="w-full flex flex-col gap-1 md:gap-2">
              <img src="https://res.cloudinary.com/barthkosi/image/upload/explrar-logo.webp" alt="project cover" className="rounded-[8px] border-[0.44px] border-[var(--border-primary)]"/>
              <img src="https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-2.webp" alt="project screenshot" className="rounded-[8px] border-[0.44px] border-[var(--border-primary)]"/>
            </div>
            <div className="w-full flex flex-col">
             <img src="https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-1.webp" alt="project screenshot" className="rounded-[8px] border-[0.44px] border-[var(--border-primary)]"/>
            </div>
          </div>
         </div>
         <div className="flex flex-col gap-5">
          <h5 className="w-full max-w-[520px]">A fully customizable graphic interface for <span className="text-[#B98D00]">manga</span> and <span className="text-[#7497BB]">comics</span>.
          </h5>
          <div className="flex flex-col md:flex-row gap-1 md:gap-2">
            <div className="w-full flex flex-col">
             <img src="https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-1.webp" alt="project screenshot" className="rounded-[8px] border-[0.44px] border-[var(--border-primary)]"/>
            </div>
            <div className="w-full flex flex-col gap-1 md:gap-2">
              <img src="https://res.cloudinary.com/barthkosi/image/upload/bw-logo.webp" alt="project cover" className="rounded-[8px] border-[0.44px] border-[var(--border-primary)]"/>
              <img src="https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-3.webp" alt="project screenshot" className="rounded-[8px] border-[0.44px] border-[var(--border-primary)]"/>
            </div>
          </div>
         </div>
         <div className="flex flex-col gap-5">
          <h5 className="w-full max-w-[520px]">Graphics and event banners for the <span className="text-[#0396FF]">sui</span> x <span className="text-[#FE6100]">axelar</span> event in Lagos, NG.
          </h5>
          <div className="flex flex-col md:flex-row gap-1 md:gap-2">
            <div className="w-full flex flex-col">
             <img src="https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-1.webp" alt="project screenshot" className="rounded-[8px]"/>
            </div>
            <div className="w-full flex flex-col gap-1 md:gap-2">
              <img src="https://res.cloudinary.com/barthkosi/image/upload/bw-logo.webp" alt="project cover" className="rounded-[8px]"/>
              <img src="https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-2.webp" alt="project screenshot" className="rounded-[8px]"/>
            </div>
          </div>
         </div>
      </div>
    </main>
  );
}