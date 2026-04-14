import { useNavigate } from "react-router-dom";
import PokeballIcon from "../components/PokeballIcon";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-96 px-4 py-16 text-center">
      <PokeballIcon size={80} className="mb-6 opacity-30" />
      <h1 className="text-6xl font-bold text-slate-800 mb-2">404</h1>
      <p className="text-xl text-gray-500 mb-2">Page not found</p>
      <p className="text-gray-400 mb-8">
        Looks like this Pokémon fled into tall grass...
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFoundPage;
