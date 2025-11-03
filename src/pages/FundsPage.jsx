import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { sampleInstruments } from "../utils/mockData";

export default function FundsPage() {
  const [instruments, setInstruments] = React.useState(sampleInstruments);
  const [selected, setSelected] = React.useState(sampleInstruments[0]);
  const [theme, setTheme] = React.useState(localStorage.getItem("kite_demo_theme") || "light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("kite_demo_theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      <Header theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-12">
        <Sidebar instruments={instruments} selected={selected} onSelect={(i) => setSelected(i)} />

        <main className="col-span-9">
          <div className="p-4">
            {/* Top action buttons */}
            <div className="flex justify-end mb-6">
              <div className="text-sm text-gray-600 mr-4 flex items-center">
                Instant, zero-cost fund transfers with
                <span className="font-medium ml-1">UPI</span>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium mr-2">
                Add funds
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
                Withdraw
              </button>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Equity column */}
              <div className="border rounded-lg shadow-sm">
                <div className="p-4 flex items-center justify-between border-b">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span className="font-medium">Equity</span>
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-xs text-blue-500 mr-4">View statement</a>
                    <a href="#" className="text-xs text-blue-500">Help</a>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Available margin</div>
                      <div className="text-xl font-medium">0.00</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Used margin</div>
                      <div className="text-xl font-medium">0.00</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Available cash</div>
                      <div className="text-xl font-medium">0.00</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Opening balance</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Payin</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Payout</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">SPAN</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Delivery margin</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Exposure</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Options premium</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Collateral (Liquid funds)</div>
                        <div className="text-sm">0.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commodity column */}
              <div className="border rounded-lg shadow-sm">
                <div className="p-4 flex items-center justify-between border-b">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.5 9a2.5 2.5 0 00-5 0v6a2.5 2.5 0 005 0" />
                    </svg>
                    <span className="font-medium">Commodity</span>
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-xs text-blue-500 mr-4">View statement</a>
                    <a href="#" className="text-xs text-blue-500">Help</a>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Available margin</div>
                      <div className="text-xl font-medium">0.00</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Used margin</div>
                      <div className="text-xl font-medium">0.00</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Available cash</div>
                      <div className="text-xl font-medium">0.00</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Opening balance</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Payin</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Payout</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">SPAN</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Delivery margin</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Exposure</div>
                        <div className="text-sm">0.00</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Options premium</div>
                        <div className="text-sm">0.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}