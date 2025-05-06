import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser, setToken }) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/auth/login", { identifier, password });
            setUser(res.data.user);
            setToken(res.data.token);
            navigate("/rooms");
        } catch (err) {
            alert("Login fehlgeschlagen: " + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>
            <input
                placeholder="Email oder Benutzername"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button onClick={login}>Einloggen</button>
            <p>Noch keinen Account? <a href="/register">Registrieren</a></p>
        </div>
    );
}