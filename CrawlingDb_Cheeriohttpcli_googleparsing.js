//구글 검색 페이지. 쿼리에서 q가 검색어임
        CheerioJttpcli.fetch("https://www.google.com/search", { q: "인천광역시 연수구 송도동 미세먼지" },  (err, $, res, body) => {
            let Listb = $("div.gMZXLc").find(".dGcunf.gsrt");
            let Listc = $("div.gMZXLc").find(".HV2uTe");
            let Listd = $("div.gMZXLc").find(".KWR2de").find(".dm5I5c").find(".uULQNc");
            let Liste = $("div.gMZXLc").find(".Us3eld");
            var restring = "\n미세먼지 오염정도: " + $(Listb[0]).text() + "\n" + $(Listc[0]).text() + "\n미세먼지 농도: " 
            + $(Listd[0]).text() + "㎍/㎥\n\n" + $(Liste[0]).text();
            var docc = {
                page : 'Google',
                time : kr.format('MM/DD - hh:mm'),
                text : restring
            };
            var CrawledGoogle =  db.collection('Weather').find({page : 'Google'});
            if(CrawledGoogle==null){
                db.collection('Weather').insertOne(docc);
            } else {
                db.collection('Weather').deleteOne({page : 'Google'});
                db.collection('Weather').insertOne(docc);
            }
        });