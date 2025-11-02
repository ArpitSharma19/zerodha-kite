import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Basket from "./Basket";
import Notifications from "./Notifications";

export default function Header({ theme, setTheme }) {
  const { auth, loginDetails, privacyMode, togglePrivacy, logout } = React.useContext(AppContext);
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [basketOpen, setBasketOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  const initials = React.useMemo(() => {
    if (auth?.name) {
      const parts = auth.name.split(" ").filter(Boolean);
      return parts.map(p => p[0]).slice(0,2).join("").toUpperCase();
    }
    return (auth?.userId?.[0] || "A") + (auth?.userId?.slice(-1) || "S");
  }, [auth?.name, auth?.userId]);

  React.useEffect(() => {
    function onDocClick(e) {
      if (!e.target.closest?.("[data-profile-menu]")) setMenuOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    nav("/login");
  }

  function handleLogin() {
    setMenuOpen(false);
    nav("/login");
  }

  return (
    <>
    <header className="flex items-center justify-between px-3 sm:px-6 h-12 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <svg className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,12 L21,12 M12,3 L12,21" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
        <button onClick={() => nav('/chart')} className="flex items-center text-xs mr-6 hover:text-orange-500">
          <span className="mr-1">NIFTY 50</span>
          <span className="font-semibold mr-1">22722.10</span>
          <span className="text-green-500">(+0.25%) (+0.08%)</span>
        </button>
        <button onClick={() => nav('/chart')} className="flex items-center text-xs hover:text-orange-500">
          <span className="mr-1">SENSEX</span>
          <span className="font-semibold mr-1">83938.71</span>
          <span className="text-red-500">(-0.25%) (-0.08%)</span>
        </button>
      </div>
      
      <div className="flex items-center">
        <nav className="flex items-center overflow-x-auto whitespace-nowrap">
          <Link to="/dashboard" className={`text-sm font-medium px-4 py-3 ${window.location.pathname === '/dashboard' ? 'text-orange-500' : 'text-gray-600'}`}>Dashboard</Link>
          <Link to="/orders" className={`hidden sm:block text-sm font-medium px-4 py-3 ${window.location.pathname === '/orders' ? 'text-orange-500' : 'text-gray-600'}`}>Orders</Link>
          <Link to="/holdings" className={`hidden sm:block text-sm font-medium px-4 py-3 ${window.location.pathname === '/holdings' ? 'text-orange-500' : 'text-gray-600'}`}>Holdings</Link>
          <Link to="/positions" className={`hidden md:block text-sm font-medium px-4 py-3 ${window.location.pathname === '/positions' ? 'text-orange-500' : 'text-gray-600'}`}>Positions</Link>
          <Link to="/bids" className={`text-sm font-medium px-4 py-3 ${window.location.pathname === '/bids' ? 'text-orange-500' : 'text-gray-600'}`}>Bids</Link>
          <Link to="/funds" className={`text-sm font-medium px-4 py-3 ${window.location.pathname === '/funds' ? 'text-orange-500' : 'text-gray-600'}`}>Funds</Link>
        </nav>
        
        <div className="flex items-center ml-4" data-profile-menu>
          <svg onClick={() => setBasketOpen(true)} className="h-5 w-5 text-gray-600 mx-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <svg onClick={() => setNotificationsOpen(true)} className="h-5 w-5 text-gray-600 mx-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <button type="button" onClick={() => nav("/profile")} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mx-2 ${privacyMode ? "bg-gray-200 text-gray-400" : "bg-purple-100 text-purple-600"}`}>
              <span>{privacyMode ? "•" : initials}</span>
            </div>
            <span className="text-xs font-medium text-gray-700 ml-1">{privacyMode ? "••••••" : (auth?.userId || "XJY837")}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-4 top-12 w-72 sm:w-80 bg-white border border-gray-200 rounded shadow-md z-50" role="menu">
              <div className="p-4 border-b">
                <div className="text-sm font-medium">{auth?.name || loginDetails[auth?.userId || "XJY837"]?.name || "Arpit Sharma"}</div>
                <div className="text-xs text-gray-500">{loginDetails[auth?.userId || "XJY837"]?.email || "arpitsharma199714@gmail.com"}</div>
                <button className="absolute right-4 top-4 text-gray-500" title="Edit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5h2M4 20h16M7 13l9-9 3 3-9 9H7v-3z"/></svg>
                </button>
              </div>
              <div className="px-4 py-3 flex items-center justify-between border-b">
                <span className="text-sm">Privacy mode</span>
                <button onClick={togglePrivacy} className={`w-12 h-6 rounded-full ${privacyMode ? "bg-gray-700" : "bg-gray-300"} relative`}>
                  <span className={`absolute top-0.5 ${privacyMode ? "right-0.5" : "left-0.5"} w-5 h-5 bg-white rounded-full transition-all`}></span>
                </button>
              </div>
              <ul className="text-sm">
                {[
                  { label: "Console" },
                  { label: "Coin" },
                  { label: "Support" },
                  { label: "Invite friends" },
                  { label: "Keyboard shortcuts" },
                  { label: "User manual" },
                ].map((item) => (
                  <li key={item.label} className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer">{item.label}</li>
                ))}
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
    {basketOpen && <Basket onClose={() => setBasketOpen(false)} />}
    {notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} />}
    
    {/* Bottom Navigation - Responsive size */}
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-1 sm:py-2 z-100">
      <Link to="/dashboard" className={`flex flex-col items-center p-1 sm:p-2 ${window.location.pathname === '/dashboard' ? 'text-orange-500' : 'text-gray-500'}`}>
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Dashboard</span>
      </Link>
      <Link to="/orders" className={`flex flex-col items-center p-1 sm:p-2 ${window.location.pathname === '/orders' ? 'text-orange-500' : 'text-gray-500'}`}>
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Orders</span>
      </Link>
      <Link to="/holdings" className={`flex flex-col items-center p-1 sm:p-2 ${window.location.pathname === '/holdings' ? 'text-orange-500' : 'text-gray-500'}`}>
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Holdings</span>
      </Link>
      <Link to="/bids" className={`flex flex-col items-center p-1 sm:p-2 ${window.location.pathname === '/bids' ? 'text-orange-500' : 'text-gray-500'}`}>
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Bids</span>
      </Link>
      <Link to="/positions" className={`flex flex-col items-center p-1 sm:p-2 ${window.location.pathname === '/positions' ? 'text-orange-500' : 'text-gray-500'}`}>
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Positions</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center p-1 sm:p-2 ${window.location.pathname === '/profile' ? 'text-orange-500' : 'text-gray-500'}`}>
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">{privacyMode ? "••••••" : (auth?.userId || "XJY837")}</span>
      </Link>
    </nav>
    </>
  );
}
