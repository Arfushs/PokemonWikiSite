import { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemonDetail, fetchTypes, fetchTypeDetail, getIdFromUrl } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

const PAGE_SIZE = 20;

function PokemonListPage() {
  const [pokemon, setPokemon] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [typeNames, setTypeNames] = useState([]); // all names for the selected type
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch all 1025 pokemon names once
  useEffect(() => {
    async function loadAllNames() {
      try {
        const data = await fetchPokemonList(1025, 0);
        setAllNames(data.results);
      } catch (err) {
        console.log("Failed to load all names");
      }
    }
    loadAllNames();
  }, []);

  // When type filter changes, fetch all pokemon of that type
  useEffect(() => {
    setOffset(0);

    if (selectedType === "all") {
      setTypeNames([]);
      return;
    }

    async function loadTypeNames() {
      try {
        const data = await fetchTypeDetail(selectedType);
        const names = data.pokemon
          .map((entry) => ({
            name: entry.pokemon.name,
            url: entry.pokemon.url,
          }))
          .filter((p) => {
            const id = Number(getIdFromUrl(p.url));
            return id <= 1025;
          });
        setTypeNames(names);
      } catch (err) {
        console.log("Failed to load type pokemon");
      }
    }

    loadTypeNames();
  }, [selectedType]);

  // Reset to page 1 when sort changes
  useEffect(() => {
    setOffset(0);
  }, [sortBy]);

  // Main loading effect
  useEffect(() => {
    if (allNames.length === 0) return;
    if (selectedType !== "all" && typeNames.length === 0) return;

    async function loadPokemon() {
      setLoading(true);
      setError(null);
      try {
        // Pick the base list depending on active filter
        const baseList = selectedType !== "all" ? typeNames : allNames;

        let pageNames = [];

        if (search.length > 0) {
          // Search within the base list (respects type filter too)
          pageNames = baseList
            .filter((p) => p.name.includes(search.toLowerCase()))
            .slice(0, 20);
          setTotalCount(pageNames.length);

        } else if (sortBy === "id") {
          if (selectedType !== "all") {
            // Type filter active: paginate through typeNames
            setTotalCount(typeNames.length);
            pageNames = typeNames.slice(offset, offset + PAGE_SIZE);
          } else {
            // Default: use API pagination
            const data = await fetchPokemonList(PAGE_SIZE, offset);
            setTotalCount(data.count);
            pageNames = data.results;
          }

        } else {
          // Name sort: sort base list, then paginate
          const sorted = [...baseList].sort((a, b) =>
            sortBy === "name-asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          );
          setTotalCount(sorted.length);
          pageNames = sorted.slice(offset, offset + PAGE_SIZE);
        }

        const details = await Promise.all(
          pageNames.map((p) => fetchPokemonDetail(getIdFromUrl(p.url)))
        );

        const formatted = details.map((p) => ({
          id: p.id,
          name: p.name,
          types: p.types.map((t) => t.type.name),
        }));

        setPokemon(formatted);
      } catch (err) {
        setError("Failed to load Pokemon. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (search.length > 0) {
      const timer = setTimeout(loadPokemon, 200);
      return () => clearTimeout(timer);
    } else {
      loadPokemon();
    }
  }, [offset, sortBy, search, allNames, typeNames, selectedType]);

  // Fetch types for the dropdown
  useEffect(() => {
    async function loadTypes() {
      try {
        const data = await fetchTypes();
        setTypes(data.results);
      } catch (err) {
        console.log("Failed to load types");
      }
    }
    loadTypes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Pokémon</h1>

      {/* Search, filter and sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all Pokemon by name..."
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t.name} value={t.name} className="capitalize">
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="id">Sort by ID</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
        </select>
      </div>

      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {loading ? (
        <LoadingSpinner />
      ) : pokemon.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No Pokemon found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemon.map((p) => (
            <PokemonCard key={p.id} id={p.id} name={p.name} types={p.types} />
          ))}
        </div>
      )}

      {/* Pagination — hide when searching */}
      {!loading && search.length === 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setOffset((prev) => Math.max(prev - PAGE_SIZE, 0))}
            disabled={offset === 0}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-40 hover:bg-slate-700"
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm">
            {offset + 1} – {Math.min(offset + PAGE_SIZE, totalCount)} of {totalCount}
          </span>
          <button
            onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
            disabled={offset + PAGE_SIZE >= totalCount}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-40 hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonListPage;
