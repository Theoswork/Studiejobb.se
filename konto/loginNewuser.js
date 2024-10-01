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

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Förhindra standardbeteende

    const username = getElementById('username-register').value;
    const password = getElementById('password-register').value;

    const response = await fetch('http://localhost:3000/api/register', { // Se till att använda rätt URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    alert(result.message); // Visa meddelande om registrering
});

// Logga in användare
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Förhindra standardbeteende

    const username = getElementById('username-login').value;
    const password = getElementById('password-login').value;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Inloggning lyckades!');
        // Här kan du omdirigera användaren till en annan sida om så önskas
    } else {
        alert('Felaktiga inloggningsuppgifter: ' + result.message);
    }
});
