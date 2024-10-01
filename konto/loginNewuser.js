// Registrera ny användare
console.log('loginNewuser.js är laddad!');

// Funktion för att hämta ett element och säkerställa att det inte är null
function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        return null; // Om elementet inte hittas, returnera null istället för att kasta ett fel
    }
    return element;
}

// Vänta tills DOM har laddats innan du lägger till event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Registrera användare (skapa-konto.html)
    const registerForm = getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Förhindra standardbeteende

            const username = getElementById('username-register').value;
            const password = getElementById('password-register').value;
            const confirmPassword = getElementById('confirm-password').value;

            // Kontrollera om lösenorden matchar
            if (password !== confirmPassword) {
                alert('Lösenorden matchar inte!');
                return; // Avbryt om lösenorden inte matchar
            }

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                // Kontrollera om svaret är OK
                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.message); // Kasta fel för att fångas i catch-blocket
                }

                const result = await response.json();
                alert(result.message); // Visa meddelande om lyckad registrering
            } catch (error) {
                alert('Ett fel inträffade: ' + error.message); // Hantera fel
            }
        });
    }

    // Logga in användare (login.html)
    const loginForm = getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Förhindra standardbeteende

            const username = document.getElementById('username-login').value;
            const password = document.getElementById('password-login').value;

            console.log('Försöker logga in med användarnamn:', username); // Debug-logg

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    const result = await response.json();
                    console.error('Inloggning misslyckades:', result.message); // Logga felmeddelande
                    throw new Error(result.message); // Kasta fel för att fångas i catch-blocket
                }

                const result = await response.json();
                console.log('Inloggning lyckades, mottagen token:', result.token); // Debug-logg

                // Visa toast-notifikation
                const toast = document.getElementById('toast');
                toast.style.display = 'block';

                // Spara tokenet i localStorage (eller sessionStorage)
                localStorage.setItem('token', result.token);

                // Stäng av toast efter 2 sekunder och omdirigera
                setTimeout(() => {
                    toast.style.display = 'none'; // Dölj toasten
                    window.location.href = '/index.html'; // Omdirigera användaren
                }, 2000); // Omdirigera efter 2 sekunder (2000 ms)

            } catch (error) {
                console.error('Fel vid inloggning:', error); // Logga fel
                alert('Felaktiga inloggningsuppgifter: ' + error.message); // Hantera fel
            }
        });
    }
});
