/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboard
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var process = require('process');

module.exports = {
    index: function (req, res) {
        res.view();
    },

    getMemoryData: function(req, res){
        res.json(process.memoryUsage());
    }
};

