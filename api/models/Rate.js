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
        ratedUserId: {
            model: 'User'
        },
        circleId: {
            model: 'Circle'
        },
        value: {
            type: 'int'
        },
        comment: {
            type: 'string'
        }
    }
};
