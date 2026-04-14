import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTypes } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const typeInfo = {
  normal:   { accent: "border-gray-400",   text: "text-gray-400",   emoji: "⭐", desc: "Balanced and versatile" },
  fire:     { accent: "border-orange-500", text: "text-orange-400", emoji: "🔥", desc: "Strong against Grass, Bug, Ice" },
  water:    { accent: "border-blue-500",   text: "text-blue-400",   emoji: "💧", desc: "Strong against Fire, Ground, Rock" },
  electric: { accent: "border-yellow-400", text: "text-yellow-400", emoji: "⚡", desc: "Strong against Water, Flying" },
  grass:    { accent: "border-green-500",  text: "text-green-400",  emoji: "🌿", desc: "Strong against Water, Ground, Rock" },
  ice:      { accent: "border-cyan-400",   text: "text-cyan-400",   emoji: "❄️", desc: "Strong against Grass, Ground, Dragon" },
  fighting: { accent: "border-red-500",    text: "text-red-400",    emoji: "🥊", desc: "Strong against Normal, Rock, Dark" },
  poison:   { accent: "border-purple-500", text: "text-purple-400", emoji: "☠️", desc: "Strong against Grass, Fairy" },
  ground:   { accent: "border-yellow-600", text: "text-yellow-600", emoji: "🌍", desc: "Strong against Fire, Electric, Rock" },
  flying:   { accent: "border-indigo-400", text: "text-indigo-400", emoji: "🦅", desc: "Strong against Grass, Fighting, Bug" },
  psychic:  { accent: "border-pink-500",   text: "text-pink-400",   emoji: "🔮", desc: "Strong against Fighting, Poison" },
  bug:      { accent: "border-lime-500",   text: "text-lime-400",   emoji: "🐛", desc: "Strong against Grass, Psychic, Dark" },
  rock:     { accent: "border-yellow-700", text: "text-yellow-700", emoji: "🪨", desc: "Strong against Fire, Ice, Flying, Bug" },
  ghost:    { accent: "border-purple-700", text: "text-purple-500", emoji: "👻", desc: "Strong against Psychic, Ghost" },
  dragon:   { accent: "border-indigo-600", text: "text-indigo-400", emoji: "🐉", desc: "Strong against Dragon" },
  dark:     { accent: "border-slate-500",  text: "text-slate-400",  emoji: "🌑", desc: "Strong against Psychic, Ghost" },
  steel:    { accent: "border-slate-400",  text: "text-slate-300",  emoji: "⚙️", desc: "Strong against Ice, Rock, Fairy" },
  fairy:    { accent: "border-pink-400",   text: "text-pink-300",   emoji: "🧚", desc: "Strong against Fighting, Dragon, Dark" },
};

function TypesPage() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTypes() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTypes();
        const filtered = data.results.filter(
          (t) => t.name !== "unknown" && t.name !== "shadow"
        );
        setTypes(filtered);
      } catch (err) {
        setError("Failed to load types. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadTypes();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pokémon Types</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {types.map((type) => {
          const info = typeInfo[type.name] || { accent: "border-gray-500", text: "text-gray-400", emoji: "❓", desc: "" };
          return (
            <div
              key={type.name}
              onClick={() => navigate(`/types/${type.name}`)}
              className={`bg-slate-800 border-l-4 ${info.accent} rounded-xl p-5 cursor-pointer hover:scale-105 hover:bg-slate-700 transition-all duration-200 shadow-md flex items-center gap-4`}
            >
              {/* Emoji */}
              <span className="text-4xl">{info.emoji}</span>

              {/* Type name and description */}
              <div>
                <h2 className={`font-bold capitalize text-lg ${info.text}`}>{type.name}</h2>
                <p className="text-slate-400 text-sm">{info.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TypesPage;
