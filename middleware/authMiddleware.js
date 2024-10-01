const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dinSuperHemligaNyckel123';

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
