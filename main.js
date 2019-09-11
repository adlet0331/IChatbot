//npm 모듈
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const moment = require('moment-timezone');
const School = require('node-school-kr'); 
const mongodb = require('mongodb');
//파일 내 모듈
var body = require('./Request_body');
var Func = require('./MealWeather_function');
var Crawling = require('./CrawlingDB');
//서버 설정
var app = new express();
app.set('port', process.env.PORT || 3000);
//라우터 설정
const Router = express.Router()
app.use('/', Router);
//로그 설정
app.use(logger('dev', {}));
//body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var MealCrawling = Crawling.MealCrawling//웹 크로링 후 DB에 저장하는 함수
var WeatherCrawling = Crawling.WeatherCrawling//웹 크로링 후 DB에 저장하는 함수

//12시간마다 업데이트 (12시에 실행시키도록) 
function MealDbUpdate(){
  MealCrawling();
  setTimeout(MealDbUpdate, 12*60*60000);
}
function WeatherDbUpdate(){
  WeatherCrawling();
  setTimeout(WeatherDbUpdate, 60*60000);
}
//불러오는 모듈 및 기본 설정들. 건들 ㄴ
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Post 요청 라우팅
app.post('/', function(req, res){
  BODY = body.meal_body;
  if (BODY.intent.name = "미세먼지"){
    Func.GetWeather(function(message){
      console.log(message);
      var responseBody = {'version': '2.0','template': {'outputs': [{'simpleText': {'text': message}}]}};
      res.send(responseBody);
    }); //MealWeather_function에서 받아옴
  } else if (BODY.intent.name = "급식"){
    Func.GetMeal(BODY, function(message){
      console.log(message);
      var responseBody = {'version': '2.0','template': {'outputs': [{'simpleText': {'text': message}}]}};
      res.send(responseBody);
    });
  } 
});

//서버 확인 페이지 --> 추후 웹페이지 개설 예정
app.get('/', function(req, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Test server is running...");
});

//서버 실행 및 주기적 업데이트
http.createServer(app).listen(app.get('port'), function(){
  console.log("Server running at http://localhost:%d", app.get('port'));
  //MealDbUpdate();
  //WeatherDbUpdate();
});

