var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('add', { title: 'Add something new :)' });
});

router.post('/', function(req, res) {
    res.json({ message: 'Added new content!' });
});


module.exports = router;
