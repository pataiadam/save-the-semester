/**
 * Created by marton on 2015.05.08..
 */

var geocoder = require('geocoder');

module.exports = {

    geocode : function(str, callback) {

        geocoder.geocode(str, function(err, data){

            if(!!err){
                sails.log(err);
                callback(err, []);
                return;
            }
            var results = [];
            for(var i in data.results) {
                results.push(data.results[i].geometry.location);
            }
            callback(err, results);
        });
    },

    reverseGeocode : function(lat, lng, callback) {

        geocoder.reverseGeocode(lat, lng, function(err, data){

            if(!!err){
                callback(err, []);
                return;
            }
            var results = [];
            for(var i in data.results) {
                results.push(data.results[i].formatted_address);
            }
            callback(err, results);
        });
    }
};
