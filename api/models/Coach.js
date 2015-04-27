/**
 * Coach.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'coach',
    identify: 'Coach',
    attributes: {
        id: {
            primaryKey: true,
            type: 'objectid'
        },
        userId: {
            model: 'User'
        },
        subject: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        },
        phoneNumber: {
        	type: 'string',
        	numeric: true
        },
        email: {
        	type: 'email',
        	email: true
        },
        price: {
        	type: 'float',
        	min: 0.0,
        	defaultsTo: 0.0
        },
        avgRate: {
        	type: 'float',
        	min: 0.0,
        	defaultsTo: 0.0
        },
        deletedAt: {
            type: 'datetime'
        }
    },
    beforeValidate: function(value, next){
        for(key in value){
            if(!Coach.definition.hasOwnProperty(key)){
                delete value[key];
            }
        }
        next();
    }
};
