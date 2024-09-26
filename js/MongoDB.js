const mongoose = require('mongoose');

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

// Spara en ny jobbannons
const newAd = new Ad({
    title: 'Senior Developer',
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
