import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { sampleInstruments } from "../utils/mockData";

export default function PositionsPage() {
  const [instruments, setInstruments] = React.useState(sampleInstruments);
  const [selected, setSelected] = React.useState(sampleInstruments[0]);
  const [theme, setTheme] = React.useState(localStorage.getItem("kite_demo_theme") || "light");

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
          <div className="p-8">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-6">
                {/* Anchor icon */}
                <svg className="w-16 h-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 3v4m0 0a2 2 0 100-4 2 2 0 000 4zm0 0v9M7 12c0 3 2.5 6 5 6s5-3 5-6" />
                </svg>
              </div>
              <p className="text-gray-600 text-base text-center mb-6">You don't have any positions yet</p>
              <div className="flex flex-col items-center gap-3">
                <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">Get started</button>
                <button className="text-blue-600 text-sm font-medium flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" />
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}