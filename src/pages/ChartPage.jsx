import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChartMock from "../components/ChartMock";
import { tickInstrument } from "../utils/mockData";
import { AppContext } from "../context/AppContext";

export default function ChartPage() {
  const { instrumentsSeed } = React.useContext(AppContext);
  const [instruments, setInstruments] = React.useState(instrumentsSeed);
  const [selected, setSelected] = React.useState(instrumentsSeed[0]);
  const [pricesHistory, setPricesHistory] = React.useState([instrumentsSeed[0].ltp]);
  const [theme, setTheme] = React.useState(localStorage.getItem("kite_demo_theme") || "light");
  const [activeTab, setActiveTab] = React.useState("Chart");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("kite_demo_theme", theme);
  }, [theme]);

  // Tick instruments
  React.useEffect(() => {
    const id = setInterval(() => {
      setInstruments(prev => prev.map(t => tickInstrument(t)));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  // Update selected price and push to chart history
  React.useEffect(() => {
    const id = setInterval(() => {
      setInstruments(prev => {
        const found = prev.find(i => i.symbol === selected.symbol);
        if (!found) return prev;
        const updFound = tickInstrument(found);
        const next = prev.map(i => i.symbol === found.symbol ? updFound : i);
        setSelected(updFound);
        setPricesHistory(h => [...h, updFound.ltp].slice(-120));
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [selected]);

  return (
    <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      <Header theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-12">
        <Sidebar instruments={instruments} selected={selected} onSelect={(i) => { setSelected(i); setPricesHistory([i.ltp]); }} />

        <main className="col-span-12 md:col-span-9">
          {/* Top tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center px-4 sm:px-6 overflow-x-auto whitespace-nowrap">
              {[
                "Chart",
                "Option chain",
              ].map((tab) => (
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

          {/* Instrument header + actions */}
          <div className="px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 border-b border-gray-100">
            <div className="text-sm text-gray-700 flex items-center gap-2">
              <span className="font-medium">{selected.symbol}</span>
              <span className="text-gray-400">· 1D · INDICES</span>
            </div>
            <div className="ml-0 sm:ml-4 flex items-center gap-2 text-xs">
              {["D","W","M","3M","6M","1Y"].map(t => (
                <button key={t} className="px-2 py-1 rounded border text-gray-600 hover:bg-gray-50">{t}</button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 mt-2 md:mt-0">
              <div className="flex items-center">
                <span className="px-2 py-1 bg-blue-600 text-white rounded-l text-xs">BUY</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-r text-xs border border-blue-200">{selected.ltp.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 bg-red-600 text-white rounded-l text-xs">SELL</span>
                <span className="px-2 py-1 bg-red-50 text-red-700 rounded-r text-xs border border-red-200">{selected.ltp.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Chart area */}
          <div className="p-3 sm:p-4 grid grid-cols-12 gap-3 sm:gap-4">
            {/* Left tool rail */}
            <div className="hidden md:block md:col-span-1">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button key={i} className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-50">
                    <span className="w-3 h-3 bg-gray-400 inline-block" />
                  </button>
                ))}
              </div>
            </div>
            {/* Chart main */}
            <div className="col-span-12 md:col-span-11">
              <ChartMock prices={pricesHistory} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}