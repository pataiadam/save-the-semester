/**
 * RateController
 *
 * @description :: Server-side logic for managing Rates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Rate.find().populateAll().exec(function (err, rates) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/rate');
            }
            res.view({rates: rates});
        });
    },
    show: function (req, res) {
        Rate.findOne({id: req.query.id}).populateAll().exec(function (err, rate) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/rate');
            }
            res.view({rate: rate});
        });
    },
    create: function (req, res) {
        if (req.method === 'GET') {
            User.find().exec(function (err, users) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/rate');
                }
                Circle.find().exec(function (err, circles) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash('error', err);
                        return res.redirect('/rate');
                    }
                    res.view({users: users, circles: circles});
                });
            });
        } else {
            Rate.create(req.body).exec(function (err, rate) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/rate');
                }

                res.redirect('/rate/show?id=' + rate.id);
            });
        }
    },
    update: function (req, res) {
        if (req.method === 'GET') {
            Rate.findOne({id: req.query.id}).exec(function (err, rate) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/rate');
                }
                User.find().exec(function (err, users) {
                    if (!!err) {
                        sails.log.error(err);
                        req.flash('error', err);
                        return res.redirect('/rate');
                    }
                    Circle.find().exec(function (err, circles) {
                        if (!!err) {
                            sails.log.error(err);
                            req.flash('error', err);
                            return res.redirect('/rate');
                        }
                        res.view({rate: rate, users: users, circles: circles});
                    });
                });
            });
        } else {
            var id = req.body.id;
            req.body.id = null;
            Rate.update({id: id}, req.body).exec(function (err) {
                if (!!err) {
                    sails.log.error(err);
                    req.flash('error', err);
                    return res.redirect('/rate');
                }
                res.redirect('/rate/show?id=' + id);
            });
        }
    },
    delete: function (req, res) {
        Rate.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if (!!err) {
                sails.log.error(err);
                req.flash('error', err);
                return res.redirect('/rate');
            }

            res.redirect('/rate');
        });
    }
};
