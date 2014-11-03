var express = require('express');
var fireBaseDBClient = require('../public/javascripts/FireBaseDBClient');
var momentJS = require('moment');
var router = express.Router();

router.post('/', function(req, res) {
    var content = req.body;
    content.date = momentJS().format('YYYY-MM-DD');
    fireBaseDBClient.contentsDB().push(content, function(error) {
        if(error) {
            alert(error);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
