import AnalyticsCharts from "../components/AnalyticsCharts";

function Analytics() {
  return (
    <>
      <h1 className="page-title">
        Traffic Analytics
      </h1>

      <p className="sub-title mb-5">
        Analyze traffic patterns and vehicle activity.
      </p>

      <AnalyticsCharts />

      <div className="row g-4 mt-1">

        <div className="col-lg-4">
          <div className="card-dark p-4">
            <h5>Peak Traffic Period</h5>

            <h2 className="mt-3">
              18:00 - 20:00
            </h2>

            <p className="text-secondary">
              Highest vehicle activity
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-dark p-4">
            <h5>Average Speed</h5>

            <h2 className="mt-3">
              48 km/h
            </h2>

            <p className="text-secondary">
              Across monitored lanes
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-dark p-4">
            <h5>Traffic Efficiency</h5>

            <h2
              className="mt-3"
              style={{ color: "#22C55E" }}
            >
              87%
            </h2>

            <p className="text-secondary">
              Current optimization score
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Analytics;