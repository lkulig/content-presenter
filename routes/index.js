var express = require('express');
var router = express.Router();
var fireBaseDBClient = require('../public/javascripts/FireBaseDBClient');

router.get('/', function (req, res) {
    fireBaseDBClient.contentsDB().limit(5).on('value', function (snapshot) {
        var links = [];
        if(snapshot.val()) {
            links = snapshot.val();
        }
        res.render('index', {
            title: 'Codziennik nieprojektowy',
            links: links
        });
    });
    res.end();
});


module.exports = router;
