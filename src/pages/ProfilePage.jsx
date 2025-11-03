import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";

export default function ProfilePage() {
  const { theme, setTheme, auth, logout } = useContext(AppContext);
  const [hideData, setHideData] = useState(false);
  const [displayedData, setDisplayedData] = useState({
    userId: "XJY837",
    email: "arpitsharma199714@gmail.com"
  });

  const handlePrivacyToggle = () => {
    const newHideData = !hideData;
    setHideData(newHideData);
    
    if (newHideData) {
      setDisplayedData({
        userId: "••••••",
        email: "••••••@••••.com"
      });
    } else {
      setDisplayedData({
        userId: "XJY837",
        email: "arpitsharma199714@gmail.com"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      <Header theme={theme} setTheme={setTheme} />
      
      {/* User info section */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">Arpit Sharma</h2>
          <div className="relative">
            <button className="p-2">
              <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Profile card */}
      <div className="mx-4 bg-white rounded-md shadow-sm p-6 mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-semibold">
              AS
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">{displayedData.userId}</h3>
            <p className="text-gray-500 text-sm">{displayedData.email}</p>
            
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 mr-2">Privacy mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={hideData}
                  onChange={handlePrivacyToggle}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Account section */}
      <div className="mb-4">
        <h3 className="px-4 py-2 text-gray-600 font-medium">Account</h3>
        
        <div className="bg-white">
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">Funds</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">App Code</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">Profile</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">Settings</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">Connected apps</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </a>
          
          <a href="/login" onClick={logout} className="flex items-center justify-between p-4">
            <span className="text-gray-800">Logout</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Console section */}
      <div className="mb-4">
        <div className="px-4 py-2 flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">Console</h3>
          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
        </div>
        
        <div className="px-4 py-2 overflow-x-auto whitespace-nowrap">
          <a href="#" className="text-blue-500 mr-6">Portfolio</a>
          <a href="#" className="text-blue-500 mr-6">Tradebook</a>
          <a href="#" className="text-blue-500 mr-6">P&L</a>
          <a href="#" className="text-blue-500 mr-6">Tax P&L</a>
          <a href="#" className="text-blue-500 mr-6">Gift stocks</a>
          <a href="#" className="text-blue-500 mr-6">Family</a>
          <a href="#" className="text-blue-500">Downloads</a>
        </div>
      </div>

      {/* Support section */}
      <div className="mb-4">
        <h3 className="px-4 py-2 text-gray-600 font-medium">Support</h3>
        
        <div className="bg-white">
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">Support portal</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">User manual</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4">
            <span className="text-gray-800">Contact</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Others section */}
      <div className="mb-4">
        <h3 className="px-4 py-2 text-gray-600 font-medium">Others</h3>
        
        <div className="bg-white">
          <a href="#" className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-gray-800">Invite friends</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </a>
          
          <a href="#" className="flex items-center justify-between p-4">
            <span className="text-gray-800">Licenses</span>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Version info */}
      <div className="px-4 py-6 text-center">
        <p className="text-gray-500 text-sm">TradePro v4 b567</p>
        <div className="mt-4 flex justify-center">
          <svg className="h-6 w-24 text-gray-400" viewBox="0 0 100 24" fill="currentColor">
            <path d="M20 0L0 10l20 10V0zm20 0v20l20-10L40 0z" />
          </svg>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-2 py-1">
        <a href="/" className="flex flex-col items-center p-2 text-gray-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Watchlist</span>
        </a>
        <a href="/orders" className="flex flex-col items-center p-2 text-gray-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-xs mt-1">Orders</span>
        </a>
        <a href="/portfolio" className="flex flex-col items-center p-2 text-gray-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Portfolio</span>
        </a>
        <a href="/bids" className="flex flex-col items-center p-2 text-gray-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1">Bids</span>
        </a>
        <a href="/profile" className="flex flex-col items-center p-2 text-blue-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">XJY837</span>
        </a>
      </div>
    </div>
  );
}