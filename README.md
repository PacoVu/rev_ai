## Node JS client library for REV AI
Provides convenient functions to access Rev AI APIs [http://www.rev.ai](http://www.rev.ai).

## What is Rev AI?
Rev AI is an advanced speech recognition API from the makers of Temi and Rev.com. Power your application with our best-in-class proprietary speech models.


### Installation
To install, run the following command:
```
npm install rev_ai --save
```
If you want to install the latest module directly from Github, use the following command:
```
npm install git+https://github.com/PacoVu/rev_ai
```

### Include it
```js
var revai = require('rev_ai')
var client = new revai.REVAIClient(rev-ai-apikey, version, proxy)
```
`rev-ai-apikey` [required] you can find your API key [here](https://www.rev.ai/settings) after logging in your account.

`version` [optional] defaults to `'v1beta'`.

`proxy` [optional] set a proxy if you're behind a firewall.

Here is an example of initiating the client if you're using proxy:
```js
var revai = require('rev_ai')
var client = new revai.REVAIClient(rev-ai-apikey, 'v1beta', 'http://user:pass@proxy.server.com:3128')
```
### Call Rev AI endpoints
```js
// Get account info
client.account(function(err,resp,body){
  console.log(body.balance_seconds/60)
})

// Transcribe an audio file from local storage
var params = {
  media: "sample1.mp3",
  metadata: "This is a sample file from local storage"
}
client.transcribe(params, function(err,resp,body){
  console.log(body)
})

// Transcribe an audio file from url
var params = {
  media_url: "http://www.somewhere.com/audio.mp3",
  metadata: "This is a sample file from a remote url"
}
client.transcribe(params, function(err,resp,body){
  console.log(body)
})

// Get transcription jobs
client.getJobs(params, function(err,res,body){
  for (var job of body){
    console.log(job.status)
    console.log(job.id)
    console.log(job.completed_on)
  }
})

// Get a transcription job by job ID
var jobId=12261294
client.getJobById(jobId, function(err,res,body){
  console.log(body)
  if (body.status == "transcribed"){
    // call getTranscription to get the transcription
    // client.getTranscription(body.id, callback)
  }
})

// Get transcription
var callback = function(err,resp,body){
  var json = JSON.parse(body)
  var transcript = ""
  for (var item of json.monologues){
    for (var element of item.elements){
      transcript += element.value
    }
  }
  console.log("TRANSCRIPT: " + transcript)
}
var jobId=12261294
client.getTranscription(jobId, callback)
```

### Use POST request
```js
// Transcribe an audio file from local storage
var params = {
  media: "sample1.mp3",
  metadata: "This is a sample file from local storage"
}
client.post('jobs', params, function(err,resp,body){
  console.log(body)
})

// Transcribe an audio file from url
var params = {
  media_url: "http://www.somewhere.com/audio.mp3",
  metadata: "This is a sample file from a remote url"
}
client.post('jobs', params, function(err,resp,body){
  console.log(body)
})
```

### Use GET request
```js
// Get account info
client.get("account", {}, function(err,resp,body){
  console.log(body)
})

// Get a transcription job by job ID
var jobId=12261294
var query = 'jobs/' + jobId
client.get(query, {}, function(err,resp,body){
  console.log(body.status)
  console.log(body.id)
  console.log(body.completed_on)
})

// Get transcription jobs
var params = {
  limit: 2
}
client.get("jobs", params, function(err,res,body){
  for (var job of body){
    console.log(job.status)
    console.log(job.id)
    console.log(job.completed_on)
  }
})

// Get transcription by job id
var jobId=12261294
var query = 'jobs/' + jobId +"/transcript"
client.get(query, "", function(err,resp,body){
  if (!err){
    var json = JSON.parse(body)
    var transcript = ""
    for (var item of json.monologues){
      for (var element of item.elements){
        transcript += element.value
      }
    }
    console.log("TRANSCRIPT: " + transcript)
  }
})
```
