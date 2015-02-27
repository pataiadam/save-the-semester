/**
 * AuthController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        res.view({
            layout: 'login'
        });

    }
};
