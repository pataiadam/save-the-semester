/**
 * CoachController
 *
 * @description :: Server-side logic for managing Coaches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Coach.find()
            .populate('userId')
            .exec(function (err, coaches) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/coach');
                }

                res.view({
                    coaches: coaches
                });
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            User.find()
                .populateAll()
                .exec(function (err, users) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash(err);
                    }
                    res.view({users: users});
            });
        } else {
            Coach.create(req.body).exec(function (err, coach) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }
                res.redirect('/coach/show?id=' + coach.id);
            });
        }
    },
    show: function (req, res) {
        Coach.findOne({id: req.query.id})
            .populate('userId')
            .exec(function (err, coach) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/coach');
                }

                res.view({coach: coach});
        });
    },
    update: function (req, res) {
        if (req.method === 'GET') {
            Coach.findOne({id: req.query.id})
                .populate('userId')
                .exec(function (err, coach) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash('error', err);
                        return res.redirect('/coach');
                    }
                    User.find().exec(function (err, users) {
                        if (!!err) {
                            sails.log.error(err);
                            req.flash(err);
                        }
                        res.view({coach: coach, users: users});
                    });
            });
        } else {
            var id = req.body.id;
            req.body.id = null;
            Coach.update({id: id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/coach');
                }
                res.redirect('/coach/show?id=' + id);
            });
        }
    },
    delete: function (req, res) {
        Coach.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/coach');
            }

            res.redirect('/coach');
        });
    }
};
