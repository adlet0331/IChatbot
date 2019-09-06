const moment = require('moment-timezone');
const CheerioJttpcli = require('cheerio-httpcli');

CrawlingDate = new Array(10);

for(var i=-2;i<9;i++){
    CrawlingDate[i+2] = new Date();
    CrawlingDate[i+2].setDate(CrawlingDate[i+2].getDate()+i);
}


var kr = moment().tz('Asia/Seoul');
//console.log(kr.format('YYYY-MM-DD hh:ss'))

arr = 'abcdefghijklmnopqrstuvwx'

//console.log(moment().tz('Asia/Seoul').format('MM-DD hh:mm'));

CheerioJttpcli.fetch(
    "https://www.google.com/search"
    ,{q:"인천광역시 연수구 송도동 미세먼지"}
    ,(err, $, res, body)=>{
        var restring;
        let Lista = $("div.uRiMSd").find(".ha9jJe.gsrt");
        console.log($(Lista[0]).text());
        let Listb = $("div.gMZXLc").find(".dGcunf.gsrt");
        console.log($(Listb[0]).text());
        let Listc = $("div.gMZXLc").find(".HV2uTe");
        console.log($(Listc[0]).text());
        let Listd = $("div.gMZXLc").find(".KWR2de").find(".dm5I5c").find(".uULQNc");
        console.log($(Listd[0]).text(), '㎍/㎥');
        let Liste = $("div.gMZXLc").find(".Us3eld");
        console.log($(Liste[0]).text());
    }
);