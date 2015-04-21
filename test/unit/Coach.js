var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();


describe('Coach', function(){
    var coach;
    describe('createCoach', function(){
        it('should create a coach', function(done){
            var api = 'webapi/coach/createCoach';
            var params = {subject: 'test_subject', description: 'test_description', phoneNumber: '06301234567', email: 'test@coach.org'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coach');
                result.coach.should.have.property('subject');
                result.coach.should.have.property('description');
                result.coach.subject.should.equal('test_subject');
                result.coach.description.should.equal('test_description');
                result.coach.should.have.property('phoneNumber');
                result.coach.phoneNumber.should.equal('06301234567');
                result.coach.should.have.property('email');
                result.coach.email.should.equal('test@coach.org');
                result.coach.should.have.property('price');
                result.coach.price.should.equal(0.0);
                result.coach.should.have.property('rate');
                result.coach.rate.should.equal(0.0);
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
                result.should.have.property('error');
                result.error.should.equal('');
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
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coach');
                result.coach.should.have.property('subject');
                result.coach.should.have.property('description');
                result.coach.subject.should.equal('test_subject');
                result.coach.description.should.equal('test_description');
                done();
            })
        })
    });

    describe('getCoachBySearch', function(){
        it('should get a coach by subject', function(done){
            var api = 'webapi/coach/getCoachBySearch';
            var params = {search: 'test'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coaches');
                result.coaches.should.have.length.above(0);
                done();
            })
        })
    });

    describe('updateCoach', function(){
        it('should update the coach', function(done){
            var api = 'webapi/coach/updateCoach';
            var params = {id: coach.id,
                            subject: 'updatedTest',
                            description: 'updatedDescription',
                            phoneNumber: '06309876543',
                            email: 'updated@coach.org',
                            price: 500.0};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coach');
                result.coach.subject.should.equal('updatedTest');
                result.coach.description.should.equal('updatedDescription');
                result.coach.phoneNumber.should.equal('06309876543');
                result.coach.email.should.equal('updated@coach.org');
                result.coach.price.should.equal(500.0);
                done();
            })
        })
    });

    describe('deleteCoach', function(){
        it('should delete the coach', function(done){
            var api = 'webapi/coach/deleteCoach';
            var params = {id: coach.id};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coach');
                result.coach.id.should.equal(coach.id);
                result.coach.should.have.property('deletedAt');
                result.coach.deletedAt.should.not.equal(null);
                done();
            })
        })
    });
});
