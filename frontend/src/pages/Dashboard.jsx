import { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "../components/DashboardCard";
import TrafficChart from "../components/TrafficChart";
import RecommendationPanel from "../components/RecommendationPanel";
import RecentUploads from "../components/RecentUploads";
import SystemStatus from "../components/SystemStatus";

import {
  CarFront,
  ExclamationTriangle,
  Speedometer2,
  Cpu,
} from "react-bootstrap-icons";


function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_detections: 0,
    congested_lanes: 0,
    average_speed: 0,
    ai_accuracy: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch dashboard data from Flask
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "http://127.0.0.1:5000/api/dashboard"
      );

      setDashboardData(response.data);

    } catch (err) {
      console.error("Dashboard API error:", err);

      setError(
        "Unable to connect to the TrafficFlow AI backend."
      );

    } finally {
      setLoading(false);
    }
  };


  // Load dashboard data when page opens
  useEffect(() => {
    fetchDashboardData();
  }, []);


  // Dashboard statistics
  // IMPORTANT:
  // Pass the icon component itself, not <Icon />
  const dashboardStats = [
    {
      title: "Total Detections",
      value: dashboardData.total_detections,
      suffix: "",
      icon: CarFront,
      color: "primary",
    },

    {
      title: "Congested Lanes",
      value: dashboardData.congested_lanes,
      suffix: "",
      icon: ExclamationTriangle,
      color: "warning",
    },

    {
      title: "Average Speed",
      value: dashboardData.average_speed,
      suffix: " km/h",
      icon: Speedometer2,
      color: "info",
    },

    {
      title: "AI Accuracy",
      value: dashboardData.ai_accuracy,
      suffix: "%",
      icon: Cpu,
      color: "success",
    },
  ];


  return (
    <>
      {/* ========================================
          DASHBOARD HEADER
      ======================================== */}

      <div className="d-flex justify-content-between align-items-start">

        <div>
          <h1>Dashboard</h1>

          <p className="sub-title mb-5">
            Welcome to TrafficFlow AI
          </p>
        </div>


        {/* Refresh Button */}

        <button
          className="btn btn-outline-light"
          onClick={fetchDashboardData}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "↻ Refresh"}
        </button>

      </div>


      {/* ========================================
          BACKEND ERROR
      ======================================== */}

      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}


      {/* ========================================
          STATISTICS CARDS
      ======================================== */}

      <div className="row g-4">

        {dashboardStats.map((stat, index) => (

          <div
            className="col-lg-3 col-md-6"
            key={index}
          >

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


      {/* ========================================
          TRAFFIC CHART + AI RECOMMENDATION
      ======================================== */}

      <div className="row mt-5 g-4">

        <div className="col-lg-8">
          <TrafficChart />
        </div>

        <div className="col-lg-4">
          <RecommendationPanel />
        </div>

      </div>


      {/* ========================================
          RECENT UPLOADS + SYSTEM STATUS
      ======================================== */}

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