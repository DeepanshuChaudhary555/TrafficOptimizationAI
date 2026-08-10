import { FileEarmarkTextFill } from "react-bootstrap-icons";
import { reports } from "../data/reportData";

function ReportTable() {
  return (
    <div className="card-dark p-4">

      <div className="table-responsive">

        <table className="table table-dark table-borderless align-middle">

          <thead>
            <tr>
              <th>Report</th>
              <th>Date</th>
              <th>Vehicles</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {reports.map((report) => (
              <tr key={report.id}>

                <td>
                  <FileEarmarkTextFill className="text-primary me-2" />
                  {report.name}
                </td>

                <td className="text-secondary">
                  {report.date}
                </td>

                <td>
                  {report.vehicles.toLocaleString()}
                </td>

                <td>
                  <span className="badge bg-success">
                    {report.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReportTable;