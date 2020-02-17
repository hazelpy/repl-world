let socket = io();
let players = {};
let ID = Math.random() * 1000;

function set(dict, key, value) {
    dict[key] = value;
}

socket.emit("join", [ID, [0, 0]]);
socket.on("joined", (id, p) => {
    set(players, id, {"position": p});
});

socket.on("move", (id, op, np) => {
    if (players[id] != null) {
        players[id]["position"] = np;
        console.log(`Player ${id} moved from ${op} to ${np}.`);
    } else if (players[id] == null) {
        players[id] = {"position": np};
        console.log(`Player ${id} moved to ${np}.`);
    }
});

document.addEventListener("keydown", (e) => {
    socket.emit("move", [ID, position, [position[0], position[1] + 1]]);
});