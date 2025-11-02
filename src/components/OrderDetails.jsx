import React from "react";

export default function OrderDetails({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Symbol</p>
              <p className="font-medium">{order.symbol}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{order.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{order.side}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p className="font-medium">{order.qty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">₹{order.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className={`font-medium ${order.status === 'COMPLETE' ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.status}
              </p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Order Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="text-sm">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Exchange</span>
                <span className="text-sm">NSE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Product</span>
                <span className="text-sm">CNC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Validity</span>
                <span className="text-sm">DAY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}