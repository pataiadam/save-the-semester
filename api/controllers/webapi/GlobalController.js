

module.exports = {
    search: function (req, res) {
        var searchParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            results: []
        };
        var params = {
            type : null,
            field : null
        };

        if (!searchParams.hasOwnProperty('search')) {
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        if(searchParams.hasOwnProperty('type')){
            type = searchParams.type;
        }
        if(searchParams.hasOwnProperty('field')){
            field = searchParams.field;
        }
        var searchStr = searchParams.search;

        esService.search(searchStr, params, function(result, err){
            if(!!err){
                sails.log.error(err);
                jsonData.error = err.details;
                return res.json(jsonData);
            }

            for(var i = 0; i < result.total && i < 10; ++i) {
                jsonData.results.push(result.hits[i]);
            }
            jsonData.isSuccess = true;
            res.json(jsonData);
        });
    }
};
