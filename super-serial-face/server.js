const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const port = new SerialPort({ path: "/dev/cu.usbmodem21101", baudRate: 9600 });
console.log("Serial port opened");
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
console.log("parse");

wss.on("connection", (ws) => {
  console.log("Client connected");
  // add a listener that can send data to the arduino
  // from the client
  ws.on("message", function message(data) {
    console.log("received from websockets: %s", data);
    port.write(data);
  });
});

parser.on("data", (data) => {
  console.log("server received from arduino: ", data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      // simply send the data to the client as a string
      client.send(data.toString());
    }
  });
});
