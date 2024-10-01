const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Ladda miljövariabler

// Hemligt nyckel för JWT
const JWT_SECRET = process.env.JWT_SECRET; // Hämta JWT-hemligheten från miljövariabler

// Skapa token
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

// Registrering
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'Användare registrerad', token });
    } catch (error) {
        res.status(400).json({ message: 'Fel vid registrering', error: error.message });
    }
});

// Inloggning
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Användaren finns inte' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Fel lösenord' });

        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Inloggning lyckades', token });
    } catch (error) {
        res.status(400).json({ message: 'Fel vid inloggning', error: error.message });
    }
});

module.exports = router;
