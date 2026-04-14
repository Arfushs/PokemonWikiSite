// Categorizes abilities by keyword matching on their name
// Returns category info: label, emoji, tailwind classes

const categories = {
  elemental: {
    label: "Elemental",
    emoji: "🔥",
    description: "Abilities tied to a specific element or type",
    badge: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    icon_bg: "bg-orange-500",
    keywords: [
      "blaze", "torrent", "overgrow", "swarm", "flash-fire", "water-absorb",
      "volt-absorb", "storm-drain", "sap-sipper", "lightning-rod", "motor-drive",
      "dry-skin", "thick-fat", "heatproof", "fluffy", "primordial-sea",
      "desolate-land", "delta-stream",
    ],
  },
  weather: {
    label: "Weather",
    emoji: "⛈️",
    description: "Abilities that control or benefit from weather",
    badge: "bg-sky-100 text-sky-700 hover:bg-sky-200",
    icon_bg: "bg-sky-500",
    keywords: [
      "drizzle", "drought", "snow-warning", "sand-stream", "swift-swim",
      "chlorophyll", "sand-rush", "slush-rush", "forecast", "overcoat",
      "rain-dish", "ice-body", "solar-power", "leaf-guard", "hydration",
      "sand-force", "sand-veil", "snow-cloak",
    ],
  },
  combat: {
    label: "Combat",
    emoji: "⚔️",
    description: "Abilities that boost offensive or defensive power",
    badge: "bg-red-100 text-red-700 hover:bg-red-200",
    icon_bg: "bg-red-500",
    keywords: [
      "huge-power", "pure-power", "guts", "hustle", "intimidate", "iron-fist",
      "reckless", "sheer-force", "tough-claws", "strong-jaw", "no-guard",
      "mold-breaker", "scrappy", "technician", "rivalry", "anger-point",
      "defiant", "moxie", "beast-boost", "rock-head", "battle",
    ],
  },
  status: {
    label: "Status",
    emoji: "🌀",
    description: "Abilities that inflict or interact with status conditions",
    badge: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    icon_bg: "bg-purple-500",
    keywords: [
      "poison", "static", "flame-body", "effect-spore", "stench",
      "cute-charm", "synchronize", "shed-skin", "natural-cure", "insomnia",
      "limber", "immunity", "water-veil", "magma-armor", "oblivious",
      "vital-spirit", "early-bird", "sweet-veil", "comatose",
    ],
  },
  psychic: {
    label: "Psychic",
    emoji: "🔮",
    description: "Abilities related to mind, aura, or special powers",
    badge: "bg-pink-100 text-pink-700 hover:bg-pink-200",
    icon_bg: "bg-pink-500",
    keywords: [
      "trace", "wonder-guard", "magic", "illusion", "telepathy", "anticipation",
      "forewarn", "frisk", "pressure", "unnerve", "dark-aura", "fairy-aura",
      "aura-break", "prankster", "moody", "competitive", "contrary",
      "rattled", "trace", "download",
    ],
  },
  support: {
    label: "Support",
    emoji: "✨",
    description: "Utility and miscellaneous abilities",
    badge: "bg-teal-100 text-teal-700 hover:bg-teal-200",
    icon_bg: "bg-teal-500",
    keywords: [], // fallback — everything else
  },
};

// Returns the matching category object for a given ability name
export function getAbilityCategory(abilityName) {
  const name = abilityName.toLowerCase();

  for (const [key, cat] of Object.entries(categories)) {
    if (key === "support") continue; // skip fallback in loop
    if (cat.keywords.some((kw) => name.includes(kw))) {
      return { key, ...cat };
    }
  }

  return { key: "support", ...categories.support };
}
