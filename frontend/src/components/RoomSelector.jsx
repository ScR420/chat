import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomSelector({ user }) {
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room.trim()) {
            navigate(`/chat/${room}`);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Willkommen, {user?.username}</h2>
            <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Raumname eingeben" />
            <button onClick={joinRoom}>Beitreten</button>
        </div>
    );
}