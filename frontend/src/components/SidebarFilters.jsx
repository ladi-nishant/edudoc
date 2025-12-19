export default function SidebarFilters({ type, setType, clearAll }) {
  const types = ["policy", "regulation", "scheme", "project"];
  return (
    <aside className="w-64 bg-white border-r p-5">
      <p className="font-semibold mb-3">Document Type</p>

      {types.map((t) => (
        <button
          key={t}
          onClick={() => setType(t)}
          className={`block w-full text-left px-3 py-2 rounded mb-1 text-sm ${
            type === t
              ? "bg-[#E8F1FA] text-[#005DAC]"
              : "hover:bg-gray-100"
          }`}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}

      <button
        onClick={clearAll}
        className="mt-4 text-xs text-gray-500 hover:text-[#005DAC]"
      >
        Clear filters
      </button>
    </aside>
  );
}
