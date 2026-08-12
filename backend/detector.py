import os
import cv2

from sahi import AutoDetectionModel
from sahi.predict import get_sliced_prediction


# ============================================================
# TARGET TRAFFIC CLASSES
# ============================================================

TARGET_CLASSES = {
    0: "person",
    1: "bicycle",
    2: "car",
    3: "motorcycle",
    5: "bus",
    7: "truck",
}


# ============================================================
# LOAD YOLO26 THROUGH SAHI
# ============================================================

print("Loading YOLO26 through SAHI...")

detection_model = AutoDetectionModel.from_pretrained(
    model_type="ultralytics",
    model_path="yolo26n.pt",
    confidence_threshold=0.20,
    device="cpu",
)

print("YOLO26 + SAHI loaded successfully!")


# ============================================================
# DRAW DETECTION
# ============================================================

def draw_detection(frame, prediction):
    """
    Draw one SAHI detection on the frame.
    """

    bbox = prediction.bbox

    x1 = int(bbox.minx)
    y1 = int(bbox.miny)
    x2 = int(bbox.maxx)
    y2 = int(bbox.maxy)

    class_id = prediction.category.id
    class_name = TARGET_CLASSES.get(
        int(class_id),
        prediction.category.name
    )

    confidence = prediction.score.value

    # Draw bounding box
    cv2.rectangle(
        frame,
        (x1, y1),
        (x2, y2),
        (0, 255, 0),
        2,
    )

    # Label
    label = f"{class_name} {confidence:.2f}"

    cv2.putText(
        frame,
        label,
        (x1, max(y1 - 8, 20)),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (0, 255, 0),
        2,
    )


# ============================================================
# VIDEO DETECTION
# ============================================================

def detect_video(video_path):

    print()
    print("=" * 60)
    print("STARTING SAHI VIDEO DETECTION")
    print("=" * 60)

    print(f"Input video: {video_path}")
    print("Device: CPU")
    print("Method: YOLO26 + SAHI")
    print()

    # --------------------------------------------------------
    # OPEN VIDEO
    # --------------------------------------------------------

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():

        print("ERROR: Could not open video.")

        return

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    print(f"Resolution: {width} x {height}")
    print(f"FPS: {fps}")
    print(f"Total frames: {frame_count}")
    print()

    # --------------------------------------------------------
    # OUTPUT DIRECTORY
    # --------------------------------------------------------

    output_directory = os.path.join(
        "..",
        "processed_videos"
    )

    os.makedirs(
        output_directory,
        exist_ok=True
    )

    output_path = os.path.join(
        output_directory,
        "sahi_detected_traffic.avi"
    )

    # --------------------------------------------------------
    # VIDEO WRITER
    # --------------------------------------------------------

    fourcc = cv2.VideoWriter_fourcc(
        *"XVID"
    )

    writer = cv2.VideoWriter(
        output_path,
        fourcc,
        fps,
        (width, height)
    )

    # --------------------------------------------------------
    # PROCESS FRAMES
    # --------------------------------------------------------

    frame_number = 0

    while True:

        success, frame = cap.read()

        if not success:
            break

        frame_number += 1

        print(
            f"\rProcessing frame "
            f"{frame_number}/{frame_count}",
            end=""
        )

        # ----------------------------------------------------
        # SAHI SLICED INFERENCE
        # ----------------------------------------------------

        result = get_sliced_prediction(
            frame,
            detection_model,

            # Size of each slice
            slice_height=512,
            slice_width=512,

            # Overlap between neighboring slices
            overlap_height_ratio=0.20,
            overlap_width_ratio=0.20,

            verbose=0,
        )

        # ----------------------------------------------------
        # DRAW ONLY OUR TARGET CLASSES
        # ----------------------------------------------------

        for prediction in result.object_prediction_list:

            class_id = int(
                prediction.category.id
            )

            if class_id in TARGET_CLASSES:

                draw_detection(
                    frame,
                    prediction
                )

        # ----------------------------------------------------
        # WRITE PROCESSED FRAME
        # ----------------------------------------------------

        writer.write(frame)

    # --------------------------------------------------------
    # CLEANUP
    # --------------------------------------------------------

    cap.release()
    writer.release()

    print()
    print()
    print("=" * 60)
    print("SAHI DETECTION COMPLETED")
    print("=" * 60)
    print(f"Output saved to:")
    print(output_path)
    print()


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 60)
    print("TrafficFlow AI - SAHI Traffic Detector")
    print("=" * 60)

    video_filename = "857004-hd_1280_720_30fps.mp4"

    video_path = os.path.join(
        "uploads",
        video_filename
    )

    if not os.path.exists(video_path):

        print()
        print("ERROR: Video not found!")
        print(f"Expected location: {video_path}")

    else:

        print()
        print("Video found successfully!")

        detect_video(video_path)