import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="text-[var(--content-tertiary)] px-8 py-4 flex gap-6">
      <div className= "w-[32px] h-[32px] bg-[var(--background-secondary)]"></div>
      <Link to="/" className="hover:text-[var(--content-primary)]">Home</Link>
      <Link to="/projects" className="hover:text-[var(--content-primary)]">Projects</Link>
      <Link to="/reading-list" className="hover:text-[var(--content-primary)]">Reading</Link>
    </nav>
  );
}
