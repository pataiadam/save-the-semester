/**
* Coach.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identify: 'Coach',
    attributes: {
        id: {
          type: 'objectid'
        },
        userId: {
            type: 'string'
        },
        subject: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        }
    }
};
