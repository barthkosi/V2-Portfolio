import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
    className="w-full flex flex-row h-[64px] md:h-[102px] p-4 md:p-8 items-center justify-between gap-6 sticky top-0 z-50 overflow-hidden"
    initial={{ y: -24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Gradient mask that simulates progressive blur */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, var(--background-primary), var(--opacity-0))`,
        // The blur layer: full blur but masked to taper it out
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
      }}
    ></div>
  
    {/* Nav content */}
    <div className="relative flex flex-row items-center gap-1.5">
      <div className="w-[38px] h-[38px] bg-[var(--background-secondary)] rounded-md"></div>
      <div className="label-l text-[var(--content-primary)]">barth</div>
    </div>
    <div className="relative flex flex-row gap-5 text-[var(--content-tertiary)]">
      <Link to="/" className="label-m hover:text-[var(--content-primary)]">Home</Link>
      <Link to="/projects" className="label-m hover:text-[var(--content-primary)]">Projects</Link>
      <Link to="/reading-list" className="label-m hover:text-[var(--content-primary)]">Reading</Link>
    </div>
  </motion.nav>
  
  );
}