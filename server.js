//zmienne, stałe

var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku


app.use(express.static('static'))

var path = require("path")

var bodyParser = require("body-parser")

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
})

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
