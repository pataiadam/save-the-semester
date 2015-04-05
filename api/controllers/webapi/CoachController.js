/**
 * CoachController
 *
 * @description :: Server-side logic for managing Coaches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getAllCoach: function (req, res) {
        var jsonData = {
            isSuccess: false,
            error: '',
            coaches: []
        };

        Coach.find({deletedAt: null}).exec(function (err, coaches) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coaches = coaches;
            res.json(jsonData);
        });
    },

    getCoachById: function (req, res) {
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: null
        };

        if (!coachParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: coachId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Coach.findOne({id: coachParams.id, deletedAt: null}).exec(function (err, coach) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            if (coach === undefined) {
                var msg = 'Record not found with id: ' + coachParams.id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coach;
            res.json(jsonData);
        });
    },
    
    getCoachesByUserId: function (req, res) {
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: []
        };

        if (!coachParams.hasOwnProperty('userId')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Coach.find({userId: coachParams.userId, deletedAt: null}).exec(function (err, coaches) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            if (coaches === undefined) {
                var msg = 'Record not found with id: ' + coachParams.userId;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coaches = coaches;
            res.json(jsonData);
        });
    },

    createCoach: function (req, res) {
        var coachParams = req.body;
        _.extend(coachParams, {userId: req.user.id});
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: null
        };

        Coach.create(coachParams).exec(function (err, coach) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coach;
            res.json(jsonData);
        });
    },

    getCoachBySearch: function (req, res) {
        var searchParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coaches: []
        };

        if(searchParams.hasOwnProperty('search')){
            Coach.find({or: [{
                            subject: {
                                'like': '%' + searchParams.search + '%'}
                            }]}).exec(function(err, results){
                if (!!err) {
                    sails.log.error(err);
                    jsonData.error = err.details;
                    return res.json(jsonData);
                }
                jsonData.isSuccess = true;
                jsonData.coaches = results;
                res.json(jsonData);
            });
        }else{
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
    },

    updateCoach: function (req, res) {
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: null
        };

        if (!coachParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: coachId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        var id = coachParams.id;
        coachParams.id = null;
        Coach.update({id: id, deletedAt: null}, coachParams).exec(function (err, coaches) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (coaches === undefined || coaches.length === 0) {
                var msg = 'Record not find with id: ' + id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coaches[0];
            res.json(jsonData);
        });

    },

    deleteCoach: function (req, res) {
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: null
        };

        if (!coachParams.hasOwnProperty('id')) {
            var msg = 'Missing parameters: coachId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        var id = coachParams.id;
        coachParams.id = null;
        Coach.update({id: id, deletedAt: null}, {deletedAt: new Date()}).exec(function (err, coaches) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (coaches === undefined || coaches.length === 0) {
                var msg = 'Record not find with id: ' + id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coaches[0];
            res.json(jsonData);
        });
    }
};
