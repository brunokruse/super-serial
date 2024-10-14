import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactP5Wrapper } from "react-p5-wrapper";

// example of a simple sketch inline:
// const sketch = (p) => {
//   p.setup = function () {
//     p.createCanvas(400, 200);
//     p.background(200);
//   };

//   p.draw = function () {
//     p.fill(255, 0, 0);
//     p.ellipse(50, 50, 50, 50);
//   };
// };

// but we will import from sketches
import sketch from "./sketches/sketch.js";

const socket = new WebSocket("ws://localhost:3001");

function App() {
  const [face, setFace] = React.useState("");
  const [socketConnected, setSocketConnected] = React.useState(false);

  useEffect(() => {
    if (socketConnected) {
      socket.send(face);
    }
  }, [face]);

  socket.onopen = (ws, event) => {
    console.log("Connected to WS Server", ws);
    setSocketConnected(true);
    socket.send("Hello from the client!");
  };

  socket.onmessage = (event) => {
    // Here, event.data will have the data sent from the server.
    // Update your state or p5.js sketch with the received data.
    const data = event.data;
  };

  return (
    <div className="App">
      {/* pass the sketch and the setFace function to the sketch */}
      <ReactP5Wrapper
        sketch={sketch}
        setFace={setFace}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
