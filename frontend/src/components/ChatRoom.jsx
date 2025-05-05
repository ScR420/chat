import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chatroom({ user }) {
    const { roomId } = useParams();
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("join_room", roomId);
        socket.on("chat_history", (messages) => setChat(messages));
        socket.on("receive_message", (msg) => setChat((prev) => [...prev, msg]));
        return () => {
            socket.off("chat_history");
            socket.off("receive_message");
        };
    }, [roomId]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", { username: user.username, room: roomId, message });
            setMessage("");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Raum: {roomId}</h2>
            <div style={{ border: "1px solid gray", height: 300, overflowY: "scroll", marginBottom: 10 }}>
                {chat.map((msg, i) => (
                    <div key={i}><strong>{msg.username}:</strong> {msg.message}</div>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nachricht eingeben" />
            <button onClick={sendMessage}>Senden</button>
        </div>
    );
}