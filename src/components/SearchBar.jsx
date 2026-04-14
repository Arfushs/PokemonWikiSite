// onKeyDown prop allows parent to handle Enter key press
function SearchBar({ value, onChange, onKeyDown, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder || "Search..."}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  );
}

export default SearchBar;
