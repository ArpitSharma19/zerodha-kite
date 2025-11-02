import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { tickInstrument } from "../utils/mockData";
import Sidebar from "../components/Sidebar";
import ChartMock from "../components/ChartMock";
import OrderPanel from "../components/OrderPanel";
import Positions from "../components/Positions";
import Orders from "../components/Orders";
import Header from "../components/Header";

export default function Dashboard() {
  const { privacyMode, instrumentsSeed, watchlist } = useContext(AppContext);
  const [instruments, setInstruments] = useState(instrumentsSeed);
  const [selected, setSelected] = useState(instrumentsSeed[0]);
  const [pricesHistory, setPricesHistory] = useState([selected.ltp]);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("kite_demo_theme") || "light");
  const [activeWatchlist, setActiveWatchlist] = useState("Watchlist 1");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("kite_demo_theme", theme);
  }, [theme]);

  // tick every 1s
  React.useEffect(() => {
    const id = setInterval(() => {
      setInstruments(prev => prev.map(t => tickInstrument(t)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // update selected's price and push to history
  React.useEffect(() => {
    const id = setInterval(() => {
      setInstruments(prev => {
        const upd = prev.map(t => t);
        const found = upd.find(i => i.symbol === selected.symbol);
        if (found) {
          const newFound = tickInstrument(found);
          const next = upd.map(i => i.symbol === found.symbol ? newFound : i);
          // update selected reference
          setSelected(newFound);
          setPricesHistory(h => {
            const nextH = [...h, newFound.ltp].slice(-80);
            return nextH;
          });
          return next;
        }
        return upd;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [selected]);

  function placeOrder(side, qty) {
    if (!selected) return;
    const price = selected.ltp;
    const id = Date.now();
    const order = { id, symbol: selected.symbol, side, qty, price, status: "OPEN", time: new Date().toLocaleTimeString() };
    setOrders(prev => [order, ...prev]);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "COMPLETE" } : o));
      setPositions(prev => {
        const exists = prev.find(p => p.symbol === selected.symbol);
        if (exists) {
          const newQty = side === "BUY" ? exists.qty + qty : exists.qty - qty;
          const newAvg = side === "BUY" ? Math.round(((exists.avg * exists.qty) + (price * qty)) / (newQty || 1)) : exists.avg;
          return prev.map(p => p.symbol === selected.symbol ? { ...p, qty: newQty, avg: newAvg } : p).filter(p => p.qty !== 0);
        } else {
          return [...prev, { symbol: selected.symbol, qty: side === "BUY" ? qty : -qty, avg: Math.round(price) }];
        }
      });
    }, 1000 + Math.floor(Math.random() * 800));
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Header theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-12">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:col-span-3">
          <Sidebar instruments={instruments} selected={selected} onSelect={(i) => { setSelected(i); setPricesHistory([i.ltp]); }} />
        </div>

        {/* Mobile view */}
        <div className="col-span-12 md:hidden">
          {/* Market indices */}
          <div className="bg-white p-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">NIFTY 50</div>
                <div className="flex items-center">
                  <span className="text-sm text-red-500">25,722.10</span>
                  <span className="text-xs text-red-500 ml-1">-155.75 (-0.60%)</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">NIFTY BANK</div>
                <div className="flex items-center">
                  <span className="text-sm text-red-500">57,776.35</span>
                  <span className="text-xs text-red-500 ml-1">-254.75 (-0.44%)</span>
                </div>
              </div>
              <div className="flex items-center">
                <button className="p-2">
                  <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3z M16 8a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </button>
                <button className="p-2">
                  <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Watchlist tabs */}
          <div className="flex overflow-x-auto tabs border-b border-gray-200 bg-white">
            <button 
              className={`tab ${activeWatchlist === "Watchlist 1" ? "active" : ""}`}
              onClick={() => setActiveWatchlist("Watchlist 1")}
            >
              Watchlist 1
            </button>
            <button 
              className={`tab ${activeWatchlist === "Watchlist 2" ? "active" : ""}`}
              onClick={() => setActiveWatchlist("Watchlist 2")}
            >
              Watchlist 2
            </button>
            <button 
              className={`tab ${activeWatchlist === "Watchlist 3" ? "active" : ""}`}
              onClick={() => setActiveWatchlist("Watchlist 3")}
            >
              Watchlist 3
            </button>
            <button 
              className={`tab ${activeWatchlist === "Watchlist 4" ? "active" : ""}`}
              onClick={() => setActiveWatchlist("Watchlist 4")}
            >
              Watchlist 4
            </button>
          </div>

          {/* Search bar */}
          <div className="p-3 bg-white border-b border-gray-200">
            <div className="relative flex items-center">
              <svg className="h-4 w-4 text-gray-400 absolute left-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6M10 6a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              <input
                type="text"
                placeholder="       Search & add"
                className="w-full pl-9 pr-12 py-2 border border-gray-300 rounded text-sm search-input"
              />
              <div className="absolute right-3 flex items-center">
                <span className="text-xs text-gray-500 mr-2">6/100</span>
                <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stock list */}
          <div className="bg-white">
            {watchlist && watchlist.map((stock, index) => (
              <div key={index} className="border-b border-gray-100 p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{stock.s}</div>
                    <div className="text-xs text-gray-500">{stock.ex}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${stock.up ? "text-green-500" : "text-red-500"}`}>
                      {stock.price}
                    </div>
                    <div className={`text-xs flex items-center justify-end ${stock.up ? "text-green-500" : "text-red-500"}`}>
                      {stock.chg} ({stock.pct})
                      {stock.up ? (
                        <svg className="h-3 w-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop main content */}
        <main className="col-span-12 md:col-span-9">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-medium mb-6">Hi, Arpit</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="border border-gray-200 rounded p-4">
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <h3 className="text-base font-medium">Equity</h3>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-light">{privacyMode ? "••••" : 0}</div>
                  <div className="text-3xl sm:text-4xl font-light">{privacyMode ? "••••" : 0}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Margins used</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Margins used</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Opening balance</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Opening balance</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Margin available</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                </div>
                
                <div className="mt-4 flex">
                  <button className="text-blue-500 text-sm flex items-center">
                    <span className="mr-1">View statement</span>
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded p-4">
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <h3 className="text-base font-medium">Commodity</h3>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div className="text-4xl font-light">{privacyMode ? "••••" : 0}</div>
                  <div className="text-4xl font-light">{privacyMode ? "••••" : 0}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Margins used</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Margins used</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Opening balance</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Opening balance</div>
                    <div>{privacyMode ? "•••" : 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Margin available</div>
                    <div>0</div>
                  </div>
                </div>
                
                <div className="mt-4 flex">
                  <button className="text-blue-500 text-sm flex items-center">
                    <span className="mr-1">View statement</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center">
              <div className="mb-4">
                <svg className="h-16 w-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 8h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a1 1 0 00-1 1v10a3 3 0 003 3h12a3 3 0 003-3V9a1 1 0 00-1-1zM9 6h6v2H9V6z" strokeWidth="1" />
                </svg>
              </div>
              <p className="text-gray-500 mb-2 text-center">You don't have any stocks in your DEMAT yet. Get started<br />with absolutely free equity investments.</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">Start investing</button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-2 py-1">
        <div className="flex flex-col items-center justify-center py-1 px-3 text-blue-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Watchlist</span>
        </div>
        <div className="flex flex-col items-center justify-center py-1 px-3 text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-xs mt-1">Orders</span>
        </div>
        <div className="flex flex-col items-center justify-center py-1 px-3 text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Portfolio</span>
        </div>
        <div className="flex flex-col items-center justify-center py-1 px-3 text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1">Bids</span>
        </div>
        <div className="flex flex-col items-center justify-center py-1 px-3 text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </div>
      </div>
    </div>
  );
}
