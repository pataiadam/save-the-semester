/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res) {
        User.findOne({name: 'Asd'}).exec(function (err, userInstance) {
						res.json(userInstance);
        });
    }
};
