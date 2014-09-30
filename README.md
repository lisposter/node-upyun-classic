# node-upyun-legacy
[![NPM version](https://img.shields.io/npm/v/upyun-legacy.svg?style=flat)](https://www.npmjs.org/package/upyun-legacy)
[![Build status](https://img.shields.io/travis/lisposter/node-upyun-legacy.svg?style=flat)](https://travis-ci.org/lisposter/node-upyun-legacy)
[![Test coverage](https://img.shields.io/coveralls/lisposter/node-upyun-legacy.svg?style=flat)](https://coveralls.io/r/lisposter/node-upyun-legacy?branch=master)

official upyun sdk for node.js (legacy)

# Install

```sh
$ npm install upyun-legacy --save
```

# Example
```js
var UPYUN = require('upyun');

var upyun = new UPYUN('testbucket', 'operatername', 'operaterpwd', 'v0');

upyun.getUsage(function(err, result) {
    //...
})
```

# Response
In this SDK, every api will return a response in the format:

#### Normal

```js
{
    statusCode: 200,    // http stats code
    headers: {
        server: 'nginx/1.1.19',
        date: 'Wed, 13 Aug 2014 02:15:27 GMT',
        'content-type': 'application/json',
        'content-length': '24',
        connection: 'close'
    },                  // response header
    data: {
        space: 2501
    }                   // response body
}
```

#### Error catch
When an error occured, the error will be catched, and returned in the response

```js
{
    statusCode: 401,    // http stats code
    error: {
        error_code: 40104,
        request: 'GET /imgtest',
        message: 'Signature error, (signature = md5(METHOD&PATH&DATE&CONTENT_LENGTH&MD5(PASSWORD))).'
    },                  // error message
    headers: {
        server: 'nginx/1.1.19',
        date: 'Wed, 13 Aug 2014 02:19:07 GMT',
        'content-type': 'application/json',
        'content-length': '145',
        connection: 'close',
        'www-authenticate': 'Basic realm="UpYun"'
    }                   // response header
}
```

The different between these two responses is the `error` and `body`.

All responses contain http status code and raw response header for futher usage.


# Docs
## API
* [`getUsage`](#getUsage)
* [`listDir`](#listDir)
* [`createDir`](#createDir)
* [`removeDir`](#removeDir)
* [`uploadFile`](#uploadFile)
* [`existsFile`](#existsFile)
* [`downloadFile`](#downloadFile)
* [`removeFile`](#removeFile)

## Utils

* [`setEndpoint`](#setEndpoint)


# API

<a name="getUsage" />
### getUsage(callback)
To get how many quota has been used.(Unit:`Byte`)

response eg.

```js
{ statusCode: 200,
  headers: { ... },
  data: { space: '660612' } }
```

---------------------------------------

<a name="listDir" />
### listDir(remotePath, callback)
Get the file list of that dir. The response contains each item's type(file or dir), size(unit: `Byte`), last modify time.

__Arguments__
* `remotePath` The dir path which you want to traverse.

response eg.

```js
{
  "statusCode": 200,
  "headers": { ... },
  "data": {
    "location": "/",
    "files": [
      {
        "name": "test_manual",
        "type": "folder",
        "length": "0",
        "last_modified": "1411701197"
      },
      {
        "name": "dir",
        "type": "file",
        "length": "0",
        "last_modified": "1411546581"
      }
    ]
  }
}
```

---------------------------------------

<a name="createDir" />
### createDir(remotePath, callback)
Create a new dir in UPYUN bucket.

__Arguments__
* `remotePath` The dir path which you want to create.

---------------------------------------

<a name="removeDir" />
### removeDir(remotePath, callback)
Delete a dir

* `remotePath` The dir path which you want to remove.

---------------------------------------

<a name="uploadFile" />
### uploadFile(remotePath, localFile, type, [checksum], [opts], callback)
Upload a file into UPYUN bucket.

__Arguments__
* `remotePath` Where the file will be stored in your UPYUN bucket.
* `localFile` The file you want to upload. It can be a `path` string or the file's raw data.
* `type` Specifies the file's content-type.
* `checksum` Set `true` to force SDK send a md5 of local file to UPYUN. Or set a md5value string by yourself.
* `opts` The additional http request headers(JavaScript Object). More detail in [Official Docs](http://docs.upyun.com/api/http_api/#上传文件)

```js
 {
     statusCode: 200,
     headers: { ... },
     data: {
         width: '400',
         height: '200',
         frames: '1',
         type: 'PNG'
     }
 }
```

---------------------------------------

<a name="existsFile" />
### existsFile(remotePath, callback)
`HEAD` a path to detect if there is an file.

__Arguments__
* `remotePath` The file's path in your UPYUN bucket.

```js
{
    statusCode: 200,
    headers: { ... },
    data: {
        type: 'file',
        size: '1075',
        date: '1407729976'
    }
}
```

---------------------------------------

<a name="downloadFile" />
### downloadFile(remotePath, [localPath], callback)
Download a file from UPYUN bucket.

__Arguments__
* `remotePath` The file's path in your UPYUN bucket.
* `localPath` Where the file will save to. If no `localPath`, the file's content will output directly in the response body.

---------------------------------------

<a name="removeFile" />
### removeFile(remotePath, callback)
Delete a file from UPYUN bucket.

__Arguments__
* `remotePath` The file's path in your UPYUN bucket.

# Utils

<a name="setEndpoint" />
### setEndpoint(endpoint)
Use this method to set api endpoint manually.

__Arguments__
* `endpoint` The value can be these(leave blank to let sdk auto select the best one):
  * `ctcc` or `v1`: China Telecom
  * `cucc` or `v2`: China Unicom
  * `cmcc` or `v3` China Mobile
  * `v0` or any other string: Will use `v0.api.upyun.com` (auto detect routing)

