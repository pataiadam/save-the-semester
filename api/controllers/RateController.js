/**
 * RateController
 *
 * @description :: Server-side logic for managing Rates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        Rate.find().exec(function (err, rates) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.view({rates: rates});
        });
    },
    show: function(req, res){
        Rate.findOne({id: req.query.id}).exec(function (err, rate) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.view({rate: rate});
        });
    },
    create: function(req, res){
        if(req.method==='GET'){
            res.view();
        }else{
            Rate.create(req.body).exec(function (err, rate) {
                if(!!err){
                  sails.log.error(err);
                  res.flash(err);
                }

                res.redirect('/rate/show?id='+rate.id);
            });
        }
    },
    update: function(req, res){
        if(req.method==='GET'){
            Rate.findOne({id: req.query.id}).exec(function (err, rate) {
                if(!!err){
                  sails.log.error(err);
                  res.flash(err);
                }

                res.view({rate: rate});
            });
        }else{
            Rate.update({id: req.body.id}, req.body).exec(function (err) {
                if(!!err){
                  sails.log.error(err);
                  res.flash(err);
                }

                res.redirect('/rate/show?id='+req.body.id);
            });
        }
    },
    delete: function(req, res){
        Rate.update({id: req.query.id}, {deletedAt: new Date()}).exec(function (err) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.redirect('/rate');
        });
    }
};
