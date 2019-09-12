//DB에서 급식과 날씨 데이터 가져와주는 함수들

const moment = require('moment-timezone');
const mongodb = require('mongodb');
//불러오는 모듈 및 기본 설정들. 건들 ㄴ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.GetMeal = function (BODY, callbackFunc) {
  //날짜 받아오기
  var currentDate = new Date();
  var kr = moment(currentDate).tz('Asia/Seoul');
  var sendmessage = '요청시각: ' + kr.format('YYYY-MM-DD HH:mm:ss') + '\n\n';
  //date 파라미터 처리
  if (BODY.action.params.date == '어제') currentDate.setDate(currentDate.getDate() - 1);
  if (BODY.action.params.date == '내일') currentDate.setDate(currentDate.getDate() + 1);
  if (BODY.action.params.date == '내일모레') currentDate.setDate(currentDate.getDate() + 2);
  if (BODY.action.params.date == '3일 후') currentDate.setDate(currentDate.getDate() + 3);
  if (BODY.action.params.date == '4일 후') currentDate.setDate(currentDate.getDate() + 4);
  if (BODY.action.params.date == '5일 후') currentDate.setDate(currentDate.getDate() + 5);
  if (BODY.action.params.date == '6일 후') currentDate.setDate(currentDate.getDate() + 6);
  if (BODY.action.params.date == '7일 후') currentDate.setDate(currentDate.getDate() + 7);
  kr = moment(currentDate).tz('Asia/Seoul');
  //요청한 날짜 sendmessage에 추가
  var sendmessage = kr.format('MM월 DD일') + '\n\n';
  //데이터베이스에서 정보 불러오기
  var databaseUrl = 'mongodb://localhost:27017';
  mongodb.MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    db = client.db('ichatbotdb');
    if (err) throw err;
    var meal = await db.collection('Meal').findOne({ date: kr.format('MMDD') });
    var mtext = new String();
    if (BODY.action.params.meal == "아침") {
      if (meal.morning == null) mtext += "조식이 없는 날입니다";
      else mtext += meal.morning;
    } else if (BODY.action.params.meal == "점심") {
      if (meal.lunch == null) mtext += "중식이 없는 날입니다";
      else mtext += meal.lunch;
    } else if (BODY.action.params.meal == "저녁") {
      if (meal.evening == null) mtext += "석식이 없는 날입니다";
      else mtext += mtext = meal.evening;
    } else if (BODY.action.params.meal == '급식'){
      mtext += meal.morning + meal.lunch + meal.evening;
      if(meal.morning == null && meal.lunch == null && meal.evening == null) mtext +='급식이 없는 날입니다'
    } else;
    sendmessage += mtext;
    callbackFunc(sendmessage);
  });
};

exports.GetWeather = function (callbackFunc) {
  //데이터베이스에서 정보 불러오기
  var databaseUrl = 'mongodb://localhost:27017';
  mongodb.MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    var DbWeather = client.db('ichatbotdb').collection('Weather');
    DbWeather.findOne({ page: 'Naver' }).then(WeatherOBject => {
      var sendmessage = '데이터를 받아온 시점(30분마다 갱신):\n' + WeatherOBject.time + '\n\n[미세먼지]\n' + WeatherOBject.dust + '\n\n[세부정보]\n' + WeatherOBject.elements;
      callbackFunc(sendmessage)
    });
  });
};
