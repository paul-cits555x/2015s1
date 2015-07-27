var express = require('express');
var Registry = require('../registry');
var SecurityService = require('../security_service');

var router = express.Router();

router.get('/', SecurityService.authenticated, function (req, res) {
    var c1 = Registry.getCollection('dojo');
    c1.find().toArray(function (err, dojos) {
        if (err) {
            res.status(500);
            return;
        }
        res.render('administrator', {
            title: "Administrator",
            dojos: dojos,
            roles: [
                { name: "Administrator" },
                { name: "Champion" },
                { name: "Mentor" }
            ]
        });
    });
});

module.exports = router;