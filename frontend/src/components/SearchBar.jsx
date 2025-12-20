export default function SearchBar({ search, setSearch, clearAll }) {
  return (
    <div className="bg-white border rounded-lg px-4 py-3 flex gap-3 mb-4 shadow-sm">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="flex-1 text-sm outline-none"
      />

      <button
        onClick={clearAll}
        className="px-4 py-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}
