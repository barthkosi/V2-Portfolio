import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="w-full flex flex-col p-4 md:p-8 items-start justify-between gap-6 sticky top-0 z-50 overflow-visible"
      initial={{ y: -24, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
    <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isOpen 
            ? 'var(--background-primary)' 
            : `linear-gradient(to bottom, var(--background-primary), var(--opacity-0))`,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          maskImage: isOpen 
            ? 'none' 
            : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          WebkitMaskImage: isOpen 
            ? 'none' 
            : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
  }}
></div>
     
     <div className="w-full relative flex flex-row justify-between items-center">
     <div className="flex flex-row items-center gap-1.5">
        <div className="w-[38px] h-[38px] bg-[var(--background-secondary)] rounded-md"></div>
        <div className="label-l text-[var(--content-primary)]">
            barth
        </div>
      </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-[38px] h-[38px] bg-gray-100 rounded-md hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            className="transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="relative h3 flex flex-col gap-3 text-[var(--content-primary)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >      
            <a href="/projects" className="hover:text-[var(--content-primary)]">Projects</a>
            <a href="/illustrations" className="hover:text-[var(--content-primary)]">Illustrations</a>
            
            <div className="flex flex-col gap-1">
               <div className="label-s text-[var(--content-tertiary)]">Vault</div>
               
               <Link to="/archive" className="hover:text-[var(--content-primary)]">Archive</Link>
               <Link to="/reading-list" className="hover:text-[var(--content-primary)]">Reading List</Link>
             </div>

          
            <div className="flex flex-col gap-1">
              <div className="label-s text-[var(--content-tertiary)]">Social</div>
              
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-primary)]">
                 X(Twitter)
                </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-primary)]">
                    Arena
                 </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-primary)]">
                 LinkedIn
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-primary)]">
                 Github
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}