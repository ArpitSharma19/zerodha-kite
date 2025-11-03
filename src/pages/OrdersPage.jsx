import React from "react";
import Orders from "../components/Orders";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/AppContext";
import { sampleInstruments } from "../utils/mockData";

// Sample mock orders data
const mockOrders = [
  { id: 1, symbol: "RELIANCE", time: "10:30 AM", side: "BUY", qty: 10, price: 2450.75, status: "COMPLETE" },
  { id: 2, symbol: "INFY", time: "11:15 AM", side: "SELL", qty: 5, price: 1560.30, status: "PENDING" },
  { id: 3, symbol: "TCS", time: "12:05 PM", side: "BUY", qty: 8, price: 3200.00, status: "COMPLETE" }
];

export default function OrdersPage() {
  const [instruments, setInstruments] = React.useState(sampleInstruments);
  const [selected, setSelected] = React.useState(sampleInstruments[0]);
  const [orders, setOrders] = React.useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [theme, setTheme] = React.useState(localStorage.getItem("kite_demo_theme") || "light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
    localStorage.setItem("kite_demo_theme", theme);
  }, [theme]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      <Header theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-12">
        <Sidebar instruments={instruments} selected={selected} onSelect={(i) => setSelected(i)} />
        <main className="col-span-9">
          <Orders 
            orders={orders} 
            selectedOrder={selectedOrder} 
            onOrderClick={handleOrderClick} 
          />
        </main>
      </div>
    </div>
  );
}