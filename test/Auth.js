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
                access_token: 'CAAT8qWdR57cBAD9k3K4Y87RO6TZC1WiyHlxrFdgzm0Ekk09IOh3xBYZA26fkSsS5JKtbg2STZAwWRiYb4hhH3NUP3zbGmbZCGcLqw7M2I3y2rZCppp9WTPZBIVmyLu1Qh36d65ZAhD3MB1FdFxpUSRAxV4JEZC7qXUk5X50HFY6Lf52ylHxjbl9GaDCPwHh9Fh1QVJO14jmSnaejGhghOrihTMIoblDYApcZD'
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