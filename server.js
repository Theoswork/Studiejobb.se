const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // För lösenordshashning
const jwt = require('jsonwebtoken'); // För autentisering
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Anslut till MongoDB
mongoose.connect('mongodb://localhost:27017/job_annonser', {
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

const User = mongoose.model('users', userSchema);

// API endpoint för att skapa jobbannonser
app.post('/api/jobs', (req, res) => {
  const newAd = new Ad(req.body);
  newAd.save()
    .then(() => res.status(201).send('Jobbannons sparad!'))
    .catch(err => res.status(400).send(err));
});

// API endpoint för registrering
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('Användare registrerad!');
  } catch (err) {
    res.status(400).send('Registreringsfel: ' + err.message);
  }
});

// API endpoint för inloggning
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Användaren finns inte');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Fel lösenord');

    const token = jwt.sign({ username: user.username }, 'hemlig_nyckel', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).send('Inloggningsfel: ' + err.message);
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
  res.send('Denna information är skyddad och kräver inloggning.');
});

// Starta servern
app.listen(3000, () => {
  console.log('Servern körs på port 3000');
});
