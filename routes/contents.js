var express = require('express');
var momentJS = require('moment');
var router = express.Router();

var dateFormat = 'YYYY-MM-DD';

router.post('/', function (req, res) {
    var db = req.db;
    var content = req.body;
    content.date = momentJS().format(dateFormat);

    db.contentsDB().push(content, function (error) {
        if (error) {
            res.send("There was a problem adding the content to the database.");
        } else {
            res.location("/");
            res.redirect("/");
        }
    });
});

module.exports = router;
