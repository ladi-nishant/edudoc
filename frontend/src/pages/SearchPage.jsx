import React, { useEffect, useMemo, useState } from "react";
import API from "../api";
import DocumentRow from "../components/DocumentRow";

export default function SearchPage() {
  const [allDocs, setAllDocs] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 FETCH ALL DOCS ONCE
  useEffect(() => {
    const fetchAllDocs = async () => {
      setLoading(true);
      try {
        const res = await API.get("/docs");
        if (res.data?.success) {
          setAllDocs(res.data.docs);
        } else {
          setAllDocs([]);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setAllDocs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDocs();
  }, []);

  // 🔍 FRONTEND SEARCH + FILTER LOGIC
  const filteredDocs = useMemo(() => {
    return allDocs.filter((doc) => {
      const q = search.toLowerCase();

      const matchesSearch =
        !q ||
        doc.title?.toLowerCase().includes(q) ||
        doc.ref?.toLowerCase().includes(q) ||
        doc.source?.toLowerCase().includes(q) ||
        doc.description?.toLowerCase().includes(q) ||
        doc.type?.toLowerCase().includes(q);

      const matchesType = !type || doc.type === type;

      return matchesSearch && matchesType;
    });
  }, [allDocs, search, type]);

  const clearAll = () => {
    setSearch("");
    setType("");
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="px-6 py-3 flex justify-between items-center">
          <span className="font-semibold text-[#005DAC] text-lg">
            EduDoc
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("auth");
              window.location.href = "/";
            }}
            className="text-sm text-[#005DAC]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r p-5">
          <p className="font-semibold mb-3">Document Type</p>

          {["policy", "regulation", "scheme", "project"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                type === t
                  ? "bg-[#E8F1FA] text-[#005DAC]"
                  : "hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}

          <button
            onClick={clearAll}
            className="mt-4 text-xs text-gray-500 hover:text-[#005DAC]"
          >
            Clear filters
          </button>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">
          {/* SEARCH */}
          <div className="bg-white border rounded px-4 py-3 flex gap-3 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, ref, source, description…"
              className="flex-1 text-sm outline-none"
            />

            <button
              onClick={clearAll}
              className="px-4 py-1.5 text-sm bg-gray-100 rounded"
            >
              Reset
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white border rounded overflow-x-auto">
            {loading ? (
              <p className="p-6 text-center text-gray-500">
                Loading documents…
              </p>
            ) : filteredDocs.length === 0 ? (
              <p className="p-6 text-center text-gray-500">
                No documents found
              </p>
            ) : (
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-2">File</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Ref</th>
                    <th className="px-4 py-2 text-left">Source</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((doc) => (
                    <DocumentRow key={doc._id} doc={doc} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
