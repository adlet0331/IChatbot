//DB에서 급식과 날씨 데이터 가져와주는 함수들

const moment = require('moment-timezone');
const School = require('node-school-kr');
const CheerioJttpcli = require('cheerio-httpcli');

//불러오는 모듈 및 기본 설정들. 건들 ㄴ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.GetMeal = function (BODY) {
  //학교 설정 
  const school = new School();
  school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');
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
  //Meal에 getmeal 한 json 결과 넣기
  var Meal = await school.getMeal(kr.year(), kr.month() + 1, kr.date());
  var text = Meal[kr.date()];
  var indexarr = [text.indexOf("조식"), text.indexOf("중식"), text.indexOf("석식")];
  //요청한 날짜 sendmessage에 추가
  var sendmessage = kr.format('MM월 DD일') + '\n\n';
  //요쳥별로 나누어서 sendmessage에 추가
  if (BODY.action.params.meal == "아침") {
    if (indexarr[0] == -1) {
      sendmessage += '조식이 없는 날입니다';
    } else {
      if (indexarr[1] == -1) {
        sendmessage += text.substring();
      }
      else {
        mealarr[0] = text.substring(0, indexarr[1] - 2);
      }
    }
  } else if (BODY.action.params.meal == '점심') {
    if (indexarr[1] == -1) sendmessage += "중식이 없는 날입니다";
    else sendmessage += text.substring(indexarr[1] - 1, indexarr[2] - 2);
  } else if (BODY.action.params.meal == '저녁') {
    if (indexarr[2] == -1) sendmessage += "석식이 없는 날입니다";
    else sendmessage += text.substring(indexarr[2] - 1);
  } else {
    var mtext = text;
    if (mtext == null) mtext = '급식이 없는 날입니다'
    sendmessage += mtext;
  }
  sendmessage += "\n\n알레르기 정보\n1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우 10.돼지고기" +
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

exports.GetWeather = function () {
  var kr = moment().tz('Asia/Seoul');
  //네이버 '송도 미세먼지' 검색 페이지
  var naverdoc;
  var NaverUrl = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%9D%B8%EC%B2%9C+%EC%86%A1%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&oquery=%EC%86%A1%EB%8F%84%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&tqi=UUThZwprvmsssKbpUm0ssssssth-201323"
  var WeatherCrawling = function (callbackFunc) {
    CheerioJttpcli.fetch(NaverUrl, {}, function (err, $, res, body) {
      var Classes = $("div.main_box.expand").find(".air_detail").children();
      naverdoc = {
        dust: $(Classes[0]).find(".state_info").text(),
        temperature: $(Classes[0]).find(".weather").find(".weather_box").find(".num").text(),
        elements: $(Classes[2]).find(".state_list").text()
      };
      var sendmessage = '미세먼지: ' + naverdoc.dust + '\n 현재 기온: ' + naverdoc.temperature + '\n 미세먼지 현황:\n' + naverdoc.elements;
      callbackFunc(sendmessage);
    });
  }
  WeatherCrawling(function (sendmessage) {
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
  });
};
