
module.exports = {
    search: function (req, res) {
        var searchParams = req.body;
        var jsonData = {
            isSuccess: false,
            error: '',
            results: []
        };
        var params = {};

        if (!searchParams.hasOwnProperty('search')) {
            var msg = 'Missing parameters: search undefined.';
            sails.log.error(msg);
            jsonData.error = msg;
            return res.json(jsonData);
        }
        if(searchParams.hasOwnProperty('type')){
            params.type = searchParams.type;
        }
        if(searchParams.hasOwnProperty('field')){
            params.field = searchParams.field;
        }
        if(searchParams.hasOwnProperty('filtered')){
            params.filtered = searchParams.filtered;
        }
        var searchStr = searchParams.search;
        
        jsonData.isSuccess = true;
        res.json(jsonData);
    }
};
