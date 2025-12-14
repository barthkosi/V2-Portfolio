import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer className="w-full p-4 md:p-6">
        <div className="max-w-[1440px] flex flex-col items-start gap-4 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
          <div className='w-full flex flex-col md:flex-row items-start text-left gap-5 p-6 md:p-10'>
            <div className="w-full flex flex-col gap-3">
              <div className="label-s text-[var(--content-tertiary)]">Links</div>
              <div className="flex flex-col gap-2 label-m text-[var(--content-primary)]">
                <div className="flex flex-row gap-2">
                  <Link to="/" className="hover:text-[var(--content-secondary)]">Home</Link>
                
                  <div className="body-s">An Intro to my mind</div>
                </div>
                              
                <div className="flex flex-row gap-2">
                  <Link to="/projects" className="hover:text-[var(--content-secondary)]">Projects</Link>
            
                  <div className="body-s">Lorem Ipsum dolor</div>
                </div>

                <div className="flex flex-row gap-2">
                  <Link to="/reading-list" className="hover:text-[var(--content-secondary)]">Reading List</Link>
            
                  <div className="body-s">Lorem Ipsum dolor</div>
                </div> 
                <div className="flex flex-row gap-2">
                  <Link to="/archive" className="hover:text-[var(--content-secondary)]">Archive</Link>
            
                  <div className="body-s">Lorem Ipsum dolor</div>
                </div>
              </div>  
              
             </div>
            <div className="w-full flex flex-col gap-3">
             <div className="label-s text-[var(--content-tertiary)]">Social</div>
              <div className="flex flex-col gap-2 label-m text-[var(--content-primary)]">
               <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  X (Twitter)
               </a>
               <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
               </a>

              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  