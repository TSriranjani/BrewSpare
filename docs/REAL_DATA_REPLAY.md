# Real-world compressor replay — BrewSpare

This optional feature replays **actual historical sensor observations** from the UCI MetroPT-3 dataset inside BrewSpare's AC-01 compressor demonstration.

**Important:** MetroPT-3 comes from a *metro train's air-production unit*, not a brewery. Only the measurements are real. The AC-01 mapping is illustrative. This feature does **not** claim predictive accuracy, prevented downtime, brewery failure rates, or validated spare-part procurement outcomes.

## Dataset and attribution

- MetroPT-3, UCI Machine Learning Repository, dataset 791: https://archive.ics.uci.edu/dataset/791/metropt+3+dataset
- Davari, N., Veloso, B., Ribeiro, R., & Gama, J. (2021), MetroPT-3 Dataset. DOI: https://doi.org/10.24432/C5VW3R
- License: CC BY 4.0 (attribution required).
- Dataset size: approximately 208 MB raw CSV; intentionally **not** committed to Git.
- Recorded failure window for the initial replay: April 18, 2020 (operator-reported air leak).

## Run it locally

1. Download/extract `MetroPT3(AirCompressor).csv` from the UCI dataset page.
2. Open a terminal in `backend` and activate the project's Python virtual environment.
3. Run:
   ```powershell
   python -m app.metropt_import "C:\path\to\MetroPT3(AirCompressor).csv"
   uvicorn app.main:app --reload --port 8000
   ```
4. Start the Next.js frontend and open `http://localhost:3000/real-replay`.

The importer streams the large CSV, selects April 17–18, 2020 and downsamples to one observed reading approximately every five minutes. It does not invent missing observations. Output is written to `backend/data/metropt_replay.json` (ignored by Git).

You can change the window with `--start`, `--end`, and `--interval-minutes`. The initial event annotations are only applicable to April 18; change them if preparing other periods.

The API route is `GET /api/real-replay/metropt`. It returns readings and data provenance without changing any inventory tables.

## Known limitations / future work

- This is **historical replay**, not live sensors or predictive maintenance.
- MetroPT-3 has a published failure timetable but individual rows are not labeled fault/no-fault. In the website the highlighted time window is the reported event, not an algorithm prediction.
- The signal `COMP` is a binary device signal; interpret it using the original data description before deriving loading state.
- Importer samples the next available reading; time gaps remain gaps, not interpolated values.
- Real spare-parts orders, costs, repair durations and stockout events are *not* present. Those require a separately sourced dataset.
- No supplier decision, fault warning, or cost saving is claimed from this first replay.
