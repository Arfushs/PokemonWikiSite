import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTypeDetail, getIdFromUrl } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";

function TypeDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTypeDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTypeDetail(name);

        // Each entry has a "pokemon" object inside — we extract id, name
        const formatted = data.pokemon
          .map((entry) => {
            const id = getIdFromUrl(entry.pokemon.url);
            return { id: Number(id), name: entry.pokemon.name };
          })
          // Only keep pokemon with a valid numeric id (avoids special forms)
          .filter((p) => p.id <= 1025);

        setPokemonList(formatted);
      } catch (err) {
        setError("Failed to load type details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadTypeDetail();
  }, [name]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-red-600 hover:underline flex items-center gap-1"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
        {name} Type
      </h1>
      <p className="text-gray-500 mb-6">{pokemonList.length} Pokémon</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonList.map((p) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} types={[name]} />
        ))}
      </div>
    </div>
  );
}

export default TypeDetailPage;
