var request = require('request');
var HOST = 'localhost';
var PORT = 1337;

var address = 'http://'+HOST+':'+PORT+'/';

module.exports = {

    send : function(api, params, callback){
        request.post({
            headers: {'content-type' : 'application/json'},
            url:     address+api,
            body:    JSON.stringify(params),
            jar:     true
        }, function(error, response, body){
            if(!!error){
                console.log("ERROR (in " + __filename);
                console.log(error);
                console.log("BODY: ");
                console.log(body);
                return callback(body);
            }
            return callback(JSON.parse(body));
        });
    }

};
