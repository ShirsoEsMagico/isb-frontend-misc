import React from "react";
import LinkedInLogin from "./components/LinkedinLogin";
import ScreenRecorder from "./components/ScreenRecorder";
import AudioTranscription from "./components/AudioTranscription";
import CCAvenueGatewayComponent from "./components/ccavenue";

const App = () => {
  return (
    <div>
      <h1>MY APP:</h1>
      {/* <LinkedInLogin/> */}
      {/* <ScreenRecorder/> */}
      {/* <AudioTranscription/> */}
      <CCAvenueGatewayComponent/>
    </div>
  );
};

export default App;
