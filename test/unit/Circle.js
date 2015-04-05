var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();


describe('Circle', function(){
    var circle;
    describe('createCircle', function(){
        it('should create a circle', function(done){
            var api = 'webapi/circle/createCircle';
            var params = {name: 'test_name'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('circle');
                result.circle.should.have.property('name');
                result.circle.name.should.equal('test_name');
                circle = result.circle;
                done();
            })
        })
    });

    describe('getAllCircle', function(){
        it('should get all circles', function(done){
            var api = 'webapi/circle/getAllCircle';
            var params = {};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('circles');
                result.circles.should.have.length.above(0);
                done();
            })
        })
    });

    describe('getCircleById', function(){
        it('should get a circle by id', function(done){
            var api = 'webapi/circle/getCircleById';
            var params = {id: circle.id};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('circle');
                result.circle.should.have.property('name');
                result.circle.name.should.equal('test_name');
                done();
            })
        })
    });

    describe('getCircleBySearch', function(){
        it('should get a circle by subject', function(done){
            var api = 'webapi/circle/getCircleBySearch';
            var params = {search: 'test'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('circles');
                result.circles.should.have.length.above(0);
                done();
            })
        })
    });

    describe('updateCircle', function(){
        it('should update the circle', function(done){
            var api = 'webapi/circle/updateCircle';
            var params = {id: circle.id,
                          name: 'updatedTest'};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('circle');
                result.circle.name.should.equal('updatedTest');
                done();
            })
        })
    });

    describe('deleteCircle', function(){
        it('should delete the circle', function(done){
            var api = 'webapi/circle/deleteCircle';
            var params = {id: circle.id};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('circle');
                result.circle.id.should.equal(circle.id);
                result.circle.should.have.property('deletedAt');
                result.circle.deletedAt.should.not.equal(null);
                done();
            })
        })
    });

});
