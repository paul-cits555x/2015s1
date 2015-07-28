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
        var c2 = Registry.getCollection('role');
        c2.find().toArray(function (err, roles) {
            res.render('champion', {
                title: "Champion",
                dojos: dojos,
                roles: roles
            });
        });
    });
});

module.exports = router;