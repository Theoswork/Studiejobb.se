document.addEventListener('DOMContentLoaded', function() {
    const jobsContainer = document.getElementById('jobs-container');
    const jobDetails = document.getElementById('job-details');
    const searchBox = document.getElementById('searchBox');
    const locationFilter = document.getElementById('locationFilter');
    const jobTypeFilter = document.getElementById('jobTypeFilter');

    if (jobsContainer && jobDetails) {
        displayJobs();

        searchBox.addEventListener('input', displayJobs);
        locationFilter.addEventListener('input', displayJobs);
        jobTypeFilter.addEventListener('change', displayJobs);
    }
});

function displayJobs() {
    const jobsContainer = document.getElementById('jobs-container');
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const locationTerm = document.getElementById('locationFilter').value.toLowerCase();
    const jobType = document.getElementById('jobTypeFilter').value;

    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    jobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                              (job.keywords && job.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)));
        const matchesLocation = job.location.toLowerCase().includes(locationTerm);
        const matchesType = jobType === '' || job.type === jobType;

        return matchesSearch && matchesLocation && matchesType;
    });

    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p>Inga matchande jobb hittades.</p>';
        return;
    }

    jobs.sort((a, b) => b.id - a.id);

    let jobsHTML = '';
    jobs.forEach(job => {
        jobsHTML += `
            <div class="job-item" onclick="showJobDetails(${job.id})">
                <h3>${job.title}</h3>
                <p><strong>${job.company}</strong></p>
                <p>📍 ${job.location}</p>
                <p>🕒 ${job.type}</p>
                <p>📍 ${description}</p>
                <p>🕒 ${requirements}</p>
                ${job.keywords ? `<p>🏷️ ${job.keywords.join(', ')}</p>` : ''}
            </div>
        `;
    });

    jobsContainer.innerHTML = jobsHTML;
}

function showJobDetails(jobId) {
    const jobDetails = document.getElementById('job-details');
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const job = jobs.find(j => j.id === jobId);

    if (job) {
        const detailsHTML = `
            <h2>${job.title}</h2>
            <p><strong>${job.company}</strong></p>
            <p>📍 ${job.location}</p>
            <p>🕒 ${job.type}</p>
            ${job.keywords ? `<p>🏷️ Nyckelord: ${job.keywords.join(', ')}</p>` : ''}
            <h3>Jobbeskrivning:</h3>
            <p>${job.description}</p>
            <h3>Krav och Kvalifikationer:</h3>
            <p>${job.requirements}</p>
        `;

        jobDetails.innerHTML = detailsHTML;
    }
}