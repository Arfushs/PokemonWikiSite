const BASE = "https://pokeapi.co/api/v2";

async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API hatası: ${response.status}`);
  }
  return response.json();
}

// ─── Pokemon ────────────────────────────────────────────

// Sayfalı pokemon listesi (limit + offset ile)
export async function fetchPokemonList(limit = 20, offset = 0) {
  return apiFetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
}

// ID veya isimle tek pokemon detayı
export async function fetchPokemonDetail(idOrName) {
  return apiFetch(`${BASE}/pokemon/${idOrName}`);
}

// Pokemon'un tür (species) bilgisi — evrim zinciri için
export async function fetchPokemonSpecies(idOrName) {
  return apiFetch(`${BASE}/pokemon-species/${idOrName}`);
}

// Evrim zinciri
export async function fetchEvolutionChain(url) {
  return apiFetch(url);
}

// ─── Tipler ─────────────────────────────────────────────

// Tüm tipler
export async function fetchTypes() {
  return apiFetch(`${BASE}/type`);
}

// Belirli bir tipin detayı (o tipe ait pokemonlar dahil)
export async function fetchTypeDetail(name) {
  return apiFetch(`${BASE}/type/${name}`);
}

// ─── Yetenekler ──────────────────────────────────────────

// Sayfalı yetenek listesi
export async function fetchAbilityList(limit = 20, offset = 0) {
  return apiFetch(`${BASE}/ability?limit=${limit}&offset=${offset}`);
}

// Belirli bir yeteneğin detayı
export async function fetchAbilityDetail(name) {
  return apiFetch(`${BASE}/ability/${name}`);
}

// ─── Yardımcı fonksiyonlar ───────────────────────────────

// Pokemon ID'sinden resim URL'si döner (resmi artwork)
export function getPokemonImage(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Pokemon URL'sinden ID'yi çıkarır
export function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}
