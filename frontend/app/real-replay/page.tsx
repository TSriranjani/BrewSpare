"use client";

import { useEffect, useState } from "react";

type Reading = {
  timestamp: string;
  TP2: number;
  TP3: number;
  Reservoirs: number;
  Oil_temperature: number;
  Motor_current: number;
  COMP: number;
  LPS: number;
};
type Replay = {
  source: string;
  source_url: string;
  asset_demo_mapping: string;
  readings: Reading[];
  failure_windows: { start: string; end: string; event: string }[];
  sampling_minutes: number;
};
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const channels: { key: keyof Reading; label: string; unit: string }[] = [
  { key: "TP2", label: "Compressor pressure", unit: "bar" },
  { key: "TP3", label: "Pneumatic panel pressure", unit: "bar" },
  { key: "Reservoirs", label: "Reservoir pressure", unit: "bar" },
  { key: "Oil_temperature", label: "Oil temperature", unit: "°C" },
  { key: "Motor_current", label: "Motor current", unit: "A" },
];

export default function RealReplay() {
  const [data, setData] = useState<Replay | null>(null);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [channel, setChannel] = useState<keyof Reading>("TP3");

  useEffect(() => {
    fetch(`${BASE}/real-replay/metropt`)
      .then(async r => {
        if (!r.ok) throw new Error(r.status === 404 ? "Dataset not yet imported. Follow docs/REAL_DATA_REPLAY.md to prepare it." : `API HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch(err => setError(String(err.message || err)));
  }, []);

  useEffect(() => {
    if (!playing || !data?.readings.length) return;
    const timer = setInterval(() => setIndex(i => {
      if (i + 1 >= data.readings.length) {
        setPlaying(false);
        return i;
      }
      return i + 1;
    }), 250);
    return () => clearInterval(timer);
  }, [playing, data]);

  const observations = data?.readings || [];
  const selected = observations[Math.min(index, observations.length - 1)];
  const activeFailure = !!selected && !!data?.failure_windows.some(
    w => selected.timestamp >= w.start && selected.timestamp <= w.end
  );
  const plot = observations.slice(Math.max(0, index - 150), index + 1);
  const values = plot.map(r => Number(r[channel])).filter(Number.isFinite);
  const lo = Math.min(...values), hi = Math.max(...values);
  const points = plot.map((r, i) => {
    const y = 115 - ((Number(r[channel]) - lo) / (hi - lo || 1)) * 100;
    return `${10 + i * 580 / Math.max(1, plot.length - 1)},${y}`;
  }).join(" ");

  return <div className="content">
    <div className="page-head"><div>
      <h1>Historical Compressor Replay</h1>
      <p>Recorded sensor data from a metro train compressor — mapped to brewery asset AC-01 for demonstration, not brewery measurements.</p>
    </div></div>
    {error && <div className="section"><h3>Import required</h3><p>{error}</p>
      <p>Download the MetroPT-3 CSV from <a href="https://archive.ics.uci.edu/dataset/791/metropt+3+dataset" target="_blank" rel="noreferrer">UCI</a>,
      then follow <code>docs/REAL_DATA_REPLAY.md</code>.</p></div>}
    {!data && !error && <p>Loading recorded compressor readings...</p>}
    {data && observations.length > 0 && <div className="section">
      <h3>AC-01 · Recorded event playback</h3>
      <p className="subtle">{data.source}. Sampling approximately every {data.sampling_minutes} minutes. No sensor data is invented or interpolated.</p>
      <p><strong>Recorded timestamp:</strong> {selected.timestamp.replace("T", " ")}</p>
      <p><strong>Operator report:</strong> {activeFailure ? "Air leak reported during this date (not a model prediction)" : "Outside the documented April 18 event window"}</p>
      <div className="form-row">
        <button className="btn" onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
        <button className="btn" onClick={() => {setPlaying(false);setIndex(0)}}>Restart</button>
        <span>{index+1} / {observations.length} samples</span>
      </div>
      <input type="range" min={0} max={observations.length - 1} value={index}
        onChange={e => {setPlaying(false);setIndex(Number(e.target.value))}} style={{width:"100%"}} aria-label="Select replay sample"/>
      <div className="metrics" style={{gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))"}}>
        {channels.map(c => <div className="metric" key={c.key}><div className="label">{c.label}</div>
          <div className="value">{selected[c.key]} <small>{c.unit}</small></div></div>)}
      </div>
      <div className="form-row"><label htmlFor="channel">Plot recorded signal</label>
      <select id="channel" value={channel} onChange={e => setChannel(e.target.value as keyof Reading)}>
        {channels.map(c => <option value={c.key} key={c.key}>{c.label}</option>)}
      </select></div>
      {plot.length > 1 && <svg role="img" aria-label="Historical sampled sensor readings" viewBox="0 0 600 130" style={{width:"100%",height:220,background:"#101827",borderRadius:8}}>
        <polyline fill="none" stroke="#38bdf8" strokeWidth={2} points={points}/>
      </svg>}
      <p className="subtle">This is a historical replay, not a live compressor or predictive warning system. No spare-part or downtime claims are inferred from these readings.</p>
      <p><a href={data.source_url} target="_blank" rel="noreferrer">Dataset source: UCI MetroPT-3 (CC BY 4.0)</a></p>
    </div>}
  </div>;
}
