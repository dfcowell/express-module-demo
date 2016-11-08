var express = require('express');

module.exports = function(appState) {
    var getUser = require('./user.js')(appState).middleware.getUser;
    var router = express.Router({mergeParams: true});

    router.get('/', getUser, function(req, res) {
        res.send(`Hello ${req.user.name}`);
    });

    return {
        routes: router
    };
}