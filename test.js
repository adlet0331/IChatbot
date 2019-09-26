const School = require('node-school-kr');
const moment = require('moment-timezone');

//학교 설정 
const school = new School();
school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');
//날짜 받아오기
var currentDate = new Date();
var kr = moment(currentDate).tz('Asia/Seoul');

var Meal = await school.getMeal(kr.year(), kr.month() + 1, kr.date());

console.log(Meal);