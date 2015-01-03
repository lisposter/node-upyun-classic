'use strict';
var fs = require('fs');

var UPYUN = require('..');
var should = require('should');

var upyun_img = new UPYUN('travis-img', 'travisci', 'testtest', 'ctcc');
var tempstr = '/' + Math.random().toString().slice(-8);

describe('Image process', function() {
  describe('image upload and process', function() {
    it('should return pic info when upload files to image bucket', function(done) {
      upyun_img.downloadFile('/res/upyun_logo.png', './test/logo.png', function(err, result) {
        var opts = {
          "x-gmkerl-type": "fix_both",
          "x-gmkerl-value": "400x200",
          "x-gmkerl-rotate": 90
        };
        upyun_img.uploadFile('/test' + tempstr + '.png', './test/logo.png', 'image/png', true, opts, function(err, result) {
          result.data.width.should.be.exactly('400');
          result.data.height.should.be.exactly('200');
          result.data.type.should.be.exactly('PNG');
          result.data.frames.should.be.exactly('1');
          fs.unlink('./test/logo.png');
          done();
        });
      });
    });
  });
});
