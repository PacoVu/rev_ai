var needle = require('./needle/lib/needle')
var util = require('util')
var fs = require('fs')
var querystring = require('querystring')

// Constructor
function REVAIClient(apikey, version, proxy) {
  if (version==undefined) {this.version="v1beta";}
  else {this.version=version;}
  this.apikey = apikey;

  baseEndpoint = "https://api.rev.ai/revspeech/";
  this.endpoint = baseEndpoint+this.version+"/%s";

  this.proxy = proxy;
  this.getTranscriptionEndpoint = baseEndpoint+this.version+"/jobs/%s/%s";
  this.getJobEndpoint = baseEndpoint+this.version+"/jobs/%s";
  this.getJobsEndpoint = baseEndpoint+this.version+"/jobs?%s";
  this.getAccountEndpoint = baseEndpoint+this.version+"/account";
}

needle.defaults({ timeout: 120000});

REVAIClient.prototype.post = function(revAiApp,params,callback) {
  validadePostParameters(revAiApp,params,callback)
  var options = {
    apikey: this.apikey
  }
  if (params["media"]){
    options['multipart'] = true
    params.media={'media':params.media,'content_type':'multipart/form-data'}
  }else{
    options['json'] = "application/json"
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }

  var url = util.format(this.endpoint,revAiApp);

  var callback = callback;
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  needle.post(url, params, options, callbackmanager);
};

REVAIClient.prototype.get = function(revAiApp, params, callback) {
  //validadeParameters(revAiApp,params,callback)
  //if (params["file"]){
  //  throw new Error("Cannot perform GET with file. Use POST request.")
  //}
  var url = util.format(this.endpoint, revAiApp) //+ "?" + querystring.stringify(params)
  var callback = callback;
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  var options = {
    apikey: this.apikey,
    accept: "application/vnd.rev.transcript.v1.0+json"
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }
  needle.get(url, options, callbackmanager);
};


REVAIClient.prototype.transcribe = function(params,callback) {
  validadePostParameters("",params,callback)
  var data = params
  var options = {
    apikey: this.apikey
  }
  if (data["media"]){
    options['multipart'] = true
    data.media={'media':data["media"],'content_type':'multipart/form-data'}
  }else{
    options['json'] = "application/json"
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }
  var url = util.format(this.endpoint,"jobs");

  var callback = callback;
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  needle.post(url, data, options, callbackmanager);
}

REVAIClient.prototype.getTranscription = function(jobID,callback) {
  //validadeGetJob(jobID,callback)
  var url = util.format(this.getTranscriptionEndpoint, jobID, "transcript")
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  var options = {
    apikey: this.apikey,
    accept: "application/vnd.rev.transcript.v1.0+json"
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }
  needle.get(url, options, callbackmanager);
}

REVAIClient.prototype.getJobById = function(jobID,callback) {
  //validadeGetJob(jobID,callback)
  var url = util.format(this.getJobEndpoint, jobID);
  //var callback = callback;
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  var options = {
    apikey: this.apikey,
    accept: "application/vnd.rev.transcript.v1.0+json"
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }
  needle.get(url, options, callbackmanager);
}

REVAIClient.prototype.getJobs = function(params,callback) {
  //validadeGetJob(jobID,callback)
  var url = util.format(this.getJobsEndpoint, querystring.stringify(params));
  var callback = callback;
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  var options = {
    apikey: this.apikey,
    accept: "application/vnd.rev.transcript.v1.0+json"
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }
  needle.get(url, options, callbackmanager);
}

REVAIClient.prototype.account = function(callback) {
  //validadeGetJob(jobID,callback)
  var url = util.format(this.getAccountEndpoint);
  var callback = callback;
  var callbackmanager=function(err,resp,body){
    var error;
    if (typeof(resp) == 'undefined') {
      error = 'Problem getting result from Rev AI. Please try again.';
    } else if (resp.body.error) {
      error = resp.body;
    } else {
      error = null;
    }
    callback(error, resp, body);
  }
  var options = {
    apikey: this.apikey
  }
  if (this.proxy != undefined) {
    options['proxy'] = this.proxy
  }
  needle.get(url, options, callbackmanager);
}

// internal functions
validadeGetParameters=function(jobID,callback) {
  if (typeof jobID == "undefined") {
    if (typeof callback == "undefined") {
      throw new Error("Missing jobID parameter. Required valid job ID")
    }else{
      throw new Error("Wrong parameters order. Required function(jobID,callback)")
    }
  }else if (typeof jobID == "function"){
    if (typeof callback == "undefined") {
      throw new Error("Missing jobID parameter. Required valid job ID")
    }else{
      throw new Error("Wrong parameters order. Required function(jobID,callback)")
    }
  }
  if (typeof callback == "undefined") {
    throw new Error("Missing callback parameter. Required callback function")
  }else if (typeof callback != "function"){
    throw new Error("Wrong callback parameter. Required callback function")
  }
}
validadePostParameters=function(revAiApp,params,callback) {
  if (typeof revAiApp == "undefined") {
    throw new Error("Missing revAiApp parameter. Required valid API name")
  }
  if (typeof params == "undefined") {
    throw new Error("Missing params parameter. Required API's input and configuration parameters")
  }
  if (typeof callback == "undefined") {
    throw new Error("Missing callback parameter. Required callback function")
  }else if (typeof callback != "function"){
    throw new Error("Wrong callback parameter. Required callback function")
  }
}
isJSON=function(value) {
  var ret = true
  try {
    JSON.parse(value);
  } catch (e) {
    ret = false
  }
  return ret
}
// export the class
exports.REVAIClient=REVAIClient
