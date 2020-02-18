const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let players = {};
function set(dict, key, value) {
    dict[key] = value;
}

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

    socket.on("join", (data) => {
        let id = data[0];
        let p = data[1];
        
        set(players, socket.id, p);
        socket.broadcast.emit("joined", players);
        console.log(`Player #${id} joined!`);
        console.log(`Player data: ${id}, ${p}`);
    });

    socket.on("move", (id, op, np) => {
        players[socket.id]["position"] = np;
        io.sockets.emit("move", players);
        console.log("Server got movement from player");
    });

    socket.on("disconnect", () => {
        set(players, socket.id, null);
        console.log(`Client socket id of ${socket.id} has disconnected.`);
    });
});
