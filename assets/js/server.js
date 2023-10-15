const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const players = {};

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("new player", (player) => {
        players[socket.id] = player;
    });

    socket.on("movement", (data) => {
        const player = players[socket.id] || {};
        player.x = data.x;
        player.y = data.y;
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000.");
});