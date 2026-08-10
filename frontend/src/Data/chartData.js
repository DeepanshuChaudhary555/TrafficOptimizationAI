export const trafficChartData = {
  labels: [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
  ],

  datasets: [
    {
      label: "Vehicles Detected",

      data: [
        120,
        340,
        280,
        420,
        390,
        560,
        720,
        480,
      ],

      borderColor: "#3B82F6",

      backgroundColor: "rgba(59, 130, 246, 0.15)",

      borderWidth: 3,

      pointRadius: 4,

      pointHoverRadius: 7,

      tension: 0.4,

      fill: true,
    },
  ],
};