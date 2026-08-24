const mongoose = require('mongoose');

// Schema fuer ein Rezept
const rezeptSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true  //überprüft ob Daten den Regeln entsprechen, keine Speicherung(Rezept) falls Feld leer/fehlt
    },
    kategorie: {
        type: String,
        required: true
    },
    zutaten: {
        type: [String],
        required: true
    },

    zubereitung: {
    type: [String],
    required: true
  },
    bild: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Rezept', rezeptSchema);
