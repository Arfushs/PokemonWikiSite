import { useNavigate } from "react-router-dom";
import TypeBadge from "./TypeBadge";
import { getPokemonImage } from "../services/api";

function PokemonCard({ id, name, types }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pokemon/${id}`)}
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-200"
    >
      <span className="text-gray-400 text-xs font-mono">#{String(id).padStart(3, "0")}</span>

      <img
        src={getPokemonImage(id)}
        alt={name}
        className="w-24 h-24 object-contain"
      />

      <h3 className="font-bold text-gray-800 capitalize">{name}</h3>

      {/* Show a badge for each type */}
      <div className="flex gap-1 flex-wrap justify-center">
        {types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
