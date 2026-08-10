export const vehicleDistribution = {
  labels: ["Cars", "Buses", "Trucks", "Motorcycles"],
  datasets: [
    {
      label: "Vehicles",
      data: [520, 85, 140, 210],
      backgroundColor: [
        "#3B82F6",
        "#22C55E",
        "#F59E0B",
        "#EF4444",
      ],
      borderWidth: 0,
    },
  ],
};

export const weeklyTraffic = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Vehicles Detected",
      data: [820, 1050, 980, 1240, 1420, 1680, 1130],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
  ],
};