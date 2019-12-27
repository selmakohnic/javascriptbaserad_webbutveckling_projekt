//Importerar bibliotek
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

//Anslutning till databas
mongoose.connect("mongodb://localhost:27017/travels", { useNewUrlParser: true, useUnifiedTopology: true });

//Läser in schema
var Travels = require("./app/models/travels.js");

//Instans av Express
var travelApp = express();

//Middleware - gör webbtjänsten tillgänglig från andra domäner
travelApp.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});

//Body parser
travelApp.use(bodyParser.json());
travelApp.use(bodyParser.urlencoded({ extended: false }));

//Statisk sökväg
travelApp.use(express.static(path.join(__dirname, 'public')));

//REST-webbtjänst
//Skickar alla resor
travelApp.get("/api/travels", function (req, res) {
    Travels.find(function (err, Travels) {
        if (err) {
            res.send(err);
        }
        res.json(Travels);
    }).sort([['date', -1]]);
});

//Skickar en resa baserat på id
travelApp.get("/api/travels/:id", function (req, res) {
    //Letar efter resa med rätt id
    Travels.findById(req.params.id)
        .then(travelFound => {
            if (!travelFound) { return res.status(404).end(); }
            return res.status(200).json(travelFound);
        })
        .catch(err => next(err));
});

//Lägger till en resa
travelApp.post("/api/travels/add", function (req, res) {
    //Instans av Travels
    var travel = new Travels();

    //Ny resa
    travel.country = req.body.country;
    travel.city = req.body.city;
    travel.date = req.body.date;
    travel.description = req.body.description;
    travel.image = req.body.image;

    //Sparar resa
    travel.save(function (err) {
        if (err) {
            res.send(err);
        }
    });

    res.send({ "message": "Lägger till resa" });
});

//uppdaterar en resa
travelApp.put("/api/travels/update/:id", function (req, res) {
    //Läser in id
    var updateId = req.params.id;

    //Läser in ny data
    var updateTravel = {
        country: req.body.country,
        city: req.body.city,
        date: req.body.date,
        description: req.body.description,
        image: req.body.image
    };

    //Uppdaterar vald resa baserat på id
    Travels.updateOne({ "_id": updateId },
        { $set: updateTravel }
        , function (err, Travels) {
            if (err) {
                res.send(err)
            }
            res.json({ message: "Uppdaterar resa med id " + updateId });
        });
});

//Raderar en resa
travelApp.delete("/api/travels/delete/:id", function (req, res) {
    //Läser in id
    var deleteId = req.params.id;

    //Raderar en resa baserat på id
    Travels.deleteOne({
        _id: deleteId
    }, function (err, Travels) {
        if (err) {
            res.send(err)
        }
        res.json({ message: "Raderar resa med id " + deleteId });
    });
});

//Port för anslutning till server
var port = 3001;

//Startar servern
travelApp.listen(port, function () {
    console.log("Servern är startad på port " + port);
});