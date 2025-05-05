import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function ChatRoom({ room, user }) {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.emit("join_room", room);

        socket.on("chat_history", (history) => {
            setChat(history);
        });

        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive_message");
            socket.off("chat_history");
        };
    }, [room]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", {
                room,
                username: user.username,
                message,
            });
            setMessage("");
        }
    };

    return (
        <div>
            <h3>Raum: {room}</h3>
            <div style={{ border: "1px solid gray", height: 300, overflowY: "scroll", marginBottom: 10 }}>
                {chat.map((msg, i) => (
                    <div key={i}><strong>{msg.username}:</strong> {msg.message}</div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Nachricht..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Senden</button>
        </div>
    );
}

export default ChatRoom;
