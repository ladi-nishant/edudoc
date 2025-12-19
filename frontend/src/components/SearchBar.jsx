export default function SearchBar({ search, setSearch, clearAll }) {
  return (
    <div className="bg-white border rounded px-4 py-3 flex gap-3 mb-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search documents..."
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
