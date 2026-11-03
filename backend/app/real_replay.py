"""Read-only historical replay endpoint. No simulated inputs are represented as actual observations."""
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/real-replay", tags=["Real-data replay"])
REPLAY_PATH = Path(__file__).resolve().parents[1] / "data" / "metropt_replay.json"


@router.get("/metropt")
def metropt_replay():
    if not REPLAY_PATH.is_file():
        raise HTTPException(
            status_code=404,
            detail="Real-data replay not installed. Download UCI MetroPT-3 and run python -m app.metropt_import <path-to-csv>.",
        )
    try:
        return json.loads(REPLAY_PATH.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        raise HTTPException(status_code=500, detail="Replay data could not be read") from exc
