// Laedt die Werte aus der .env-Datei (z.B. das Datenbank-Passwort)
require('dotenv').config();

// Bibliotheken, die wir fuer unseren Server brauchen
const express = require('express');   // Framework fuer den Web-Server
const cors = require('cors');          // erlaubt Anfragen vom Frontend
const mongoose = require('mongoose');  // Verbindung zu MongoDB

const app = express();  // erstellt unser Server-Objekt
const PORT = 3000;      // auf diesem Port ist das Backend erreichbar

// Middleware: laeuft bei JEDER eingehenden Anfrage zuerst
app.use(cors());           // erlaubt Anfragen von localhost:4200 (Frontend)
app.use(express.json());  // ermoeglicht dem Server, JSON-Daten zu verstehen

// Verbindung zur MongoDB-Datenbank aufbauen
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Mit MongoDB verbunden!'))     // laeuft bei Erfolg
  .catch((error) => console.error('Fehler:', error));    // laeuft bei Fehler

// Test-Route: reagiert auf GET-Anfragen an die Basis-Adresse "/"
app.get('/', (req, res) => {
  res.send('YumBook Backend läuft!');
});

// startet den Server tatsaechlich
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});