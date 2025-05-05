import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import RoomSelector from "./components/RoomSelector";
import Chatroom from "./components/ChatRoom";

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    const ProtectedRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm setUser={setUser} setToken={setToken} />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                    path="/rooms"
                    element={
                        <ProtectedRoute>
                            <RoomSelector user={user} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat/:roomId"
                    element={
                        <ProtectedRoute>
                            <Chatroom user={user} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;