/**
 * CircleController
 *
 * @description :: Server-side logic for managing Circles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Circle.find().exec(function (err, circles) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }
            res.view({circles: circles});
        });
    },
    show: function (req, res) {
        Circle.findOne({id: req.query.id}).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }

            res.view({circle: circle});
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            res.view();
        } else {
            Circle.create(req.body).exec(function (err, circle) {
                if (!!err) {
                    sails.log.error(err);
                    res.flash(err);
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
                    res.flash(err);
                }

                res.view({circle: circle});
            });
        } else {
            Circle.update({id: req.body.id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    res.flash(err);
                }

                res.redirect('/circle/show?id=' + req.body.id);
            });
        }
    },
    delete: function (req, res) {
        Circle.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }

            res.redirect('/circle');
        });
    }
};

