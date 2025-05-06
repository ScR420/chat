import React, { useState } from "react";
import { PageContainer, Input, Button } from "../styles.js";

function UsernamePrompt({ onConfirm }) {
    const [name, setName] = useState("");

    return (
        <PageContainer>
            <h2>Benutzernamen wählen</h2>
            <Input
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={() => onConfirm(name)}>Bestätigen</Button>
        </PageContainer>
    );
}

export default UsernamePrompt;