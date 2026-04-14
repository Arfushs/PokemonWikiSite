import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokeballIcon from "../components/PokeballIcon";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemonDetail } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

// Simple lightning bolt icon for Abilities
function AbilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

// Simple crystal/gem icon for Types
function TypeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="56" height="56">
      <path d="M12 2l4 6H8l4-6zm-4 6l-6 8h20l-6-8H8zm4 14l6-6H6l6 6z" />
    </svg>
  );
}

// A fixed list of well-known Pokemon to feature on the homepage
const FEATURED_IDS = [6, 25, 150, 1, 4, 7, 133, 39, 94];

function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  // Pick 3 random Pokemon from the featured list on each visit
  useEffect(() => {
    async function loadFeatured() {
      setLoadingFeatured(true);
      try {
        const shuffled = [...FEATURED_IDS].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);

        const details = await Promise.all(
          selected.map((id) => fetchPokemonDetail(id))
        );

        const formatted = details.map((p) => ({
          id: p.id,
          name: p.name,
          types: p.types.map((t) => t.type.name),
        }));

        setFeatured(formatted);
      } catch (err) {
        console.log("Failed to load featured Pokemon");
      } finally {
        setLoadingFeatured(false);
      }
    }

    loadFeatured();
  }, []);

  const sections = [
    {
      title: "Pokémon",
      description: "Browse all 1025 Pokémon. Search by name, filter by type, and sort alphabetically.",
      path: "/pokemon",
      accent: "from-teal-500 to-teal-700",
      iconColor: "text-teal-300",
      icon: <PokeballIcon size={56} />,
    },
    {
      title: "Types",
      description: "Explore all 18 Pokémon types. Discover their strengths and which Pokémon belong to each.",
      path: "/types",
      accent: "from-violet-500 to-violet-700",
      iconColor: "text-violet-300",
      icon: <TypeIcon />,
    },
    {
      title: "Abilities",
      description: "Discover all Pokémon abilities. Learn what each ability does in battle.",
      path: "/abilities",
      accent: "from-amber-500 to-amber-700",
      iconColor: "text-amber-300",
      icon: <AbilityIcon />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Hero section */}
      <div className="text-center mb-16">
        <PokeballIcon size={96} className="mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">PokéWiki</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Your Pokémon encyclopedia. Browse Pokémon, explore types, and discover abilities using live data from PokéAPI.
        </p>
      </div>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {sections.map((section) => (
          <div
            key={section.title}
            onClick={() => navigate(section.path)}
            className="bg-slate-800 rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-xl flex flex-col items-center text-center gap-6 min-h-72"
          >
            <div className={`bg-gradient-to-br ${section.accent} p-5 rounded-2xl ${section.iconColor}`}>
              {section.icon}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{section.description}</p>
            </div>
            <span className="mt-auto text-slate-500 text-sm">Explore →</span>
          </div>
        ))}
      </div>

      {/* Featured Pokemon section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Pokémon</h2>
          <button
            onClick={() => navigate("/pokemon")}
            className="text-teal-600 hover:underline text-sm"
          >
            View all →
          </button>
        </div>

        {loadingFeatured ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PokemonCard key={p.id} id={p.id} name={p.name} types={p.types} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default HomePage;
