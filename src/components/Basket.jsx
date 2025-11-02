import React from "react";

export default function Basket({ onClose }) {
  const [query, setQuery] = React.useState("");

  return (
    <div className="fixed inset-0 z-40">
      {/* Invisible backdrop to allow outside click to close (no tint to match screenshot) */}
      <div className="absolute inset-0" onClick={onClose} />
      {/* Dropdown panel anchored under header */}
      <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[95vw] max-w-4xl bg-white rounded shadow border z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center text-gray-700">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-lg font-medium">Basket</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Chevron icon to mimic collapse arrow in screenshot */}
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9l6 6 6-6" />
            </svg>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-6 py-4 border-b flex items-center">
          <div className="flex items-center flex-1 border rounded h-11">
            <div className="w-12 flex items-center justify-center text-gray-500">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
                <path d="M20 20l-3.5-3.5" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-full outline-none text-sm"
              placeholder="Search & add"
            />
          </div>
          <button className="ml-4 text-sm text-gray-500 flex items-center">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
              <path d="M12 8v8M8 12h8" strokeWidth="1.5" />
            </svg>
            Clear basket
          </button>
        </div>

        {/* Empty content message */}
        <div className="flex items-center justify-center py-10">
          <div className="text-gray-500 text-base">Start by adding instruments</div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t flex justify-end gap-3">
          <button className="bg-blue-500 text-white rounded px-4 py-2 text-sm font-medium">Place all</button>
          <button onClick={onClose} className="border rounded px-4 py-2 text-sm font-medium">Close</button>
        </div>
      </div>
    </div>
  );
}