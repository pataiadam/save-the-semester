/**
 * CoachController
 *
 * @description :: Server-side logic for managing Coaches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function(req, res) {
        Coach.find().exec(function(err, coaches) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            res.view({
                coaches: coaches
            });
        });
    },

    create: function(req, res) {
        var callback = function(err, coach) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }
            res.redirect('/coach/show?id='+coach.id);
        }
        if (req.method === 'GET') {
            res.view();
        } else {
            Coach.create(req.body).exec(callback);
        }
    },
    show: function(req, res){
        Coach.findOne({id: req.query.id}).exec(function(err, coach){
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }
            res.view({coach: coach});
        });
    },
    update: function(req, res){
        if (req.method === 'GET') {
            Coach.findOne({id: req.query.id}).exec(function(err, coach){
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }
                res.view({coach: coach});
            });
        } else {
            Coach.update({id: req.body.id}, req.body).exec(function(err){
                if (!!err) {
                    sails.log.error(err);
                    req.flash(err);
                }
                res.redirect('/coach/show?id='+req.body.id);
            });
        }
    },
    delete: function(req, res){
        Coach.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            res.redirect('/coach');
        });
    }
};
