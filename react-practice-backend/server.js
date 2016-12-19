var express = require('express')
  , bodyParser = require('body-parser')
  , chalk = require('chalk')
  , app = express()
  , directoriesRouter = require('./routes/directories')
  , noticesRouter = require('./routes/notices')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'public' })
})

app.use('/directories', directoriesRouter)
app.use('/notices', noticesRouter)

var server = app.listen(8080, function () {
  var port = server.address().port
  console.log('Server for course started at %s port', chalk.green(port))
})
