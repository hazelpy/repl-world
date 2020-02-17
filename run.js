const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("/public"));
app.get("/", (req, res) => {
    if (req.get("X-Replit-User-Id")) {
        res.render("index.pug", {
            user: {
                id: req.get("X-Replit-User-Id"),
                name: req.get("X-Replit-User-Name")
            }
        })
    } else {
        res.render("index.pug", {
            user: false
        });
    }
});

http.listen(3000, () => {
    console.log("Listening for connections...");
});

io.on("connection", socket => {
    console.log(`Socket with id of ${socket.id} has connected!`);

    socket.on("join", (id, p) => {
        socket.broadcast.emit("joined", [id, pos]);
        console.log(`Player #${id} joined!`);
    });

    socket.on("move", (id, op, np) => {
        socket.broadcast.emit("move", [id, op, np]);
        console.log("Server got movement from player");
    });

    socket.on("disconnect", () => {
        console.log(`Client socket id#${socket.id} has disconnected.`);
    });
});
