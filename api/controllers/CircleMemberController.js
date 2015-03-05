/**
 * CircleMemberController
 *
 * @description :: Server-side logic for managing Circlemembers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        CircleMember.find().populateAll().exec(function (err, circleMembers) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/circlemember');
            }

            res.view({circleMembers: circleMembers});
        });
    },
    show: function (req, res) {
        CircleMember.findOne({id: req.query.id}).populateAll().exec(function (err, circleMember) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/circlemember');
            }

            res.view({circleMember: circleMember});
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            User.find().exec(function (err, users) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circlemember');
                }

                Circle.find().exec(function (err, circles) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash('error', err);
                        return res.redirect('/circlemember');
                    }
                    res.view({circles: circles, users: users});
                });
            });
        } else {
            CircleMember.create(req.body).exec(function (err, circleMember) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circlemember');
                }

                res.redirect('/circlemember/show?id=' + circleMember.id);
            });
        }
    },
    update: function (req, res) {
        if (req.method === 'GET') {
            CircleMember.findOne({id: req.query.id}).populateAll().exec(function (err, circleMember) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circlemember');
                }

                User.find().exec(function (err, users) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash(err);
                    }

                    Circle.find().exec(function (err, circles) {
                        if (!!err) {
                            sails.log.error(err);
                            req.flash(err);
                        }
                        res.view({circleMember: circleMember, circles: circles, users: users});
                    });
                });
            });
        } else {
            CircleMember.update({id: req.body.id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/circlemember');
                }

                res.redirect('/circlemember/show?id=' + req.body.id);
            });
        }
    },
    delete: function (req, res) {
        CircleMember.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/circlemember');
            }

            res.redirect('/circlemember');
        });
    }
};
