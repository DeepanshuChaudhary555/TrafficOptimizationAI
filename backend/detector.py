import os
import json
import cv2
import numpy as np

import supervision as sv

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
# BYTE TRACK
# ============================================================

tracker = sv.ByteTrack()

print("ByteTrack initialized successfully!")


# ============================================================
# VIDEO DETECTION + TRACKING
# ============================================================

def detect_and_track_video(video_path):

    print()
    print("=" * 60)
    print("STARTING SAHI + BYTE TRACK")
    print("=" * 60)

    print(f"Input video: {video_path}")
    print("Device: CPU")
    print("Detector: YOLO26n + SAHI")
    print("Tracker: ByteTrack")
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

    output_video = os.path.join(
        output_directory,
        "tracked_traffic.avi"
    )

    output_json = os.path.join(
        output_directory,
        "tracking_data.json"
    )

    # --------------------------------------------------------
    # VIDEO WRITER
    # --------------------------------------------------------

    fourcc = cv2.VideoWriter_fourcc(
        *"XVID"
    )

    writer = cv2.VideoWriter(
        output_video,
        fourcc,
        fps,
        (width, height)
    )

    # --------------------------------------------------------
    # TRACKING DATA
    # --------------------------------------------------------

    tracking_data = []

    unique_track_ids = set()

    # --------------------------------------------------------
    # PROCESS VIDEO
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

        # ====================================================
        # SAHI DETECTION
        # ====================================================

        result = get_sliced_prediction(
            frame,
            detection_model,

            slice_height=512,
            slice_width=512,

            overlap_height_ratio=0.20,
            overlap_width_ratio=0.20,

            verbose=0,
        )

        # ====================================================
        # CONVERT SAHI PREDICTIONS
        # TO SUPERVISION DETECTIONS
        # ====================================================

        boxes = []
        confidences = []
        class_ids = []

        for prediction in result.object_prediction_list:

            class_id = int(
                prediction.category.id
            )

            # Keep only our target classes
            if class_id not in TARGET_CLASSES:
                continue

            bbox = prediction.bbox.to_xyxy()

            boxes.append(bbox)

            confidences.append(
                float(prediction.score.value)
            )

            class_ids.append(class_id)

        # ----------------------------------------------------
        # NO DETECTIONS
        # ----------------------------------------------------

        if len(boxes) == 0:

            writer.write(frame)
            continue

        # ----------------------------------------------------
        # CREATE SUPERVISION DETECTIONS
        # ----------------------------------------------------

        detections = sv.Detections(
            xyxy=np.array(
                boxes,
                dtype=np.float32
            ),

            confidence=np.array(
                confidences,
                dtype=np.float32
            ),

            class_id=np.array(
                class_ids,
                dtype=int
            ),
        )

        # ====================================================
        # BYTE TRACK
        # ====================================================

        tracked_detections = tracker.update_with_detections(
            detections
        )

        # ====================================================
        # DRAW TRACKED OBJECTS
        # ====================================================

        for i in range(
            len(tracked_detections)
        ):

            tracker_id = tracked_detections.tracker_id[i]

            if tracker_id is None:
                continue

            tracker_id = int(tracker_id)

            class_id = int(
                tracked_detections.class_id[i]
            )

            confidence = float(
                tracked_detections.confidence[i]
            )

            bbox = tracked_detections.xyxy[i]

            x1, y1, x2, y2 = map(
                int,
                bbox
            )

            class_name = TARGET_CLASSES[
                class_id
            ]

            # ------------------------------------------------
            # REMEMBER UNIQUE TRACK IDs
            # ------------------------------------------------

            unique_track_ids.add(
                tracker_id
            )

            # ------------------------------------------------
            # DRAW BOX
            # ------------------------------------------------

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2
            )

            # ------------------------------------------------
            # DRAW LABEL
            # ------------------------------------------------

            label = (
                f"ID {tracker_id} "
                f"{class_name} "
                f"{confidence:.2f}"
            )

            cv2.putText(
                frame,
                label,
                (x1, max(y1 - 8, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2
            )

            # ------------------------------------------------
            # SAVE TRACK DATA
            # ------------------------------------------------

            tracking_data.append({
                "frame": frame_number,
                "track_id": tracker_id,
                "class_id": class_id,
                "class_name": class_name,
                "confidence": round(
                    confidence,
                    4
                ),
                "x1": x1,
                "y1": y1,
                "x2": x2,
                "y2": y2
            })

        # ----------------------------------------------------
        # WRITE FRAME
        # ----------------------------------------------------

        writer.write(frame)

    # ========================================================
    # CLEANUP
    # ========================================================

    cap.release()
    writer.release()

    # ========================================================
    # SAVE TRACKING DATA
    # ========================================================

    with open(
        output_json,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            tracking_data,
            file,
            indent=2
        )

    print()
    print()
    print("=" * 60)
    print("TRACKING COMPLETED")
    print("=" * 60)

    print(f"Tracked unique objects: {len(unique_track_ids)}")

    print()
    print("Output video:")
    print(output_video)

    print()
    print("Tracking data:")
    print(output_json)

    print()


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 60)
    print("TrafficFlow AI")
    print("YOLO26 + SAHI + ByteTrack")
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

        detect_and_track_video(
            video_path
        )