import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const ScreenRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ screen: true, video: true });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const recording = status === "recording";
  const stopped = status === "stopped";

  const handleStartRecording = () => {
    setErrorMessage("");
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  useEffect(() => {
    const handlePreview = () => {
      if (previewStream && previewStream.getVideoTracks().length > 0) {
        const isEntireScreen =
          previewStream.getVideoTracks()[0].getSettings().displaySurface ===
          "monitor";
        if (isEntireScreen) {
          setShowPreview(true);
        } else {
          setErrorMessage("Please share your entire screen and try recording again.");
        }
      }
    };

    if (stopped) {
      handlePreview();
    }
  }, [stopped, previewStream]);

  if (showPreview) {
    return (
      <div>
        <h2>Preview</h2>
        <video src={mediaBlobUrl} controls />
      </div>
    );
  }

  return (
    <div>
      {recording && <div>Recording in progress...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <button onClick={handleStartRecording} disabled={recording}>
          Start recording
        </button>
        <button onClick={handleStopRecording} disabled={!recording}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default ScreenRecorder;
