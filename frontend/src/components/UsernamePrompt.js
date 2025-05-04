import React, { useState } from "react";

function UsernamePrompt({ setUsername }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setUsername(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: 20 }}>
            <h2>Benutzernamen eingeben</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Dein Name"
                style={{ marginRight: 10 }}
            />
            <button type="submit">Starten</button>
        </form>
    );
}

export default UsernamePrompt;
