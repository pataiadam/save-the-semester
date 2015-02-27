/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        User.find().exec(function (err, users) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            res.view({users: users});
        });
    },
    show: function (req, res) {
        User.findOne({id: req.query.id}).exec(function (err, user) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }
            res.view({user: user});
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            res.view();
        } else {
            User.create(req.body).exec(function (err, user) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }

                res.redirect('/user/show?id=' + user.id);
            });
        }
    },
    update: function (req, res) {
        if (req.method === 'GET') {
            User.findOne({id: req.query.id}).exec(function (err, user) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }

                res.view({user: user});
            });
        } else {
            var id = req.body.id;
            req.body.id = null;
            User.update({id: id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }

                res.redirect('/user/show?id=' + id);
            });
        }
    },
    delete: function (req, res) {
        User.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            res.redirect('/user');
        });
    }

};
