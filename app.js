
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'public/img/favicon_stash.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', function(req, res){
    res.render("index");
});

var projectViews = [
    "seer",
    "cyclo",
    "social_urinal",
    "paradroid",
    "anydo",
    "intel",
    "logicalls",
    "hp",
    "huji",
    "shenkar",
    "oulu"];

projectViews.forEach(function(projectView){
    app.get('/'+projectView, function(req, res){
        res.render(projectView);
    });
});

app.get('/ping', function(req, res){
    res.send({"status" : "ok"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


