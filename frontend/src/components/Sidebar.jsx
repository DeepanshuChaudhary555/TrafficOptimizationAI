import {
  House,
  Upload,
  CameraVideo,
  BarChart,
  FileEarmarkText,
  Gear,
} from "react-bootstrap-icons";

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

        <a href="#" className="text-light">
          <House className="me-2" />
          Dashboard
        </a>

        <a href="#" className="text-light">
          <Upload className="me-2" />
          Upload
        </a>

        <a href="#" className="text-light">
          <CameraVideo className="me-2" />
          Detection
        </a>

        <a href="#" className="text-light">
          <BarChart className="me-2" />
          Analytics
        </a>

        <a href="#" className="text-light">
          <FileEarmarkText className="me-2" />
          Reports
        </a>

        <a href="#" className="text-light">
          <Gear className="me-2" />
          Settings
        </a>

      </div>
    </div>
  );
}

export default Sidebar;