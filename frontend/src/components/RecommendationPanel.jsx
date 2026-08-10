import {
  Robot,
  ExclamationTriangleFill,
  CheckCircleFill,
  ClockFill,
} from "react-bootstrap-icons";

import { recommendationData } from "../data/recommendationData";

function RecommendationPanel() {
  return (
    <div className="card-dark p-4 h-100">

      <div className="d-flex align-items-center mb-3">
        <Robot
          size={28}
          color="#3B82F6"
          className="me-2"
        />

        <div>
          <h4 className="mb-0">
            AI Recommendation
          </h4>

          <small className="text-secondary">
            Traffic optimization suggestion
          </small>
        </div>
      </div>

      <hr />

      {/* Congested Lane */}
      <div className="mb-4">
        <small className="text-secondary">
          Most Congested Lane
        </small>

        <div className="d-flex align-items-center mt-2">
          <ExclamationTriangleFill
            className="text-danger me-2"
          />

          <h4 className="mb-0">
            {recommendationData.lane}
          </h4>
        </div>

        <span className="badge bg-danger mt-2">
          {recommendationData.congestion} Congestion
        </span>
      </div>

      {/* Recommendation */}
      <div className="mb-4">
        <small className="text-secondary">
          Recommended Action
        </small>

        <div className="d-flex align-items-center mt-2">
          <ClockFill
            className="text-warning me-2"
          />

          <span>
            {recommendationData.action}
          </span>
        </div>

        <h4 className="text-warning mt-2">
          {recommendationData.duration}
        </h4>
      </div>

      {/* Expected Improvement */}
      <div className="mb-4">
        <small className="text-secondary">
          Estimated Improvement
        </small>

        <div className="d-flex align-items-center mt-2">
          <CheckCircleFill
            className="text-success me-2"
          />

          <h3 className="text-success mb-0">
            {recommendationData.improvement}
          </h3>
        </div>
      </div>

      {/* AI Confidence */}
      <div>
        <div className="d-flex justify-content-between">
          <small className="text-secondary">
            AI Confidence
          </small>

          <small className="fw-bold">
            {recommendationData.confidence}
          </small>
        </div>

        <div
          className="progress mt-2"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar bg-primary"
            style={{
              width: recommendationData.confidence,
            }}
          ></div>
        </div>
      </div>

    </div>
  );
}

export default RecommendationPanel;