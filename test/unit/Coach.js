var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var userApi = require(appRoot + '/api/models/User.js');
var chai = require('chai');
chai.should();


describe('Coach', function(){
    var coach, learner, user;
    describe('createCoach', function(){
        it('should create a coach', function(done){
            var api = 'webapi/coach/createCoach';
            var params = {subject: 'test_subject', description: 'test_description'};

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
    
    describe('getCoachesByUserId', function(){
        it('should get coaches by userid', function(done){
            var api = 'webapi/coach/getCoachesByUserId';
            var params = {userId: coach.userId};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coaches');
                result.coaches.should.be.an('array');
                result.coaches.should.have.length.above(0);
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
                            description: 'updatedDescription'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('coach');
                result.coach.subject.should.equal('updatedTest');
                result.coach.description.should.equal('updatedDescription');
                done();
            })
        })
    });
    
    describe('joinCoach', function(){
    	before(function(){
    		User.create({name: 'test_name', email: 'test@email.org'}).exec(function (err, u) {
                user = u;
            });
    	});
        it('should join a user to coach', function(done){
            var api = 'webapi/coach/joinCoach';
            console.log(user.id);
            var params = {userId: user.id, coachId: coach.id};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('learner');
                result.learner.should.have.property('userId');
                result.learner.userId.should.equal(user.id);
                result.learner.should.have.property('coachId');
                result.learner.coachId.should.equal(coach.id);
                result.learner.should.have.property('acceptedRequest');
                result.learner.acceptedRequest.should.equal(false);
                learner = result.learner;
                done();
            })
        })
    });
    
    describe('accept', function(){
        it('should change acceptedRequest to "true" in learner', function(done){
            var api = 'webapi/coach/accept';
            var params = {userId: learner.userId, coachId: learner.coachId};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('learner');
                result.learner.should.have.property('id');
                result.learner.id.should.equal(learner.id);
                result.learner.should.have.property('userId');
                result.learner.userId.should.equal(learner.userId);
                result.learner.should.have.property('coachId');
                result.learner.coachId.should.equal(learner.coachId);
                result.learner.should.have.property('acceptedRequest');
                result.learner.acceptedRequest.should.equal(true);
                done();
            })
        })
    });
    
    describe('cancel', function(){
        it('should delete learner (i.e. cancel join request)', function(done){
            var api = 'webapi/coach/cancel';
            var params = {userId: learner.userId, coachId: learner.coachId};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('learner');
                result.learner.should.have.property('id');
                result.learner.id.should.equal(learner.id);
                result.learner.should.have.property('userId');
                result.learner.userId.should.equal(learner.userId);
                result.learner.should.have.property('coachId');
                result.learner.coachId.should.equal(learner.coachId);
                result.learner.should.have.property('deletedAt');
                result.learner.deletedAt.should.not.equal(null);
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
