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

        Coach.find().exec(function (err, coaches) {
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

        if (coachParams === undefined) {
            var msg = 'Missing parameters: coachId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Coach.findOne({id: coachParams.id}).exec(function (err, coach) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            if (coach === undefined) {
                var msg = 'Record not find with id: ' + coachId;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coach;
            res.json(jsonData);
        });
    },

    createCoach: function (req, res) {
        //TODO: user check, just authed user can creat coach
        var coachParams = req.body;
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
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coaches: []
        };

        //TODO: create logic
        res.json(jsonData);
    },

    updateCoach: function (req, res) {
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: null
        };

        //TODO: create logic
        res.json(jsonData);
    },

    deleteCoach: function (req, res) {
        var coachParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            coach: null
        };

        //TODO: create logic
        res.json(jsonData);
    }
};
