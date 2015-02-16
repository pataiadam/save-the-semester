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
    create: function (req, res) {
        Circle.create(req.body).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }
            res.json({circle: circle});
        });
    },
    update: function (req, res) {
        Circle.update({id: req.body.id}, req.body).exec(function (err, updated) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }
            res.json({circles: updated});
        });
    },
    delete: function (req, res) {
        Circle.update({id: req.body.id}, {deletedAt: new Date()}).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }
            res.json({deleted: circle});
        });
    }
};

