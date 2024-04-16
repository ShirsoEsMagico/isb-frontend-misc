import React, { useState } from "react";

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [videoURL, setVideoURL] = useState("");

  let chunks = [];
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "monitor" },
        audio: true,
      });
      const displaySurface = stream
        .getVideoTracks()[0]
        .getSettings().displaySurface;
      if (displaySurface === "monitor") {
        setErrorMessage("");
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const recordedBlob = new Blob(chunks, { type: "video/webm" });
          const url = URL.createObjectURL(recordedBlob);
          setVideoURL(url);
          setRecording(false);
          setMediaRecorder(null);
          chunks = [];
        };

        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);
      } else {
        setErrorMessage(
          "Please share your entire screen and try recording again."
        );
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (error) {
      console.error("Error accessing screen: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      {errorMessage && <div> {errorMessage} </div>}

      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

      {videoURL && <video controls src={videoURL} />}
    </div>
  );
};

export default ScreenRecorder;
