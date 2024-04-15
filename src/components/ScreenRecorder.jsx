import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const ScreenRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true, video: true });

  const recording = status === "recording";
  const stopped = status === "stopped";

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <div>
      {recording && <div>Recording in progress...</div>}
      {stopped && (
        <>
          <h2>Preview</h2>
          <video src={mediaBlobUrl} controls />
        </>
      )}
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
