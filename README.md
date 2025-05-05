# ChatApp

Ein einfacher Echtzeit-Chatroom mit Benutzer-Authentifizierung, basierend auf React, Node.js, Express und Socket.IO.

## 📖 Projektübersicht

ChatApp ist eine Webanwendung, die es Nutzern ermöglicht, sich zu registrieren, anzumelden und in verschiedenen Chatrooms in Echtzeit zu kommunizieren. Nachrichten werden pro Chatroom gespeichert und über Socket.IO in Echtzeit übertragen.

## ✨ Features

- ✅ Benutzerregistrierung und -authentifizierung (JWT-basiert)
- 💬 Echtzeit-Chat mit Socket.IO
- 🕓 Nachrichtenhistorie für jeden Chatroom (gespeichert in MongoDB)
- 🏠 Unterstützung für mehrere Chatrooms
- 📱 Responsives Design für mobile und Desktop-Geräte

## 🛠 Technologien

- **Frontend**: React
- **Backend**: Node.js, Express, Socket.IO
- **Datenbank**: MongoDB
- **Authentifizierung**: JSON Web Tokens (JWT)

## ⚙️ Voraussetzungen

- Node.js (Version 16 oder höher)
- MongoDB (lokal installiert oder gehostet)
- npm (Node Package Manager)

## 🚀 Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/ScR420/chatapp.git
   cd chatapp
   ```

2. **Backend einrichten**:
   ```bash
   cd backend
   npm install
   ```

3. **Frontend einrichten**:
   ```bash
   cd ../frontend
   npm install
   ```

## ▶️ Nutzung

1. **MongoDB-Server starten** (lokal oder via Cloud-Anbieter wie MongoDB Atlas).

2. **Backend starten**:
   ```bash
   cd backend
   node server.js
   ```

3. **Frontend starten**:
   ```bash
   cd ../frontend
   npm start
   ```

4. Die Anwendung ist erreichbar unter:  
   [http://localhost:3000](http://localhost:3000)

## 📁 Projektstruktur

### Frontend (`/frontend`)

- `src/components/ChatRoom.jsx` – Chatroom-Komponente
- `src/App.js` – Hauptkomponente
- `src/index.js` – Einstiegspunkt

### Backend (`/backend`)

- `server.js` – Einstiegspunkt für den Server
- `models/Message.js` – Mongoose-Modell für Nachrichten
- `models/User.js` – Mongoose-Modell für Benutzer
- `routes/auth.js` – Routen für Registrierung und LoginForm
- `middleware/auth.js` – Middleware für JWT-Validierung

## 📡 API-Endpunkte

### Authentifizierung

- `POST /api/auth/register` – Benutzer registrieren
- `POST /api/auth/login` – Benutzer einloggen

### Socket.IO Events

- `join_room` – Chatroom beitreten
- `send_message` – Nachricht senden
- `receive_message` – Nachricht empfangen
- `chat_history` – Nachrichtenhistorie abrufen

## 📄 Lizenz

Cooming Soon

---

> Entwickelt mit ❤️ von [ScR420](https://github.com/ScR420)
