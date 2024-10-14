export default function sketch(p5) {
  console.log("ml5 version:", ml5.version);

  let faceMesh;
  let video;
  let predictions = [];
  let setFace;
  let faceDetected = false;
  let faceTimer = null;
  let detectionActive = false;

  const detectionOptions = {
    flipHorizontal: false, // Optional, flip video for mirror effect
  };

  function gotFaces(results) {
    predictions = results;

    p5.background(255);
    p5.image(video, 0, 0, p5.width, p5.height);

    if (predictions.length > 0) {
      drawLandmarks(predictions);
      onFaceDetected();
    } else {
      onFaceNotDetected();
    }
  }

  function modelReady() {
    console.log("Model ready!");
    faceMesh.detectStart(video.elt, gotFaces);
  }

  p5.setup = function () {
    p5.createCanvas(360, 270);
    video = p5.createCapture(p5.VIDEO);
    video.size(p5.width, p5.height);
    video.hide();

    faceMesh = ml5.faceMesh(video, detectionOptions, modelReady);
  };

  p5.draw = function () {
    // Drawing handled in gotFaces
  };

  p5.updateWithProps = (props) => {
    if (props.setFace) {
      setFace = props.setFace;
    }
  };

  function drawLandmarks(predictions) {
    p5.noFill();
    p5.stroke(161, 95, 251);
    p5.strokeWeight(2);

    predictions.forEach((prediction) => {
      const keypoints = prediction.keypoints || prediction.scaledMesh;
      if (keypoints && keypoints.length > 0) {
        keypoints.forEach((point) => {
          p5.ellipse(point[0], point[1], 5, 5);
        });
      }

      // Optionally draw specific facial features (e.g., left eye, lips)
      if (prediction.leftEye) drawFeature(prediction.leftEye.keypoints);
      if (prediction.rightEye) drawFeature(prediction.rightEye.keypoints);
      if (prediction.lips) drawFeature(prediction.lips.keypoints);
    });
  }

  function drawFeature(featureKeypoints) {
    if (featureKeypoints && featureKeypoints.length > 0) {
      featureKeypoints.forEach((point) => {
        p5.ellipse(point.x, point.y, 5, 5);
      });
    }
  }

  // Function to handle when a face is detected
  function onFaceDetected() {
    if (!faceDetected && !detectionActive) {
      detectionActive = true; // Prevent multiple detections
      clearFaceTimer();
      faceTimer = setTimeout(() => {
        console.log("Face detected for 500ms");
        faceDetected = true;
        detectionActive = false;
        setFace(faceDetected); // Notify external components
      }, 500);
    }
  }

  // Function to handle when no face is detected
  function onFaceNotDetected() {
    if (faceDetected && !detectionActive) {
      detectionActive = true; // Prevent multiple no-face detections
      clearFaceTimer();
      faceTimer = setTimeout(() => {
        console.log("No face detected for 500ms");
        faceDetected = false;
        detectionActive = false;
        setFace(faceDetected); // Notify external components
      }, 500);
    }
  }

  // Clear the timer if already running
  function clearFaceTimer() {
    if (faceTimer) {
      clearTimeout(faceTimer);
      faceTimer = null;
    }
  }
}
