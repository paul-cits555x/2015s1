var express = require('express');

var registry = require('../registry')

var router = express.Router();

router.get('/', function (req, res) {
    var c1 = registry.getCollection('dojo');
    c1.find().toArray(function (err, dojos) {
        if (err) {
            res.status(500);
            return;
        }
        var c2 = registry.getCollection('user');
        c2.find().toArray(function (err, users) {
            if (err) {
                res.status(500);
                return;
            }
            res.render('administrator', {
                title: "Administrator",
                dojos: dojos,
                users: users
            });
        });  
    });
});

router.get('/add_dojo', function (req, res) {
    res.render('administrator_add_dojo', {
        title: 'Add Dojo'
    });
});

router.get('/add_user', function (req, res) {
    res.render('administrator_add_user', {
        title: 'Add User'
    });
});

router.get('/dojos/:id', function (req, res) {
    var c1 = registry.getCollection('dojo');
    c1.findOne({ _id: req.params.id }, function (err, dojo) {
        if (err) {
            res.status(500);
            return;
        }
        var c2 = registry.getCollection('user');
        c2.find({ dojos: dojo._id }).toArray(function (err, users) {
            res.render('administrator_get_dojo', {
                title: 'Dojo',
                dojo: dojo,
                users: users
            });
        })
    });
});

router.get('/users/:id', function (req, res) {
    var c1 = registry.getCollection('user');
    c1.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            res.status(500);
            return;
        }
        var c2 = registry.getCollection('dojo');
        c2.find().toArray(function (err, dojos) {
            res.render('administrator_get_user', {
                title: 'User',
                dojos: dojos,
                user: user
            });
        });
    });
});

module.exports = router;