//npm 모듈
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const moment = require('moment-timezone'); 
//파일 내 모듈
var body = require('./Request_body');
var Func = require('./MealWeather_function');
//서버 설정
var app = new express();
app.set('port', process.env.PORT || 3000);
//라우터 설정
const Router = express.Router()
app.use('/', Router);
//body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//불러오는 모듈 및 기본 설정들.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Post 요청 라우팅
app.post('/', async function(req, res){
  var BODY = req.body;
  if (BODY.intent.name == "미세먼지"){
    var result = await Func.GetWeather(); //MealWeather_function에서 받아옴
    res.send(result);
  } else if (BODY.intent.name == "급식"){
    var result = await Func.GetMeal(BODY); //MealWeather_function에서 받아옴
    res.send(result);
  } else{
    res.send('Unvalid Request Format');
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
});

