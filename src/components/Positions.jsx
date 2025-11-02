import React from "react";

export default function Positions({ positions }) {
  return (
    <div className="panel rounded-lg shadow p-4">
      <div className="font-semibold mb-2">Positions</div>
      {positions.length === 0 && <div className="muted text-sm">No positions</div>}
      <div className="space-y-3 mt-2">
        {positions.map(p => (
          <div key={p.symbol} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{p.symbol}</div>
              <div className="text-xs muted">Avg ₹{p.avg}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{p.qty}</div>
              <div className="text-xs muted">{p.pnl ? `P&L ₹${p.pnl}` : ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
