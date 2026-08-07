import {
  CarFront,
  SignStop,
  Speedometer2,
  Cpu,
} from "react-bootstrap-icons";

export const dashboardStats = [
  {
    title: "Vehicles Detected",
    value: "1,247",
    icon: CarFront,
    color: "#3B82F6",
  },
  {
    title: "Congested Lanes",
    value: "3 / 6",
    icon: SignStop,
    color: "#EF4444",
  },
  {
    title: "Average Speed",
    value: "48 km/h",
    icon: Speedometer2,
    color: "#22C55E",
  },
  {
    title: "AI Accuracy",
    value: "96.4%",
    icon: Cpu,
    color: "#F59E0B",
  },
];