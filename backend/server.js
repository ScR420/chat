const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/Message");
const User = require("./models/User");
const authRoutes = require("./routes/auth");

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

const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true },
});

io.on("connection", (socket) => {
    console.log("Benutzer verbunden:", socket.id);

    socket.on("join_room", async (room) => {
        socket.join(room);
        const messages = await Message.find({ room }).sort({ createdAt: 1 }).limit(100);
        socket.emit("chat_history", messages);
    });

    socket.on("send_message", async (data) => {
        const { username, message, room } = data;
        const newMsg = new Message({ username, message, room });
        await newMsg.save();
        io.to(room).emit("receive_message", newMsg);
    });

    socket.on("disconnect", () => {
        console.log("Benutzer getrennt:", socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});