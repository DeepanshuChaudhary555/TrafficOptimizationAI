import DashboardCard from "../components/DashboardCard";
import TrafficChart from "../components/TrafficChart";
import RecommendationPanel from "../components/RecommendationPanel";
import RecentUploads from "../components/RecentUploads";
import SystemStatus from "../components/SystemStatus";

import { dashboardStats } from "../data/dashboardData";

function Dashboard() {
  return (
    <>
      {/* Dashboard Header */}
      <h1 className="page-title">Dashboard</h1>

      <p className="sub-title mb-5">
        Welcome to TrafficFlow AI
      </p>

      {/* Statistics Cards */}
      <div className="row g-4">
        {dashboardStats.map((stat, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <DashboardCard
              title={stat.title}
              value={stat.value}
              suffix={stat.suffix}
              icon={stat.icon}
              color={stat.color}
            />
          </div>
        ))}
      </div>

      {/* Traffic Chart & AI Recommendation */}
      <div className="row mt-5 g-4">
        <div className="col-lg-8">
          <TrafficChart />
        </div>

        <div className="col-lg-4">
          <RecommendationPanel />
        </div>
      </div>

      {/* Recent Uploads & System Status */}
      <div className="row mt-5 g-4">
        <div className="col-lg-6">
          <RecentUploads />
        </div>

        <div className="col-lg-6">
          <SystemStatus />
        </div>
      </div>
    </>
  );
}

export default Dashboard;