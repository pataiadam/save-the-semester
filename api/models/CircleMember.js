/**
* CircleMember.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identify: 'CircleMember',
    autoPK: false,
    attributes: {
        id: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
        circleId: {
            type: 'string'
        }
    }
};

