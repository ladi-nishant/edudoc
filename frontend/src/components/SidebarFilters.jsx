export default function SidebarFilters({ type, setType, clearAll }) {
  const types = ["policy", "regulation", "scheme", "project"];

  return (
    <aside className="w-64 bg-white border-r p-5">
      <p className="font-semibold text-sm mb-3 text-gray-700">
        Document Type
      </p>

      {types.map((t) => (
        <button
          key={t}
          onClick={() => setType(t)}
          className={`block w-full text-left px-3 py-2 rounded mb-1 text-sm capitalize ${
            type === t
              ? "bg-[#EEF2FF] text-[#1E40AF]"
              : "hover:bg-gray-100"
          }`}
        >
          {t}
        </button>
      ))}

      <button
        onClick={clearAll}
        className="mt-4 text-xs text-gray-500 hover:text-[#1E40AF]"
      >
        Clear filters
      </button>
    </aside>
  );
}
