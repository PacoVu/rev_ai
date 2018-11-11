//var revai = require('rev_ai')
require('dotenv').load()
var rev_ai = require('./lib/revaineedle')
var apikey = process.env.REVAI_KEY
var client = new rev_ai.REVAIClient(apikey, "v1beta", null)

var callback = function(err,resp,body){
  //console.log(body.toString('utf8'))
  var json = JSON.parse(body)
  var transcript = ""
  for (var item of json.monologues){
    for (var element of item.elements){
      transcript += element.value
    }
  }
  console.log("TRANSCRIPT: " + transcript)
}
var params = {
  media: "sample1.mp4",
  metadata: "This is a sample submit jobs option"
}
// callback_url: for webhook
//id=492373908 // 492373908
/*
client.post('jobs', params, function(err,resp,body){
  console.log(body)
})
*/
var query = 'jobs/' + "53261293/transcript"
//client.get(query, "", callback)

/*
var params = {
  limit: 2
}
client.getJobs(params, function(err,res,body){
  //console.log(body)
  //var json = JSON.parse(body.toString('utf8'))
  for (var job of body){
    console.log(job.status)
    console.log(job.id)
    console.log(job.completed_on)
  }
})
*/


var id=53261293 // 492373908
client.getJobById(id, function(err,res,body){
  console.log(body)
  //var json = JSON.parse(body.toString('utf8'))
  if (body.status == "transcribed"){
    client.getTranscription(body.id, callback)
  }
})

/*
var params = {
  media: "sample1.mp3",
  metadata: "This is a sample submit file jobs option"
}
client.transcribe(params, function(err,resp,body){
  console.log(body)
  //console.log(resp)
  //console.log(JSON.stringify( resp.body.toString('utf8')));
  //body.setEncoding('utf8');
  //console.log(body)
  //var json = JSON.parse(body.toString('utf8'))
})
*/
/*
client.get("account", "", function(err,resp,body){
  console.log(body)
})
*/
/*
client.account((err,resp,body) => {
  console.log(body.balance_seconds/60)
})
*/
