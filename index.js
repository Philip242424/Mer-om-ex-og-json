// Først bruker vi 'require' for å referere til Express-biblioteket
//  (som ligger i node_modules):
const express = require('express');

// Deretter lager vi en ny instans av Express:
const app = express();

// Vi setter opp en enkel "rute" (route) som svarer på
// forespørsler til rotkatalogen, /:
app.get('/', (req, res) => {
    res.send('fattasniggerfinger!');
});

app.get('/her', (req, res) => {
    res.send(`
        <h1>Her er en overskrift</h1>
        <p>Og her er en paragraf</p>
    `);
});

// Først refererer vi til driveren (som ligger i node_modules)
const { Pool } = require('pg');

// Så lager vi en forbindelse til databasen
const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
});

app.get('/deltagere-2', async (req, res) => {
    // Henter data fra databasen:
    const result = await pool.query('SELECT * FROM users');

    // Starter en html-liste:
    let html = "<h1>Deltagere</h1>"
    html += "<ul>"

    // Legger til en <li> for hver rad i databasen:
    for( const row of result.rows ) {
        html += "<li>" + row.name + "</li>"
    }

    // Avslutter html-listen og returnerer resultatet:
    html += "</ul>"
    res.send(html);
});

app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});


app.use(express.static('public'));

// Så starter vi serveren, som nå lytter på port 3000:
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.listen(5432, () => {
    console.log('Server listening on port 3000');
});