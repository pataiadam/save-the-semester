var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
var grunt = require('grunt');
var path = require('path');
chai.should();

describe('Global', function() {

    var users = [], coaches = [];

    before(function(){
        var coach, user;
        var testUser = grunt.file.readJSON(path.join(__dirname,'..','fixtures/User.json'));
        var testCoach = grunt.file.readJSON(path.join(__dirname,'..','fixtures/Coach.json'));


        for(var i = 0; i < 10; ++i) {
            User.create(testUser.data[i]).exec(function (err, u) {
                if (err) {
                    sails.log(err);
                }
                users.push(u);
                esService.create('user', u);
            });
        }
        for(var i = 0; i < 10; ++i) {
            Coach.create(testCoach.data[i]).exec(function (err, c) {
                if (err) {
                    sails.log(err);
                }
                coaches.push(c);
                esService.create('coach', c);
            });
        }
    });

    describe('search', function () {
        it('should return the most relevant results from elasticsearch server', function (done) {
            var api = 'webapi/global/search';
            var params = {
                search : "Kalk"
            };

            request.send(api, params, function (result) {
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('results');
                console.log(result.results);
                //
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