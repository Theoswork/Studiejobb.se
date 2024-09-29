document.addEventListener('DOMContentLoaded', function() {
    const publishForm = document.getElementById('publish-job-form');
    if (publishForm) {
        publishForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const newJob = {
                title: document.getElementById('job-title').value,
                company: document.getElementById('company-name').value,
                location: document.getElementById('location').value,
                type: document.getElementById('job-type').value, // Anställningsform
                description: document.getElementById('description').value,
                requirements: document.getElementById('requirements').value, // Krav och Kvalifikationer
                keywords: document.getElementById('keywords').value.split(',').map(keyword => keyword.trim()) // Dela upp nyckelord på kommatecken
            };

            try {
                const response = await fetch('http://localhost:3000/api/jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newJob)
                });

                if (response.ok) {
                    alert('Jobbannonsen har publicerats!');
                    this.reset();
                } else {
                    alert('Något gick fel. Försök igen.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ett fel inträffade. Försök igen senare.');
            }
        });
    }
});
