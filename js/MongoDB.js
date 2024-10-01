const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Middleware för att kunna parsa JSON-data
app.use(express.json());

// Anslut till MongoDB
mongoose.connect('mongodb://localhost:27017/job_annonser', { useNewUrlParser: true, useUnifiedTopology: true });

// Definiera en schema för jobbannonser
const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
});

// Skapa en modell
const Ad = mongoose.model('annonser', adSchema);

// Spara en ny jobbannons (detta kan tas bort om du vill spara annonser via ditt formulär)
const newAd = new Ad({
    title: 'Junior Developer',
    description: 'Seeking an experienced developer.',
    company: 'Tech Company',
    location: 'Gothenburg',
});
  
newAd.save()
  .then(() => console.log('Job ad saved!'))
  .catch(err => console.error('Error saving job ad:', err));

// Hämta och visa alla annonser
Ad.find()
  .then(ads => {
    console.log('All job ads:', ads);
    mongoose.connection.close(); // Stäng anslutningen när du är klar
  })
  .catch(err => {
    console.error('Error fetching job ads:', err);
  });

// POST-route för att spara en annons från formuläret
app.post('/api/jobs', async (req, res) => {
  const { title, description, company, location, type, requirements, keywords } = req.body;

  const newJob = new Job({ title, description, company, location, type, requirements, keywords });
  await newJob.save();
  
  res.status(201).send('Jobbannons sparad!');
});

    try {
        await newJob.save();
        res.status(201).send('Jobbannons sparad!');
    } catch (error) {
        res.status(500).send('Det gick inte att spara annonsen.');
        console.error(error);
    }


// Starta servern
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
