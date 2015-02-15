/**
* Circle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identify: 'CircleZ',
    //autoPK: false,
    attributes: {
        id: {
            type: 'string'
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

