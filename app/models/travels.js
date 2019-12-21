//Schema för resor
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Land, stad, datum, beskrivning och bild, alla av typen String
var travelsSchema = new Schema ({
    country: {
        type: String,
        required: true
    },
    city: { 
        type: String,
        required: true
    },
    date: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    image: { 
        type: String,
        required: true
    }
});

//Exporterar schemat
module.exports = mongoose.model("Travels", travelsSchema);