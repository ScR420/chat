const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// CORS für Express
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}));

// CORS für Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get("/", (req, res) => {
    res.send("Server läuft");
});

io.on("connection", (socket) => {
    console.log("Ein Benutzer hat sich verbunden");

    socket.on("send_message", (data) => {
        io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Ein Benutzer hat die Verbindung getrennt");
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
