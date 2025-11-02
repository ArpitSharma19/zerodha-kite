import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { sampleInstruments } from "../utils/mockData";

export default function BidsPage() {
  const [instruments, setInstruments] = React.useState(sampleInstruments);
  const [selected, setSelected] = React.useState(sampleInstruments[0]);
  const [theme, setTheme] = React.useState(localStorage.getItem("kite_demo_theme") || "light");
  const [activeTab, setActiveTab] = React.useState("IPO");

  const ipos = [
    { name: "STUDS", company: "Studds Accessories", date: "30th Oct — 3rd Nov", price: "557 - 585", min: "14625", lots: "25 Qty", action: "Apply", status: "OPEN" },
    { name: "LENSKART", company: "Lenskart Solutions", date: "31st Oct — 4th Nov", price: "382 - 402", min: "14874", lots: "37 Qty", action: "Apply", status: "OPEN" },
    { name: "GROWW", company: "Groww (BillionBrains Garage Ventures)", date: "4th — 7th Nov", price: "95 - 100", min: "15000", lots: "150 Qty", action: "Pre-apply", status: "OPEN" },
    { name: "SHETHJI", company: "Shreeji Global FMCG", date: "4th — 7th Nov", price: "120 - 125", min: "250000", lots: "2000 Qty", action: "—", status: "UPCOMING" },
    { name: "MIDWESTLTD", company: "Midwest", date: "15th — 17th Oct", price: "1014 - 1065", min: "14910", lots: "14 Qty", action: "—", status: "CLOSED" },
    { name: "ORKLIANDIA", company: "Orkla India", date: "29th — 31st Oct", price: "695 - 730", min: "14600", lots: "20 Qty", action: "—", status: "CLOSED" },
    { name: "JAYESH", company: "Jayesh Logistics", date: "27th — 29th Oct", price: "116 - 122", min: "244000", lots: "2000 Qty", action: "—", status: "CLOSED" },
    { name: "TRADELUNO", company: "Game Changers Texfab", date: "28th — 30th Oct", price: "96 - 102", min: "244800", lots: "2400 Qty", action: "—", status: "CLOSED" },
  ];

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("kite_demo_theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white">
      <Header theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-12">
        <Sidebar instruments={instruments} selected={selected} onSelect={(i) => setSelected(i)} />

        <main className="col-span-9">
          {/* Top sub-tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center px-6">
              {["IPO", "Govt. securities", "Auctions", "Corporate actions", "SSE"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mr-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab ? "text-orange-500 border-orange-500" : "text-gray-600 border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* IPO list header + search */}
          <div className="px-6 py-4 flex items-center">
            <div className="text-sm font-medium text-gray-700">IPOs ({ipos.length})</div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <svg className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6M10 6a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <input className="pl-8 pr-3 py-2 border rounded text-sm w-56" placeholder="Search" />
              </div>
            </div>
          </div>

          {/* IPO list table */}
          <div className="px-6">
            {/* Column headers */}
            <div className="grid grid-cols-12 text-xs text-gray-500 px-4 py-2 border-b">
              <div className="col-span-5">Instrument</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Price (₹)</div>
              <div className="col-span-2">Min. amount (₹)</div>
              <div className="col-span-1"></div>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {ipos.map((row) => (
                <div key={row.name} className="grid grid-cols-12 items-center px-4 py-3">
                  <div className="col-span-5">
                    <div className="text-sm font-medium text-gray-800">{row.name}</div>
                    <div className="text-xs text-gray-500">{row.company}</div>
                  </div>
                  <div className="col-span-2 text-sm text-gray-700">{row.date}</div>
                  <div className="col-span-2 text-sm text-gray-700">{row.price}</div>
                  <div className="col-span-2 text-sm text-gray-700">{row.min}
                    <div className="text-[10px] text-gray-500">{row.lots}</div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {row.status === "OPEN" && (
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded">Apply</button>
                    )}
                    {row.status === "UPCOMING" && (
                      <div className="flex items-center gap-2">
                        {row.action === "Pre-apply" ? (
                          <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded">Pre-apply</button>
                        ) : null}
                        <span className="text-[10px] px-2 py-1 border rounded text-gray-600">UPCOMING</span>
                      </div>
                    )}
                    {row.status === "CLOSED" && (
                      <span className="text-[10px] px-2 py-1 border rounded text-gray-600">CLOSED</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}