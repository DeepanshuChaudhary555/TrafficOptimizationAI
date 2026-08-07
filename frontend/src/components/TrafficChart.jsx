import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TrafficChart() {
  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {
        label: "Traffic Density",
        data: [120, 240, 180, 310, 420, 380, 290],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "#F8FAFC",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#CBD5E1",
        },

        grid: {
          color: "#334155",
        },
      },

      y: {
        ticks: {
          color: "#CBD5E1",
        },

        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="card-dark p-4 h-100">
      <h4 className="mb-4">Traffic Density</h4>

      <Line data={data} options={options} />
    </div>
  );
}

export default TrafficChart;