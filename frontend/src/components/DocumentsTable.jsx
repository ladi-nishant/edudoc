import DocumentRow from "./DocumentRow";

export default function DocumentsTable({ loading, docs }) {
  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">
        Loading documents…
      </p>
    );
  }

  if (docs.length === 0) {
    return (
      <p className="p-6 text-center text-gray-500">
        No documents found
      </p>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead className="bg-[#F1F5FF] text-xs uppercase text-gray-500">
        <tr>
          <th className="px-4 py-3 w-12 text-center">File</th>
          <th className="px-4 py-3 text-left">Document</th>
          <th className="px-4 py-3 text-left w-32">Type</th>
        </tr>
      </thead>

      <tbody>
        {docs.map((doc) => (
          <DocumentRow key={doc._id} doc={doc} />
        ))}
      </tbody>
    </table>
  );
}
