import React, { useState } from "react";
import { PageContainer, Input, Button } from "../styles.js";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || "Registrierung fehlgeschlagen");

            alert("Registrierung erfolgreich!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <PageContainer>
            <h2>Registrieren</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Input placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleRegister}>Registrieren</Button>
        </PageContainer>
    );
}

export default RegisterForm;