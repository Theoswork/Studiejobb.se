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
})
  .then(() => console.log('Ansluten till MongoDB'))
  .catch(err => console.error('MongoDB-anslutningsfel:', err));

// Schema och modell för jobbannonser
const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
});

const Job = mongoose.model('Job', jobSchema); // Skapar modellen för "Job"

// API endpoint för att skapa jobbannonser
app.post('/api/jobs', (req, res) => {
  const newJob = new Job(req.body);

  newJob.save()
    .then(() => res.status(201).send('Jobbannons sparad!'))
    .catch(err => res.status(400).send('Fel vid sparandet av jobbannons: ' + err));
});

// Starta servern
app.listen(3000, () => {
  console.log('Servern körs på port 3000');
});
app.post('/api/jobs', (req, res) => {
  console.log('Inkommande data:', req.body); // Lägg till den här raden för att se vad som skickas till servern

  const newAd = new Ad(req.body);
  newAd.save()
    .then(() => res.status(201).send('Jobbannons sparad!'))
    .catch(err => {
      console.error('Fel vid sparande av jobbannons:', err); // Lägg till denna rad för att logga fel
      res.status(400).send(err);
    });
});
