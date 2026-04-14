import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import TypesPage from "./pages/TypesPage";
import TypeDetailPage from "./pages/TypeDetailPage";
import AbilitiesPage from "./pages/AbilitiesPage";
import AbilityDetailPage from "./pages/AbilityDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    // BrowserRouter enables page navigation without refreshing
    <BrowserRouter>
      {/* Navbar is shown on every page */}
      <Navbar />

      {/* Main content changes based on the URL */}
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon" element={<PokemonListPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/types/:name" element={<TypeDetailPage />} />
          <Route path="/abilities" element={<AbilitiesPage />} />
          <Route path="/abilities/:name" element={<AbilityDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer is shown on every page */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
