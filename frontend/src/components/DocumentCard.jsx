import React, { useState } from "react";

export default function DocumentCard({ doc }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white p-5 rounded-lg shadow mb-4 flex justify-between gap-6 border">
      <div className="flex-1">
        <h2 className="text-blue-700 font-semibold text-lg">{doc.title}</h2>
        <p className="text-gray-500 text-xs mt-1">
          Ref: {doc.ref} • Source: {doc.source}
          {doc.publishedAt && <> • Published: {new Date(doc.publishedAt).toLocaleDateString()}</>}
        </p>
        <p className="text-gray-700 mt-3 text-sm">{doc.snippet}</p>
        {doc.description && (
          <>
            <p className={`text-gray-800 mt-2 text-sm leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
              {doc.description}
            </p>
            {doc.description.length > 180 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 text-xs mt-1 hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </>
        )}
      </div>
      <div className="flex items-start">
        {doc.type && (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded px-3 py-1 text-xs uppercase">
            {doc.type}
          </span>
        )}
      </div>
    </div>
  );
}