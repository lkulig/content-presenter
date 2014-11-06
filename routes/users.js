var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var db = req.db;

    var user = {
        name: 'LG'
    };

    db.usersDB().push(user, function (error) {
        if (error) {
            res.send("There was a problem adding user to the database.");
        }
    });
});

module.exports = router;