/**
 * Created by marton on 2015.04.30..
 */

var es = require('elasticsearch');
var indexName = 'save-the-semester';

var helper = {
    getClient : function(){

        var success;
        var client = new es.Client({
            host: 'localhost:9200'
        });
        var settings = {
            analysis:{
                analyzer:{
                    lowercaser:{
                        tokenizer: 'whitespace',
                        filter: [ 'lowercase' ]
                    }
                }
            }
        };
        client.indices.close({
            index: indexName
        }, function(){
            client.indices.putSettings({
                body: {
                    settings: settings
                }
            }, function(){
                client.indices.open({
                    index: indexName
                });
            });
        });

        return client;
    }
};

var client = helper.getClient();


module.exports = {

    create : function (type, id, obj){

        client.create({
            index: indexName,
            type: type,
            id: id,
            body: obj
        }, function(error, response){
            if(error) {
                sails.log(error);
            }
        });
    },

    delete : function(type, id){

        client.delete({
            index: indexName,
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
            index: indexName,
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

        // Basic type and field filter
        var type = params.hasOwnProperty('type') ? params.type : 'coach,user';
        var field = params.hasOwnProperty('field') ? params.field : '_all';

        //TODO: GeoDistance
        var distance = params.hasOwnProperty('distance') ? params.distance : '50km';
        var geoDistance = (params.hasOwnProperty('lat') && params.hasOwnProperty('lon'));

        var filtered = params.hasOwnProperty('filtered') ? params.filtered : false;

        // JSON values for search
        var filter = {};
        var fieldParam = {};
        fieldParam[field] = { query: str, slop: 3 };
        var query = {
            match_phrase_prefix: fieldParam
        };

        if(filtered) {

            // Price range
            var minPrice = params.hasOwnProperty('minPrice') ? params.minPrice : 0.0;
            var maxPrice = params.hasOwnProperty('maxPrice') ? params.maxPrice : 100000.0;

            // Rate minimum value
            var minRate = params.hasOwnProperty('minRate') ? params.minRate : 0.0;

            filter = {
                bool: {
                    must: [
                        {
                            range: {
                                price: { from: minPrice, to: maxPrice }
                            }
                        },
                        {
                            range: {
                                avgRate: { from: minRate }
                            }
                        }
                    ]
                }
            };

            query = {
                filtered: {
                    query: {
                        match_phrase_prefix: fieldParam
                    },
                    filter: filter
                }
            }
        }

        client.search({

            index: indexName,
            type: type,
            body:{
                query: query
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