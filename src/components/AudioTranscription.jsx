import React, { useState, useRef } from "react";
import openai from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
openai.apiKey = OPENAI_API_KEY;

const AudioTranscription = () => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorder = useRef(null);
  const audioBlob = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = handleDataAvailable;
      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setRecording(false);
      setTranscription("Error: Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      audioBlob.current = new Blob([event.data], { type: "audio/wav" });
      handleTranscription();
    } else {
      console.error("No audio recorded");
      setTranscription("Error: No audio recorded");
    }
  };

  const handleTranscription = async () => {
    if (!audioBlob.current) {
      console.error("No audio recorded");
      setTranscription("Error: No audio recorded");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob.current);
    formData.append("model", "whisper-1");
    formData.append("language", "en");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to transcribe audio: ${response.statusText}`);
      }

      const data = await response.json();
      setTranscription(data.text);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscription("Error: Failed to transcribe audio");
    } finally {
      audioBlob.current = null;
    }
  };

  return (
    <div>
      <h1>Audio Transcription App</h1>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioTranscription;
