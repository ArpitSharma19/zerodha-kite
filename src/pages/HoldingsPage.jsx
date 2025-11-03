import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { sampleInstruments } from "../utils/mockData";

export default function HoldingsPage() {
  const [instruments, setInstruments] = React.useState(sampleInstruments);
  const [selected, setSelected] = React.useState(sampleInstruments[0]);
  const [theme, setTheme] = React.useState(localStorage.getItem("kite_demo_theme") || "light");
  const [activeTab, setActiveTab] = React.useState("Equity");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("kite_demo_theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      <Header theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-12">
        <Sidebar instruments={instruments} selected={selected} onSelect={(i) => setSelected(i)} />

        <main className="col-span-12 md:col-span-9">
          {/* Mobile tabs */}
          <div className="md:hidden flex overflow-x-auto tabs border-b border-gray-200 bg-white">
            <button className="tab active">Holdings</button>
            <button className="tab">Positions</button>
            <button className="tab">GTT</button>
            <button className="tab">Baskets</button>
            <button className="tab">SIPs</button>
          </div>
          
          {/* Top sub-tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center px-4 md:px-6 overflow-x-auto">
              {["All", "Equity", "Mutual funds"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mr-4 md:mr-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-700 hidden md:inline">Holdings</span>
                <div className="relative">
                  <button className="flex items-center gap-2 text-xs text-gray-700 px-2 py-1 border rounded whitespace-nowrap">
                    All equity
                    <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Empty state */}
          <div className="p-8">
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">No holdings</h3>
              <p className="text-sm text-gray-500 mb-6 text-center">Buy equities from your watchlist</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}