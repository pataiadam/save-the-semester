/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        User.find().exec(function (err, users) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.view({users: users});
        });
    },
    show: function(req, res){
        User.find().exec(function (err, users) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.view({users: users});
        });
    },
    update: function(req, res){
        User.find().exec(function (err, users) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.view({users: users});
        });
    },
    delete: function(req, res){
        User.find().exec(function (err, users) {
            if(!!err){
              sails.log.error(err);
              res.flash(err);
            }

            res.view({users: users});
        });
    }

};
