import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { trafficChartData } from "../data/chartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function TrafficChart() {
  const options = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 1200,
    },

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
        borderColor: "#475569",
        borderWidth: 1,
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

  return (
    <div className="card-dark p-4 h-100">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h4 className="mb-1">
            Traffic Density
          </h4>

          <small className="text-secondary">
            Vehicle activity throughout the day
          </small>
        </div>

        <span className="badge bg-primary">
          Today
        </span>

      </div>

      <div style={{ height: "320px" }}>
        <Line
          data={trafficChartData}
          options={options}
        />
      </div>

    </div>
  );
}

export default TrafficChart;