import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="text-[var(--content-tertiary)] px-8 py-4 flex gap-6">
      <div className= "w-[32px] h-[32px] bg-[var(--background-secondary)]"></div>
      <Link to="/" className="label-m hover:text-[var(--content-primary)]">Home</Link>
      <Link to="/projects" className="label-m hover:text-[var(--content-primary)]">Projects</Link>
      <Link to="/reading-list" className="label-m hover:text-[var(--content-primary)]">Reading</Link>
    </nav>
  );
}
