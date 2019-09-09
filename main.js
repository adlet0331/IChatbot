//npm 모듈
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const moment = require('moment-timezone');
const School = require('node-school-kr'); 
const mongodb = require('mongodb');
const mongoose = require('mongoose');
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

var Meal_body = body.meal_body //현재는 테스트용
var Weather_body = body.weather_body//Request_body에서 받아옴

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
app.post('/', async function(req, res){
  BODY = req.body
  if (BODY.intent.name = "현재 미세먼지 데이터 제공"){
    ResponseBody = await Func.GetWeather(); //MealWeather_function에서 받아옴
    res.send(ResponseBody)
  } 
  if (BODY.intent.name = "급식"){
    ResponseBody = await Func.GetMeal(BODY); //MealWeather_function에서 받아옴
    res.send(ResponseBody);
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
  MealDbUpdate();
  WeatherDbUpdate();
});

