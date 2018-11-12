var revai = require('rev_ai')
require('dotenv').load()

var client = new revai.REVAIClient(process.env.REVAI_KEY)

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

var params = {
  media: "sample1.mp3",
  metadata: "This is a sample submit file from local folder"
}
client.transcribe(params, function(err,resp,body){
  console.log(body)
  if (!err){
    if (body.status == "in_progress"){
      var jobId = body.id
      var poll = setInterval(function(){
        client.getJobById(jobId, function(err,res,body){
          if (body.status == "transcribed"){
            clearTimer(poll)
            client.getTranscription(body.id, callback)
          }
        })
      },2000)
    }else{
      console.log(body.status)
    }
  }else{
    console.log(err)
  }
})
