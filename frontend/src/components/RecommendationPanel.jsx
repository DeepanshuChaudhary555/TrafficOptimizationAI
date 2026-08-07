import { LightbulbFill } from "react-bootstrap-icons";

function RecommendationPanel() {
  return (
    <div className="card-dark p-4 h-100">

      <div className="d-flex align-items-center mb-3">
        <LightbulbFill
          size={28}
          color="#F59E0B"
          className="me-2"
        />

        <h4 className="m-0">
          AI Recommendation
        </h4>
      </div>

      <hr />

      <div className="mb-4">
        <h6 className="text-secondary">
          Most Congested Lane
        </h6>

        <h3 className="text-danger">
          Lane 2
        </h3>
      </div>

      <div className="mb-4">
        <h6 className="text-secondary">
          Suggested Action
        </h6>

        <p>
          Increase green signal duration by
          <strong> 15 seconds</strong>.
        </p>
      </div>

      <div className="mb-4">
        <h6 className="text-secondary">
          Expected Improvement
        </h6>

        <h3
          style={{
            color: "#22C55E"
          }}
        >
          +22%
        </h3>
      </div>

    </div>
  );
}

export default RecommendationPanel;