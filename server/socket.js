const express = require("express");
const expressWs = require("express-ws");

const { app, wsRoute } = expressWs(express());

app.ws("/echo", (ws) => {
  ws.on("message", (msg) => {
    console.log("Received from client: ", msg);

    const data = {
      data: "Hi from server",
    };

    const res = JSON.stringify(data);
    ws.send(res);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World despro!");
});

app.listen(8080, () => console.log("Server has been started"));
