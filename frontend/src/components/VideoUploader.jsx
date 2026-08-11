import { useState } from "react";
import axios from "axios";
import {
  CloudArrowUpFill,
  FileEarmarkPlayFill,
  CheckCircleFill,
} from "react-bootstrap-icons";

function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setUploaded(false);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploaded(false);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("video", selectedFile);

      await axios.post(
        "http://127.0.0.1:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploaded(true);
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Video upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#334155",
        border: "1px solid #475569",
        borderRadius: "14px",
        padding: "45px 30px",
        width: "100%",
        maxWidth: "890px",
        margin: "35px auto 0",
        textAlign: "center",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Upload Icon */}

      <CloudArrowUpFill
        size={55}
        style={{
          color: "#0d6efd",
          marginBottom: "18px",
        }}
      />

      {/* Heading */}

      <h3
        style={{
          color: "#ffffff",
          fontSize: "25px",
          fontWeight: "500",
          marginBottom: "8px",
        }}
      >
        Upload Traffic Video
      </h3>

      {/* Description */}

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "28px",
        }}
      >
        Select a traffic video for AI-based analysis
      </p>

      {/* Hidden File Input */}

      <input
        type="file"
        accept=".mp4,.avi,.mov,video/mp4,video/avi,video/quicktime"
        id="video-upload"
        className="d-none"
        onChange={handleFileChange}
      />

      {/* Choose Video */}

      {!selectedFile && !uploaded && (
        <label
          htmlFor="video-upload"
          className="btn btn-primary px-4"
          style={{
            cursor: "pointer",
            padding: "10px 25px",
            fontWeight: "500",
          }}
        >
          Choose Video
        </label>
      )}

      {/* Selected File */}

      {selectedFile && (
        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            borderRadius: "10px",
            border: "1px solid #64748b",
            backgroundColor: "#1e293b",
            textAlign: "left",
          }}
        >
          <div className="d-flex align-items-center">

            <FileEarmarkPlayFill
              size={32}
              style={{
                color: "#0d6efd",
                marginRight: "15px",
                flexShrink: 0,
              }}
            />

            <div className="flex-grow-1">

              <div
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  wordBreak: "break-word",
                }}
              >
                {selectedFile.name}
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </div>

            </div>

          </div>

          {/* Upload Button */}

          <button
            className="btn btn-success w-100 mt-3"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload & Analyze"}
          </button>

        </div>
      )}

      {/* Upload Progress */}

      {uploading && (
        <div className="mt-4">

          <div className="progress">

            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{
                width: "100%",
              }}
            >
              Uploading...
            </div>

          </div>

        </div>
      )}

      {/* Success */}

      {uploaded && (
        <div
          className="alert alert-success mt-4 d-flex align-items-center justify-content-center"
        >
          <CheckCircleFill className="me-2" />

          Video uploaded successfully.
          Analysis will begin shortly.
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="alert alert-danger mt-4">
          {error}
        </div>
      )}

      {/* Supported Formats */}

      <div
        style={{
          marginTop: "28px",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        Supported formats: MP4, AVI, MOV
      </div>
    </div>
  );
}

export default VideoUploader;