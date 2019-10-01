//Kakao i Open Builser의 포멧을 따와서 테스트용으로 사용

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.weather_body = {
  "intent": {
    "id": "eb9dm8c4cuklb28a3ab0n8mh",
    "name": "미세먼지"
  },
  "userRequest": {
    "timezone": "Asia/Seoul",
    "params": {
      "ignoreMe": "true"
    },
    "block": {
      "id": "eb9dm8c4cuklb28a3ab0n8mh",
      "name": "미세먼지"
    },
    "utterance": "미세먼지",
    "lang": null,
    "user": {
      "id": "690886",
      "type": "accountId",
      "properties": {}
    }
  },
  "bot": {
    "id": "5c415110384c5518d1204c94",
    "name": "봇 이름"
  },
  "action": {
    "name": "xg53dj8cvb",
    "clientExtra": null,
    "params": {},
    "id": "rb4oj19k26iefgb0p8hf0g7u",
    "detailParams": {}
  }
}

exports.meal_body = {
    "intent": {
      "id": "dex1xamfxig5wplg2ev6k1y5",
      "name": "급식"
    },
    "userRequest": {
      "timezone": "Asia/Seoul",
      "params": {
        "ignoreMe": "true"
      },
      "block": {
        "id": "dex1xamfxig5wplg2ev6k1y5",
        "name": "급식"
      },
      "utterance": "오늘의 급식",
      "lang": null,
      "user": {
        "id": "832810",
        "type": "accountId",
        "properties": {}
      }
    },
    "bot": {
      "id": "5c415110384c5518d1204c94",
      "name": "I 알리미"
    },
    "action": {
      "name": "ceb4o55fmy",
      "clientExtra": null,
      "params": {
        "meal": "점심",
        "date": "내일"
      },
      "id": "f5v321046fs965hpv5gz3yqu",
      "detailParams": {
        "meal": {
          "origin": "점심",
          "value": "점심",
          "groupName": ""
        },
        "date": {
          "origin": "내일",
          "value": "내일",
          "groupName": ""
        }
      }
    }
  }

test = '13\
[조식]\
찹쌀밥\
깍두기(완)9.13.\
누룽지(숭늉)_영(선택메뉴)\
우유/시리얼(첵스초코매직딸기)_2.5.6.13.\
얼큰쇠고기뭇국_영5.6.13.\
훈제오리야채볶음_영5.6.9.13.18.\
수제오레오컵케익_영1.2.5.6.13.\
[중식]\
차조밥\
한방소갈비찜_영5.6.13.\
삼색나물25.\
김치전_영1.2.5.6.9.13.\
배추김치(완)9.13.\
건빵(국군의날이벤트식)_영2.5.6.13.\
홍합미역국5.6.13.\
[석식]\
흑미밥\
시금치된장국5.6.9.13.\
투햄벅스테이크+후렌치후라이1.2.5.6.10.12.13.\
어묵계란말이_영1.5.6.8.10.12.13.16.\
배추김치(완)9.13.\
아로니아&체리(음료)'
