var express = require('express');

var registry = require('../registry')

var router = express.Router();

router.get('/', function (req, res) {
    var c1 = registry.getCollection('meeting');
    c1.find().toArray(function (err, meetings) {
        if (err) {
            res.status(500);
            return;
        }
        res.render('champion', {
            title: "Champion",
            meetings: meetings
        });
    });
});

router.get('/add_meeting', function (req, res) {
    var c1 = registry.getCollection('dojo');
    c1.find().toArray(function (err, dojos) {
        if (err) {
            res.status(500);
            return;
        }
        res.render('champion_add_meeting', {
            title: 'Add Meeting',
            dojos: dojos
        });
    });
});

router.get('/meetings/:id', function (req, res) {
    var c1 = registry.getCollection('meeting');
    c1.findOne({ _id: req.params.id }, function (err, meeting) {
        if (err) {
            res.status(500);
            return;
        }
        var c2 = registry.getCollection('dojo');
        c2.findOne({ _id: meeting.dojo }, function (err, dojo) {
            if (err) {
                res.status(500);
                return;
            }
            res.render('champion_get_meeting', {
                title: 'Meeting',
                meeting: meeting,
                dojo: dojo
            });
        });
    });
});

module.exports = router;