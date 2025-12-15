import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      className="w-full flex flex-row h-[64px] md:h-[102px] p-4 md:p-8 items-center justify-between gap-6 sticky top-0 z-50"
      style={{
        background: `linear-gradient(to bottom, var(--background-primary) 0%, var(--opacity-0) 100%)`,
      }}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >

      <div className="flex flex-row items-center gap-1.5">
        <div className="w-[38px] h-[38px] bg-[var(--background-secondary)] rounded-md"></div>
        <div className="label-l text-[var(--content-primary)]">barth</div>
      </div> 
      <div className="flex flex-row gap-5 text-[var(--content-tertiary)]">
        <Link to="/" className="label-m hover:text-[var(--content-primary)]">Home</Link>
        <Link to="/projects" className="label-m hover:text-[var(--content-primary)]">Projects</Link>
        <Link to="/reading-list" className="label-m hover:text-[var(--content-primary)]">Reading</Link>
      </div>
    </motion.nav>
  );
}