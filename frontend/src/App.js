import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const [room, setRoom] = useState("");
    const [joinedRoom, setJoinedRoom] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isLogin, setIsLogin] = useState(true); // true = Login, false = Registrierung

    useEffect(() => {
        if (joinedRoom) {
            socket.emit("join_room", joinedRoom);

            socket.on("chat_history", (messages) => {
                setChat(messages);
            });

            socket.on("receive_message", (data) => {
                setChat((prev) => [...prev, data]);
            });
        }

        return () => {
            socket.off("chat_history");
            socket.off("receive_message");
        };
    }, [joinedRoom]);

    const handleAuth = async () => {
        const endpoint = isLogin ? "login" : "register";
        try {
            const res = await axios.post(`http://localhost:3001/api/auth/${endpoint}`, userData);
            if (res.data.token) {
                setToken(res.data.token);
                setIsAuthenticated(true);
            }
        } catch (err) {
            alert("Fehler bei Authentifizierung: " + err.response?.data?.error || err.message);
        }
    };

    const joinChatRoom = () => {
        if (room.trim()) {
            setJoinedRoom(room.trim());
        }
    };

    const sendMessage = () => {
        if (message.trim() && joinedRoom) {
            socket.emit("send_message", {
                username: userData.username,
                message,
                room: joinedRoom,
            });
            setMessage("");
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ padding: 20 }}>
                <h2>{isLogin ? "Login" : "Registrieren"}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    style={{ marginBottom: 10 }}
                /><br />
                <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    style={{ marginBottom: 10 }}
                /><br />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    style={{ marginBottom: 10 }}
                /><br />
                <button onClick={handleAuth}>
                    {isLogin ? "Einloggen" : "Registrieren"}
                </button>
                <p style={{ marginTop: 10 }}>
                    {isLogin ? "Noch kein Account?" : "Schon registriert?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} style={{ fontSize: 12 }}>
                        {isLogin ? "Registrieren" : "Einloggen"}
                    </button>
                </p>
            </div>
        );
    }

    if (!joinedRoom) {
        return (
            <div style={{ padding: 20 }}>
                <h2>Willkommen, {userData.username}</h2>
                <input
                    type="text"
                    placeholder="Chatraum eingeben..."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    style={{ marginRight: 10 }}
                />
                <button onClick={joinChatRoom}>Raum beitreten</button>
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Raum: {joinedRoom} – Eingeloggt als: {userData.username}</h2>
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
