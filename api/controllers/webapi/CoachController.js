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

        Coach.find({deletedAt: null})
            .populate('userId')
            .exec(function (err, coaches) {
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

        Coach.findOne({id: coachParams.id, deletedAt: null})
            .populate('userId')
            .exec(function (err, coach) {
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
            coaches: []
        };

        if (!coachParams.hasOwnProperty('userId')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Coach.find({userId: coachParams.userId, deletedAt: null})
            .populate('userId')
            .exec(function (err, coaches) {
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
        //_.extend(coachParams, {userId: req.user.id});
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
            esService.create('coach', coach.id,
                {
                    subject: coach.subject,
                    description: coach.description,
                    phoneNumber: coach.phoneNumber,
                    price: coach.price,
                    avgRate: coach.avgRate
                });
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
                            }]})
                .populate('userId')
                .exec(function(err, results){
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
                var msg = 'Record not found with id: ' + id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coaches[0];
            esService.update('coach', id, coachParams);
            res.json(jsonData);
        });

    },
    
    rateCoach: function (req, res) {
        var rateParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            rate: null,
            coach: null
        };
        
        // parameter checks
        
        if (!rateParams.hasOwnProperty('userId')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        if (!rateParams.hasOwnProperty('coachId')) {
            var msg = 'Missing parameters: coachId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        if (!rateParams.hasOwnProperty('value')) {
            var msg = 'Missing parameters: value undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

		// creates the Rate, then updates the Coach with new avg
        Rate.create(rateParams).exec(function (err, rate) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }
            
			jsonData.rate = rate;
            
            // calculates the actual avgRate
	        var avg;
	        Rate.find({coachId: rateParams.coachId, deletedAt: null}).exec(function (err, rates) {
		        if (!!err) {
		            sails.log.error(err);
		            jsonData.error = err.details;
		            return res.json(jsonData);
		        }
		        
		        var count = rates.length, sum = 0;
		        for (i = 0; i < rates.length; ++i) {
		        	sum += rates[i].value;
		        }
		        avg = (count > 0) ? sum/count : 0;
		        
		        // updates the Coach with new avgRate
		        Coach.update({id: rateParams.coachId, deletedAt: null}, {avgRate: avg}).exec(function (err, coaches) {
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
		    });
        });
    },
    
    getRateById: function (req, res) {
        var params = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            rate: 0
        };
        
        if (!params.hasOwnProperty('userId')) {
            var msg = 'Missing parameters: userId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        if (!params.hasOwnProperty('coachId')) {
            var msg = 'Missing parameters: coachId undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        Rate.find({coachId: params.coachId, userId: params.userId, deletedAt: null})
            .populate('userId')
            .populate('coachId')
            .exec(function (err, rates) {
                if (!!err) {
                    sails.log.error(err);
                    jsonData.error = err.details;
                    return res.json(jsonData);
                }

                jsonData.isSuccess = true;
                jsonData.rate = rates[0];
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
                var msg = 'Record not found with id: ' + id;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.coach = coaches[0];
            esService.delete('coach', id);
            res.json(jsonData);
        });
    },
    
    joinCoach: function (req, res) {
    	var params = req.body;
    	var jsonData = {
            isSuccess: false,
            error: '',
            learner: null
        };
        
    	if(!params.hasOwnProperty('userId')) {
    		var msg = 'Missing parameters: userId undefined.';
    		sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        if(!params.hasOwnProperty('coachId')) {
    		var msg = 'Missing parameters: coachId undefined.';
    		sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        var userId = params.userId;
        var coachId = params.coachId;
        
        Learner.create(params).exec(function (err, learner) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.learner = learner;
            res.json(jsonData);
        });
    },
    
    accept: function (req, res) {
    	var params = req.body;
    	var jsonData = {
            isSuccess: false,
            error: '',
            learner: null
        };
        
    	if(!params.hasOwnProperty('userId')) {
    		var msg = 'Missing parameters: userId undefined.';
    		sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        if(!params.hasOwnProperty('coachId')) {
    		var msg = 'Missing parameters: coachId undefined.';
    		sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        Learner.update({userId: params.userId, coachId: params. coachId, deletedAt: null}, {acceptedRequest: true}).exec(function (err, learners) {
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.learner = learners[0];
            res.json(jsonData);
        });
    },
    
    cancel: function (req, res) {
    	var params = req.body;
    	var jsonData = {
            isSuccess: false,
            error: '',
            learner: null
        };
        
    	if(!params.hasOwnProperty('userId')) {
    		var msg = 'Missing parameters: userId undefined.';
    		sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        
        if(!params.hasOwnProperty('coachId')) {
    		var msg = 'Missing parameters: coachId undefined.';
    		sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
       	
        Learner.update({userId: params.userId, coachId: params. coachId, deletedAt: null}, {deletedAt: new Date()}).exec(function (err, learners) {
            if (!!err) {
                sails.log.error(err);
                req.flash(err);
            }

            if (learners === undefined || learners.length === 0) {
                var msg = 'Record not found with id: ' + params.coachId;
                sails.log.error(msg);
                jsonData.error = msg;
                return res.json(jsonData);
            }

            jsonData.isSuccess = true;
            jsonData.learner = learners[0];
            res.json(jsonData);
        });
    }
};
