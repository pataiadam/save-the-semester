/**
 * Created by marton on 2015.04.30..
 */

var es = require('elasticsearch');
var client = new es.Client({
    host: 'localhost:9200'
});

module.exports = {

    create : function (type, obj){

        client.create({
            index: 'main',
            type: type,
            id: obj.id,
            body: obj
        }, function(error, response){
            if(error) {
                sails.log(error);
            }
        });
    },

    delete : function(type, id){

        client.delete({
            index: 'main',
            type: type,
            id: id
        }, function(error, response){
            if(error) {
                sails.log(error);
            }
        });
    },

    update : function(type, id, params){

        client.update({
            index: 'main',
            type: type,
            id: id,
            body: params
    }, function(error, response){
            if(error) {
                sails.log(error);
            }
        });
    },

    search : function (str, params, callback){

        var hits = [], error = '';

        var type = params.hasOwnProperty('type') ? params.type : _all;
        var field = params.hasOwnProperty('field') ? params.field : _all;
        var distance = params.hasOwnProperty('distance') ? params.distance : '50km';
        var geoDistance = (params.hasOwnProperty('lat') && params.hasOwnProperty('lon'));
        var fieldParam = {};
        fieldParam[field] = { value: str, fuzziness: 4 };

        client.search({

            index: 'main',
            type: type,
            body:{
                query:{
                    fuzzy: {
                        subject: {
                            value: str,
                            fuzziness: 3
                        }
                    }
                }
            }

        }).then(function(res){
            console.log(res);
            hits = res.hits;
            callback(hits, error);
        },function(err){
            error = err;
        });
    }
};