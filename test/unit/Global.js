var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
var grunt = require('grunt');
var path = require('path');
chai.should();

describe('Global', function() {

    var users = [], coaches = [];

    before(function(){
        var testUser = grunt.file.readJSON(path.join(__dirname,'..','fixtures/User.json'));
        var testCoach = grunt.file.readJSON(path.join(__dirname,'..','fixtures/Coach.json'));

        for(i = 0; i < 10; ++i) {
            User.create(testUser.data[i]).exec(function (err, u) {
                if (!!err) {
                    sails.log(err);
                }
                users.push(u);
                esService.create('user', u.id,
                    {
                        name: u.name,
                        email: u.email
                    });
                testCoach.data[i].userId = u.id;
                Coach.create(testCoach.data[i]).exec(function (err, c) {
                    if (!!err) {
                        sails.log(err);
                    }
                    coaches.push(c);
                    esService.create('coach', c.id,
                        {
                            subject: c.subject,
                            description: c.description,
                            phoneNumber: c.phoneNumber,
                            price: c.price,
                            avgRate: c.avgRate
                        });
                });
            });

        }
    });

    describe('search', function () {
        it('should return the most relevant results from elasticsearch server', function (done) {
            var api = 'webapi/global/search';
            var params = {
                search: "kalk"
            };

            request.send(api, params, function (result) {
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('results');
                result.results.should.have.length.above(0);
                done();

            });
        });
    });


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

    after(function(){
        for(var i = 0; i < 10; ++i) {
            esService.delete('user', users[i].id);
            esService.delete('coach', coaches[i].id);
        }
    });
});
