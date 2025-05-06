import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, Input, Button } from "../styles.js";

export default function RoomSelector({ user }) {
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room.trim()) navigate(`/chat/${room}`);
    };

    return (
        <PageContainer>
            <h2>Willkommen, {user?.username}</h2>
            <Input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Raumname eingeben"
            />
            <Button onClick={joinRoom}>Beitreten</Button>
        </PageContainer>
    );
}