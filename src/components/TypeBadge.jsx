// Shows a colored badge for a Pokemon type (e.g. "fire", "water")
function TypeBadge({ type }) {
  return (
    <span className={`type-${type} px-2 py-1 rounded-full text-xs font-semibold capitalize`}>
      {type}
    </span>
  );
}

export default TypeBadge;
