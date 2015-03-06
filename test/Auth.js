var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();

describe('Auth', function(){
    describe('facebook', function(){
        this.timeout(5000);
        it('should auth with facebook', function(done){
            //Set params
            var api = 'auth/facebook-token/token';
            var params = {
                access_token: 'thisIsARandomAccessToken'
            };

            //Send request to server
            request.send(api, params, function(result){
                //Check results
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('user');
                result.user.should.have.property('id');
                result.user.should.have.property('name');
                done();
            })
        })
    })
});