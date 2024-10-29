import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketches/sketch.js";

function App() {
  const [asciiData, setAsciiData] = useState({ text: "" });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      console.log("Received WebSocket data:", event.data);
      setAsciiData({ text: event.data });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>React and p5.js Integration with sound</h1>
      <ReactP5Wrapper sketch={sketch} ascii={asciiData} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;