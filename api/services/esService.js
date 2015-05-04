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

    search : function (str, callback){

        var hits = [], error = '';

        client.search({

            p: str
        }).then(function(res){
            console.log(res);
            hits = res.hits;
            callback(hits, error);
        },function(err){
            error = err;
        });
    }
};