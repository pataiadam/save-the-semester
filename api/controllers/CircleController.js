/**
 * CircleController
 *
 * @description :: Server-side logic for managing Circles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Circle.find().populateAll().exec(function (err, circles) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/circle');
            }
            res.view({circles: circles});
        });
    },
    show: function (req, res) {
        Circle.findOne({id: req.query.id}).populateAll().exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/circle');
            }

            res.view({circle: circle});
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            User.find().exec(function (err, users) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circle');
                }

                res.view({users: users});
            });
        } else {
            Circle.create(req.body).exec(function (err, circle) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circle');
                }

                res.redirect('/circle/show?id=' + circle.id);
            });
        }
    },
    update: function (req, res) {
        if (req.method === 'GET') {
            Circle.findOne({id: req.query.id}).exec(function (err, circle) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circle');
                }
                User.find().exec(function (err, users) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash('error', err);
                        return res.redirect('/circle');
                    }
                    res.view({circle: circle, users: users});
                });
            });
        } else {
            var id = req.body.id;
            req.body.id = null;
            Circle.update({id: id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circle');
                }

                res.redirect('/circle/show?id=' + id);
            });
        }
    },
    delete: function (req, res) {
        Circle.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/circle');
            }

            res.redirect('/circle');
        });
    }
};
