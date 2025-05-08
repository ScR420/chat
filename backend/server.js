const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/Message");
// User Model wird hier nicht direkt benötigt, aber für authRoutes
// const User = require("./models/User");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/rooms"); // Stelle sicher, dass dies der richtige Pfad ist

const app = express();
const server = http.createServer(app);

mongoose.connect("mongodb://localhost:27017/chatapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.error("MongoDB Verbindungsfehler:", err));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes); // roomRoutes hier einbinden

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Benutzer verbunden:", socket.id);

    socket.on("join_room", async (roomName) => { // Erwartet nur roomName als String
        socket.join(roomName);
        console.log(`Benutzer ${socket.id} ist Raum ${roomName} beigetreten.`);
        try {
            const messages = await Message.find({ room: roomName }).sort({ createdAt: 1 }).limit(100);
            socket.emit("chat_history", messages);
        } catch (err) {
            console.error("Fehler beim Abrufen der Nachrichten:", err);
        }
    });

    socket.on("send_message", async (data) => {
        const { username, message, room } = data;
        try {
            const newMsg = new Message({ username, message, room });
            await newMsg.save();
            io.to(room).emit("receive_message", newMsg);
        } catch (err) {
            console.error("Fehler beim Speichern der Nachricht:", err);
        }
    });

    // Event, um andere Clients über einen neuen öffentlichen Raum zu informieren
    socket.on("new_public_room_created", (roomData) => {
        socket.broadcast.emit("new_public_room_available", roomData);
    });


    socket.on("disconnect", () => {
        console.log("Benutzer getrennt:", socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});