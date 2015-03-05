/**
 * LearnerController
 *
 * @description :: Server-side logic for managing Learners
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Learner.find().populateAll().exec(function (err, learners) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/learner');
            }

            res.view({learners: learners});
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            User.find().exec(function (err, users) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
              }

              Coach.find().exec(function (err, coaches) {
                  if (!!err) {
                      sails.log.error(err);
                      req.flash(err);
                    }
                    res.view({coaches: coaches, users: users});
              });
          });
        } else {
            Learner.create(req.body).exec(function (err, learner) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }
                res.redirect('/learner/show?id=' + learner.id);
            });
        }
    },
    show: function (req, res) {
        Learner.findOne({id: req.query.id}).populateAll().exec(function (err, learner) {
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

                User.find().exec(function (err, users) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash(err);
                  }

                Coach.find().exec(function (err, coaches) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash(err);
                      }

                res.view({learner: learner, users: users, coaches: coaches});
                   });
                });
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
