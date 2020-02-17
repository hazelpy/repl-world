const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("src/public"));
app.get("/", (req, res) => {
    res.render("/index.jade");
});

app.get("/home", (req, res) => {
    if (req.get("X-Replit-User-Id")) {
        res.render("/home/index.jade", {
            user: {
                id: req.get("X-Replit-User-Id"),
                name: req.get("X-Replit-User-Name")
            }
        });
    }
});

http.listen(3000, () => {
    console.log("Listening for connections...");
});

io.on("connection", socket => {
    console.log(`Socket with id of ${socket.id} has connected!`);
    socket.on("disconnect", () => {
        console.log(`Client socket id#${socket.id} has disconnected.`);
    });
});