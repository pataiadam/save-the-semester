/**
 * Rate.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'rate',
    identify: 'Rate',
    //autoPK: false,
    attributes: {
        id: {
            primaryKey: true,
            type: 'objectid'
        },
        userId: {
            model: 'User'
        },
        coachId: {
            model: 'Coach'
        },
        circleId: {
            model: 'Circle'
        },
        value: {
            type: 'integer',
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: 'string'
        },
        isAnonymous: {
        	type: 'boolean',
        	defaultsTo: false
       	},
        deletedAt: {
            type: 'datetime'
        }
    }
};
