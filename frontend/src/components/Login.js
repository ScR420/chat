import React, { useState } from "react";
import axios from "axios";

function Login({ setToken, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setToken(res.data.token);
            setUser(res.data.user);
        } catch (err) {
            alert("Fehler beim Login");
        }
    };

    return (
        <div>
            <h3>Login</h3>
            <input type="email" placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Passwort" onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
