import React from "react";

export default function OrderPanel({ selected, placeOrder }) {
  const [qty, setQty] = React.useState(1);
  return (
    <div className="panel rounded-lg shadow p-4">
      <div className="font-semibold mb-2">Order</div>
      <div className="text-xs muted mb-2">Selected: {selected?.symbol ?? '-'}</div>

      <div className="flex gap-2 mb-3">
        <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value) || 1)} className="w-24 p-2 border rounded" />
        <div className="text-sm muted self-end">Qty</div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => placeOrder('BUY', qty)} className="flex-1 px-3 py-2 bg-green-600 text-white rounded">Buy</button>
        <button onClick={() => placeOrder('SELL', qty)} className="flex-1 px-3 py-2 bg-red-600 text-white rounded">Sell</button>
      </div>

      <div className="mt-3 text-xs muted">Orders are mock/simulated for demo only.</div>
    </div>
  );
}
