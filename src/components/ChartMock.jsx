import React from "react";

/*
  Simple mock chart:
  - Renders an SVG sparkline built from given price history.
  - No external dependency.
*/

export default function ChartMock({ prices }) {
  // prices: array of numbers
  const w = 720, h = 180, pad = 8;
  if (!prices || prices.length === 0) {
    return <div className="h-44 flex items-center justify-center muted panel rounded">No chart data</div>;
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(1e-6, max - min);
  const stepX = (w - pad * 2) / Math.max(1, prices.length - 1);

  const points = prices.map((p, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (p - min) / range) * (h - pad * 2);
    return [x, y];
  });

  const path = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0].toFixed(2)} ${pt[1].toFixed(2)}`).join(' ');

  // area path
  const area = `${path} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`;

  return (
    <div className="panel rounded-lg shadow p-3">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">Price Chart</div>
        <div className="text-sm muted">{prices[prices.length - 1].toFixed(2)}</div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} className="rounded">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(14,165,233,0.18)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0)" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#g)" />
        <path d={path} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
