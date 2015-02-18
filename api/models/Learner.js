/**
* Learner.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identify: 'Learner',
    attributes: {
          id: {
              type: 'string'
          },
          userId: {
              type: 'string'
          },
          coachId: {
              type: 'string'
          }
  }
};

