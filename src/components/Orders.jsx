import React from "react";
import OrderDetails from "./OrderDetails";

export default function Orders({ orders, selectedOrder, onOrderClick }) {
  const [activeTab, setActiveTab] = React.useState("Open");
  const tabs = ["Open", "Executed", "GTT", "Baskets", "SIPs"];

  return (
    <div className="bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {orders.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16">
            {/* Document Icon */}
            <div className="mb-6">
              <svg className="w-16 h-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            {/* Empty State Text */}
            <p className="text-gray-600 text-base mb-6">No pending orders</p>
            <p className="text-gray-500 text-sm mb-6">Place an order from your watchlist</p>
            
            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-3">
              <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                Get started
              </button>
            </div>
          </div>
        ) : (
          // Orders List (when there are orders)
          <div className="space-y-2">
            {orders.map(order => (
              <div 
                key={order.id} 
                className="border rounded p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onOrderClick(order)}
              >
                <div className="flex justify-between">
                  <div className="font-medium">{order.symbol}</div>
                  <div className="text-xs text-gray-500">{order.time}</div>
                </div>
                <div className="text-xs text-gray-500">{order.side} {order.qty} @ ₹{order.price.toFixed(2)}</div>
                <div className={`mt-1 text-xs ${order.status === 'COMPLETE' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails 
          order={selectedOrder} 
          onClose={() => onOrderClick(null)} 
        />
      )}
    </div>
  );
}
