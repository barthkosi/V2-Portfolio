import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer className="w-full p-4 md:p-6">
        <div className="max-w-[1440px] flex flex-col items-start gap-4 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
          <div className='w-full flex flex-col md:flex-row items-start text-left gap-5 p-6 md:p-10'>
            <div className="w-full flex flex-col gap-3">
              <div className="label-xs text-[var(--content-tertiary)]">Links</div>
              <div className="flex flex-col gap-2 label-s text-[var(--content-primary)]">
                <div className="flex flex-row gap-2">
                  <Link to="/" className="hover:text-[var(--content-secondary)]">Home</Link>
                  <div className="label-xs text-[var(--content-secondary)]">An Intro to my mind</div>
                </div>
                              
                <div className="flex flex-row gap-2">
                  <Link to="/projects" className="hover:text-[var(--content-secondary)]">Projects</Link>
                  <div className="label-xs text-[var(--content-secondary)]">Lorem Ipsum dolor</div>
                </div>

                <div className="flex flex-row gap-2">
                  <Link to="/illustrations" className="hover:text-[var(--content-secondary)]">Illustrations</Link>
                  <div className="label-xs text-[var(--content-secondary)]">Lorem Ipsum dolor</div>
                </div>

                <div className="flex flex-row gap-2">
                  <Link to="/archive" className="hover:text-[var(--content-secondary)]">Archive</Link>
            
                  <div className="label-xs text-[var(--content-secondary)]">Lorem Ipsum dolor</div>
                </div>
               
                <div className="flex flex-row gap-2">
                  <Link to="/reading-list" className="hover:text-[var(--content-secondary)]">Reading List</Link>
            
                  <div className="label-xs text-[var(--content-secondary)]">Lorem Ipsum dolor</div>
                </div>
                
              </div>  
              
             </div>
            <div className="w-full flex flex-col gap-3">
             <div className="label-xs text-[var(--content-tertiary)]">Social</div>
              <div className="flex flex-col gap-2 label-s text-[var(--content-primary)]">
               <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <div className="w-[16px] h-[16px] bg-[var(--background-primary)] rounded-s"></div>
                  X (Twitter)
               </a>
               <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <div className="w-[16px] h-[16px] bg-[var(--background-primary)] rounded-s"></div>
                  Arena
               </a>
               <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <div className="w-[16px] h-[16px] bg-[var(--background-primary)] rounded-s"></div>
                  LinkedIn
               </a>
               <a href="https://github.com/barthkosi" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <div className="w-[16px] h-[16px] bg-[var(--background-primary)] rounded-s"></div>
               GitHub
               </a>
               
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  