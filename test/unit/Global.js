/**
 * Created by marton on 2015.05.08..
 */

var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();


describe('Global', function(){

    describe('getLocationByLatLng', function(){
        it('should return possible locations based on LatLng point', function(done){
            var api = 'webapi/global/getLocationByLatLng';
            var params = {
                lat: 46.253010,
                lng: 20.141425
            };

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('results');
                result.results.should.have.length.above(0);
                done();
            })
        })
    });

    describe('getLatLngByLocation', function(){
        it('should return LatLng point based on address string', function(done){
            var api = 'webapi/global/getLatLngByLocation';
            var params = {
                search: 'Szeged'
            };

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('results');
                result.results.should.have.length.above(0);
                done();
            })
        })
    });

});

