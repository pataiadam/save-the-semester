var helper={
    //TODO: we need more logic :D
    getPrioritizedObjects: function(users, coaches, callback){
        var results = [];

        for (var i = 0; i < users.length; i++) {
            if(i==5){
                break;
            }
            users[i]['model']='User';
            results.push(users[i]);
        }
        for (var i = 0; i < coaches.length; i++) {
            if(i==5){
                break;
            }
            coaches[i]['model']='Coach';
            results.push(coaches[i]);
        }
        callback(results);
    }
};

module.exports = {
    search: function (req, res) {
        var searchParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            results: []
        };

        if (!searchParams.hasOwnProperty('search')) {
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        Coach.find({or: [
            {subject: {
                'like': '%' + searchParams.search + '%'}},
            {description: {
                'like': '%' + searchParams.search + '%'}}
        ]}).exec(function(err, coaches){
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }
            User.find({or: [
                {name: {
                    'like': '%' + searchParams.search + '%'}},
                {email: {
                    'like': '%' + searchParams.search + '%'}}
            ]}).exec(function(err, users){
                if (!!err) {
                    sails.log.error(err);
                    jsonData.error = err.details;
                    return res.json(jsonData);
                }

                helper.getPrioritizedObjects(users, coaches, function(results){
                    jsonData.isSuccess = true;
                    jsonData.results = results;
                    res.json(jsonData);
                });
            });

        });
    },

    getLocationByLatLng : function(req, res) {

        var params = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            results: []
        };

        if (!params.hasOwnProperty('lat')) {
            var msg = 'Missing parameters: lat undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        if (!params.hasOwnProperty('lng')) {
            var msg = 'Missing parameters: lng undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        gcService.reverseGeocode(params.lat, params.lng, function(err, results){
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }
            jsonData.results = results;
            jsonData.isSuccess = true;
            res.json(jsonData);
        });
    },

    getLatLngByLocation : function(req, res) {

        var params = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            results: {}
        };

        if (!params.hasOwnProperty('search')) {
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }

        gcService.geocode(params.search, function(err, results){
            if (!!err) {
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }
            jsonData.results = results;
            jsonData.isSuccess = true;
            res.json(jsonData);
        });
    }
};
