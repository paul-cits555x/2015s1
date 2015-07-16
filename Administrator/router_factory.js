var express = require('express');
var mongodb = require('mongodb');

var Registry = require('./registry.js');

var ObjectID = mongodb.ObjectID;

var RouterFactory = function () {
    
    this.createRouter = function (collectionName) {
        
        var router = express.Router();

        router.delete('/:id', function (req, res) {
            var collection = Registry.getCollection(collectionName);
            collection.remove({ _id : req.params.id }, function (err, doc) {
                if (err) {
                    res.status(500).json({ error : err })
                    return;
                }
                res.json({});
            });
        });
        
        //router.get('/:id', function (req, res) {
        //    var collection = registry.getCollection('user');
        //    collection.findOne({ _id : req.params.id }, function (err, doc) {
        //        if (err) {
        //            res.status(500).json({ error : err })
        //            return;
        //        }
        //        res.json(doc);
        //    });
        //});
        
        router.post('/', function (req, res) {
            var collection = Registry.getCollection(collectionName);
            req.body._id = (new ObjectID()).toString();
            console.log(JSON.stringify(req.body));
            collection.insertOne(req.body, function (err, result) {
                if (err) {
                    res.status(500).json({ error : err })
                    return;
                }
                res.json({});
            });
        });
        
        router.put('/:id', function (req, res) {
            var collection = Registry.getCollection(collectionName);
            collection.replaceOne({ _id : req.params.id }, req.body, function (err, result) {
                if (err) {
                    res.status(500).json({ error : err })
                    return;
                }
                res.json({});
            });
        });

        return router;
    }
}

RouterFactory.instance = null;

RouterFactory.getInstance = function () {
    if (this.instance == null) {
        this.instance = new RouterFactory();
    }
    return this.instance;
}

module.exports = RouterFactory.getInstance();

