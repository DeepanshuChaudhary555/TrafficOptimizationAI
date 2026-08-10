import VideoUploader from "../components/VideoUploader";

function Upload() {
  return (
    <>
      <h1 className="page-title">
        Upload Traffic Video
      </h1>

      <p className="sub-title mb-5">
        Upload a traffic video for AI-powered analysis.
      </p>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <VideoUploader />
        </div>
      </div>
    </>
  );
}

export default Upload;