// Registrera ny användare
console.log('loginNewuser.js är laddad!');

// Funktion för att hämta ett element och säkerställa att det inte är null
function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element med id "${id}" hittades inte.`);
    }
    return element;
}

// Registrera användare
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Förhindra standardbeteende

    const username = getElementById('username-register').value;
    const password = getElementById('password-register').value;

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        // Check if response is okay
        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message); // Throw an error to be caught in the catch block
        }

        const result = await response.json();
        alert(result.message); // Visa meddelande om registrering
    } catch (error) {
        alert('Ett fel inträffade: ' + error.message); // Hantera fel
    }
});

// Logga in användare
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Förhindra standardbeteende

    const username = getElementById('username-login').value;
    const password = getElementById('password-login').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message); // Kasta ett fel om svaret inte är okej
        }

        const result = await response.json();
        alert('Inloggning lyckades!'); // Visa inloggning lyckades meddelande

        // Spara tokenet i localStorage (eller sessionStorage)
        localStorage.setItem('token', result.token);

        // Omdirigera användaren till en annan sida, till exempel en dashboard
        window.location.href = '/index.html'; // Ändra till rätt väg

    } catch (error) {
        alert('Felaktiga inloggningsuppgifter: ' + error.message); // Hantera fel
    }
});

