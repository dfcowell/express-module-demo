var express = require('express');

module.exports = function(appState) {
    var router = express.Router({mergeParams: true});

    function getUserList(req, res) {
        res.json(appState.users);
    }

    function getUser(req, res, next) {
        req.user = appState.users[req.query.user];
        next();
    }

    function getUserProfile(req, res) {
        res.json(req.user);
    }

    function getUserPosts(req, res) {
        // get user discussions TODO
    }

    router.get('/:nickname/posts', getUserPosts);
    router.get('/', getUserList);

    return {
        routes: router,
        middleware: {
            getUser
        }
    };
}