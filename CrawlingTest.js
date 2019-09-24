const CheerioJttpcli = require('cheerio-httpcli');

var NaverUrl = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%9D%B8%EC%B2%9C+%EC%86%A1%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&oquery=%EC%86%A1%EB%8F%84%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&tqi=UUThZwprvmsssKbpUm0ssssssth-201323"
CheerioJttpcli.fetch(NaverUrl, {}, function (err, $, res, body) {
  var Classes = $("div.main_box.expand").find(".air_detail").children();
  naverdoc = {
    dust: $(Classes[0]).find(".state_info").text(),
    temperature: $(Classes[0]).find(".weather").find(".weather_box").find(".num").text(),
    elements: $(Classes[2]).find(".state_list").text()
  };
  var sendmessage = '미세먼지: ' + naverdoc.dust + '\n 현재 기온: ' + naverdoc.temperature + '\n 미세먼지 현황:\n' + naverdoc.elements;
  console.log(sendmessage);
});
