// Laedt die Werte aus der .env-Datei (z.B. das Datenbank-Passwort)
require('dotenv').config();

// Bibliotheken, die wir fuer unseren Server brauchen
const express = require('express');   // Framework fuer den Web-Server
const cors = require('cors');          // erlaubt Anfragen vom Frontend
const mongoose = require('mongoose');  // Verbindung zu MongoDB
const Rezept = require('./models/Rezept');     // Einbinden von Rezept.js in server.js

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

//startet den Server tatsaechlich
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

//GET-Route für Rezepte.json
// async, weil wir mit await auf die Datenbankabfrage warten müssen, ohne den Server zu blockieren
// await, damit hier gewartet wird, bis die Datenbankabfrage wirklich fertig ist, bevor es weitergeht
app.get('/rezepte',async (req, res) => {
  const rezepte = await Rezept.find();
  res.json(rezepte); // res.json statt res.send, weil wir eine Liste/ein Objekt zurückschicken, kein reiner Text
})

//POST-Route (create()) für Rezepte.json
app.post('/rezepte',async (req, res) => {
  const neuesRezept = await Rezept.create(req.body);
  res.json(neuesRezept); 
})

//GET-Route per ID -> Detailansicht eines Rezepts
app.get('/rezepte/:id', async (req, res) => {
  const rezept = await Rezept.findById(req.params.id);
  res.json(rezept);
});

//PUT-Route
app.put('/rezepte/:id', async (req, res) => {
  const geaendert = await Rezept.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(geaendert);
});
