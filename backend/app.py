import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from db import get_db_connection


app = Flask(__name__)

CORS(app)


# ============================================
# CONFIGURATION
# ============================================

UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "uploads"
)

ALLOWED_EXTENSIONS = {"mp4", "avi", "mov"}

MAX_FILE_SIZE = 500 * 1024 * 1024  # 500 MB

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE


# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ============================================
# HELPER
# ============================================

def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


# ============================================
# HEALTH CHECK
# ============================================

@app.route("/api/health", methods=["GET"])
def health_check():

    try:

        connection = get_db_connection()

        connection.close()

        return jsonify({
            "status": "success",
            "message": "TrafficFlow AI backend is running",
            "database": "connected"
        })

    except Exception as error:

        return jsonify({
            "status": "error",
            "message": "Database connection failed",
            "error": str(error)
        }), 500


# ============================================
# DASHBOARD
# ============================================

@app.route("/api/dashboard", methods=["GET"])
def dashboard():

    try:

        connection = get_db_connection()

        with connection.cursor() as cursor:

            cursor.execute("""
                SELECT COUNT(*)
                FROM detections;
            """)

            total_detections = cursor.fetchone()[0]


            cursor.execute("""
                SELECT COUNT(*)
                FROM traffic_analysis
                WHERE congestion_level IN ('high', 'critical');
            """)

            congested_lanes = cursor.fetchone()[0]


        connection.close()


        return jsonify({
            "total_detections": total_detections,
            "congested_lanes": congested_lanes,
            "average_speed": 0,
            "ai_accuracy": 0
        })


    except Exception as error:

        return jsonify({
            "status": "error",
            "message": str(error)
        }), 500


# ============================================
# VIDEO UPLOAD
# ============================================

@app.route("/api/upload", methods=["POST"])
def upload_video():

    try:

        # Check if a file was provided
        if "video" not in request.files:

            return jsonify({
                "status": "error",
                "message": "No video file provided."
            }), 400


        file = request.files["video"]


        # Check filename
        if file.filename == "":

            return jsonify({
                "status": "error",
                "message": "No video file selected."
            }), 400


        # Check extension
        if not allowed_file(file.filename):

            return jsonify({
                "status": "error",
                "message": "Unsupported video format. Use MP4, AVI, or MOV."
            }), 400


        # Make filename safe
        original_filename = secure_filename(file.filename)


        if not original_filename:

            return jsonify({
                "status": "error",
                "message": "Invalid filename."
            }), 400


        # Save video
        file_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            original_filename
        )

        file.save(file_path)


        # Store database record
        connection = get_db_connection()

        with connection.cursor() as cursor:

            cursor.execute(
                """
                INSERT INTO videos
                (
                    filename,
                    file_path,
                    processing_status
                )
                VALUES (%s, %s, %s)
                RETURNING id;
                """,
                (
                    original_filename,
                    file_path,
                    "pending"
                )
            )

            video_id = cursor.fetchone()[0]

        connection.commit()
        connection.close()


        return jsonify({
            "status": "success",
            "message": "Video uploaded successfully.",
            "video_id": video_id,
            "filename": original_filename,
            "processing_status": "pending"
        }), 201


    except Exception as error:

        return jsonify({
            "status": "error",
            "message": str(error)
        }), 500


# ============================================
# MAIN
# ============================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )