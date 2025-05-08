import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { PageContainer, Input, Button, ChatBox } from "../styles.js";

export default function Chatroom({ user }) {
    const { roomId } = useParams();
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("join_room", roomId);

        socket.on("chat_history", (messages) => {
            setChat(messages);
        });

        socket.on("receive_message", (msg) => {
            setChat((prev) => [...prev, msg]);
        });

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
        <PageContainer>
            <h2>Raum: {roomId}</h2>
            <ChatBox>
                {chat.map((msg, i) => (
                    <div key={i}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </ChatBox>
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nachricht eingeben"
            />
            <Button onClick={sendMessage}>Senden</Button>
        </PageContainer>
    );
}