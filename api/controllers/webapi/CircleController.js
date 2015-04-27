/**
 * CircleController
 *
 * @description :: Server-side logic for managing Coaches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getAllCircle: function (req, res) {
        var jsonData = {
            isSuccess: false,
            error: '',
            circles: []
        };

        Circle.find({deletedAt: null}).exec(function (err, circles) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.circles = circles;
            res.json(jsonData);
        });
    },

    getCircleById: function (req, res) {
        var circleParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            circle: null
        };

        if (!circleParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: circleId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Circle.findOne({id: circleParams.id, deletedAt: null}).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            if (circle === undefined) {
                var msg = 'Record not find with id: ' + circleParams.id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.circle = circle;
            res.json(jsonData);
        });
    },

    createCircle: function (req, res) {
        var circleParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            circle: null
        };


        Circle.create(circleParams).exec(function (err, circle) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.circle = circle;
            res.json(jsonData);
        });
    },

    getCircleBySearch: function (req, res) {
        var searchParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            circles: []
        };

        if(searchParams.hasOwnProperty('search')){
            Circle.find({or: [
                          {name: {'like': '%' + searchParams.search + '%'}},
                        ]}).exec(function(err, results){
                if (!!err) {
                    sails.log.error(err);
                    jsonData.error = err.details;
                    return res.json(jsonData);
                }
                jsonData.isSuccess = true;
                jsonData.circles = results;
                res.json(jsonData);
            });
        }else{
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
    },

    updateCircle: function (req, res) {
        var circleParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            circle: null
        };

        if (!circleParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: circleId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        var id = circleParams.id;
        circleParams.id = null;
        Circle.update({id: id, deletedAt: null}, circleParams).exec(function (err, circles) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (circles === undefined || circles.length === 0) {
                var msg = 'Record not find with id: ' + id;
                sails.log.error(msg);
                sails.log.error(circle);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.circle = circles[0];
            res.json(jsonData);
        });

    },

    deleteCircle: function (req, res) {
        var circleParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            circle: null
        };

        if (!circleParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: circleId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Circle.update({id: circleParams.id, deletedAt: null}, {deletedAt: new Date()}).exec(function (err, circles) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (circles === undefined || circles.length === 0){
                var msg = 'Record not find with id: ' + circleParams.id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.circle = circles[0];
            res.json(jsonData);
        });
    }
};
