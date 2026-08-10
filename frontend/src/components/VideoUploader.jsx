import { useState } from "react";
import {
  CloudArrowUpFill,
  FileEarmarkPlayFill,
  CheckCircleFill,
} from "react-bootstrap-icons";

function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setUploaded(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploading(true);

    // Simulate upload for now
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
  };

  return (
    <div className="card-dark p-5">

      <div className="text-center">

        <CloudArrowUpFill
          size={55}
          className="text-primary mb-3"
        />

        <h3>Upload Traffic Video</h3>

        <p className="text-secondary">
          Select a traffic video for AI-based analysis
        </p>

        <input
          type="file"
          accept="video/mp4,video/avi,video/quicktime"
          id="video-upload"
          className="d-none"
          onChange={handleFileChange}
        />

        <label
          htmlFor="video-upload"
          className="btn btn-primary px-4 mt-3"
        >
          Choose Video
        </label>

      </div>

      {selectedFile && (
        <div className="mt-4 p-3 rounded border border-secondary">

          <div className="d-flex align-items-center">

            <FileEarmarkPlayFill
              size={30}
              className="text-primary me-3"
            />

            <div className="flex-grow-1">

              <strong>
                {selectedFile.name}
              </strong>

              <div className="text-secondary small">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </div>

            </div>

          </div>

          <button
            className="btn btn-success mt-3 w-100"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload & Analyze"}
          </button>

        </div>
      )}

      {uploading && (
        <div className="mt-4">

          <div className="progress">

            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: "100%" }}
            >
              Processing
            </div>

          </div>

        </div>
      )}

      {uploaded && (
        <div className="alert alert-success mt-4 d-flex align-items-center">

          <CheckCircleFill className="me-2" />

          Video uploaded successfully. Analysis will begin shortly.

        </div>
      )}

      <div className="text-center mt-4">

        <small className="text-secondary">
          Supported formats: MP4, AVI, MOV
        </small>

      </div>

    </div>
  );
}

export default VideoUploader;