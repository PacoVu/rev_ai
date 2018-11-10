var revai = require('rev_ai')
//var rev_ai = require('./lib/revaineedle')
var apikey = "01rOR8fuc7Rl_tc_4_KucEyh5pem8m55hz-f0VPGMbzuZXFRLdGi8icA8Yf7QkvERLGdtNHxFsZEgM_WTTg-FobSFnYJM"
var client = new rev_ai.REVAIClient(apikey, "v1beta", null)

var callback = function(err,resp,body){
  console.log("callback")
  //console.log(resp)
  //console.log(JSON.stringify( resp.body.toString('utf8')));
  //body.setEncoding('utf8');
  //console.log(body)
  var json = JSON.parse(resp.body.toString('utf8'))
  //console.log(resp.body.toString('utf8'))
  //console.log(json.monologues)
  var transcript = ""
  var conversations = []
  var wordswithoffsets = []
  var blockTimeStamp = []
  var sentencesForSentiment = []
  for (var item of json.monologues){
    var speakerSentence = {}
    speakerSentence['sentence'] = []
    speakerSentence['timestamp'] = []
    speakerSentence['speakerId'] = item.speaker
    var sentence = ""
    for (var element of item.elements){
      sentence += element.value
      if (element.type == 'text'){
        //var wordoffset = {}
        //wordoffset['word'] = element.value
        //wordoffset['offset'] = element.ts
        //wordswithoffsets.push(wordoffset)
        speakerSentence['timestamp'].push(element.ts)
        //speakerSentence['sentence'].push(element.value)
      }
    }
    sentence = sentence.trim()
    transcript += sentence
    var wordArr = sentence.split(" ")
    speakerSentence['sentence'] = wordArr
    //console.log("words #: " + wordArr.length)
    //console.log("times #: " + speakerSentence.timestamp.length)
    for (var i=0; i<speakerSentence.timestamp.length; i++){
      var wordoffset = {}
      if (i < wordArr.length)
      wordoffset['word'] = wordArr[i]
      wordoffset['offset'] = speakerSentence.timestamp[i]
      wordswithoffsets.push(wordoffset)
    }
    conversations.push(speakerSentence)
  }
  console.log(transcript)
  console.log(JSON.stringify(wordswithoffsets))
  console.log(JSON.stringify(conversations))
}
var data = {
  media_url: "http://www.qcalendar.com/audios/CallhandlingSkills.mp3",
  metadata: "This is a sample submit jobs option"
}
// callback_url: for webhook
id=492373908 // 492373908
//client.post('jobs', data, callback)
var query = 'jobs/' + "492373908/transcript"
client.get(query, "", callback)
