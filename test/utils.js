'use strict';
var UPYUN = require('..');
var utils = require('../lib/utils');

var should = require('should');

var upyun = new UPYUN('travis', 'travisci', 'testtest', 'ctcc');

describe('utils: ', function() {
  describe('.getConf(key)', function() {
    it('should get bucket name', function() {
      upyun.getConf('bucket').should.be.exactly('travis');
    });

    it('should return nothing', function() {
      (upyun.getConf('null') === undefined).should.be.true;
    });
  });

  describe('.setConf(key, value)', function() {
    it('should get bucket name', function() {
      upyun.setConf('userAgent', 'TESTUA/v0.1.0');
      upyun.getConf('userAgent').should.be.exactly('TESTUA/v0.1.0');
    });

    it('should return nothing', function() {
      (upyun.getConf('null') === undefined).should.be.true;
    });
  });

  describe('.setEndpoint(ep)', function() {
    it('should set endpoint', function() {
      upyun.setEndpoint();
      upyun.getConf('endpoint').should.be.exactly('v0.api.upyun.com');
    });

    it('should set endpoint', function() {
      upyun.setEndpoint('ctcc');
      upyun.getConf('endpoint').should.be.exactly('v1.api.upyun.com');
    });

    it('should set endpoint', function() {
      upyun.setEndpoint('cucc');
      upyun.getConf('endpoint').should.be.exactly('v2.api.upyun.com');
    });

    it('should set endpoint', function() {
      upyun.setEndpoint('cmcc');
      upyun.getConf('endpoint').should.be.exactly('v3.api.upyun.com');
    });
  });

  describe('initial client', function() {
    it('should set endpoint of v0', function() {
      var upyunv0 = new UPYUN('travis', 'travisci', 'testtest', 'v0');
      upyunv0.getConf('endpoint').should.be.exactly('v0.api.upyun.com');
    });

    it('should set endpoint of v1', function() {
      var upyunv1 = new UPYUN('travis', 'travisci', 'testtest', 'v1');
      upyunv1.getConf('endpoint').should.be.exactly('v1.api.upyun.com');
    });

    it('should set endpoint of v2', function() {
      var upyunv2 = new UPYUN('travis', 'travisci', 'testtest', 'v2');
      upyunv2.getConf('endpoint').should.be.exactly('v2.api.upyun.com');
    });

    it('should set endpoint of v3', function() {
      var upyunv3 = new UPYUN('travis', 'travisci', 'testtest', 'v3');
      upyunv3.getConf('endpoint').should.be.exactly('v3.api.upyun.com');
    });
  });

  describe('utils.request()', function() {
    it('should return a request option object', function() {
      var _conf = {bucket: 'test', operator: 'test', password: 'password', endpoint: 'endpoint'};
      var options = utils.genReqOpts({_conf: _conf}, 'GET', '/test', null, null);
      options.path.should.be.exactly('/test');
    });
  });

  describe('utils.parseRes()', function() {
    it('it should return a error code', function() {
      var res = {
        data: 'some text not a json valid string'
      };
      utils.parseRes(res).should.have.property('error');
    });
  });
});
