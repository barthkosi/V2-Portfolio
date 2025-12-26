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
                 <a href="https://x.com/barthkosi/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <svg 
                   width="16" 
                   height="16" 
                   viewBox="0 0 16 16" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                   className="text-[var(--background-primary)]" // Replaces your div's color logic
                   >
                   <g fill="var(--content-primary)">
                     <path d="M12.5944 1H15.0361L9.70281 7.13655L16 15.4578H11.0522L7.19679 10.4137L2.76305 15.4578H0.321285L6.04016 8.90361L0 1H5.07631L8.57831 5.62651L12.5944 1ZM11.7269 13.9799H13.0763L4.33735 2.38153H2.85944L11.7269 13.9799Z"/>
                     </g>
                 </svg>
                  X(Twitter)
               </a>
               <a href="https://cosmos.so/barthkosi/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <svg 
                   width="16" 
                   height="16" 
                   viewBox="0 0 16 16" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                   className="text-[var(--background-primary)]" // Replaces your div's color logic
                   >
                   <g fill="var(--content-primary)">
                     <path d="M8.15164 3.34109C9.07425 3.34109 9.82218 2.59316 9.82218 1.67055C9.82218 0.747929 9.07425 0 8.15164 0C7.22902 0 6.48109 0.747929 6.48109 1.67055C6.48109 2.59316 7.22902 3.34109 8.15164 3.34109Z" />
                     <path d="M8.15164 15.9996C9.07425 15.9996 9.82218 15.2517 9.82218 14.3291C9.82218 13.4064 9.07425 12.6585 8.15164 12.6585C7.22902 12.6585 6.48109 13.4064 6.48109 14.3291C6.48109 15.2517 7.22902 15.9996 8.15164 15.9996Z" />
                     <path d="M2.67055 6.50582C3.59316 6.50582 4.34109 5.7579 4.34109 4.83528C4.34109 3.91266 3.59316 3.16473 2.67055 3.16473C1.74793 3.16473 1 3.91266 1 4.83528C1 5.7579 1.74793 6.50582 2.67055 6.50582Z" />
                     <path d="M13.6331 12.8349C14.5557 12.8349 15.3036 12.087 15.3036 11.1644C15.3036 10.2418 14.5557 9.49384 13.6331 9.49384C12.7105 9.49384 11.9625 10.2418 11.9625 11.1644C11.9625 12.087 12.7105 12.8349 13.6331 12.8349Z" />
                     <path d="M13.6331 6.50582C14.5557 6.50582 15.3036 5.7579 15.3036 4.83528C15.3036 3.91266 14.5557 3.16473 13.6331 3.16473C12.7105 3.16473 11.9625 3.91266 11.9625 4.83528C11.9625 5.7579 12.7105 6.50582 13.6331 6.50582Z" />
                     <path d="M2.67055 12.8349C3.59316 12.8349 4.34109 12.087 4.34109 11.1644C4.34109 10.2418 3.59316 9.49384 2.67055 9.49384C1.74793 9.49384 1 10.2418 1 11.1644C1 12.087 1.74793 12.8349 2.67055 12.8349Z" />
                   </g>
                 </svg>
                  Cosmos
               </a>
               <a href="http://www.linkedin.com/in/barthkosi/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <svg 
                   width="16" 
                   height="16" 
                   viewBox="0 0 16 16" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                   className="text-[var(--background-primary)]" // Replaces your div's color logic
                   >
                   <g fill="var(--content-primary)">
                     <path d="M14.4192 14.096C14.4517 14.0964 14.484 14.0895 14.514 14.0757C14.544 14.0621 14.571 14.0418 14.5935 14.0163C14.6159 13.9908 14.6333 13.9606 14.6445 13.9276C14.6558 13.8944 14.6606 13.8592 14.6587 13.8241C14.6587 13.6311 14.5512 13.5391 14.3308 13.5391H13.9746V14.5488H14.1086V14.1086H14.2732L14.2769 14.114L14.5325 14.5488H14.6757L14.4008 14.0988L14.4192 14.096ZM14.2643 13.9949H14.1089V13.6535H14.3058C14.4076 13.6535 14.5235 13.6715 14.5235 13.8157C14.5235 13.9816 14.407 13.9949 14.2643 13.9949Z"/>
                     <path d="M10.9245 12.8309H9.02475V9.60892C9.02475 8.84061 9.01209 7.85157 8.03668 7.85157C7.04723 7.85157 6.89585 8.68866 6.89585 9.55297V12.8306H4.99611V6.20503H6.81985V7.11049H6.84539C7.0279 6.77253 7.29164 6.49451 7.60851 6.30604C7.92539 6.11757 8.28353 6.02571 8.6448 6.04022C10.5703 6.04022 10.9252 7.4118 10.9252 9.19615L10.9245 12.8309ZM2.85258 5.29935C2.63453 5.2994 2.42137 5.22942 2.24005 5.09827C2.05873 4.96711 1.91741 4.78068 1.83393 4.56252C1.75045 4.34438 1.72858 4.10433 1.77107 3.87273C1.81358 3.64112 1.91854 3.42836 2.07269 3.26136C2.22685 3.09435 2.42326 2.9806 2.63711 2.9345C2.85095 2.88839 3.07262 2.91199 3.27408 3.00232C3.47554 3.09264 3.64773 3.24564 3.76891 3.44195C3.89008 3.63827 3.95477 3.86909 3.95482 4.10522C3.95484 4.26201 3.92635 4.41727 3.87097 4.56214C3.81559 4.70699 3.73441 4.83863 3.63206 4.94952C3.52971 5.0604 3.40818 5.14836 3.27444 5.20839C3.14069 5.26841 2.99734 5.29933 2.85258 5.29935ZM3.80244 12.8309H1.90073V6.20503H3.80244V12.8309ZM11.8716 1.00095H0.94611C0.698133 0.997915 0.459178 1.10163 0.281773 1.28929C0.104368 1.47696 0.00302642 1.73322 0 2.00177V13.8828C0.00292285 14.1515 0.104205 14.4081 0.281603 14.5959C0.459003 14.7837 0.69801 14.8877 0.94611 14.8848H11.8716C12.1202 14.8882 12.3599 14.7846 12.5379 14.5967C12.7161 14.4089 12.818 14.1521 12.8214 13.8828V2.00092C12.8179 1.73183 12.7158 1.47528 12.5378 1.28762C12.3597 1.09996 12.12 0.997397 11.8716 1.00095Z"/>
                     <path d="M14.28 13.0898C14.0488 13.0922 13.8279 13.1937 13.6657 13.3719C13.5035 13.5502 13.413 13.7908 13.4141 14.0411C13.4152 14.2915 13.5078 14.5311 13.6717 14.7077C13.8355 14.8843 14.0573 14.9833 14.2884 14.9833C14.5196 14.9833 14.7412 14.8843 14.9051 14.7077C15.0689 14.5311 15.1615 14.2915 15.1627 14.0411C15.1637 13.7908 15.0733 13.5502 14.911 13.3719C14.7488 13.1937 14.5279 13.0922 14.2967 13.0898H14.28ZM14.28 14.875C14.1284 14.8778 13.9794 14.8317 13.8519 14.7428C13.7245 14.6539 13.6243 14.526 13.5639 14.3753C13.5036 14.2247 13.4859 14.0581 13.513 13.8965C13.54 13.7349 13.6108 13.5857 13.7162 13.4677C13.8216 13.3497 13.957 13.2681 14.1052 13.2335C14.2533 13.1987 14.4078 13.2123 14.5488 13.2727C14.6898 13.333 14.8111 13.4372 14.8975 13.5721C14.9838 13.7072 15.0312 13.8668 15.0337 14.031C15.0337 14.0358 15.0337 14.0402 15.0337 14.045C15.038 14.2604 14.9631 14.4687 14.8255 14.6244C14.6879 14.7799 14.4989 14.8699 14.2999 14.8746L14.28 14.875Z"/>
                     </g>
                 </svg>
                  LinkedIn
               </a>
               <a href="https://github.com/barthkosi/" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center hover:text-[var(--content-secondary)]">
               <svg 
                   width="16" 
                   height="16" 
                   viewBox="0 0 16 16" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                   className="text-[var(--background-primary)]" // Replaces your div's color logic
                   >
                   <g fill="var(--content-primary)">
                     <path d="M7.97616 0C3.56555 0 0 3.59184 0 8.03543C0 11.5874 2.28457 14.5941 5.45388 15.6583C5.85012 15.7383 5.99527 15.4854 5.99527 15.2727C5.99527 15.0864 5.9822 14.4478 5.9822 13.7825C3.76343 14.2615 3.30139 12.8247 3.30139 12.8247C2.94482 11.8934 2.41649 11.654 2.41649 11.654C1.69029 11.1618 2.46939 11.1618 2.46939 11.1618C3.27494 11.215 3.69763 11.9866 3.69763 11.9866C4.41061 13.2104 5.55951 12.8647 6.02171 12.6518C6.08767 12.1329 6.2991 11.7737 6.52359 11.5742C4.75396 11.3879 2.89208 10.6962 2.89208 7.60963C2.89208 6.73159 3.20882 6.01322 3.71069 5.45453C3.63151 5.25502 3.35412 4.43004 3.79004 3.32588C3.79004 3.32588 4.46351 3.11298 5.98204 4.15069C6.63218 3.9748 7.30265 3.88532 7.97616 3.88457C8.64963 3.88457 9.33616 3.9778 9.97012 4.15069C11.4888 3.11298 12.1623 3.32588 12.1623 3.32588C12.5982 4.43004 12.3207 5.25502 12.2415 5.45453C12.7566 6.01322 13.0602 6.73159 13.0602 7.60963C13.0602 10.6962 11.1984 11.3745 9.41551 11.5742C9.70612 11.8269 9.9569 12.3058 9.9569 13.0642C9.9569 14.1417 9.94384 15.0065 9.94384 15.2725C9.94384 15.4854 10.0891 15.7383 10.4852 15.6584C13.6545 14.594 15.9391 11.5874 15.9391 8.03543C15.9522 3.59184 12.3736 0 7.97616 0Z"/>
                     </g>
                 </svg>
               GitHub
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