import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetail, fetchPokemonSpecies, fetchEvolutionChain, getPokemonImage, getIdFromUrl } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import TypeBadge from "../components/TypeBadge";

// Returns a human-readable evolution trigger string
function getTriggerLabel(details) {
  if (!details || details.length === 0) return null;
  const d = details[0];

  if (d.min_level) return `Level ${d.min_level}`;
  if (d.item) return `Use ${d.item.name.replace(/-/g, " ")}`;
  if (d.trigger?.name === "trade") return "Trade";
  if (d.trigger?.name === "use-item" && d.item) return `Use ${d.item.name.replace(/-/g, " ")}`;
  if (d.min_happiness) return "Friendship";
  if (d.min_beauty) return "Beauty";
  if (d.known_move) return `Learn ${d.known_move.name.replace(/-/g, " ")}`;
  if (d.location) return `At ${d.location.name.replace(/-/g, " ")}`;
  if (d.time_of_day) return `${d.time_of_day} time`;
  return "Special";
}

// A single Pokemon node in the evolution tree
function EvoNode({ node, currentId }) {
  const navigate = useNavigate();
  const id = Number(getIdFromUrl(node.species.url));
  const isCurrentPokemon = id === currentId;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Pokemon card */}
      <div
        onClick={() => navigate(`/pokemon/${id}`)}
        className={`flex flex-col items-center gap-2 cursor-pointer group ${
          isCurrentPokemon ? "opacity-100" : "opacity-80 hover:opacity-100"
        }`}
      >
        <div className={`rounded-2xl p-4 transition-all duration-200 group-hover:scale-105 ${
          isCurrentPokemon
            ? "bg-teal-100 ring-2 ring-teal-400"
            : "bg-white shadow-md group-hover:shadow-lg"
        }`}>
          <img
            src={getPokemonImage(id)}
            alt={node.species.name}
            className="w-24 h-24 object-contain"
          />
        </div>
        <span className={`font-semibold capitalize text-sm ${
          isCurrentPokemon ? "text-teal-700" : "text-gray-700"
        }`}>
          {node.species.name.replace(/-/g, " ")}
        </span>
        <span className="text-gray-400 text-xs font-mono">
          #{String(id).padStart(3, "0")}
        </span>
      </div>

      {/* Children evolutions */}
      {node.evolves_to.length > 0 && (
        <div className={`flex gap-8 ${node.evolves_to.length > 3 ? "flex-wrap justify-center" : ""}`}>
          {node.evolves_to.map((child, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              {/* Arrow + trigger */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-6 bg-gray-300" />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                  {getTriggerLabel(child.evolution_details) || "→"}
                </span>
                <div className="w-px h-6 bg-gray-300" />
                <svg className="text-gray-400 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </div>

              {/* Recursive next node */}
              <EvoNode node={child} currentId={currentId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EvolutionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chain, setChain] = useState(null);
  const [basePokemon, setBasePokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvolution() {
      setLoading(true);
      setError(null);
      try {
        // Step 1: get pokemon to find its species
        const pokemon = await fetchPokemonDetail(id);
        setBasePokemon(pokemon);

        // Step 2: get species to find evolution chain URL
        const species = await fetchPokemonSpecies(id);

        // Step 3: fetch the evolution chain
        const evoData = await fetchEvolutionChain(species.evolution_chain.url);
        setChain(evoData.chain);
      } catch (err) {
        setError("Failed to load evolution chain.");
      } finally {
        setLoading(false);
      }
    }

    loadEvolution();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!chain) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(`/pokemon/${id}`)}
        className="mb-6 text-teal-600 hover:underline flex items-center gap-1"
      >
        ← Back to {basePokemon?.name}
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-1 capitalize">
            {basePokemon?.name.replace(/-/g, " ")} — Evolution Chain
          </h1>
          <p className="text-gray-400 text-sm">
            Click any Pokémon to view its details
          </p>
        </div>

        {/* Evolution tree */}
        <div className="overflow-x-auto">
          <div className="flex justify-center min-w-max mx-auto pb-4">
            <EvoNode chain={chain} node={chain} currentId={Number(id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvolutionPage;
