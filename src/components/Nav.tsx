import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="w-full flex flex-row h-[64px] md:h-[102px] p-4 md:p-8 items-center justify-between flex gap-6 sticky top-0 z-50">
      <div className="flex flex-row items-center gap-1.5">
        <div className= "w-[38px] h-[38px] bg-[var(--background-secondary)]"></div>
        <div className= "label-l text-[var(--content-primary)] ">barth</div>
      </div> 
      <div className="flex flex-row gap-5 text-[var(--content-tertiary)]">
        <Link to="/" className="label-m hover:text-[var(--content-primary)]">Home</Link>
        <Link to="/projects" className="label-m hover:text-[var(--content-primary)]">Projects</Link>
        <Link to="/reading-list" className="label-m hover:text-[var(--content-primary)]">Reading</Link>
      </div>
    </nav>
  );
}
