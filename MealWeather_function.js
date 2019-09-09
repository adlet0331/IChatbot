//DB에서 급식과 날씨 데이터 가져와주는 함수들

const moment = require('moment-timezone');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

//불러오는 모듈 및 기본 설정들. 건들 ㄴ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.GetMeal = function(BODY){
  //날짜 받아오기
  var currentDate = new Date();
  var kr = moment(currentDate).tz('Asia/Seoul');
  var sendmessage='요청시각: ' + kr.format('YYYY-MM-DD HH:mm:ss') + '\n\n';
  //date 파라미터 처리
  if (BODY.action.params.date == '어제') currentDate.setDate(currentDate.getDate()-1);
  if (BODY.action.params.date == '내일') currentDate.setDate(currentDate.getDate()+1);
  if (BODY.action.params.date == '내일모레') currentDate.setDate(currentDate.getDate()+2);
  if (BODY.action.params.date == '3일 후') currentDate.setDate(currentDate.getDate()+3);
  if (BODY.action.params.date == '4일 후') currentDate.setDate(currentDate.getDate()+4);
  if (BODY.action.params.date == '5일 후') currentDate.setDate(currentDate.getDate()+5);
  if (BODY.action.params.date == '6일 후') currentDate.setDate(currentDate.getDate()+6);
  if (BODY.action.params.date == '7일 후') currentDate.setDate(currentDate.getDate()+7);
  kr = moment(currentDate).tz('Asia/Seoul');
  //요청한 날짜 sendmessage에 추가
  var sendmessage = kr.format('MM월 DD일') + '\n\n';
  //데이터베이스에서 정보 불러오기
  Client.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    db = client.db('IChatbot');
    if (err) throw err;
      var meal = await db.collection('Meal').find({date : kr.format('MMDD')});
      if(BODY.action.params.meal=="아침"){
        if(meal.morning == null) sendmessage+="조식이 없는 날입니다";
        else sendmessage+=meal.morning;
      } else if(BODY.action.params.meal=='점심'){
        if(meal.lunch == null) sendmessage+="중식이 없는 날입니다";
        else sendmessage+=meal.lunch;
      } else if(BODY.action.params.meal=='저녁'){
        if(meal.evening == null) sendmessage+="석식이 없는 날입니다";
        else sendmessage+=sendmessage=meal.evening;
      } else{
        var mtext = meal.morning+meal.lunch+meal.evening;
        if(mtext == null) mtext = '급식이 없는 날입니다'
        sendmessage += mtext;
      }
  });
  sendmessage+="\n\n알레르기 정보\n1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우 10.돼지고기" + 
  "11.복숭아 12.토마토 13.아황산류 14.호두 15.닭고기16.쇠고기 17.오징어 18.조개류(굴,전복,홍합 포함)";
  var responseBody = {
    'version': '2.0',
     'template': {
       'outputs': [
         {
           'simpleText': {
           'text': sendmessage
         }
       }
     ]
     }
   };
  return responseBody;
};

exports.GetWeather = function(){
  //데이터베이스에서 정보 불러오기
  var sendmessage = new String();
  Client.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, client){
    var DbWeather = client.db('IChatbot').collection('Weather');
    var WeatherOBject = await DbWeather.find({page : 'Naver'});
    sendmessage += '크롤링 한 시점(30분마다 갱신): ' + WeatherOBject.time + '\n\n[미세먼지]\n' + WeatherOBject.dust + '\n\n[세부정보]\n' + WeatherOBject.elements;
  });
  var responseBody = {
    'version': '2.0',
      'template': {
        'outputs': [
          {
            'simpleText': {
            'text': sendmessage
            }
          }
         ]
      }
    };
  return responseBody;
};
