var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();


describe('Coach', function(){
    var coach;
    describe('createCoach', function(){
        it('should create a coach', function(done){
            var api = 'webapi/coach/createCoach';
            var params = {subject: 'test_subject', description: 'test_description'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('coach');
                result.coach.should.have.property('subject');
                result.coach.should.have.property('description');
                result.coach.subject.should.equal('test_subject');
                result.coach.description.should.equal('test_description');
                coach = result.coach;
                done();
            })
        })
    });

    describe('getAllCoach', function(){
        it('should get all coaches', function(done){
            var api = 'webapi/coach/getAllCoach';
            var params = {};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('coaches');
                result.coaches.should.have.length.above(0);
                done();
            })
        })
    });

    describe('getCoachById', function(){
        it('should get a coach by id', function(done){
            var api = 'webapi/coach/getCoachById';
            var params = {id: coach.id};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('coach');
                result.coach.should.have.property('subject');
                result.coach.should.have.property('description');
                result.coach.subject.should.equal('test_subject');
                result.coach.description.should.equal('test_description');
                done();
            })
        })
    });
});