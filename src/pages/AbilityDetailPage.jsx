import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAbilityDetail } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAbilityCategory } from "../utils/abilityCategory";

function AbilityDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [ability, setAbility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAbility() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAbilityDetail(name);
        setAbility(data);
      } catch (err) {
        setError("Failed to load ability details.");
      } finally {
        setLoading(false);
      }
    }

    loadAbility();
  }, [name]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!ability) return null;

  const cat = getAbilityCategory(ability.name);

  // Get English description
  const description = ability.flavor_text_entries.find(
    (e) => e.language.name === "en"
  );

  // Get English long effect description
  const effect = ability.effect_entries.find(
    (e) => e.language.name === "en"
  );

  // List of pokemon that have this ability
  const pokemonList = ability.pokemon.slice(0, 20);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-teal-600 hover:underline flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Category icon + ability name */}
        <div className="flex items-center gap-5 mb-6">
          <div className={`${cat.icon_bg} text-white rounded-2xl p-4 text-4xl`}>
            {cat.emoji}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 capitalize">
              {ability.name.replace(/-/g, " ")}
            </h1>
            <span className={`${cat.badge} px-3 py-1 rounded-full text-xs font-semibold mt-1 inline-block`}>
              {cat.label}
            </span>
          </div>
        </div>

        {/* Short description */}
        {description && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h2>
            <p className="text-gray-700">{description.flavor_text}</p>
          </div>
        )}

        {/* Long effect */}
        {effect && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Effect</h2>
            <p className="text-gray-700 leading-relaxed">{effect.effect}</p>
          </div>
        )}

        {/* Pokemon with this ability */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Pokémon with this ability
          </h2>
          <div className="flex flex-wrap gap-2">
            {pokemonList.map((entry) => (
              <span
                key={entry.pokemon.name}
                onClick={() => navigate(`/pokemon/${entry.pokemon.name}`)}
                className="bg-slate-100 hover:bg-teal-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize cursor-pointer transition-colors"
              >
                {entry.pokemon.name.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbilityDetailPage;
