import React from "react";
import { AppContext } from "../context/AppContext";

export default function Sidebar({ instruments, selected, onSelect }) {
  return (
    <aside className="md:block md:col-span-3 border-r border-gray-200 bg-white">
      <div className="p-4 hidden md:block">
        {/* Search bar */}
        <div className="relative mb-4 flex items-center">
          <svg className="h-4 w-4 text-gray-400 absolute left-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6M10 6a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <input
            type="text"
            placeholder="Search & add"
            className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded text-sm search-input text-center"
          />
          <button className="absolute right-3 text-gray-600" title="Filter">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M6 8h12M9 12h6M11 16h2" />
            </svg>
          </button>
        </div>

        {/* Watchlist tabs for mobile */}
        <div className="flex overflow-x-auto tabs mb-4">
          <button className="tab active">Watchlist 1</button>
          <button className="tab">Watchlist 2</button>
          <button className="tab">Watchlist 3</button>
          <button className="tab">Watchlist 4</button>
        </div>

        {/* Watchlist header - desktop */}
        <div className="hidden md:flex items-center justify-between mb-2">
          <div className="text-xs text-gray-700">Watchlist 1 <span className="text-gray-500">(6 / 250)</span></div>
          <button className="text-xs text-blue-600">+ New group</button>
        </div>
        <div className="text-xs text-gray-500 mb-2 hidden md:block">Default (6)</div>

        {/* Watchlist items from context */}
        <div>
          {(React.useContext(AppContext).watchlist || []).map((row) => (
            <button key={row.s} className="w-full flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className={`${row.up ? "text-green-600" : "text-red-600"} font-medium`}>{row.s}</span>
                {row.ex && <span className="text-[10px] text-gray-500">{row.ex}</span>}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-gray-700 w-14 text-right">{row.chg}</div>
                <div className={`${row.up ? "text-green-600" : "text-red-600"} w-16 text-right flex items-center justify-end gap-1`}>
                  <span>{row.pct}</span>
                  {row.up ? (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 14l6-6 6 6"/></svg>
                  ) : (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 10l-6 6-6-6"/></svg>
                  )}
                </div>
                <div className="w-20 text-right font-medium">{row.price}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-4">
            {[1,2,3,4,5,6,7].map(n => (
              <div key={n} className={`px-2 cursor-pointer text-xs ${n===1 ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"}`}>{n}</div>
            ))}
          </div>
          <button className="text-gray-500">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
