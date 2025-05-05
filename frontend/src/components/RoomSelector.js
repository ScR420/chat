import React, { useState } from "react";

function RoomSelector({ setRoom }) {
    const [roomInput, setRoomInput] = useState("");

    const joinRoom = () => {
        if (roomInput.trim()) {
            setRoom(roomInput.trim());
        }
    };

    return (
        <div>
            <h3>Chaträume</h3>
            <input
                placeholder="Raumname eingeben..."
                onChange={(e) => setRoomInput(e.target.value)}
            />
            <button onClick={joinRoom}>Beitreten</button>
        </div>
    );
}

export default RoomSelector;
