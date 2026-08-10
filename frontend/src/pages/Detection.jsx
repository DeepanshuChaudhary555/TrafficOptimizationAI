import DetectionSummary from "../components/DetectionSummary";
import LaneStatus from "../components/LaneStatus";

function Detection() {
  return (
    <>
      <h1 className="page-title">
        AI Detection
      </h1>

      <p className="sub-title mb-5">
        Vehicle detection and lane traffic analysis.
      </p>

      <div className="row g-4">

        {/* Video Preview */}
        <div className="col-lg-8">

          <div className="card-dark p-4 h-100">

            <h4 className="mb-4">
              Video Preview
            </h4>

            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "400px",
                backgroundColor: "#020617",
                borderRadius: "12px",
              }}
            >
              <div className="text-center text-secondary">
                <h4>📹</h4>

                <p>
                  Processed traffic video will appear here
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Detection Summary */}
        <div className="col-lg-4">
          <DetectionSummary />
        </div>

      </div>

      {/* Lane Analysis */}
      <LaneStatus />
    </>
  );
}

export default Detection;