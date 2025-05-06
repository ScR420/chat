import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, Input, Button, LinkText } from "../styles.js";

function LoginForm({ setUser, setToken }) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || "Login fehlgeschlagen");

            setUser(data.user);
            setToken(data.token);
            navigate("/rooms");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <PageContainer>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Input
                placeholder="Benutzername oder Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
            <p>
                Noch keinen Account?{" "}
                <LinkText onClick={() => navigate("/register")}>Registrieren</LinkText>
            </p>
        </PageContainer>
    );
}

export default LoginForm;