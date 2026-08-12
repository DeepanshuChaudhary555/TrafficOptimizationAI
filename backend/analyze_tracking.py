import json
import os
from collections import Counter, defaultdict


# ============================================================
# CONFIGURATION
# ============================================================

TRACKING_FILE = os.path.join(
    "..",
    "processed_videos",
    "tracking_data.json"
)

CONFLICT_FILE = os.path.join(
    "..",
    "processed_videos",
    "classification_conflicts.json"
)


# ============================================================
# LOAD TRACKING DATA
# ============================================================

def load_tracking_data():

    if not os.path.exists(TRACKING_FILE):

        print()
        print("ERROR: Tracking data not found!")
        print(f"Expected file: {TRACKING_FILE}")
        print()
        print("Run detector.py first to generate tracking_data.json.")
        print()

        return None

    try:

        with open(
            TRACKING_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)

        return data

    except Exception as error:

        print()
        print("ERROR: Could not read tracking data.")
        print(error)
        print()

        return None


# ============================================================
# COLLECT TRACK OBSERVATIONS
# ============================================================

def collect_track_observations(data):

    track_classes = defaultdict(Counter)

    track_observations = defaultdict(list)

    track_confidences = defaultdict(
        lambda: defaultdict(list)
    )

    for detection in data:

        track_id = detection.get("track_id")
        class_name = detection.get("class_name")
        confidence = detection.get("confidence")

        if (
            track_id is None
            or class_name is None
        ):
            continue

        # ----------------------------------------------------
        # Count class observations
        # ----------------------------------------------------

        track_classes[track_id][class_name] += 1

        # ----------------------------------------------------
        # Store confidence values
        # ----------------------------------------------------

        if confidence is not None:

            track_confidences[
                track_id
            ][class_name].append(
                float(confidence)
            )

        # ----------------------------------------------------
        # Store complete detection observation
        # ----------------------------------------------------

        track_observations[
            track_id
        ].append(detection)

    return (
        track_classes,
        track_observations,
        track_confidences
    )


# ============================================================
# DETERMINE FINAL CLASS FOR EACH TRACK
# ============================================================

def determine_final_classes(data):

    (
        track_classes,
        track_observations,
        track_confidences
    ) = collect_track_observations(data)

    final_classes = {}

    for track_id, class_counts in track_classes.items():

        # ----------------------------------------------------
        # Find highest number of observations
        # ----------------------------------------------------

        highest_count = max(
            class_counts.values()
        )

        candidates = [
            class_name
            for class_name, count
            in class_counts.items()
            if count == highest_count
        ]

        # ----------------------------------------------------
        # One clear dominant class
        # ----------------------------------------------------

        if len(candidates) == 1:

            final_class = candidates[0]

        # ----------------------------------------------------
        # Tie → use average confidence
        # ----------------------------------------------------

        else:

            best_class = None
            best_confidence = -1

            for class_name in candidates:

                confidences = track_confidences[
                    track_id
                ][class_name]

                if confidences:

                    average_confidence = (
                        sum(confidences)
                        / len(confidences)
                    )

                else:

                    average_confidence = 0

                if average_confidence > best_confidence:

                    best_confidence = average_confidence
                    best_class = class_name

            final_class = best_class

        final_classes[track_id] = final_class

    return final_classes


# ============================================================
# SAVE CLASSIFICATION CONFLICTS
# ============================================================

def save_classification_conflicts(
    data,
    final_classes
):

    (
        track_classes,
        track_observations,
        track_confidences
    ) = collect_track_observations(data)

    conflicts = []

    # --------------------------------------------------------
    # Check every tracked object
    # --------------------------------------------------------

    for track_id, class_counts in track_classes.items():

        # ----------------------------------------------------
        # Only interested in objects classified as
        # more than one class
        # ----------------------------------------------------

        if len(class_counts) <= 1:
            continue

        final_class = final_classes.get(
            track_id
        )

        observations = []

        # ----------------------------------------------------
        # Save every observation for this track
        # ----------------------------------------------------

        for detection in track_observations[track_id]:

            observations.append({

                "frame": detection.get(
                    "frame"
                ),

                "class": detection.get(
                    "class_name"
                ),

                "confidence": detection.get(
                    "confidence"
                ),

                "bbox": [
                    detection.get("x1"),
                    detection.get("y1"),
                    detection.get("x2"),
                    detection.get("y2")
                ]

            })

        # ----------------------------------------------------
        # Create conflict record
        # ----------------------------------------------------

        conflict_record = {

            "track_id": track_id,

            "final_class": final_class,

            "observed_classes": dict(
                class_counts
            ),

            "observations": observations,

            "review_status": "pending"

        }

        conflicts.append(
            conflict_record
        )

    # ========================================================
    # SAVE JSON FILE
    # ========================================================

    output_directory = os.path.dirname(
        CONFLICT_FILE
    )

    os.makedirs(
        output_directory,
        exist_ok=True
    )

    with open(
        CONFLICT_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            conflicts,
            file,
            indent=2
        )

    print()
    print("CLASSIFICATION CONFLICTS")
    print("-" * 60)

    print(
        f"Conflicting tracks : "
        f"{len(conflicts)}"
    )

    print(
        f"Saved to           : "
        f"{CONFLICT_FILE}"
    )

    return conflicts


