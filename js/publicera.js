document.addEventListener('DOMContentLoaded', function() {
    const publishForm = document.getElementById('publish-job-form');
    if (publishForm) {
        publishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newJob = {
                id: Date.now(),
                title: document.getElementById('job-title').value,
                company: document.getElementById('company-name').value,
                location: document.getElementById('location').value,
                type: document.getElementById('job-type').value,
                description: document.getElementById('description').value,
                requirements: document.getElementById('requirements').value
            };
            

            let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
            jobs.push(newJob);
            localStorage.setItem('jobs', JSON.stringify(jobs));

            alert('Jobbannonsen har publicerats!');
            this.reset();
            updatePreview();
        });

        // Uppdatera förhandsgranskningen när användaren skriver
        document.querySelectorAll('#publish-job-form input, #publish-job-form select, #publish-job-form textarea').forEach(input => {
            input.addEventListener('input', updatePreview);
        });

        // Kör updatePreview en gång för att initialisera förhandsgranskningen
        updatePreview();
    }
});

function updatePreview() {
    const preview = document.getElementById('preview');
    if (preview) {
        const title = document.getElementById('job-title').value;
        const company = document.getElementById('company-name').value;
        const location = document.getElementById('location').value;
        const type = document.getElementById('job-type').value;
        const description = document.getElementById('description').value;
        const requirements = document.getElementById('requirements').value;

        preview.innerHTML = `
            <h3>${title}</h3>
            <p><strong>${company}</strong></p>
            <p>📍 ${location}</p>
            <p>🕒 ${type}</p>
            <h4>Jobbeskrivning:</h4>
            <p>${description}</p>
            <h4>Krav och Kvalifikationer:</h4>
            <p>${requirements}</p>
        `;
    }
}

    document.getElementById('yourFormId').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra standardformulärs beteende

        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value
        };

        fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Skriv ut svaret från servern
            // Här kan du lägga till kod för att visa annonsen på sidan om du vill
        })
        .catch(error => console.error('Error:', error));
    });

