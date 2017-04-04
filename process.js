'use strict'
var express = require('express')
var app = express()

var yelp = require('yelp-fusion')

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/request', function (req, res) {
  const clientId = '0jl_3b5y4acWlNDvVi4whA'
  const clientSecret = 'qSyPQy9tnAyUowLc61ydFX7HvZ7FJAmHfOUfT4AmLZYhuqR1C16iMiL1qPiLyNOo'

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search(req.query).then(response => {
      const firstResult = response.jsonBody.businesses[0]
      const prettyJson = JSON.stringify(firstResult, null, 4)
      console.log(response.jsonBody)
      res.send(response.jsonBody)
    })
    .catch(error=>{
      console.log(error)
    })
  }).catch(e => {
    console.log(e)
  })

})
var port = process.env.PORT || 3000
var server = app.listen(port, function () {
  var host = server.address().address
    var port = server.address().port
    console.log('running at http://' + host + ':' + port)
})
