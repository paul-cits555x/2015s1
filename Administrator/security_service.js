﻿var express = require('express');
var mongodb = require('mongodb');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var Registry = require('./registry.js');

var SecurityService = function () {
    
    this.authenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        var url = '/sign_in?url=' + encodeURIComponent(req.originalUrl);
        res.redirect(url);
    }

    this.createRouter = function () {
        
        var router = express.Router();
        
        router.get('/sign_in', function (req, res) {
            if (!req.query.url) {
                res.send("400", "Bad request");
                return;
            }
            res.render('sign_in', {
                title: "Sign In",
                url: req.query.url
            });
        });
        
        router.get('/sign_out', function (req, res) {
            res.render('sign_out', {
                title: "Sign Out"
            });
        });

        router.post('/sign_in', function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                }
                if (!user) {
                    res.send("401", "Unauthorized");
                    return;
                }
                req.logIn(user, function (err) {
                    if (err) {
                    }
                    res.json({});
                });
            })(req, res, next);
        });
        
        router.post('/sign_out', function (req, res) {
            req.logOut();
            res.json({});
        });
        
        return router;
    }
       
    this.createStrategy = function () {
               
        return new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        }, function (req, username, password, done) {
            process.nextTick(function () {              
                var users = Registry.getCollection('user');
                users.findOne({ username: username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, { message: 'Unknown user ' + username });
                    }
                    if (user.password != password) {
                        return done(null, false, { message: 'Invalid password' });
                    }
                    return done(null, user);
                });
            });
        });
    }
    
    if (SecurityService.caller != SecurityService.getInstance) {
        throw new Error('')
    }
}

SecurityService.getInstance = function () {
    if (this.instance == null) {
        
        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });
        
        passport.deserializeUser(function (id, done) {
            var users = Registry.getCollection('user');
            users.findOne({ _id : id }, function (err, user) {
                done(err, user);
            });
        });
                      
        this.instance = new SecurityService();
    }
    return this.instance;
}

SecurityService.instance = null;

module.exports = SecurityService.getInstance();