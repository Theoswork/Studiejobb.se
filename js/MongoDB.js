const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobPostsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const jobPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    company: String,
    datePosted: { type: Date, default: Date.now }
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

app.post('/api/job-post', async (req, res) => {
    const jobPost = new JobPost(req.body);
    await jobPost.save();
    res.status(201).send('Jobbannons publicerad!');
});

app.get('/api/job-posts', async (req, res) => {
    const jobPosts = await JobPost.find();
    res.json(jobPosts);
});