# ============================================================
# CALCULATE PEAK OBJECTS
# ============================================================

def calculate_peak_objects(data):

    vehicles_per_frame = defaultdict(set)

    for detection in data:

        frame = detection.get("frame")
        track_id = detection.get("track_id")

        if (
            frame is not None
            and track_id is not None
        ):

            vehicles_per_frame[
                frame
            ].add(track_id)

    peak_objects = 0
    peak_frame = 0

    for frame, track_ids in vehicles_per_frame.items():

        object_count = len(track_ids)

        if object_count > peak_objects:

            peak_objects = object_count
            peak_frame = frame

    return (
        peak_objects,
        peak_frame
    )


# ============================================================
# ANALYZE TRACKING DATA
# ============================================================

def analyze_tracking(data):

    if not data:

        print(
            "No tracking data available."
        )

        return

    # ========================================================
    # BASIC METRICS
    # ========================================================

    unique_tracks = set()

    confidence_values = []

    # --------------------------------------------------------
    # Process all detections
    # --------------------------------------------------------

    for detection in data:

        track_id = detection.get(
            "track_id"
        )

        confidence = detection.get(
            "confidence"
        )

        if track_id is not None:

            unique_tracks.add(
                track_id
            )

        if confidence is not None:

            confidence_values.append(
                float(confidence)
            )

    # ========================================================
    # FINAL CLASSIFICATION
    # ========================================================

    final_classes = determine_final_classes(
        data
    )

    # ========================================================
    # SAVE CONFLICT DATA
    # ========================================================

    conflicts = save_classification_conflicts(
        data,
        final_classes
    )

    # ========================================================
    # FINAL CLASS COUNTS
    # ========================================================

    final_class_counts = Counter(
        final_classes.values()
    )

    # ========================================================
    # BASIC CALCULATIONS
    # ========================================================

    total_detection_records = len(
        data
    )

    total_unique_objects = len(
        unique_tracks
    )

    average_confidence = (

        sum(confidence_values)
        / len(confidence_values)

        if confidence_values

        else 0
    )

    # ========================================================
    # PEAK OBJECTS
    # ========================================================

    (
        peak_objects,
        peak_frame
    ) = calculate_peak_objects(
        data
    )

    # ========================================================
    # DISPLAY RESULTS
    # ========================================================

    print()
    print("=" * 60)
    print("TrafficFlow AI - Tracking Analysis")
    print("=" * 60)

    # ========================================================
    # GENERAL METRICS
    # ========================================================

    print()
    print("GENERAL METRICS")
    print("-" * 60)

    print(
        f"Total detection records : "
        f"{total_detection_records}"
    )

    print(
        f"Unique tracked objects  : "
        f"{total_unique_objects}"
    )

    print(
        f"Average confidence      : "
        f"{average_confidence:.2f}"
    )

    print(
        f"Peak objects visible    : "
        f"{peak_objects}"
    )

    print(
        f"Peak traffic frame      : "
        f"{peak_frame}"
    )

    # ========================================================
    # FINAL OBJECT COUNTS
    # ========================================================

    print()
    print("FINAL OBJECT COUNTS")
    print("-" * 60)

    for class_name, count in sorted(
        final_class_counts.items()
    ):

        print(
            f"{class_name:<15} : {count}"
        )

    # ========================================================
    # CLASSIFICATION CHECK
    # ========================================================

    total_classified_objects = sum(
        final_class_counts.values()
    )

    print()
    print("CLASSIFICATION CHECK")
    print("-" * 60)

    print(
        f"Unique tracked objects : "
        f"{total_unique_objects}"
    )

    print(
        f"Classified objects     : "
        f"{total_classified_objects}"
    )

    if (
        total_classified_objects
        == total_unique_objects
    ):

        print(
            "Status                 : "
            "PASS"
        )

    else:

        print(
            "Status                 : "
            "WARNING - counts do not match"
        )

    # ========================================================
    # CLASS CONSISTENCY
    # ========================================================

    (
        track_classes,
        track_observations,
        track_confidences
    ) = collect_track_observations(
        data
    )

    inconsistent_tracks = 0

    for track_id, class_counts in track_classes.items():

        if len(class_counts) > 1:

            inconsistent_tracks += 1

    print()
    print("TRACK CLASS CONSISTENCY")
    print("-" * 60)

    print(
        f"Tracks with class changes : "
        f"{inconsistent_tracks}"
    )

    # ========================================================
    # CONFLICT RATE
    # ========================================================

    if total_unique_objects > 0:

        conflict_rate = (
            inconsistent_tracks
            / total_unique_objects
        ) * 100

    else:

        conflict_rate = 0

    print(
        f"Class conflict rate       : "
        f"{conflict_rate:.2f}%"
    )

    # ========================================================
    # COMPLETION
    # ========================================================

    print()
    print("=" * 60)
    print("ANALYSIS COMPLETED")
    print("=" * 60)
    print()


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    print()
    print("Loading tracking data...")

    tracking_data = load_tracking_data()

    if tracking_data is not None:

        print(
            f"Loaded {len(tracking_data)} "
            f"detection records."
        )

        analyze_tracking(
            tracking_data
        )