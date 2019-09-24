
//불러오는 모듈 및 기본 설정들. 건들 ㄴ
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.MealCrawling = function () {
    //학교 설정 
    const school = new School();
    school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');
    //하루 전 ~ 7일 후 까지의 날짜 객체 배열에 넣어주기
    var CrawlingDate = new Array(10);
    for (var i = -2; i < 9; i++) {
        CrawlingDate[i + 2] = new Date();
        CrawlingDate[i + 2].setDate(CrawlingDate[i + 2].getDate() + i);
    }
    //DB에 연결
    var databaseUrl = 'mongodb://localhost:27017';
    //옵션은 에러뜨길래 넣어놈. 코딩하는데 신경 안써도 됨.
    Client.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        db = client.db('IChatbot');
        if (err)
            throw err;
        console.log("\n\nconnected" + db + '  Meal Crawling is doing...');
        //먼저 DB에서 Meal Collection 안의 Document 하나 삭제 (이틀 전 꺼만 하나 삭제하기) --> 데이터 쌓이는거 방지 azure 종량제 돈나간다....
        var query = { date: moment(CrawlingDate[0]).tz('Asia/Seoul').format('MMDD') };
        db.collection('Meal').deleteOne(query);
        //날짜에 맞춘 크롤링 후 DB에 넣기(체크)
        for (var i = 1; i < 10; i++) { //체크, 없으면 추가
            kr = moment(CrawlingDate[i]).tz('Asia/Seoul');
            var query = { date: kr.format('MMDD') };
            var doc = await db.collection('Meal').findOne(query);
            if (doc != null)
                continue;
            var Meal = await school.getMeal(kr.year(), kr.month() + 1);
            var text = Meal[kr.date()];
            var indexarr = [text.indexOf("조식"), text.indexOf("중식"), text.indexOf("석식")];
            var mealarr = new Array(3);
            //아침
            if (indexarr[0] == -1) {
                mealarr[0] = null;
            }
            else {
                if (indexarr[1] == -1) {
                    mealarr[0] = text;
                }
                else {
                    mealarr[0] = text.substring(0, indexarr[1] - 2);
                }
            }
            //점심
            if (indexarr[1] == -1) {
                mealarr[1] = null;
            }
            else {
                if (indexarr[2] == -1) {
                    mealarr[1] = text.substring(indexarr[1] - 1);
                }
                else {
                    mealarr[1] = text.substring(indexarr[1] - 1, indexarr[2] - 2);
                }
            }
            //저녁
            if (indexarr[2] == -1) {
                mealarr[2] = null;
            }
            else {
                mealarr[2] = text.substring(indexarr[2] - 1);
            }
            var mealdoc = {
                date: kr.format('MMDD'),
                morning: mealarr[0],
                lunch: mealarr[1],
                evening: mealarr[2]
            };
            db.collection('Meal').insertOne(mealdoc);
        }
        console.log('Meal Crawling is End');
    });
};
