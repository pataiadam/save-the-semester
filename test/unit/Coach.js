var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();


describe('Coach', function(){
    describe('getAllCoach', function(){
        it('should get all coaches', function(done){
            var api = 'webapi/coach/getAllCoach';
            var params = {};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('coaches');
                done();
            })
        })
    })
});