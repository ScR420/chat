import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:3001/api/auth/register", { username, email, password });
            alert("Registrierung erfolgreich, bitte einloggen.");
        } catch (err) {
            alert("Fehler bei Registrierung");
        }
    };

    return (
        <div>
            <h3>Registrieren</h3>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
            <input type="email" placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Passwort" onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={handleRegister}>Registrieren</button>
        </div>
    );
}

export default Register;
