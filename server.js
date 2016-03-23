"use strict";
var express = require("express"),
    http = require("http"),
    app = express();

var status = {
        "wins": 0,
        "looses": 0
    },
    outcome = {
        "result": " "
    },
    number, coin,
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.post("/flip", function(req, res) {
    number = Math.floor(Math.random() * 2);
    if (number === 1) {
        coin = "heads";
    } else {
        coin = "tails";
    }
    var input = req.body.call;
    if (input === coin) {
        status.wins += 1;
        outcome.result = "win";
    } else {
        status.looses += 1;
        outcome.result = "loose";
    }
    res.send(outcome);
    res.end();
});

app.get("/stats", function(req, res) {
    res.send(status);
    res.end();
});
http.createServer(app).listen(3000);
