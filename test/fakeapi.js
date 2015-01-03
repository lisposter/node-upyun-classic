'use strict';
var UPYUN = require('..');
var should = require('should');

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');
var tempstr = '/' + Math.random().toString().slice(-8);

describe('Fake API: ', function() {
  beforeEach(function() {
    upyun.setConf('endpoint', 'invalid');
  });

  it('should return an error', function(done) {
    upyun.getUsage(function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.listDir('/', function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.createDir(tempstr, function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.removeDir(tempstr, function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.uploadFile('/test' + tempstr, './LICENSE', 'text/plain', true, function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.existsFile('/test' + tempstr, function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.downloadFile('/test' + tempstr, function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });

  it('should return an error', function(done) {
    upyun.removeFile('/test' + tempstr, function(err, result) {
      err.toString().should.match(/Error/);
      done();
    });
  });
});
