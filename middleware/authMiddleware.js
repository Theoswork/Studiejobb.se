const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ladda miljövariabler

const JWT_SECRET = process.env.JWT_SECRET; // Hämta JWT-hemligheten från miljövariabler

const protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Ingen åtkomst. Inloggning krävs.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Ogiltig token' });
    }
};

module.exports = protect;
