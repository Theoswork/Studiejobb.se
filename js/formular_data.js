document.getElementById('jobAdForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra standard formulärinsändning

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Jobbannons publicerad!');
            this.reset(); // Återställ formuläret
            loadAds(); // Ladda annonser igen
        } else {
            alert('Det gick inte att publicera annonsen.');
        }
    })
    .catch(error => console.error('Error:', error));

});

// Funktion för att ladda annonser
function loadAds() {
    fetch('/api/jobs')
        .then(response => response.json())
        .then(ads => {
            const adsContainer = document.getElementById('adsContainer');
            adsContainer.innerHTML = ''; // Rensa tidigare annonser
            ads.forEach(ad => {
                const adElement = document.createElement('div');
                adElement.innerHTML = `<h2>${ad.title}</h2><p>${ad.description}</p><p>${ad.company} - ${ad.location}</p>`;
                adsContainer.appendChild(adElement);
            });
        });
}

// Ladda annonser vid sidladdning
loadAds();
document.getElementById('jobForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Förhindra att sidan laddas om

    const formData = new FormData(event.target);
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        company: formData.get('company'),
        location: formData.get('location'),
    };

    const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Jobbannons publicerad!');
        // Här kan du eventuellt återställa formuläret
        event.target.reset();
    } else {
        alert('Det gick inte att publicera annonsen.');
    }
});
