import { laneStatus } from "../data/detectionData";

function LaneStatus() {
  return (
    <div className="card-dark p-4 mt-4">

      <h4 className="mb-4">
        Lane Analysis
      </h4>

      <div className="row g-3">

        {laneStatus.map((lane) => (
          <div
            className="col-md-3"
            key={lane.lane}
          >
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: "#1E293B",
                borderLeft: `5px solid ${lane.color}`,
              }}
            >
              <h5>
                {lane.lane}
              </h5>

              <span
                style={{
                  color: lane.color,
                  fontWeight: "bold",
                }}
              >
                ● {lane.status}
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default LaneStatus;