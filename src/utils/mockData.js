// small helper to generate mock instruments and simulate price ticks
export const sampleInstruments = [
  { symbol: "TCS", ltp: 3300.25 },
  { symbol: "INFY", ltp: 1445.5 },
  { symbol: "RELIANCE", ltp: 2550.9 },
  { symbol: "HDFCBANK", ltp: 1605.0 },
  { symbol: "ICICIBANK", ltp: 931.2 }
];

// generate next tick
export function tickInstrument(inst) {
  const delta = (Math.random() - 0.5) * inst.ltp * 0.0015; // small random move
  const newLtp = Math.max(0.01, inst.ltp + delta);
  const change = Math.round(((newLtp - inst.ltp) / inst.ltp) * 10000) / 100;
  return { ...inst, ltp: Math.round(newLtp * 100) / 100, change };
}
