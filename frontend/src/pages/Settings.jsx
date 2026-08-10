import { useState } from "react";

function Settings() {
  const [confidence, setConfidence] = useState(50);
  const [lanes, setLanes] = useState(6);
  const [autoProcess, setAutoProcess] = useState(true);
  const [saveResults, setSaveResults] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <>
      <h1 className="page-title">
        Settings
      </h1>

      <p className="sub-title mb-5">
        Configure traffic detection and system preferences.
      </p>

      <div className="row g-4">

        {/* Detection Settings */}
        <div className="col-lg-6">
          <div className="card-dark p-4 h-100">

            <h4 className="mb-4">
              Detection Settings
            </h4>

            <label className="form-label">
              Detection Confidence
            </label>

            <div className="d-flex align-items-center gap-3">

              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) =>
                  setConfidence(Number(e.target.value))
                }
              />

              <span className="fw-bold">
                {confidence}%
              </span>

            </div>

            <small className="text-secondary">
              Minimum confidence required for vehicle detection.
            </small>

          </div>
        </div>

        {/* Traffic Settings */}
        <div className="col-lg-6">
          <div className="card-dark p-4 h-100">

            <h4 className="mb-4">
              Traffic Settings
            </h4>

            <label className="form-label">
              Number of Lanes
            </label>

            <input
              type="number"
              className="form-control bg-dark text-light border-secondary"
              min="1"
              max="20"
              value={lanes}
              onChange={(e) =>
                setLanes(Number(e.target.value))
              }
            />

            <small className="text-secondary">
              Number of monitored traffic lanes.
            </small>

          </div>
        </div>

        {/* System Settings */}
        <div className="col-lg-12">
          <div className="card-dark p-4">

            <h4 className="mb-4">
              System Settings
            </h4>

            <div className="form-check form-switch mb-4">

              <input
                className="form-check-input"
                type="checkbox"
                checked={autoProcess}
                onChange={(e) =>
                  setAutoProcess(e.target.checked)
                }
              />

              <label className="form-check-label">
                Auto Process Videos
              </label>

            </div>

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                checked={saveResults}
                onChange={(e) =>
                  setSaveResults(e.target.checked)
                }
              />

              <label className="form-check-label">
                Save Detection Results
              </label>

            </div>

          </div>
        </div>

      </div>

      {/* Save Button */}
      <div className="mt-4">

        <button
          className="btn btn-primary px-4"
          onClick={handleSave}
        >
          Save Settings
        </button>

      </div>
    </>
  );
}

export default Settings;