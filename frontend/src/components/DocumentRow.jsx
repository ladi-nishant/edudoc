import { useState } from "react";
export default function DocumentRow({ doc }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr className="hover:bg-[#F9FAFB] text-sm">
        <td className="px-4 py-3 text-center">
          📄
        </td>
        <td className="px-4 py-3 font-medium text-[#005DAC]">
          {doc.title}
        </td>
        <td className="px-4 py-3 text-gray-600">
          {doc.ref || "—"}
        </td>
        <td className="px-4 py-3 text-gray-600">
          {doc.source || "—"}
        </td>

        <td className="px-4 py-3">
          <span className="px-2 py-0.5 rounded-full text-xs bg-[#E8F1FA] text-[#005DAC] uppercase">
            {doc.type}
          </span>
        </td>
      </tr>
      {doc.description && (
        <tr className="bg-[#FBFCFE]">
          <td />
          <td colSpan={5} className="px-4 pb-4 text-sm text-gray-600">
            <p className={expanded ? "" : "line-clamp-2"}>
              {doc.description}
            </p>

            {doc.description.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-[#005DAC] mt-1 hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
