
const School = require('./node-school-kr');
const request = require('request');
const cheerio = require('cheerio');

const school = new School();
school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');
const sampleAsync = async function () {
    meal = await school.getMeal(2019, 10, 8);
    console.log(meal);
    console.log(school.getTargetURL('meal', 2019, 10));
};
//sampleAsync();

var GetWeather = async function () {
    //네이버 검색 창
    var url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%9D%B8%EC%B2%9C+%EC%86%A1%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&oquery=%EC%86%A1%EB%8F%84%EB%8F%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&tqi=UUThZwprvmsssKbpUm0ssssssth-201323"
    try {
        let body = await new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (err) {
                    reject(err)
                }
                resolve(body)
            })
        })

        let $ = cheerio.load(body, { decodeEntities: false })

        var Classes = $("div.main_box.expand").find(".air_detail").children();
        result = $(Classes[0]).find(".state_info").text() + '\n' + $(Classes[0]).find(".weather").find(".weather_box").find(".num").text() + '\n' + $(Classes[2]).find(".state_list").text()
        return(result)
    } catch (e) {
        /* 에러 핸들링 */
        console.error(e)
        return {}
    }
}

GetWeather()