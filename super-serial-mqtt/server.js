const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://23.21.151.236");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
      client.publish("helloworld/connect", "Hello mqtt from node mqtt client");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
// const { SerialPort } = require("serialport");
// const { ReadlineParser } = require("@serialport/parser-readline");

// const port = new SerialPort({ path: "/dev/cu.usbmodem21101", baudRate: 9600 });
// console.log("Serial port opened");
// const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
// console.log("parse");

// parser.on("data", (data) => {
//   console.log("data", data);
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       console.log(data);
//       client.send(data);
//     }
//   });
// });
