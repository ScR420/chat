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
            <h2>Wie heißt du?</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Benutzername"
                style={{ marginRight: 10 }}
            />
            <button type="submit">Weiter</button>
        </form>
    );
}

export default UsernamePrompt;