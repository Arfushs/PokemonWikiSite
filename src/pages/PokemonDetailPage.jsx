import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetail, getPokemonImage } from "../services/api";
import TypeBadge from "../components/TypeBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAbilityCategory } from "../utils/abilityCategory";

function PokemonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonDetail(id);
        setPokemon(data);
      } catch (err) {
        setError("Failed to load Pokemon details.");
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!pokemon) return null;

  // Get the English flavor text (description)
  const types = pokemon.types.map((t) => t.type.name);
  const stats = pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-red-600 hover:underline flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Pokemon number and name */}
        <div className="text-center mb-6">
          <span className="text-gray-400 text-sm font-mono">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <h1 className="text-4xl font-bold capitalize text-gray-800">
            {pokemon.name}
          </h1>
        </div>

        {/* Image and basic info */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <img
            src={getPokemonImage(pokemon.id)}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />

          <div className="flex flex-col gap-4 flex-1">
            {/* Types */}
            <div>
              <p className="text-gray-500 text-sm mb-1">Type</p>
              <div className="flex gap-2">
                {types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </div>

            {/* Height and Weight */}
            <div className="flex gap-8">
              <div>
                <p className="text-gray-500 text-sm">Height</p>
                <p className="font-semibold">{pokemon.height / 10} m</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Weight</p>
                <p className="font-semibold">{pokemon.weight / 10} kg</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Base XP</p>
                <p className="font-semibold">{pokemon.base_experience}</p>
              </div>
            </div>

            {/* Abilities — colored by category, clickable */}
            <div>
              <p className="text-gray-500 text-sm mb-1">Abilities</p>
              <div className="flex gap-2 flex-wrap">
                {pokemon.abilities.map((a) => {
                  const cat = getAbilityCategory(a.ability.name);
                  return (
                    <span
                      key={a.ability.name}
                      onClick={() => navigate(`/abilities/${a.ability.name}`)}
                      className={`${cat.badge} px-3 py-1 rounded-full text-sm capitalize cursor-pointer transition-colors flex items-center gap-1`}
                    >
                      <span>{cat.emoji}</span>
                      {a.ability.name.replace(/-/g, " ")}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Evolution chain button */}
        <div className="mt-2 mb-6">
          <button
            onClick={() => navigate(`/pokemon/${pokemon.id}/evolution`)}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            🌿 View Evolution Chain
          </button>
        </div>

        {/* Base stats */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Base Stats</h2>
          <div className="flex flex-col gap-3">
            {stats.map((stat) => (
              <div key={stat.name} className="flex items-center gap-4">
                {/* Stat name */}
                <span className="text-gray-500 text-sm capitalize w-28 shrink-0">
                  {stat.name.replace("-", " ")}
                </span>
                {/* Stat value */}
                <span className="font-bold text-gray-800 w-8">{stat.value}</span>
                {/* Progress bar — max stat is 255 */}
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
