import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAbilityList, fetchAbilityDetail, getIdFromUrl } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { getAbilityCategory } from "../utils/abilityCategory";

const PAGE_SIZE = 20;

function AbilitiesPage() {
  const navigate = useNavigate();
  const [abilities, setAbilities] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch all ability names once for global search
  useEffect(() => {
    async function loadAllNames() {
      try {
        const data = await fetchAbilityList(400, 0);
        setAllNames(data.results);
      } catch (err) {
        console.log("Failed to load ability names");
      }
    }
    loadAllNames();
  }, []);

  // Main loading effect — handles both paginated and search modes
  useEffect(() => {
    if (allNames.length === 0) return;

    async function loadAbilities() {
      setLoading(true);
      setError(null);
      try {
        let pageNames = [];

        if (search.length > 0) {
          // Search mode: filter all names
          pageNames = allNames
            .filter((a) => a.name.includes(search.toLowerCase()))
            .slice(0, 20);
          setTotalCount(pageNames.length);
        } else {
          // Paginated mode
          const data = await fetchAbilityList(PAGE_SIZE, offset);
          setTotalCount(data.count);
          pageNames = data.results;
        }

        const details = await Promise.all(
          pageNames.map((a) => fetchAbilityDetail(getIdFromUrl(a.url)))
        );

        const formatted = details.map((a) => {
          const englishEntry = a.flavor_text_entries.find(
            (e) => e.language.name === "en"
          );
          return {
            id: a.id,
            name: a.name,
            description: englishEntry ? englishEntry.flavor_text : "No description available.",
          };
        });

        setAbilities(formatted);
      } catch (err) {
        setError("Failed to load abilities. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    // Debounce for search, immediate for pagination
    if (search.length > 0) {
      const timer = setTimeout(loadAbilities, 200);
      return () => clearTimeout(timer);
    } else {
      loadAbilities();
    }
  }, [offset, search, allNames]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Abilities</h1>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all abilities..."
        />
      </div>

      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {loading ? (
        <LoadingSpinner />
      ) : abilities.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No abilities found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {abilities.map((ability) => {
            const cat = getAbilityCategory(ability.name);
            return (
              <div
                key={ability.id}
                onClick={() => navigate(`/abilities/${ability.name}`)}
                className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 border-l-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${cat.icon_bg} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </span>
                </div>
                <h2 className="font-bold text-gray-800 capitalize mb-1">
                  {ability.name.replace(/-/g, " ")}
                </h2>
                <p className="text-gray-500 text-sm">{ability.description}</p>
              </div>
            );
          })}
        </div>
      )}

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

export default AbilitiesPage;
