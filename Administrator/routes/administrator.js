var express = require('express');

var Registry = require('../registry')

var router = express.Router();

router.get('/', function (req, res) {
    var c1 = Registry.getCollection('dojo');
    c1.find().toArray(function (err, dojos) {
        if (err) {
            res.status(500);
            return;
        }
        res.render('administrator', {
            title: "Administrator",
            dojos: dojos
        });
    });
});

module.exports = router;