import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketches/sketch.js";

import mqtt from "mqtt";

const client = mqtt.connect("ws://23.21.151.236:9001");

client.on("connect", () => {
  console.log("Broker connected to our web sockets mqtt broker");
  client.subscribe("helloworld/ring");

  client.subscribe("helloworld/web", (err) => {
    if (!err) {
      client.publish("helloworld/web", "Hello mqtt");
      client.publish("helloworld/connect", "Hello mqtt from web mqtt client");
    }
  });
});

function App() {
  const [ringBell, setRingBell] = useState(null);
  console.log("App render", ringBell);

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

    client.on("message", (topic, message) => {
      // message is Buffer
      console.log("on message", topic, message.toString());
      if (topic === "helloworld/ring") {
        if (message.toString() === "on") {
          setRingBell(true);
        } else {
          setRingBell(false);
        }
      }
      //client.end();
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>React and p5.js Integration with MQTT</h1>
      <ReactP5Wrapper
        sketch={sketch}
        ringBell={ringBell}
        setRingBell={setRingBell}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
