const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

mongoose.connect("mongodb://localhost:27017/chatapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", async (socket) => {
    console.log("Benutzer verbunden:", socket.id);

    const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
    socket.emit("chat_history", messages);

    socket.on("send_message", async (data) => {
        const newMsg = new Message({
            username: data.username,
            message: data.message,
        });
        await newMsg.save();
        io.emit("receive_message", newMsg);
    });

    socket.on("disconnect", () => {
        console.log("Benutzer getrennt:", socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log("Server läuft auf http://localhost:" + PORT);
});
