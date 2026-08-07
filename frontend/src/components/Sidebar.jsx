import {
  House,
  Upload,
  CameraVideo,
  BarChart,
  FileEarmarkText,
  Gear,
} from "react-bootstrap-icons";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#1E293B",
        minHeight: "calc(100vh - 70px)",
        padding: "20px",
        borderRight: "1px solid #475569",
      }}
    >
      <h5 className="text-light mb-4">Navigation</h5>

      <div className="d-flex flex-column gap-3">

        <NavLink
            to="/"
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
        >
            <House className="me-2" />
            Dashboard
        </NavLink>

        <NavLink
            to="/upload"
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
        >
            <Upload className="me-2" />
            Upload
        </NavLink>

        <NavLink
            to="/detection"
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
        >
            <CameraVideo className="me-2" />
            Detection
        </NavLink>

        <NavLink
            to="/analytics"
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
        >
            <BarChart className="me-2" />
            Analytics
        </NavLink>

        <NavLink
            to="/reports"
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
        >
            <FileEarmarkText className="me-2" />
            Reports
        </NavLink>

        <NavLink
            to="/settings"
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
        >
            <Gear className="me-2" />
            Settings
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;