'use strict';
var UPYUN = require('..');
var should = require('should');

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');
var tempstr = '/' + Math.random().toString().slice(-8);

describe('REST API: ', function() {

    describe('getUsage(callback)', function() {
        it('should return a result contains space and file', function(done) {
            upyun.getUsage(function(err, result) {
                result.data.should.have.property('space');
                done();
            });
        });
    });

    describe('listDir(remotePath, callback)', function() {
        it('should return a result contains files', function(done) {
            upyun.listDir('/', function(err, result) {
                result.data.should.have.property('files');
                done();
            });
        });
    });

    describe('listDir(remotePath, callback)', function() {
        it('should return a result contains files', function(done) {
            upyun.listDir('/empty/', function(err, result) {
                result.data.should.have.property('files');
                done();
            });
        });
    });

    describe('createDir(remotePath, callback)', function() {
        it('should return success code 200', function(done) {
            upyun.createDir(tempstr, function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('removeDir(remotePath, callback)', function() {
        it('should return 200', function(done) {
            upyun.removeDir(tempstr, function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('uploadFile(remotePath, localFile, type, checksum, [opts], callback)', function() {
        it('should return 200', function(done) {
            upyun.uploadFile('/test' + tempstr, './LICENSE', 'text/plain', true, function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('uploadFile(remotePath, localFile, type, checksum, [opts], callback)', function() {
        it('should return 200', function(done) {
            upyun.uploadFile('/test' + tempstr, './LICENSE', 'text/plain', function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('uploadFile(remotePath, localFile, type, checksum, [opts], callback)', function() {
        it('should return 200', function(done) {
            upyun.uploadFile('/test' + tempstr, './LICENSE', 'text/plain', '69e97c8b91968c5878f331e53b8dcbf4', function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('uploadFile(remotePath, localFile, type, checksum, [opts], callback)', function() {
        it('should return 200', function(done) {
            upyun.uploadFile('/test' + tempstr + 2, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id molestias ut quisquam, dolores blanditiis nobis labore eum, accusantium dolorem laboriosam est modi sit quam libero aliquam nam corporis nihil rerum.', 'text/plain', true, function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('existsFile(remotePath, callback)', function() {
        it('should return 200', function(done) {
            upyun.existsFile('/test' + tempstr, function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

    describe('downloadFile(remotePath, callback)', function() {
        it('should return file\'s content', function(done) {
            upyun.downloadFile('/test' + tempstr, function(err, result) {
                if(err) {
                    throw err;
                }
                result.data.should.match(/MIT/);
                done();
            });
        });
    });

    describe('removeFile(remotePath, callback)', function() {
        it('should return 200', function(done) {
            upyun.removeFile('/test' + tempstr, function(err, result) {
                if(err) {
                    throw err;
                }
                result.statusCode.should.be.exactly(200);
                done();
            });
        });
    });

});
