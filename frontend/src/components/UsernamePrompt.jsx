import React, { useState } from "react";

function UsernamePrompt({ onConfirm }) {
    const [name, setName] = useState("");

    return (
        <div style={{ padding: 20 }}>
            <h2>Benutzernamen wählen</h2>
            <input
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => onConfirm(name)}>Bestätigen</button>
        </div>
    );
}

export default UsernamePrompt;
