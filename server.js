const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const protect = require('./middleware/authMiddleware');
const app = express();
// NYCKEL
require('dotenv').config(); // Ladda miljövariabler




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Anslut till jobbannonser databasen
const jobAdDb = mongoose.createConnection('mongodb://localhost:27017/job_annonser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Anslut till användardatabasen
const userDb = mongoose.createConnection('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema och modell för jobbannonser
const adSchema = new mongoose.Schema({
    title: String,
    description: String,
    company: String,
    location: String,
    type: String,
    requirements: String,
    keywords: [String] // Nyckelord som en array av strängar
});

const Ad = mongoose.model('annonsers', adSchema);

// Schema och modell för användare
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

const User = userDb.model('konto', userSchema);

// API endpoint för att skapa jobbannonser
app.post('/api/jobs', (req, res) => {
    const newAd = new Ad(req.body);
    newAd.save()
        .then(() => res.status(201).send('Jobbannons sparad!'))
        .catch(err => res.status(400).send(err));
});

// API endpoint för registrering
app.post('/api/register', async (req, res) => {
    console.log('Registreringsanrop mottaget:', req.body); // Logga registreringsanropet
    try {
        const { username, password } = req.body;

        // Kontrollera om användarnamnet redan finns
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Användarnamnet är redan taget.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        console.log('Användare registrerad:', newUser); // Logga den registrerade användaren
        res.status(201).json({ message: 'Användare registrerad!' });
    } catch (err) {
        console.error('Fel vid registrering:', err); // Logga eventuella fel
        res.status(400).json({ message: 'Fel vid registrering: ' + err.message });
    }
});

// API endpoint för inloggning
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
      // Skapa en token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }); // Sätt token i en cookie
      res.json({ success: true, message: 'Inloggning lyckades!' });
  } else {
      res.status(401).json({ success: false, message: 'Felaktiga inloggningsuppgifter.' });
  }
});

// Middleware för autentisering (exempel)
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Ingen token, åtkomst nekad.');

    jwt.verify(token, 'hemlig_nyckel', (err, user) => {
        if (err) return res.status(403).send('Ogiltig token');
        req.user = user;
        next();
    });
}

// Skyddad rutt som kräver autentisering
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json('Denna information är skyddad och kräver inloggning.');
});

// Starta servern
app.listen(3000, () => {
    console.log('Servern körs på port 3000');
});
