/**
 * meal.js
 * 
 * @description 교육청에서 급식 정보 파싱 후 json 데이터를 반환합니다.
 * @author Leegeunhyeok
 * @version 2.1.0
 * 
 */

const request = require('request')
const cheerio = require('cheerio')

class Meal {
  /**
   * @description 이번 달 급식 데이터를 파싱합니다.
   * @param {string} url 파싱할 타겟 URL
   * @return {any} 이번 달 급식 데이터
   */
  async getData (url, day) {
    try {
      let body = await new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
          if(err) {
            reject(err)
          }
          resolve(body)
        })
      })
      
      let $ = cheerio.load(body, {decodeEntities: false})

      // URL에 지정한 년도, 월이 있는지 추출
      const yearParam = url.match(/ay=[0-9]{4}/)
      const monthParam = url.match(/mm=[0-9]{2}/)

      if (yearParam) {
        // URL에 있는 년도 데이터 추출
        var year = parseInt(yearParam[0].replace('ay=', ''))
      }

      if (monthParam) {
        // URL에 있는 월 데이터 추출
        var month = parseInt(monthParam[0].replace('mm=', ''))
      }
      //day는 함수 호출 부분에서 받아왔음
      /* 결과 저장 객체 */
      let result = {
        year,
        month,
        day
      };
      
      $('tbody > tr > td').each(function () {
        if ($(this).text().match(/^[0-9]{1,2}/) &&  $(this).text().match(/^[0-9]{1,2}/)[0]==day) { //수정 - 원하는 날짜의 급식만 가져오도록
          let html = $(this).html().replace(/^<div>/, '').replace(/<\/div>$/, '')
          let menu = html.replace(/^[0-9]{1,2}<br>/, '').replace(/<br>/g, '\n')

          // 급식이 없을 경우 빈 문자열로 설정
          if (menu.match(/^[0-9]{1,2}/)) {
            menu = '급식이 없는 날입니다'
          }
          // 해당 날짜에 급식 데이터 추가
          result.menu = menu
        }
      })
      return result
    } catch(e) {
      /* 에러 핸들링 */
      console.error(e)
      return {}
    }
  }
}

module.exports = Meal
