/**
 * CircleMemberController
 *
 * @description :: Server-side logic for managing Circlemembers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        CircleMember.find().exec(function (err, circleMembers) {
            if (!!err) {
                sails.log.error(err);
                res.flash(err);
            }

            res.view({circleMembers: circleMembers});
        });
    },
    show: function(req, res) {
        CircleMember.findOne({id: req.query.id}).exec(function (err, circleMember) {
            if(!!err) {
                sails.log.error(err);
                res.flash(err);
            }

            res.view({circleMember: circleMember});
        });
    },
    create: function(req, res) {
        if(req.method === 'GET') {
            res.view();
        }else{
            CircleMember.create(req.body).exec(function (err, circleMember) {
                if(!!err){
                    sails.log.error(err);
                    res.flash(err);
                }

                res.redirect('/circlemember/show?id=' + circleMember.id);
            });
        }
    },
    update: function(req, res) {
        if(req.method === 'GET') {
            CircleMember.findOne({id: req.query.id}).exec(function (err, circleMember) {
                if(!!err){
                    sails.log.error(err);
                    res.flash(err);
                }

                res.view({circleMember: circleMember});
            });
        }else{
            CircleMember.update({id: req.body.id}, req.body).exec(function (err) {
                if(!!err){
                    sails.log.error(err);
                    res.flash(err);
                }

                res.redirect('/circlemember/show?id='+req.body.id);
            });
        }
    },
    delete: function(req, res){
        CircleMember.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if(!!err){
                sails.log.error(err);
                res.flash(err);
            }

            res.redirect('/circlemember');
        });
    }
};

