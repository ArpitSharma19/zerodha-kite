import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import HoldingsPage from "./pages/HoldingsPage";
import PositionsPage from "./pages/PositionsPage";
import BidsPage from "./pages/BidsPage";
import ChartPage from "./pages/ChartPage";
import FundsPage from "./pages/FundsPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const nav = useNavigate();
  function ProtectedRoute({ children }) {
    const user = localStorage.getItem("kite_demo_user");
    if (!user) return <Navigate to="/login" replace />;
    return children;
  }
  React.useEffect(() => {
    // redirect root based on auth
    if (window.location.pathname === "/") {
      const user = localStorage.getItem("kite_demo_user");
      if (user) nav("/dashboard", { replace: true });
      else nav("/login", { replace: true });
    }
  }, []);

  return (
    <AppProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/holdings" element={<ProtectedRoute><HoldingsPage /></ProtectedRoute>} />
        <Route path="/positions" element={<ProtectedRoute><PositionsPage /></ProtectedRoute>} />
        <Route path="/bids" element={<ProtectedRoute><BidsPage /></ProtectedRoute>} />
        <Route path="/chart" element={<ProtectedRoute><ChartPage /></ProtectedRoute>} />
        <Route path="/funds" element={<ProtectedRoute><FundsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </AppProvider>
  );
}
