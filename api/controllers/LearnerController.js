/**
 * LearnerController
 *
 * @description :: Server-side logic for managing Learners
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Learner.find().exec(function (err, learners) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/learner');
            }

            res.view({learners: learners});
        });
    },
    create: function (req, res) {
        var callback = function (err, learner) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/learner');
            }
            res.redirect('/learner/show?id=' + learner.id);
        };
        if (req.method === 'GET') {
            res.view();
        } else {
            Learner.create(req.body).exec(callback);
        }
    },
    show: function (req, res) {
        Learner.findOne({id: req.query.id}).exec(function (err, learner) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/learner');
            }
            res.view({learner: learner});
        });
    },
    update: function (req, res) {
        if (req.method === 'GET') {
            Learner.findOne({id: req.query.id}).exec(function (err, learner) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/learner');
                }
                res.view({learner: learner});
            });
        } else {
            Learner.update({id: req.body.id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/learner');
                }
                res.redirect('/learner/show?id=' + req.body.id);
            });
        }
    },
    delete: function (req, res) {
        Learner.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/learner');
            }

            res.redirect('/learner');
        });
    }
};
