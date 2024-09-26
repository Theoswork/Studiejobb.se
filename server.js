const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
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

const Ad = mongoose.model('annonsers', adSchema); // Se till att namnet är "annonsers"

// API endpoint för att skapa jobbannonser
app.post('/api/annonser', (req, res) => {
  const newAd = new Ad(req.body);
  newAd.save()
    .then(() => res.status(201).send('Jobbannons sparad!'))
    .catch(err => res.status(400).send(err));
});

// Starta servern
app.listen(3000, () => {
  console.log('Servern körs på port 3000');
});
app.post('/api/jobs', async (req, res) => {
    const { title, description, company, location } = req.body;

    const newJob = new Job({ title, description, company, location });
    await newJob.save();
    
    res.status(201).send('Jobbannons sparad!');
});
