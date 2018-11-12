## Node JS client library for REV AI
Provides functions to access Rev AI APIs [http://rev.ai](http://rev.ai).

## What is Rev AI?
* Speech to Text service


### Installation
To install, run the following command:
```
npm install rev_ai
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
You can find your API key [here](https://www.rev.ai/settings) after logging in your account.

`version` Optional parameter (defaults to `'v1beta'`).

`proxy` Optional parameter. Set a proxy if you're behind a firewall. Here is an example of initiating the client if you're using proxy:
```js
var revai = require('rev_ai')
var client = new revai.REVAIClient(rev-ai-apikey, 'v1beta', 'http://user:pass@proxy.server.com:3128')
```
### Call Rev AI endpoints
```js
// Get account info
client.account((err,resp,body) => {
  console.log(body.balance_seconds/60)
})

// Transcribe an audio file from local storage
var params = {
  media: "sample1.mp3",
  metadata: "This is a sample file from local storage"
}
client.transcribe(params, function(err,resp,body){
  console.log(body)
  //console.log(resp)
  //console.log(JSON.stringify( resp.body.toString('utf8')));
  //body.setEncoding('utf8');
  //console.log(body)
  //var json = JSON.parse(body.toString('utf8'))
})
```

The order of the arguments is strict. It must be in the following order:
method("api_name", {params}, callback_method)
```js
var data = {'text' : 'I like cats'}
client.post('analyzesentiment', data, callback)
```

### GET request
APIs can be accessed via a GET request.
```js
var data = {'text' : 'I like cats'}
client.get('analyzesentiment', data, false, function(err, resp, body) {
  if (!err) {
    console.log(resp.body)
  }
})
```

### Async calls

While node will mostly deals with processes asynchronously, Haven OnDemand offers server side asynchronous call methods which should be used with large files and slow queries. Pass a boolean for the async parameter. The API response will return back a job ID which is used to check the status or result of your API request.
```js
var jobID
var data = {'text': 'I love dogs'}
client.post('analyzesentiment', data, true, function(err, resp, body) {
  jobID = resp.body.jobID
  console.log(jobID)
})
```
**(Recommended method)** To check the status of your API call, use the following code with the jobID from obtained from the async call above. This will tell you if it's still processing or if it's complete, and if so, it will return the result.
```js
client.getJobStatus(jobID, function(err, resp, body) {
  console.log(resp.body)
})
```
Or, to check the result of your API call, use the following code with the jobID obtained from the async call. *Note: This method may timeout if your async API call is still processing.*
```js
client.getJobResult(jobID, function(err, resp, body) {
  console.log(resp.body)
})
```

### Posting files

File posting is handled using the "file" parameter name which is used for all current file postings in Haven OnDemand

```js
var data = {'file' : 'test.txt'}
client.post('analyzesentiment', data, false, function(err, resp, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(resp.body)
  }
})
```

### Combinations

Haven OnDemand allows to chain two ore more APIs together to create customizable, reusable services. These combinations enable one data input to have unlimited transformations and processing all from a single API call.

If you created a combination API name "sentimentanalysistoindex" which takes input as plain text. You can call the combination API from the code shown below:
```js
var params = {text : "Haven OnDemand is awesome."};
client.post_combination('sentimentanalysistoindex', params, false, function(err, resp, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(resp.body)
  }
})
```
If you created a combination API name "sentimentanalysistoindex" which takes JSON input and presumed that the name of your input is "jsoninput". And your combination API was defined to parse the jsonContent similar to the format below. You can call the combination API from the code as follows:
```js
var jsonContent = '{"arrayinput":[{"content":"Haven OnDemand is awesome."},{"content":"Sentiment Analysis API is very usefule."}]}'
var params = {}
params.jsoninput = jsonContent
client.get_combination('sentimentanalysistoindex', params, false, function(err, resp, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(resp.body)
  }
})
```
If you created a combination API name "sentimentanalysistoindex" which takes a file input and presumed that the name of your input is "textfile". And your combination API was defined to take also the language configuration. You can call the combination API from the code as follows:
```js
var files = [{"textfile":"path/document.txt"}]
var params = {}
params.file = files
params.language = "eng"
client.post_combination('sentimentanalysistoindex', params, false, function(err, resp, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(resp.body)
  }
})
```

To find out more about combinations and how to create one, see [here](https://dev.havenondemand.com/combination/home).

### Batch jobs

Haven OnDemand allows you to batch multiple API jobs in a single request using the Job API, for example, to analyze a batch of web pages, documents or social media messages where you need to analyze each text individually but want to be more efficient with your code, or where you want to execute multiple API calls on a single web page, document, or text. **Note: files are currently not supported in this wrapper for batch jobs.**

```js
var jobID
var data = [
  { "name": "analyzesentiment",
     "version": "v1",
     "params": {
        'text': 'I love dogs'
      }
   },
   { "name": "extractconcepts",
      "version": "v1",
      "params": {
         "url": "http://en.wikipedia.org/wiki/United_Kingdom"
       }
    }
 ]
client.batchJob(data, function(err, resp, body) {
  jobID = resp.body.jobID
  console.log(jobID)
})

//
// check result of async request with Status API after some time
//

client.getJobStatus(jobID, function(err, resp, body) {
  console.log(resp.body)
})
```


## Contributing
We encourage you to contribute to this repo! Please send pull requests with modified and updated code.

1. Fork it ( https://github.com/HPE-Haven-OnDemand/havenondemand-node/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
