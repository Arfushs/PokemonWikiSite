# PokéWiki

A Pokémon encyclopedia built with React and Tailwind CSS, powered by [PokéAPI](https://pokeapi.co).

🌐 **Live Site:** [pokemon-wiki-site.vercel.app](https://pokemon-wiki-site.vercel.app)

---

## Features

- **Browse Pokémon** — View all 1025 Pokémon in a responsive grid
- **Search** — Live search across all Pokémon by name with debounce
- **Filter** — Filter Pokémon by type
- **Sort** — Sort by ID, Name A→Z, or Name Z→A
- **Pokémon Detail** — Stats with progress bars, types, abilities, height, weight
- **Types** — All 18 types with strengths and Pokémon listings
- **Abilities** — Browse and search all abilities, categorized by role
- **Ability Detail** — Full effect description and Pokémon that have the ability
- **Featured Pokémon** — Random featured Pokémon on the homepage
- **404 Page** — Custom not found page
- **Responsive** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev) + [Vite](https://vitejs.dev) | Frontend framework |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Tailwind CSS v3](https://tailwindcss.com) | Styling |
| [PokéAPI](https://pokeapi.co) | Data source |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PokemonCard.jsx
│   ├── TypeBadge.jsx
│   ├── SearchBar.jsx
│   ├── LoadingSpinner.jsx
│   └── PokeballIcon.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── PokemonListPage.jsx
│   ├── PokemonDetailPage.jsx
│   ├── TypesPage.jsx
│   ├── TypeDetailPage.jsx
│   ├── AbilitiesPage.jsx
│   ├── AbilityDetailPage.jsx
│   └── NotFoundPage.jsx
├── services/
│   └── api.js
└── utils/
    └── abilityCategory.js
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pokemon-wiki.git
cd pokemon-wiki

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Course

**SE 3355 — Web Programming**  
Midterm Project — Spring 2026
