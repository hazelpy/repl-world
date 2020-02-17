const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.listen(3000);