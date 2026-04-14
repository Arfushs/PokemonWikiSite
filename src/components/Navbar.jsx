import { NavLink } from "react-router-dom";
import PokeballIcon from "./PokeballIcon";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1"
      : "text-gray-300 hover:text-white transition-colors";

  return (
    <nav className="bg-slate-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <PokeballIcon size={32} />
          <span className="text-white font-bold text-xl tracking-wide">PokéWiki</span>
        </NavLink>

        {/* Navigation links */}
        <ul className="flex gap-6 text-sm md:text-base">
          <li><NavLink to="/" end className={linkStyle}>Home</NavLink></li>
          <li><NavLink to="/pokemon" className={linkStyle}>Pokémon</NavLink></li>
          <li><NavLink to="/types" className={linkStyle}>Types</NavLink></li>
          <li><NavLink to="/abilities" className={linkStyle}>Abilities</NavLink></li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
