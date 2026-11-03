"""Prepare a bounded real-data replay from the UCI MetroPT-3 compressor CSV.

Download dataset 791 from https://archive.ics.uci.edu/dataset/791/metropt+3+dataset
and pass the extracted MetroPT3(AirCompressor).csv path.
The output contains actual recorded readings, not model-generated sensor values.
"""
import argparse
import csv
import json
from datetime import datetime, timedelta
from pathlib import Path

DEFAULT_START = "2020-04-17T00:00:00"
DEFAULT_END = "2020-04-19T00:00:00"


def parse_time(value: str) -> datetime:
    return datetime.fromisoformat(value.strip().replace(" ", "T"))


def convert(source: Path, output: Path, start: datetime, end: datetime, interval_minutes: int) -> int:
    if end <= start or interval_minutes < 1:
        raise ValueError("End must follow start and sampling interval must be at least 1 minute")
    output.parent.mkdir(parents=True, exist_ok=True)
    fields = ["TP2", "TP3", "Reservoirs", "Oil_temperature", "Motor_current", "COMP", "LPS"]
    rows = []
    next_sample = start
    with source.open(newline="", encoding="utf-8-sig") as fp:
        reader = csv.DictReader(fp)
        required = {"timestamp", *fields}
        missing = required - set(reader.fieldnames or [])
        if missing:
            raise ValueError(f"Source CSV lacks required MetroPT-3 columns: {sorted(missing)}")
        for raw in reader:
            try:
                ts = parse_time(raw["timestamp"])
            except (ValueError, TypeError):
                continue
            if ts < start or ts >= end or ts < next_sample:
                continue
            try:
                values = {field: float(raw[field]) for field in fields}
            except (ValueError, TypeError):
                continue
            rows.append({"timestamp": ts.isoformat(), **values})
            next_sample = ts + timedelta(minutes=interval_minutes)
    if not rows:
        raise ValueError("No readings found in the selected time window")
    result = {
        "source": "UCI MetroPT-3 (railway air compressor; NOT brewery measurements)",
        "source_url": "https://archive.ics.uci.edu/dataset/791/metropt+3+dataset",
        "license": "CC BY 4.0",
        "asset_demo_mapping": "AC-01",
        "failure_windows": [
            {"start": "2020-04-18T00:00:00", "end": "2020-04-18T23:59:00", "event": "Operator-reported air leak"}
        ],
        "sampling_minutes": interval_minutes,
        "units": {"TP2": "bar", "TP3": "bar", "Reservoirs": "bar", "Oil_temperature": "°C", "Motor_current": "A", "COMP": "binary", "LPS": "binary"},
        "readings": rows,
    }
    output.write_text(json.dumps(result, separators=(",", ":")), encoding="utf-8")
    return len(rows)


def main():
    parser = argparse.ArgumentParser(description="Prepare real MetroPT-3 time series for BrewSpare")
    parser.add_argument("csv_file", type=Path)
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "data" / "metropt_replay.json")
    parser.add_argument("--start", default=DEFAULT_START)
    parser.add_argument("--end", default=DEFAULT_END)
    parser.add_argument("--interval-minutes", type=int, default=5)
    args = parser.parse_args()
    count = convert(args.csv_file, args.output, parse_time(args.start), parse_time(args.end), args.interval_minutes)
    print(f"Prepared {count} actual MetroPT-3 readings in {args.output}")


if __name__ == "__main__":
    main()
