import { detectionStats } from "../data/detectionData";

function DetectionSummary() {
  return (
    <div className="card-dark p-4 h-100">

      <h4 className="mb-4">
        Detection Summary
      </h4>

      {detectionStats.map((item) => (
        <div
          key={item.label}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <span className="text-secondary">
            {item.label}
          </span>

          <span className="fw-bold fs-5">
            {item.value}
          </span>
        </div>
      ))}

    </div>
  );
}

export default DetectionSummary;