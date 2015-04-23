/**
 * UserController
 *
 * @description :: Server-side logic for managing Coaches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getAllUser: function (req, res) {
        var jsonData = {
            isSuccess: false,
            error: '',
            users: []
        };

        User.find({deletedAt: null}).exec(function (err, users) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.users = users;
            res.json(jsonData);
        });
    },

    getUserById: function (req, res) {
        var userParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            user: null
        };

        if (!userParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        User.findOne({id: userParams.id, deletedAt: null}).exec(function (err, user) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            if (user === undefined) {
                var msg = 'Record not find with id: ' + userParams.id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            } 

            jsonData.isSuccess = true;
            jsonData.user = user;
            res.json(jsonData);
        });
    },

    createUser: function (req, res) {
        //TODO: user check, just authed user can creat coach
        var userParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            user: null
        };


        User.create(userParams).exec(function (err, user) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.user = user;
            res.json(jsonData);
        });
    },

    getUserBySearch: function (req, res) {
        var searchParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            users: []
        };

        if(searchParams.hasOwnProperty('name') || searchParams.hasOwnProperty('email')){
            User.find({or: [
                    {name: {'like': '%' + searchParams.name + '%'}},
                    {email: {'like': '%' + searchParams.email + '%'}}
                  ]}).exec(function(err, results){
                if (!!err) {
                    sails.log.error(err);
                    jsonData.error = err.details;
                    return res.json(jsonData);
                }
                jsonData.isSuccess = true;
                jsonData.users = results;
                res.json(jsonData);
            });
        }else{
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
    },

    updateUser: function (req, res) {
        var userParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            user: null
        };

        if (!userParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        var id = userParams.id;
        userParams.id = null;
        User.update({id: id, deletedAt: null}, userParams).exec(function (err, users) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (users === undefined || users.length === 0) {
                var msg = 'Record not find with id: ' + id;
                sails.log.error(msg);
                sails.log.error(users);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.user = users[0];
            res.json(jsonData);
        });

    },

    deleteUser: function (req, res) {
        var userParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            user: null
        };

        if (!userParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        User.update({id: userParams.id, deletedAt: null}, {deletedAt: new Date()}).exec(function (err, users) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (users === undefined || users.length === 0){
                var msg = 'Record not find with id: ' + userParams.id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.user = users[0];
            res.json(jsonData);
        });
    }
};
