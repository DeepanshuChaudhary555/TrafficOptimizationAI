import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

import {
  vehicleDistribution,
  weeklyTraffic,
} from "../data/analyticsData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AnalyticsCharts() {
  const lineOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#F8FAFC",
        },
      },

      tooltip: {
        backgroundColor: "#1E293B",
        titleColor: "#F8FAFC",
        bodyColor: "#CBD5E1",
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#CBD5E1",
        },

        grid: {
          color: "rgba(71, 85, 105, 0.35)",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#CBD5E1",
        },

        grid: {
          color: "rgba(71, 85, 105, 0.35)",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#F8FAFC",
        },
      },
    },
  };

  return (
    <div className="row g-4">

      {/* Weekly Traffic */}
      <div className="col-lg-8">
        <div className="card-dark p-4">

          <h4 className="mb-1">
            Weekly Traffic
          </h4>

          <p className="text-secondary mb-4">
            Vehicle detection throughout the week
          </p>

          <div style={{ height: "350px" }}>
            <Line
              data={weeklyTraffic}
              options={lineOptions}
            />
          </div>

        </div>
      </div>

      {/* Vehicle Distribution */}
      <div className="col-lg-4">
        <div className="card-dark p-4">

          <h4 className="mb-1">
            Vehicle Distribution
          </h4>

          <p className="text-secondary mb-4">
            Detected vehicle types
          </p>

          <div style={{ height: "350px" }}>
            <Doughnut
              data={vehicleDistribution}
              options={doughnutOptions}
            />
          </div>

        </div>
      </div>

    </div>
  );
}

export default AnalyticsCharts;