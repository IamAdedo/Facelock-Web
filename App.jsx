import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function App() {
  const videoRef = useRef();
  const [status, setStatus] = useState("Loading...");

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => videoRef.current.srcObject = stream)
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setStatus("Models loaded. Ready to recognize face.");
      startVideo();
    };
    loadModels();
  }, []);

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">FaceLock Login</h1>
      <video ref={videoRef} autoPlay muted width="400" height="300" className="mx-auto rounded-lg border border-gray-700" />
      <p className="mt-4">{status}</p>
    </div>
  );
}

export default App;
