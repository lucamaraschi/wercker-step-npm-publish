'use strict';

var npm = require('npm');
var semver = require('semver');
var async = require('async');
var sync = require('synchronize');
var Path = require('path');
var assert = require('assert');

var libraryName = process.argv[3];
var npmEmail = process.argv[4];
var npmKey = process.argv[5];
var projectPath = process.argv[2];

console.log(process.argv);

function check_versions(callback) {
  npm.load(npm.config, function(error, packageData) {
    npm.commands.show(['caronte'], function(error, requestedPackage) {
      
      var latestVersion = Object.keys(requestedPackage)[0];
      var currentVersion = require(Path.join(projectPath, 'package.json')).version;
      var isVersionHigher = semver.gt(currentVersion, latestVersion);
      
      assert(isVersionHigher, 'The publishing version is not valid - increase version number');
      callback(null);
    }); 
  });
}

function prepareNpmSettings(callback) {
  var fs = require('fs');
  var stringBuffer = "".concat("_auth = ", npmKey, "\n", "email = ", npmEmail);

  fs.writeFile('.npmrc', stringBuffer, function(error) {
    assert(error === null , error);
    callback(null);
  });
}

function processNpmPublish() {
  npm.commands.publish([], function(error, success) {
    if (!error) console.log('Package published');
    callback(null);
  });
}

//check_versions();
//prepareNpmSettings();

async.waterfall([
  check_versions,
  prepareNpmSettings],
  function(error, success) {
    if (error) process.exit(1);
  });
