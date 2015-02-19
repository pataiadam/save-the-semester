/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'user',
    identify: 'User',
    //autoPK: false,
    attributes: {
        id: {
            primaryKey: true,
            type: 'objectid'
        },
        name: {
            type: 'string',
            size: 128
        },
        email: {
            type: 'string',
            email: true
        }
    }
};
