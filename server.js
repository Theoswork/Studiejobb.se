const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Lägg till detta

const app = express();
app.use(cors()); // Aktivera CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Anslut till MongoDB
mongoose.connect('mongodb://localhost:27017/job_annonser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema och modell
const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
});

const Ad = mongoose.model('annonsers', adSchema); 

// API endpoint för att skapa jobbannonser
app.post('/api/jobs', (req, res) => {
  const newAd = new Ad(req.body);
  newAd.save()
    .then(() => res.status(201).send('Jobbannons sparad!'))
    .catch(err => res.status(400).send(err));
});

// Starta servern
app.listen(3000, () => {
  console.log('Servern körs på port 3000');
});
