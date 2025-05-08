import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, Input, Button } from "../styles.js";
import axios from "axios";
import { socket } from "../socket";
import styled from "styled-components";

// === Styled Components ===

const RoomList = styled.ul`
    list-style: none;
    padding: 0;
`;

const RoomItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
    border-bottom: 1px solid ${({ theme }) => theme.inputBorder};

    &:last-child {
        border-bottom: none;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin-bottom: 25px;

    label {
        margin-bottom: 8px;
        font-weight: bold;
        display: block;
    }

    input[type="checkbox"] {
        margin-left: 10px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const SectionContainer = styled.div`
    width: 100%;
    padding: 25px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.cardBackground};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

const TopSectionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-bottom: 30px;

    & > div {
        flex: 1 1 300px;
        max-width: 100%;
    }
`;

const BottomSectionContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.cardBackground};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

// === Component ===

export default function RoomSelector({ user }) {
    const [room, setRoom] = useState("");
    const [password, setPassword] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState("");
    const [joinPrivateRoomName, setJoinPrivateRoomName] = useState("");
    const [joinPrivateRoomPassword, setJoinPrivateRoomPassword] = useState("");

    useEffect(() => {
        fetchPublicRooms();

        socket.on("new_public_room_available", (newRoom) => {
            setRooms((prevRooms) => [...prevRooms, newRoom]);
        });

        return () => {
            socket.off("new_public_room_available");
        };
    }, []);

    const fetchPublicRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/rooms/public");
            setRooms(response.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der öffentlichen Räume:", error);
        }
    };

    const joinRoom = async (roomName, password = "") => {
        try {
            const response = await axios.post("http://localhost:3001/api/rooms/join", {
                name: roomName,
                password: password,
            });

            if (response.data.success) {
                navigate(`/chat/${roomName}`);
            } else {
                alert("Beitritt fehlgeschlagen: " + response.data.error);
            }
        } catch (error) {
            console.error("Fehler beim Beitreten des Raums:", error);
            alert("Fehler beim Beitreten des Raums.");
        }
    };

    const createRoom = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/rooms/create", {
                name: newRoomName,
                isPrivate: isPrivate,
                password: password,
            });

            if (response.status === 201) {
                if (!isPrivate) {
                    socket.emit("new_public_room_created", response.data);
                }
                setRooms([...rooms, response.data]);
                setNewRoomName("");
                setIsPrivate(false);
                setPassword("");
            }
        } catch (error) {
            console.error("Fehler beim Erstellen des Raums:", error);
        }
    };

    const handleJoinPrivateRoom = async () => {
        await joinRoom(joinPrivateRoomName, joinPrivateRoomPassword);
    };

    return (
        <PageContainer>
            <h2>Willkommen, {user?.username}</h2>

            <TopSectionContainer>
                <SectionContainer>
                    <h3>Raum beitreten</h3>
                    <InputGroup>
                        <label>Raumname:</label>
                        <Input
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            placeholder="Raumname eingeben"
                        />
                    </InputGroup>
                    <Button onClick={() => joinRoom(room)}>Beitreten</Button>
                </SectionContainer>

                <SectionContainer>
                    <h3>Privaten Raum beitreten</h3>
                    <InputGroup>
                        <label>Raumname:</label>
                        <Input
                            value={joinPrivateRoomName}
                            onChange={(e) => setJoinPrivateRoomName(e.target.value)}
                            placeholder="Raumname"
                        />
                    </InputGroup>
                    <InputGroup>
                        <label>Passwort:</label>
                        <Input
                            type="password"
                            value={joinPrivateRoomPassword}
                            onChange={(e) => setJoinPrivateRoomPassword(e.target.value)}
                            placeholder="Passwort"
                        />
                    </InputGroup>
                    <Button onClick={handleJoinPrivateRoom}>Privaten Raum beitreten</Button>
                </SectionContainer>

                <SectionContainer>
                    <h3>Neuen Raum erstellen</h3>
                    <InputGroup>
                        <label>Raumname:</label>
                        <Input
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            placeholder="Neuen Raumnamen eingeben"
                        />
                    </InputGroup>
                    <InputGroup>
                        <label>
                            Privater Raum:
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                        </label>
                    </InputGroup>
                    {isPrivate && (
                        <InputGroup>
                            <label>Raum Passwort:</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Raum Passwort"
                            />
                        </InputGroup>
                    )}
                    <Button onClick={createRoom}>Raum erstellen</Button>
                </SectionContainer>
            </TopSectionContainer>

            <BottomSectionContainer>
                <h3>Öffentliche Räume</h3>
                <RoomList>
                    {rooms.map((existingRoom) => (
                        <RoomItem key={existingRoom._id}>
                            {existingRoom.name}
                            <Button onClick={() => joinRoom(existingRoom.name)}>Beitreten</Button>
                        </RoomItem>
                    ))}
                </RoomList>
            </BottomSectionContainer>
        </PageContainer>
    );
}
