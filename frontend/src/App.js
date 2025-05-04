import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UsernamePrompt from "./components/UsernamePrompt";

const socket = io("http://localhost:3001");

function App() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
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
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", {
                username,
                message,
            });
            setMessage("");
        }
    };

    if (!username) {
        return <UsernamePrompt setUsername={setUsername} />;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Willkommen, {username}</h2>
            <div
                style={{
                    border: "1px solid gray",
                    padding: 10,
                    height: 300,
                    overflowY: "scroll",
                    marginBottom: 10,
                }}
            >
                {chat.map((msg, i) => (
                    <div key={i}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nachricht eingeben..."
                style={{ marginRight: 10 }}
            />
            <button onClick={sendMessage}>Senden</button>
        </div>
    );
}

export default App;