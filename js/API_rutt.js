const express = require('express');
const app = express();
app.use(express.json());

let jobPosts = [];

// Post route för att spara jobbannonser
app.post('/api/job-post', (req, res) => {
    const jobPost = req.body;
    jobPosts.push(jobPost);
    res.status(201).send('Jobbannons publicerad!');
});

// Get route för att visa jobbannonser
app.get('/api/job-posts', (req, res) => {
    res.json(jobPosts);
});

app.listen(3000, () => {
    console.log('Servern körs på port 3000');
});
