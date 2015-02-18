/**
* Circle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identify: 'Circle',
    //autoPK: false,
    attributes: {
        id: {
            type: 'objectid'
        },
        name: {
            type: 'string',
            size: 128
        },
        creatorId: {
            type: 'string'
        }
    }
};

