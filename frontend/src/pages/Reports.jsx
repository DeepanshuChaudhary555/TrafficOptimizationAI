import { Download } from "react-bootstrap-icons";
import ReportTable from "../components/ReportTable";

function Reports() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">

        <div>
          <h1 className="page-title">
            Traffic Reports
          </h1>

          <p className="sub-title">
            View and manage traffic analysis reports.
          </p>
        </div>

        <button className="btn btn-primary">
          <Download className="me-2" />
          Generate Report
        </button>

      </div>

      <div className="mt-5">
        <ReportTable />
      </div>
    </>
  );
}

export default Reports;