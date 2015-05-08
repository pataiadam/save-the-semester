var appRoot = require('app-root-path');
var request = require(appRoot + '/test/lib/request.js');
var chai = require('chai');
chai.should();


describe('User', function(){
    var user;
    describe('createUser', function(){
        it('should create a user', function(done){
            var api = 'webapi/user/createUser';
            var params = {
                name: 'test_name',
                email: 'test@email.org',
                loc: { x: 46.253010, y: 20.141425 }
            };

            request.send(api, params, function(result){
                console.log(result.error);
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('user');
                result.user.should.have.property('name');
                result.user.should.have.property('email');
                result.user.name.should.equal('test_name');
                result.user.email.should.equal('test@email.org');
                result.user.should.have.property('loc');
                result.user.loc.should.have.property('x');
                result.user.loc.x.should.equal(46.253010);
                result.user.loc.should.have.property('y');
                result.user.loc.y.should.equal(20.141425);
                user = result.user;
                done();
            })
        })
    });

    describe('getAllUser', function(){
        it('should get all user', function(done){
            var api = 'webapi/user/getAllUser';
            var params = {};

            request.send(api, params, function(result){
                result.should.have.property('isSuccess');
                result.isSuccess.should.equal(true);
                result.should.have.property('error');
                result.error.should.equal('');
                result.should.have.property('users');
                result.users.should.have.length.above(0);
                done();
            })
        })
    });

    describe('getUserById', function(){
             it('should get a user by id', function(done){
                 var api = 'webapi/user/getUserById';
                 var params = {id: user.id};

                 request.send(api, params, function(result){
                     result.should.have.property('isSuccess');
                     result.isSuccess.should.equal(true);
                     result.should.have.property('error');
                     result.error.should.equal('');
                     result.should.have.property('user');
                     result.user.should.have.property('name');
                     result.user.should.have.property('email');
                     result.user.name.should.equal('test_name');
                     result.user.email.should.equal('test@email.org');
                     done();
                 })
             })
         });

   describe('getUserBySearch', function(){
              it('should get a user by name or email', function(done){
                  var api = 'webapi/user/getUserBySearch';
                  var params = {name: 'test_name'};

                  request.send(api, params, function(result){
                      result.should.have.property('isSuccess');
                      result.isSuccess.should.equal(true);
                      result.should.have.property('error');
                      result.error.should.equal('');
                      result.should.have.property('users');
                      result.users.should.have.length.above(0);
                      done();
                     })
                 })
             });

   describe('updateUser', function(){
             it('should update the user', function(done){
                 var api = 'webapi/user/updateUser';
                 var params = {id: user.id,
                                        name: 'updatedName',
                                        email: 'updated@email.net'};
                 request.send(api, params, function(result){
                     result.should.have.property('isSuccess');
                     result.isSuccess.should.equal(true);
                     result.should.have.property('error');
                     result.error.should.equal('');
                     result.should.have.property('user');
                     result.user.should.have.property('name');
                     result.user.should.have.property('email');
                     result.user.name.should.equal('updatedName');
                     result.user.email.should.equal('updated@email.net');
                     done();
                    })
                })
            });

  describe('deleteUser', function(){
            it('should delete the user', function(done){
                var api = 'webapi/user/deleteUser';
                var params = {id: user.id};

                request.send(api, params, function(result){
                  result.should.have.property('isSuccess');
                  result.isSuccess.should.equal(true);
                  result.should.have.property('error');
                  result.error.should.equal('');
                  result.should.have.property('user');
                  result.user.id.should.equal(user.id);
                  result.user.should.have.property('deletedAt');
                  result.user.deletedAt.should.not.equal(null);
                  done();
                })
            })
       });

});
