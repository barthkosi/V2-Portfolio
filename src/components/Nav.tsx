import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex gap-6">
      <Link to="/" className="hover:text-blue-400">Home</Link>
      <Link to="/about" className="hover:text-blue-400">About</Link>
      <Link to="/contact" className="hover:text-blue-400">Contact</Link>
    </nav>
  );
}
