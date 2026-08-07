import { recentUploads } from "../data/uploadsData";
import {
  CameraVideoFill,
  CheckCircleFill,
  ClockFill,
} from "react-bootstrap-icons";

function RecentUploads() {
  return (
    <div className="card-dark p-4 h-100">

      <h4 className="mb-4">
        Recent Uploads
      </h4>

      {recentUploads.map((video) => (

        <div
          key={video.id}
          className="d-flex justify-content-between align-items-center mb-3"
        >

          <div>

            <div className="fw-bold">
              <CameraVideoFill className="me-2 text-primary" />
              {video.name}
            </div>

            <small className="text-secondary">
              {video.time}
            </small>

          </div>

          <div>

            {video.status === "Processed" ? (
              <span className="text-success">
                <CheckCircleFill className="me-1" />
                Processed
              </span>
            ) : (
              <span className="text-warning">
                <ClockFill className="me-1" />
                Processing
              </span>
            )}

          </div>

        </div>

      ))}

    </div>
  );
}

export default RecentUploads;