var express = require('express')
var app = express()
var yelp = require('yelp-fusion')
var bodyParser = require('body-parser')
const clientId = '0jl_3b5y4acWlNDvVi4whA'
const clientSecret = 'qSyPQy9tnAyUowLc61ydFX7HvZ7FJAmHfOUfT4AmLZYhuqR1C16iMiL1qPiLyNOo'
// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app

app.use(bodyParser.json())
app.get('/', function (req, res) {
  var sendBack
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search(req).then(response => {
      const firstResult = response.jsonBody.businesses[0]
      const prettyJson = JSON.stringify(firstResult, null, 4)
      console.log(prettyJson)
      sendBack = prettyJson
    })
    .catch(error=>{
      console.log(error)
    })
  }).catch(e => {
    console.log(e)
  })
  res.send(sendBack)
})

var server = app.listen(3000, function () {
  var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
})
