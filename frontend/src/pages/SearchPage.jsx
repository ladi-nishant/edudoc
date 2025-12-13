import React, { useState, useEffect } from "react";
import API from "../api";
import DocumentCard from "../components/DocumentCard";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState([]);
  const [filters, setFilters] = useState({ type: "" });
  const [loading, setLoading] = useState(false);

  const loadDocs = async (query = q) => {
    setLoading(true);
    try {
      const res = await API.get("/docs", {
        params: { q: query.trim(), type: filters.type }
      });
      setDocs(res.data?.success ? res.data.docs : []);
    } catch (err) {
      console.error("Document fetch error:", err);
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => loadDocs(), 400);
    return () => clearTimeout(timer);
  }, [q, filters.type]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-slate-900">EduDoc</h1>
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              window.location.href = "/";
            }}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-slate-200">
          <div className="p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-4">
              Filters
            </p>
            <p className="text-xs font-medium text-slate-400 uppercase mb-2">
              Document Type
            </p>
            {[
              { label: "Policy", value: "policy" },
              { label: "Regulation", value: "regulation" },
              { label: "Scheme", value: "scheme" },
              { label: "Project", value: "project" }
            ].map(({ label, value }) => {
              const active = filters.type === value;
              return (
                <button
                  key={value}
                  onClick={() => setFilters({ type: active ? "" : value })}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm mb-1 ${
                    active
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {label}
                </button>
              );
            })}
            {filters.type && (
              <button
                onClick={() => setFilters({ type: "" })}
                className="mt-3 text-xs text-blue-600 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1 px-8 py-6 space-y-5">
          <div className="bg-white border border-slate-200 rounded-md px-3 py-2 flex items-center gap-3">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadDocs()}
              placeholder="Search documents..."
              className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              onClick={() => loadDocs()}
              disabled={loading}
              className="text-sm px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Search
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-md">
            {loading ? (
              <div className="p-10 text-center text-sm text-slate-500">
                Loading documents…
              </div>
            ) : docs.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No documents found
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {docs.map((doc) => (
                  <div key={doc._id} className="p-5">
                    <DocumentCard doc={doc} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
