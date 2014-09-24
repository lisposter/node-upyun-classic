var fs = require('fs');
var querystring = require('querystring');

var utils = require('./lib/utils');
var pkg = require('./package.json');


function UPYUN(bucket, username, password, endpoint) {
    this._conf = {
        bucket : bucket,
        username : username,
        password : password,
        version : pkg.version,
        endpoint : utils.transEndpoint(endpoint)
    };
}

UPYUN.prototype.getConf = function(key) {
    if(this._conf[key]) {
        return this._conf[key];
    } else {
        return;
    }
};

UPYUN.prototype.setConf = function(key, value) {
    this._conf[key] = value;
};

UPYUN.prototype.setEndpoint = function(ep) {
    this._conf.endpoint = utils.transEndpoint(ep);
};

UPYUN.prototype.getUsage = function(callback) {
    var options = utils.genReqOpts(this, 'GET', this._conf.bucket + '/?usage');
    utils.request(options, null, function(err, result) {
        if(err) return callback(err);
        result.data = {
            space: result.data
        }
        callback(null, utils.parseRes(result));
    });
};

UPYUN.prototype.listDir = function(remotePath, callback) {
    if(typeof arguments[arguments.length - 1] !== 'function') {
        throw new Error('No callback specified.');
    }

    callback = arguments[arguments.length - 1];

    var location = this._conf.bucket + remotePath;
    var options = utils.genReqOpts(this, 'GET', location);

    utils.request(options, null, function(err, result) {
        if(err) return callback(err);
        var files = result.data.split('\n').reduce(function(prev, curr, idx, arr) {
            var values = curr.split('\t');
            return prev.concat({
                "name": values[0],
                "type": values[1] === 'N' ? 'file' : 'folder',
                "length": values[2],
                "last_modified": values[3]
            });
        }, []);
        result.data = {
            location: location,
            files: files
        };

        callback(null, utils.parseRes(result));
    });
};

UPYUN.prototype.createDir = function(remotePath, callback) {
    var options = utils.genReqOpts(this, 'POST', this._conf.bucket + remotePath, 0, { "Mkdir": true, 'Folder': true });
    utils.request(options, null, function(err, result) {
        if (err) return callback(err);
        callback(null, utils.parseRes(result));
    });
};

UPYUN.prototype.removeDir = function(remotePath, callback) {
    var options = utils.genReqOpts(this, 'DELETE', this._conf.bucket + remotePath);
    utils.request(options, null, function(err, result) {
        if (err) return callback(err);
        callback(null, utils.parseRes(result));
    });
};

UPYUN.prototype.existsFile = function(remotePath, callback) {
    var options = utils.genReqOpts(this, 'HEAD', this._conf.bucket + remotePath);
    utils.request(options, null, function(err, result) {
        if(err) return callback(err);
        result.data = Object.keys(result.headers).filter(function(itm) {
            return itm.indexOf('x-upyun') >= 0;
        }).reduce(function(prev, curr) {
            prev[curr.split('-').pop()] = result.headers[curr];
            // TODO: covert date value to millisecond.
            return prev;
        }, {});
        callback(null, result);
    });
};

UPYUN.prototype.uploadFile = function(remotePath, localFile, type, checksum, opts, callback) {
    if(typeof arguments[arguments.length - 1] !== 'function') {
        throw new Error('No callback specified.');
    };
    var callback = arguments[arguments.length - 1];
    var isFile = fs.existsSync(localFile);
    var _self = this;
    opts = opts || {};

    // TODO: default type
    opts['Content-Type'] = type;
    var contentLength = 0;
    checksum = checksum || true;

    // TODO: optimize logical
    if(isFile && checksum === true) {
        contentLength = fs.statSync(localFile).size;
        utils.md5sumFile(localFile, function(err, result) {
            opts['Content-MD5'] = result;
            _upload(contentLength, opts);
        });
    } else if(isFile && typeof checksum === 'string') {
        contentLength = fs.statSync(localFile).size;
        opts['Content-MD5'] = checksum;
        _upload(contentLength, opts);
    } else {
        contentLength = localFile.length;
        opts['Content-MD5'] = utils.md5sum(localFile);
        _upload(contentLength, opts);
    }

    function _upload(contentLength, opts) {
        var options = utils.genReqOpts(_self, 'PUT', _self._conf.bucket + remotePath, contentLength, opts);
        options.headers.Mkdir = true;
        utils.request(options, localFile, function(err, result) {
            if(err) return callback(err);
            callback(null, utils.parseRes(result));
        });
    }
};

UPYUN.prototype.downloadFile = function(remotePath, callback) {
    var options = utils.genReqOpts(this, 'GET', this._conf.bucket + remotePath);

    utils.request(options, null, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    });
};

UPYUN.prototype.removeFile = function(remotePath, callback) {
    var options = utils.genReqOpts(this, 'DELETE', this._conf.bucket + remotePath);

    utils.request(options, null, function(err, result) {
        if(err) return callback(err);
        callback(null, utils.parseRes(result));
    });
};

module.exports = exports.UPYUN = UPYUN;