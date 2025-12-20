import { useEffect, useMemo, useState } from "react";
import API from "../api";

import Header from "../components/Header";
import SidebarFilters from "../components/SidebarFilters";
import SearchBar from "../components/SearchBar";
import DocumentsTable from "../components/DocumentsTable";
import Pagination from "../components/Pagination";

export default function SearchPage() {
  const [allDocs, setAllDocs] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const res = await API.get("/api/docs");
        setAllDocs(res.data?.success ? res.data.docs : []);
      } catch {
        setAllDocs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const filteredDocs = useMemo(() => {
    const q = search.toLowerCase().trim();

    return allDocs.filter((doc) => {
      const matchesSearch =
        !q ||
        doc.title?.toLowerCase().includes(q) ||
        doc.ref?.toLowerCase().includes(q) ||
        doc.source?.toLowerCase().includes(q) ||
        doc.description?.toLowerCase().includes(q) ||
        doc.type?.toLowerCase().includes(q);

      const matchesType =
        !type || doc.type?.toLowerCase() === type.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [allDocs, search, type]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type]);

  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);

  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDocs, currentPage]);

  const clearAll = () => {
    setSearch("");
    setType("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      <Header />

      <div className="flex">
        <SidebarFilters
          type={type}
          setType={setType}
          clearAll={clearAll}
        />

        <main className="flex-1 p-6">
          <SearchBar
            search={search}
            setSearch={setSearch}
            clearAll={clearAll}
          />

          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <DocumentsTable
              loading={loading}
              docs={paginatedDocs}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
