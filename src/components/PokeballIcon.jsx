// SVG pokeball — scales perfectly at any size
// Props: size (number, default 32), className (string)
function PokeballIcon({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top half - red */}
      <path d="M 5 50 A 45 45 0 0 1 95 50 Z" fill="#e63946" />

      {/* Bottom half - white */}
      <path d="M 5 50 A 45 45 0 0 0 95 50 Z" fill="#ffffff" />

      {/* Outer circle border */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a2e" strokeWidth="5" />

      {/* Center divider line */}
      <line x1="5" y1="50" x2="95" y2="50" stroke="#1a1a2e" strokeWidth="5" />

      {/* Center button - outer ring */}
      <circle cx="50" cy="50" r="14" fill="#1a1a2e" />

      {/* Center button - inner white */}
      <circle cx="50" cy="50" r="9" fill="#ffffff" />

      {/* Center button - shine */}
      <circle cx="46" cy="46" r="3" fill="#f0f0f0" opacity="0.6" />
    </svg>
  );
}

export default PokeballIcon;
