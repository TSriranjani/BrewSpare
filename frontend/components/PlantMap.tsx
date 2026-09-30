"use client";
import { colorFor } from "./StatusBadge";
import MachineIllustration from "./MachineIllustration";

type Asset = {
  asset_code: string;
  name: string;
  area: string;
  status: string;
  risk_score: number;
  health_score: number;
  x: number;
  y: number;
};

const shortName = (name: string) =>
  name
    .replace(/Fermentation Vessel 04/i, "Fermenter")
    .replace(/Raw Material Handling/i, "Raw Materials")
    .replace(/Plate Heat Exchanger/i, "Heat Exchanger")
    .replace(/Packaging Conveyor/i, "Conveyor")
    .replace(/Packaging Robot/i, "Packaging Robot");

export default function PlantMap({
  assets,
  selected,
  onSelect,
}: {
  assets: Asset[];
  selected?: string;
  onSelect: (a: Asset) => void;
}) {
  const ordered = assets.filter((a) => a.asset_code !== "AC-01");
  const step = 86 / Math.max(1, ordered.length - 1);

  return (
    <div className="plantmap">
      <div className="process-title">
        Brewery Process Connectivity
        <span className="process-sub">
          Click a machine image to inspect machine → spare-part risk
        </span>
      </div>

      {ordered.map((a, i) => {
        const left = 7 + i * step;
        return (
          <div
            key={`pipe-${a.asset_code}`}
            className="pipe"
            style={{
              left: `${left}%`,
              width: i === ordered.length - 1 ? 0 : `${step}%`,
            }}
          />
        );
      })}

      {ordered.map((a, i) => {
        const left = 7 + i * step;
        return (
          <button
            type="button"
            aria-label={`Open ${a.name}`}
            title={a.name}
            onClick={() => onSelect(a)}
            key={a.asset_code}
            className={`asset-node ${selected === a.asset_code ? "selected" : ""}`}
            style={{ left: `${left}%`, top: "53%" }}
          >
            <div className="machine-image-wrap">
              <MachineIllustration code={a.asset_code} name={a.name} />
              <span
                className="status-ring"
                style={{ background: colorFor(a.status) }}
                aria-label={`${a.status} status`}
              />
            </div>
            <div className="node-label">{shortName(a.name)}</div>
            <div className="node-code">{a.asset_code}</div>
          </button>
        );
      })}

      {assets
        .filter((a) => a.asset_code === "AC-01")
        .map((a) => (
          <button
            type="button"
            aria-label={`Open ${a.name}`}
            title={a.name}
            key={a.asset_code}
            onClick={() => onSelect(a)}
            className={`asset-node utility-node ${selected === a.asset_code ? "selected" : ""}`}
            style={{ left: "54%", top: "82%" }}
          >
            <div className="machine-image-wrap">
              <MachineIllustration code={a.asset_code} name={a.name} />
              <span
                className="status-ring"
                style={{ background: colorFor(a.status) }}
                aria-label={`${a.status} status`}
              />
            </div>
            <div className="node-label">Air Compressor</div>
            <div className="node-code">AC-01</div>
          </button>
        ))}
    </div>
  );
}
