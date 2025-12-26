import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showVault, setShowVault] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let wasMobile = window.innerWidth < 768;
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      
      if (wasMobile && !isMobile) {
        setIsOpen(false);
      }
      
      wasMobile = isMobile;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = 'hidden';
     } else {
       document.body.style.overflow = 'unset';
     }
     
     return () => {
       document.body.style.overflow = 'unset';
  };
}, [isOpen]);

  return (
    <motion.nav
      className={`w-full flex flex-col ${isOpen ? 'h-screen' : 'h-[64px]'} md:h-[102px] p-4 md:p-8 items-start justify-between gap-6 sticky top-0 z-50 overflow-visible`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isOpen 
            ? 'var(--background-primary)' 
            : `linear-gradient(to bottom, var(--background-primary), var(--opacity-0))`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: isOpen 
            ? 'none' 
            : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          WebkitMaskImage: isOpen 
            ? 'none' 
            : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          transition: 'all 0.3s ease',
        }}
      ></div>
       
      <div className="w-full relative flex flex-row justify-between items-center">
        <Link to="/" className="flex flex-row items-center gap-2">
        <img 
          src="https://res.cloudinary.com/barthkosi/image/upload/pfp.webp" 
          alt="Barth logo" 
          className="w-[38px] h-[38px] rounded-[8px] object-cover"
        />
          <div className="label-l text-[var(--content-primary)]">barth ✶</div>
        </Link>

        {/* Desktop Menu - inline with logo */}
        <div className="hidden md:flex label-s flex-row gap-6 text-[var(--content-secondary)] items-center">      
          <Link to="/projects" className="hover:text-[var(--content-primary)]">Projects</Link>
          <Link to="/illustrations" className="hover:text-[var(--content-primary)]">Illustrations</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowVault(true)}
            onMouseLeave={() => setShowVault(false)}
          >
            <button className="text-left hover:text-[var(--content-primary)] cursor-pointer">
              Vault
            </button>
            
            <AnimatePresence>
              {showVault && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[var(--background-primary)] text-[var(--content-primary)] border border-[var(--background-secondary)] rounded-[12px] shadow-lg p-3 flex flex-col gap-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/archive" className="hover:text-[var(--content-secondary)] whitespace-nowrap">Archive</Link>
                  <Link to="/reading-list" className="hover:text-[var(--content-secondary)] whitespace-nowrap">Reading List</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setShowSocial(true)}
            onMouseLeave={() => setShowSocial(false)}
          >
            <button className="text-left hover:text-[var(--content-primary)] cursor-pointer">
              Social
            </button>
            
            <AnimatePresence>
              {showSocial && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[var(--background-primary)] text-[var(--content-primary)] border border-[var(--background-secondary)] rounded-[12px] shadow-lg p-3 flex flex-col gap-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="https://x.com/barthkosi/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-secondary)] whitespace-nowrap">
                    X(Twitter)
                  </a>
                  <a href="https://cosmos.so/barthkosi" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-secondary)] whitespace-nowrap">
                    Cosmos
                  </a>
                  <a href="http://www.linkedin.com/in/barthkosi/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-secondary)] whitespace-nowrap">
                    LinkedIn
                  </a>
                  <a href="https://github.com/barthkosi/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--content-secondary)] whitespace-nowrap">
                    Github
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            href="https://cal.com/barthkosi/intro" 
            openInNewTab
          >
            Contact Me
          </Button>
        </div>

       <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-[38px] h-[38px] cursor-pointer flex items-center justify-center"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none"
          >
           
            <motion.path
              d={isOpen ? "M8 8L25 25" : "M4 10L28 10"}
              stroke="var(--content-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ 
                d: isOpen ? "M8 8L25 25" : "M4 10L28 10"
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
    
            <motion.path
              d={isOpen ? "M8 25L25 8" : "M4 22L28 22"}
              stroke="var(--content-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ 
                d: isOpen ? "M8 25L25 8" : "M4 22L28 22"
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden absolute top-[64px] left-0 w-full h-screen px-4 py-4 h4 flex flex-col gap-3 text-[var(--content-primary)]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
          >  
          <div className="flex flex-col gap-1">
            <motion.div 
              className="flex flex-col gap-1"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
              }}
            >   
              <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
            </motion.div>
            
            <motion.div 
              className="flex flex-col gap-1"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <Link to="/illustrations" onClick={() => setIsOpen(false)}>Illustrations</Link>
            </motion.div>
            </div>
            <div className="flex flex-col gap-1">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.3, delay: 1.6 } },
                }}
              >
                <div className="label-s text-[var(--content-tertiary)]">Vault</div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <Link to="/archive" onClick={() => setIsOpen(false)}>Archive</Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <Link to="/reading-list" onClick={() => setIsOpen(false)}>Reading List</Link>
              </motion.div>
            </div>

            <div className="flex flex-col gap-1">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.3, delay: 1.6 } },
                }}
              >
                <div className="label-s text-[var(--content-tertiary)]">Social</div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <a href="https://x.com/barthkosi/" target="_blank" rel="noopener noreferrer">
                  X(Twitter)
                </a>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <a href="https://cosmos.so/barthkosi/" target="_blank" rel="noopener noreferrer">
                  Cosmos
                </a>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <a href="http://www.linkedin.com/in/barthkosi/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <a href="https://github.com/barthkosi/" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </motion.div>
            </div>
            
            <motion.div
              className="w-full"
              variants={{
                hidden: { opacity: 0, scaleX: 0, originX: 0 },
                visible: { 
                  opacity: 1, 
                  scaleX: 1, 
                  originX: 0,
                  transition: { 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1
                  } 
                },
              }}
            >
              <Button 
                className="flex w-full"
                size="lg" 
                href="https://cal.com/barthkosi/intro" 
                openInNewTab
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}