/**
 * CircleMember.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'circlemember',
    identify: 'CircleMember',
    //autoPK: false,
    attributes: {
        id: {
            type: 'objectid'
        },
        userId: {
            model: 'User'
        },
        circleId: {
            model: 'Circle'
        },
        deletedAt: {
            type: 'datetime'
        }
    }
};
