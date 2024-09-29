document.addEventListener('DOMContentLoaded', function() {
    const publishForm = document.getElementById('publish-job-form');
    if (publishForm) {
        publishForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Skapa jobbannonsdata från formuläret
            const newJob = {
                title: document.getElementById('job-title').value,
                company: document.getElementById('company-name').value,
                location: document.getElementById('location').value,
                type: document.getElementById('job-type').value,
                description: document.getElementById('description').value,
                requirements: document.getElementById('requirements').value
            };

            try {
                // Skicka data till servern via en POST-begäran
                const response = await fetch('/api/jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newJob)
                });

                if (response.ok) {
                    alert('Jobbannonsen har publicerats!');
                    this.reset(); // Rensa formuläret efter inlämning
                    updatePreview(); // Uppdatera förhandsgranskningen
                } else {
                    alert('Något gick fel. Försök igen.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ett fel inträffade. Försök igen senare.');
            }
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