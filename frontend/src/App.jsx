import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import RoomSelector from "./components/RoomSelector";
import Chatroom from "./components/ChatRoom";
import { lightTheme, darkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }
`;

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    const ProtectedRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <button
                    onClick={toggleTheme}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: theme.buttonBackground,
                        color: theme.buttonText,
                        border: `1px solid ${theme.borderColor}`,
                        padding: "8px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    {theme === lightTheme ? "Dark Mode" : "Light Mode"}
                </button>
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
        </ThemeProvider>
    );
}

export default App;
