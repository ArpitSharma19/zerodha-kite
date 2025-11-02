import React from "react";

export const AppContext = React.createContext(null);

export function AppProvider({ children }) {
  // Dummy instruments (seed for pages)
  const instrumentsSeed = React.useMemo(() => ([
    { symbol: "TCS", ltp: 3300.25 },
    { symbol: "INFY", ltp: 1445.5 },
    { symbol: "RELIANCE", ltp: 2550.9 },
    { symbol: "HDFCBANK", ltp: 1605.0 },
    { symbol: "ICICIBANK", ltp: 931.2 },
  ]), []);

  // Dummy login details (userId -> { password, name })
  const [loginDetails] = React.useState({
    XJY837: { password: "pass123", name: "Arpit Sharma", email: "arpitsharma199714@gmail.com" },
    KV8317: { password: "kite123", name: "Kite User", email: "user@example.com" },
  });

  // Dummy indices data
  const [indices] = React.useState({
    nifty50: { index: "NIFTY 50", value: 22722.1, change: 135.75, pct: 0.60 },
    sensex: { index: "SENSEX", value: 83938.71, change: -465.75, pct: -0.55 },
  });

  // Dummy stocks/watchlist
  const [stocks] = React.useState([
    { symbol: "HDFCBANK", ltp: 1524.4, change: -8.25, pct: -0.54 },
    { symbol: "INFY", ltp: 1438.9, change: 12.4, pct: 0.87 },
    { symbol: "TCS", ltp: 3832.1, change: -25.7, pct: -0.67 },
    { symbol: "ONGC", ltp: 261.7, change: 3.2, pct: 1.24 },
    { symbol: "HINDUNILVR", ltp: 2487.3, change: 15.8, pct: 0.64 },
    { symbol: "GOLDBEES", ltp: 62.4, change: -0.2, pct: -0.32 },
  ]);

  // Dummy watchlist rows (used by Sidebar)
  const watchlist = React.useMemo(() => ([
    { s: "HDFCBANK", ex: "BSE", price: "987.65", chg: "-10.45", pct: "-1.05%", up: false },
    { s: "INFY", ex: "", price: "1482.30", chg: "-11.50", pct: "-0.77%", up: false },
    { s: "TCS", ex: "BSE", price: "3057.80", chg: "22.25", pct: "0.73%", up: true },
    { s: "ONGC", ex: "", price: "255.37", chg: "0.84", pct: "0.33%", up: true },
    { s: "HINDUNILVR", ex: "BSE", price: "2466.65", chg: "-2.95", pct: "-0.12%", up: false },
    { s: "GOLDBEES", ex: "", price: "100.02", chg: "0.34", pct: "0.34%", up: true },
  ]), []);

  // Auth state
  const [auth, setAuth] = React.useState(() => {
    const stored = localStorage.getItem("kite_demo_user");
    return stored ? JSON.parse(stored) : { loggedIn: false, userId: "", name: "" };
  });

  const [privacyMode, setPrivacyMode] = React.useState(false);

  function login(userId, password) {
    const record = loginDetails[userId];
    const ok = !!record && record.password === password;
    if (!ok) return { ok: false, message: "Invalid credentials" };
    const next = { loggedIn: true, userId, name: record.name, created: Date.now() };
    localStorage.setItem("kite_demo_user", JSON.stringify(next));
    setAuth(next);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem("kite_demo_user");
    setAuth({ loggedIn: false, userId: "", name: "" });
  }

  function togglePrivacy() {
    setPrivacyMode((p) => !p);
  }

  const value = {
    auth,
    loginDetails,
    indices,
    stocks,
    instrumentsSeed,
    watchlist,
    login,
    logout,
    privacyMode,
    togglePrivacy,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}