//Kakao i Open Builser의 포멧을 따와서 BODY 의 테스트용으로 사용

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
