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
  sendmessage+=kr.format('MM월 DD일') + '\n\n';
  //데이터베이스에서 정보 불러오기
  Client.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    
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

exports.GetWeather = function(){
  //데이터베이스에서 정보 불러오기

    sendmessage = "맑음"
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
