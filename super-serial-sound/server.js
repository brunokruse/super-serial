const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const port = new SerialPort({ path: "/dev/cu.usbmodem21101", baudRate: 9600 });
console.log("Serial port opened");
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
console.log("parse");

parser.on("data", (data) => {
  console.log("data", data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log(data);
      client.send(data);
    }
  });
});
