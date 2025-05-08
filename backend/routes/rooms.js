const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

// Raum erstellen
router.post("/create", async (req, res) => {
    const { name, isPrivate, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Raumname ist erforderlich." });
    }
    if (isPrivate && !password) {
        return res.status(400).json({ error: "Passwort ist für private Räume erforderlich." });
    }

    try {
        const existingRoom = await Room.findOne({ name });
        if (existingRoom) {
            return res.status(400).json({ error: "Raumname existiert bereits." });
        }

        const room = new Room({
            name,
            isPrivate,
            password: isPrivate ? password : null,
        });
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        console.error("Fehler beim Erstellen des Raums:", err);
        res.status(500).json({ error: "Fehler beim Erstellen des Raums." });
    }
});

// Öffentliche Räume abrufen
router.get("/public", async (req, res) => {
    try {
        const rooms = await Room.find({ isPrivate: false }).sort({ createdAt: -1 });
        res.json(rooms);
    } catch (err) {
        console.error("Fehler beim Abrufen öffentlicher Räume:", err);
        res.status(500).json({ error: "Fehler beim Abrufen der Räume." });
    }
});

// Raum beitreten
router.post("/join", async (req, res) => {
    const { name, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Raumname ist erforderlich." });
    }

    try {
        const room = await Room.findOne({ name });

        if (!room) {
            return res.status(404).json({ error: "Raum nicht gefunden." });
        }

        if (room.isPrivate) {
            if (!password) {
                return res.status(400).json({ error: "Passwort ist für diesen Raum erforderlich." });
            }
            if (room.password !== password) {
                return res.status(403).json({ error: "Falsches Passwort." });
            }
        }

        res.status(200).json({ success: true, roomName: room.name });
    } catch (err) {
        console.error("Fehler beim Beitreten des Raums:", err);
        res.status(500).json({ error: "Interner Serverfehler beim Beitreten des Raums." });
    }
});

module.exports = router;