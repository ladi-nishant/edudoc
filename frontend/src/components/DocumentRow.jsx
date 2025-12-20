import { useState } from "react";
export default function DocumentRow({ doc }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr className="group hover:bg-[#F8FAFF] text-sm">
        <td className="px-4 py-4 text-center text-lg">📄</td>

        <td className="px-4 py-4">
          <p className="font-medium text-[#1E40AF]">
            {doc.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {doc.ref || "—"} · {doc.source || "—"}
          </p>
        </td>

        <td className="px-4 py-4">
          <span className="px-2 py-1 rounded-full text-[11px] bg-[#EEF2FF] text-[#1E40AF] uppercase">
            {doc.type}
          </span>
        </td>
      </tr>
      {doc.description ? (
        <tr className="bg-[#FBFCFF] border-b">
          <td />
          <td colSpan={2} className="px-4 pb-4 text-sm text-gray-600">
            <p className={expanded ? "" : "line-clamp-2"}>
              {doc.description}
            </p>

            {doc.description.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-[#1E40AF] mt-1 hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </td>
        </tr>
      ) : (
        <tr className="border-b">
          <td colSpan={3} />
        </tr>
      )}
    </>
  );
}
