const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("src/public"));
app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.listen(3000, () => {
    console.log("Listening for connections...");
});

io.on("connection", socket => {
    console.log(`Socket with id of ${socket.id} has connected!`);
    socket.on("disconnect", () => {
        console.log(`Client socket id#${socket.id} has disconnected.`);
    });
});