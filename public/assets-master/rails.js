var bind, binds, key, _i, _len, _ref;

_ref = LOCATION.bind;
for (key in _ref) {
  binds = _ref[key];
  LOCATION.bind[key] = {};
  for (_i = 0, _len = binds.length; _i < _len; _i++) {
    bind = binds[_i];
    LOCATION.bind[key][bind[key]] = bind;
  }
}
;
var chr_set_id, face, face_id, faced_jobs, job, list, order, _i, _id, _len, _ref, _ref1, _ref2;

new Cache.Rule("face").schema(function() {
  return this.order_by("order");
});

new Cache.Rule("chr_set").schema(function() {
  return this.order_by("caption");
});

new Cache.Rule("chr_npc").schema(function() {
  this.belongs_to("chr_set", {
    dependent: true
  });
  return this.belongs_to("face", {
    dependent: true
  });
});

new Cache.Rule("chr_job").schema(function() {
  this.order(function(o) {
    return o.face.order;
  });
  this.belongs_to("chr_set", {
    dependent: true
  });
  return this.belongs_to("face", {
    dependent: true
  });
});

Cache.rule.face.set([
  {
    "_id": "c49",
    "comment": "test",
    "face_id": "c49",
    "name": "ボリス",
    "order": 1
  }, {
    "_id": "c38",
    "order": 2,
    "face_id": "c38",
    "name": "コリーン"
  }, {
    "_id": "c77",
    "order": 3,
    "face_id": "c77",
    "name": "キャロライナ"
  }, {
    "_id": "c35",
    "order": 4,
    "face_id": "c35",
    "name": "ダン"
  }, {
    "_id": "c53",
    "order": 5,
    "face_id": "c53",
    "name": "ゼルダ"
  }, {
    "_id": "c74",
    "order": 6,
    "face_id": "c74",
    "name": "フランシスカ"
  }, {
    "_id": "c50",
    "order": 7,
    "face_id": "c50",
    "name": "ディーン"
  }, {
    "_id": "c36",
    "order": 8,
    "face_id": "c36",
    "name": "ミッシェル"
  }, {
    "_id": "c26",
    "order": 9,
    "face_id": "c26",
    "name": "モニカ"
  }, {
    "_id": "c55",
    "order": 10,
    "face_id": "c55",
    "name": "パピヨン"
  }, {
    "_id": "c29",
    "order": 11,
    "face_id": "c29",
    "name": "イアン"
  }, {
    "_id": "c12",
    "order": 12,
    "face_id": "c12",
    "name": "バーナバス"
  }, {
    "_id": "c16",
    "order": 13,
    "face_id": "c16",
    "name": "マリアンヌ"
  }, {
    "_id": "c34",
    "order": 14,
    "face_id": "c34",
    "name": "トニー"
  }, {
    "_id": "c44",
    "order": 15,
    "face_id": "c44",
    "name": "ドナルド"
  }, {
    "_id": "c11",
    "order": 16,
    "face_id": "c11",
    "name": "カルヴィン"
  }, {
    "_id": "c10",
    "order": 17,
    "face_id": "c10",
    "name": "ゾーイ"
  }, {
    "_id": "c70",
    "order": 18,
    "face_id": "c70",
    "name": "パティ"
  }, {
    "_id": "c56",
    "order": 19,
    "face_id": "c56",
    "name": "ゴドウィン"
  }, {
    "_id": "c07",
    "order": 20,
    "face_id": "c07",
    "name": "ティモシー"
  }, {
    "_id": "c41",
    "order": 21,
    "face_id": "c41",
    "name": "ヤニク"
  }, {
    "_id": "c58",
    "order": 22,
    "face_id": "c58",
    "name": "ブルーノ"
  }, {
    "_id": "c17",
    "order": 23,
    "face_id": "c17",
    "name": "ユリシーズ"
  }, {
    "_id": "c39",
    "order": 24,
    "face_id": "c39",
    "name": "シビル"
  }, {
    "_id": "c40",
    "order": 25,
    "face_id": "c40",
    "name": "ハワード"
  }, {
    "_id": "c65",
    "order": 26,
    "face_id": "c65",
    "name": "ズリエル"
  }, {
    "_id": "c59",
    "order": 27,
    "face_id": "c59",
    "name": "ムパムピス"
  }, {
    "_id": "c57",
    "order": 28,
    "face_id": "c57",
    "name": "ツェツィーリヤ"
  }, {
    "_id": "c04",
    "order": 29,
    "face_id": "c04",
    "name": "ノーリーン"
  }, {
    "_id": "c46",
    "order": 30,
    "face_id": "c46",
    "name": "ゲイル"
  }, {
    "_id": "c14",
    "order": 31,
    "face_id": "c14",
    "name": "レティーシャ"
  }, {
    "_id": "c09",
    "order": 32,
    "face_id": "c09",
    "name": "ヒロシ"
  }, {
    "_id": "c42",
    "order": 33,
    "face_id": "c42",
    "name": "ラルフ"
  }, {
    "_id": "c37",
    "order": 34,
    "face_id": "c37",
    "name": "セシル"
  }, {
    "_id": "c75",
    "order": 35,
    "face_id": "c75",
    "name": "ビリー"
  }, {
    "_id": "c32",
    "order": 36,
    "face_id": "c32",
    "name": "オスカー"
  }, {
    "_id": "c33",
    "order": 37,
    "face_id": "c33",
    "name": "ホリー"
  }, {
    "_id": "c02",
    "order": 38,
    "face_id": "c02",
    "name": "アルフレッド"
  }, {
    "_id": "c66",
    "order": 39,
    "face_id": "c66",
    "name": "クリストファー"
  }, {
    "_id": "c24",
    "order": 41,
    "face_id": "c24",
    "name": "ナタリア"
  }, {
    "_id": "c79",
    "order": 42,
    "face_id": "c79",
    "name": "マーゴ"
  }, {
    "_id": "c61",
    "order": 43,
    "face_id": "c61",
    "name": "ヌマタロウ"
  }, {
    "_id": "c23",
    "order": 44,
    "face_id": "c23",
    "name": "チャールズ"
  }, {
    "_id": "c28",
    "comment": "",
    "face_id": "c28",
    "name": "ケイト",
    "order": 47
  }, {
    "_id": "c68",
    "order": 48,
    "face_id": "c68",
    "name": "ヨアヒム"
  }, {
    "_id": "c30",
    "order": 49,
    "face_id": "c30",
    "name": "フィリップ"
  }, {
    "_id": "c21",
    "order": 50,
    "face_id": "c21",
    "name": "ニール"
  }, {
    "_id": "c52",
    "order": 52,
    "face_id": "c52",
    "name": "ギリアン"
  }, {
    "_id": "c51",
    "order": 53,
    "face_id": "c51",
    "name": "ヨーランダ"
  }, {
    "_id": "c01",
    "comment": "",
    "face_id": "c01",
    "name": "メアリー",
    "order": 55
  }, {
    "_id": "c69",
    "order": 56,
    "face_id": "c69",
    "name": "ギネス"
  }, {
    "_id": "c63",
    "order": 57,
    "face_id": "c63",
    "name": "ピッパ"
  }, {
    "_id": "c05",
    "order": 59,
    "face_id": "c05",
    "name": "キャサリン"
  }, {
    "_id": "c22",
    "order": 60,
    "face_id": "c22",
    "name": "ワット"
  }, {
    "_id": "c62",
    "order": 61,
    "face_id": "c62",
    "name": "ヴェラ"
  }, {
    "_id": "c13",
    "order": 62,
    "face_id": "c13",
    "name": "ロミオ"
  }, {
    "_id": "c18",
    "order": 63,
    "face_id": "c18",
    "name": "エマ"
  }, {
    "_id": "c27",
    "order": 65,
    "face_id": "c27",
    "name": "リンダ"
  }, {
    "_id": "c08",
    "order": 66,
    "face_id": "c08",
    "name": "ベネット"
  }, {
    "_id": "c19",
    "order": 67,
    "face_id": "c19",
    "name": "タバサ"
  }, {
    "_id": "c71",
    "order": 70,
    "face_id": "c71",
    "name": "ノックス"
  }, {
    "_id": "c03",
    "order": 71,
    "face_id": "c03",
    "name": "スティーブン"
  }, {
    "_id": "c43",
    "order": 72,
    "face_id": "c43",
    "name": "ガストン"
  }, {
    "_id": "c15",
    "order": 73,
    "face_id": "c15",
    "name": "ウェーズリー"
  }, {
    "_id": "c54",
    "order": 75,
    "face_id": "c54",
    "name": "ザック"
  }, {
    "_id": "c25",
    "order": 77,
    "face_id": "c25",
    "name": "ルーカス"
  }, {
    "_id": "c20",
    "order": 78,
    "face_id": "c20",
    "name": "グロリア"
  }, {
    "_id": "c72",
    "order": 79,
    "face_id": "c72",
    "name": "ヴェスパタイン"
  }, {
    "_id": "c47",
    "order": 80,
    "face_id": "c47",
    "name": "ペラジー"
  }, {
    "_id": "c80",
    "order": 81,
    "face_id": "c80",
    "name": "テッド"
  }, {
    "_id": "c105",
    "comment": "年末カウントダウン♪",
    "name": "シメオン",
    "face_id": "c105",
    "order": 82
  }, {
    "_id": "c96",
    "face_id": "c96",
    "name": "レオナルド",
    "comment": "2011/12/11",
    "order": 83
  }, {
    "_id": "c95",
    "face_id": "c95",
    "name": "モリス",
    "comment": "2011/12/11",
    "order": 84
  }, {
    "_id": "c97",
    "face_id": "c97",
    "name": "ジェフ",
    "comment": "2011/12/14 超常現象はあるんだ…",
    "order": 85
  }, {
    "_id": "c98",
    "face_id": "c98",
    "name": "オズワルド",
    "comment": "2011/12/29 この髭はぜったいワックス使ってる。",
    "order": 86
  }, {
    "_id": "c100",
    "face_id": "c100",
    "name": "グレッグ",
    "comment": "2012/12/30 スポーツ系中学生くらいに見える",
    "order": 87
  }, {
    "_id": "c101",
    "face_id": "c101",
    "name": "クラリッサ",
    "comment": "2011/12/30 美人さん♪",
    "order": 88
  }, {
    "_id": "c104",
    "comment": "年末カウントダウン♪",
    "name": "ヒュー",
    "face_id": "c104",
    "order": 89
  }, {
    "_id": "c106",
    "comment": "年末カウントダウン♪",
    "face_id": "c106",
    "name": "ワンダ",
    "order": 90
  }, {
    "_id": "c108",
    "face_id": "c108",
    "name": "ブローリン",
    "comment": "年末カウントダウン♪",
    "order": 91
  }, {
    "_id": "c90",
    "face_id": "c90",
    "name": "ケヴィン",
    "comment": "2011/12/06",
    "order": 125
  }, {
    "_id": "c88",
    "face_id": "c88",
    "name": "ピエール",
    "order": 126,
    "comment": "2011/12/05"
  }, {
    "_id": "c89",
    "face_id": "c89",
    "name": "カトリーナ",
    "comment": "2011/12/06",
    "order": 127
  }, {
    "_id": "c84",
    "face_id": "c84",
    "name": "ブレンダ",
    "order": 129,
    "comment": "2011/12/05"
  }, {
    "_id": "c85",
    "face_id": "c85",
    "name": "ハナ",
    "order": 130,
    "comment": "2011/12/05"
  }, {
    "_id": "c91",
    "comment": "2011/12/06 姦しい奥様♪",
    "face_id": "c91",
    "name": "ドロシー",
    "order": 143
  }, {
    "_id": "c92",
    "comment": "2011/12/06 姦し娘ーず♪",
    "face_id": "c92",
    "name": "セレスト",
    "order": 144
  }, {
    "_id": "c93",
    "comment": "2011/12/06 えー○○が許されるのは小学生までだよねー♪",
    "face_id": "c93",
    "name": "ベッキー",
    "order": 145
  }, {
    "_id": "c78",
    "order": 150,
    "face_id": "c78",
    "name": "ネイサン"
  }, {
    "_id": "c82",
    "order": 160,
    "face_id": "c82",
    "name": "ロビン"
  }, {
    "_id": "c109",
    "face_id": "c109",
    "name": "ラディスラヴァ",
    "comment": "年末カウントダウン♪",
    "order": 163
  }, {
    "_id": "c94",
    "face_id": "c94",
    "name": "ダーラ",
    "comment": "2011/12/11",
    "order": 165
  }, {
    "_id": "c102",
    "comment": "年末カウントダウン♪",
    "face_id": "c102",
    "name": "ウォーレン",
    "order": 168
  }, {
    "_id": "c73",
    "order": 170,
    "face_id": "c73",
    "name": "ローズマリー"
  }, {
    "_id": "c81",
    "order": 180,
    "face_id": "c81",
    "name": "サイラス"
  }, {
    "_id": "c64",
    "order": 190,
    "face_id": "c64",
    "name": "ヘクター"
  }, {
    "_id": "c107",
    "face_id": "c107",
    "name": "イヴォン",
    "comment": "年末カウントダウン♪",
    "order": 195
  }, {
    "_id": "c67",
    "order": 200,
    "face_id": "c67",
    "name": "ソフィア"
  }, {
    "_id": "c76",
    "order": 210,
    "face_id": "c76",
    "name": "ジョージ"
  }, {
    "_id": "c60",
    "order": 215,
    "face_id": "c60",
    "name": "ポーチュラカ"
  }, {
    "_id": "c45",
    "order": 218,
    "face_id": "c45",
    "name": "プリシラ"
  }, {
    "_id": "c87",
    "face_id": "c87",
    "name": "エリアス",
    "order": 220,
    "comment": "2011/12/05"
  }, {
    "_id": "c48",
    "order": 225,
    "face_id": "c48",
    "name": "ビアンカ"
  }, {
    "_id": "c86",
    "face_id": "c86",
    "name": "ホレーショー",
    "order": 230,
    "comment": "2011/12/05"
  }, {
    "_id": "c83",
    "order": 240,
    "face_id": "c83",
    "name": "アイリス"
  }, {
    "_id": "c31",
    "order": 250,
    "face_id": "c31",
    "name": "ネル"
  }, {
    "_id": "c103",
    "comment": "年末カウントダウン♪",
    "name": "ナンシー",
    "face_id": "c103",
    "order": 998
  }, {
    "_id": "c99",
    "order": 999,
    "face_id": "c99",
    "name": "サイモン"
  }, {
    "order": 10001,
    "face_id": "g01",
    "name": "露蝶",
    "comment": "中国女性名",
    "_id": "g01"
  }, {
    "order": 10002,
    "face_id": "g02",
    "name": "志偉",
    "comment": "台湾男性名 越南の名前も探したかったが、見つからぬ…",
    "_id": "g02"
  }, {
    "order": 10003,
    "face_id": "g03",
    "name": "芙蓉",
    "comment": "里帰り",
    "_id": "g03"
  }, {
    "order": 10004,
    "face_id": "gc61",
    "name": "沼太郎",
    "comment": "里帰り",
    "_id": "gc61"
  }, {
    "name": "デメテル",
    "face_id": "mad01",
    "comment": "阿片窟からきました",
    "order": 20001,
    "_id": "mad01"
  }, {
    "name": "エルゴット",
    "face_id": "mad02",
    "comment": "阿片窟からきました",
    "order": 20002,
    "_id": "mad02"
  }, {
    "name": "シーシャ",
    "face_id": "mad03",
    "comment": "阿片窟からきました",
    "order": 20003,
    "_id": "mad03"
  }, {
    "name": "ドリベル",
    "face_id": "mad04",
    "comment": "阿片窟からきました",
    "order": 20004,
    "_id": "mad04"
  }, {
    "name": "ヤヘイ",
    "face_id": "mad05",
    "comment": "阿片窟からきました",
    "order": 20005,
    "_id": "mad05"
  }, {
    "name": "アヤワスカ",
    "face_id": "mad06",
    "comment": "阿片窟からきました",
    "order": 20006,
    "_id": "mad06"
  }, {
    "name": "チアキ",
    "face_id": "t01",
    "comment": "時をかける少女",
    "order": 30001,
    "_id": "t01"
  }, {
    "name": "リッキィ",
    "face_id": "t02",
    "comment": "夏への扉",
    "order": 30002,
    "_id": "t02"
  }, {
    "name": "ミナカタ",
    "face_id": "t03",
    "comment": "ー仁ー",
    "order": 30003,
    "_id": "t03"
  }, {
    "name": "カイル",
    "face_id": "t04",
    "comment": "サラ・コナー・クロニクルズ",
    "order": 30004,
    "_id": "t04"
  }, {
    "name": "ジェニファー",
    "face_id": "t05",
    "comment": "バック・トゥ・ザ・フューチャー",
    "order": 30005,
    "_id": "t05"
  }, {
    "_id": "m99",
    "order": 70001,
    "face_id": "m99",
    "name": "パルック"
  }, {
    "_id": "m06",
    "order": 70002,
    "face_id": "m06",
    "name": "リリンラ"
  }, {
    "_id": "m03",
    "order": 70003,
    "face_id": "m03",
    "name": "トノサマ"
  }, {
    "_id": "m05",
    "order": 70004,
    "face_id": "m05",
    "name": "ナナコロ"
  }, {
    "_id": "m15",
    "order": 70005,
    "face_id": "m15",
    "name": "ミソチャ"
  }, {
    "_id": "m07",
    "order": 70006,
    "face_id": "m07",
    "name": "アリス"
  }, {
    "_id": "r30",
    "order": 70006,
    "face_id": "r30",
    "name": "トリ"
  }, {
    "_id": "m01",
    "order": 70007,
    "face_id": "m01",
    "name": "ケムシ"
  }, {
    "_id": "m02",
    "order": 70008,
    "face_id": "m02",
    "name": "ポプラ"
  }, {
    "_id": "m04",
    "order": 70009,
    "face_id": "m04",
    "name": "アオイ"
  }, {
    "_id": "b44",
    "comment": "",
    "face_id": "b44",
    "name": "ドナルド",
    "order": 70010
  }, {
    "_id": "m08",
    "order": 70011,
    "face_id": "m08",
    "name": "おっぱい"
  }, {
    "_id": "m09",
    "order": 70012,
    "face_id": "m09",
    "name": "カミジャー"
  }, {
    "_id": "r12",
    "order": 70012,
    "face_id": "r12",
    "name": "バーナバス"
  }, {
    "_id": "b49",
    "comment": "",
    "face_id": "b49",
    "name": "ボリス",
    "order": 70012
  }, {
    "_id": "m10",
    "order": 70013,
    "face_id": "m10",
    "name": "アチャポ"
  }, {
    "_id": "m12",
    "comment": "",
    "face_id": "m12",
    "name": "トルニトス",
    "order": 70014
  }, {
    "_id": "m11",
    "order": 70015,
    "face_id": "m11",
    "name": "ライトニング"
  }, {
    "_id": "m13",
    "order": 70016,
    "face_id": "m13",
    "name": "ミケ"
  }, {
    "_id": "m14",
    "order": 70017,
    "face_id": "m14",
    "name": "カリュクス"
  }, {
    "_id": "sf01",
    "order": 80001,
    "face_id": "sf01",
    "name": "ラッシード",
    "comment": "りしあさん＆かれやなぎさん"
  }, {
    "_id": "sf02",
    "order": 80002,
    "face_id": "sf02",
    "name": "エスペラント",
    "comment": "ふらぅさん＆かれやなぎさん"
  }, {
    "_id": "sf03",
    "order": 80003,
    "face_id": "sf03",
    "name": "ピート",
    "comment": "たるっとさん＆りちゃさん"
  }, {
    "_id": "sf04",
    "order": 80004,
    "face_id": "sf04",
    "name": "アシモフ",
    "comment": "あすたん＆りりんら"
  }, {
    "_id": "sf05",
    "order": 80005,
    "face_id": "sf05",
    "name": "モナリザ",
    "comment": "ななころび＆りりんら"
  }, {
    "_id": "sf06",
    "order": 80006,
    "face_id": "sf06",
    "name": "ワレンチナ",
    "comment": "まりもさん＆あずまさん"
  }, {
    "_id": "sf07",
    "order": 80007,
    "face_id": "sf07",
    "name": "ヤンファ",
    "comment": "りしあさん＆はむおくん"
  }, {
    "_id": "sf08",
    "order": 80008,
    "face_id": "sf08",
    "name": "ＰＪ",
    "comment": "りしあさん＆ふらぅさん"
  }, {
    "_id": "sf09",
    "order": 80009,
    "face_id": "sf09",
    "name": "キリシマ",
    "comment": "ななころび＆ふらぅさん"
  }, {
    "_id": "sf10",
    "order": 80010,
    "face_id": "sf10",
    "name": "ナユタ",
    "comment": "かれやなぎさん＆かいさん"
  }, {
    "_id": "sf11",
    "order": 80011,
    "face_id": "sf11",
    "name": "イワノフ",
    "comment": "かれやなぎさん＆りちゃさん"
  }, {
    "order": 80012,
    "face_id": "sf12",
    "name": "†ルシフェル†",
    "comment": null,
    "_id": "sf12"
  }, {
    "order": 80013,
    "face_id": "sf13",
    "name": "トルドヴィン",
    "comment": null,
    "_id": "sf13"
  }, {
    "order": 80014,
    "face_id": "sf18",
    "name": "玖休",
    "comment": null,
    "_id": "sf18"
  }, {
    "order": 80015,
    "face_id": "sf19",
    "name": "参休",
    "comment": null,
    "_id": "sf19"
  }, {
    "order": 80016,
    "face_id": "sf14",
    "name": "クリスマス",
    "comment": null,
    "_id": "sf14"
  }, {
    "order": 80017,
    "face_id": "sf15",
    "name": "ジェームス",
    "comment": null,
    "_id": "sf15"
  }, {
    "order": 80018,
    "face_id": "sf16",
    "name": "ライジ",
    "comment": null,
    "_id": "sf16"
  }, {
    "order": 80019,
    "face_id": "sf17",
    "name": "ジャック",
    "comment": null,
    "_id": "sf17"
  }, {
    "_id": "w05",
    "order": 90001,
    "face_id": "w05",
    "name": "定吉",
    "comment": "ぷえるとりこの旅人　エージ―エー"
  }, {
    "_id": "w21",
    "order": 90002,
    "face_id": "w21",
    "name": "鉄平",
    "comment": "日本の伝統　熊木彫"
  }, {
    "_id": "w22",
    "order": 90003,
    "face_id": "w22",
    "name": "竹三",
    "comment": "雪国の風雅　熊木彫"
  }, {
    "_id": "w36",
    "order": 90004,
    "face_id": "w36",
    "name": "ウト"
  }, {
    "_id": "w16",
    "order": 90005,
    "face_id": "w16",
    "name": "勢",
    "comment": "ぶたさん印の　あおいジンギスカン"
  }, {
    "_id": "w18",
    "order": 90006,
    "face_id": "w18",
    "name": "菊"
  }, {
    "_id": "w26",
    "order": 90007,
    "face_id": "w26",
    "name": "勝丸"
  }, {
    "_id": "w35",
    "comment": "",
    "face_id": "w35",
    "name": "奈須麿",
    "order": 90008
  }, {
    "_id": "w24",
    "order": 90009,
    "face_id": "w24",
    "name": "辰次",
    "comment": "桃源郷ぐた国のめぐみ　ふらう乳業"
  }, {
    "_id": "w37",
    "order": 90010,
    "face_id": "w37",
    "name": "芙蓉"
  }, {
    "_id": "w29",
    "order": 90011,
    "face_id": "w29",
    "name": "志乃"
  }, {
    "_id": "w20",
    "order": 90012,
    "face_id": "w20",
    "name": "藤之助"
  }, {
    "_id": "w31",
    "order": 90013,
    "face_id": "w31",
    "name": "日向"
  }, {
    "_id": "w12",
    "order": 90014,
    "face_id": "w12",
    "name": "おみつ",
    "comment": "道を外して60年　GEDOU協会"
  }, {
    "_id": "w10",
    "order": 90015,
    "face_id": "w10",
    "name": "博史"
  }, {
    "_id": "w25",
    "order": 90016,
    "face_id": "w25",
    "name": "法泉"
  }, {
    "_id": "w09",
    "order": 90017,
    "face_id": "w09",
    "name": "チャールズ",
    "comment": "チャールズ派遣ならおまかせ　O-ririn"
  }, {
    "_id": "w30",
    "order": 90018,
    "face_id": "w30",
    "name": "雪代"
  }, {
    "_id": "w14",
    "order": 90019,
    "face_id": "w14",
    "name": "華月斎",
    "comment": "めげないゼラチン作り　MEGEゼラチン"
  }, {
    "_id": "w13",
    "order": 90020,
    "face_id": "w13",
    "name": "たまこ",
    "comment": "世界の道をつなぐ　議事国地図"
  }, {
    "_id": "w11",
    "order": 90021,
    "face_id": "w11",
    "name": "沼太郎"
  }, {
    "_id": "w03",
    "order": 90022,
    "face_id": "w03",
    "name": "朔",
    "comment": "新しい議事をつくる　たき学会"
  }, {
    "_id": "w34",
    "order": 90023,
    "face_id": "w34",
    "name": "余四朗"
  }, {
    "_id": "w27",
    "order": 90024,
    "face_id": "w27",
    "name": "源蔵"
  }, {
    "_id": "w28",
    "order": 90025,
    "face_id": "w28",
    "name": "甚六"
  }, {
    "_id": "w17",
    "order": 90026,
    "face_id": "w17",
    "name": "雷門",
    "comment": "輝く月に未来を託す　暁月商事"
  }, {
    "_id": "w39",
    "comment": "",
    "face_id": "w39",
    "name": "沙耶",
    "order": 90027
  }, {
    "_id": "w08",
    "order": 90028,
    "face_id": "w08",
    "name": "朝顔"
  }, {
    "_id": "w43",
    "order": 90029,
    "face_id": "w43",
    "name": "春松"
  }, {
    "_id": "w07",
    "order": 90030,
    "face_id": "w07",
    "name": "夕顔"
  }, {
    "_id": "w40",
    "order": 90031,
    "face_id": "w40",
    "name": "朧"
  }, {
    "_id": "w33",
    "comment": "",
    "face_id": "w33",
    "name": "団十郎",
    "order": 90032
  }, {
    "_id": "w23",
    "order": 90033,
    "face_id": "w23",
    "name": "仁右衛門"
  }, {
    "_id": "w04",
    "order": 90034,
    "face_id": "w04",
    "name": "小鈴",
    "comment": "お口の愛人　タルッティ・タルット"
  }, {
    "_id": "w06",
    "order": 90035,
    "face_id": "w06",
    "name": "ゆり",
    "comment": "道を外して60年　GEDOU協会"
  }, {
    "_id": "w38",
    "comment": "",
    "face_id": "w38",
    "name": "一平太",
    "order": 90037
  }, {
    "_id": "w01",
    "order": 90038,
    "face_id": "w01",
    "name": "鏡花",
    "comment": "輝く月に未来を託す　暁月商事"
  }, {
    "_id": "w15",
    "order": 90039,
    "face_id": "w15",
    "name": "八重",
    "comment": "桃源郷ぐた国のめぐみ　ふらう乳業"
  }, {
    "_id": "w32",
    "order": 90040,
    "face_id": "w32",
    "name": "明之進"
  }, {
    "_id": "w02",
    "order": 90041,
    "face_id": "w02",
    "name": "慶三郎",
    "comment": "カメラのことなら　MISEKI"
  }, {
    "_id": "w44",
    "face_id": "w44",
    "name": "雪客",
    "comment": "りりんラハウス呑んだくれ大会",
    "order": 90042
  }, {
    "_id": "w45",
    "face_id": "w45",
    "name": "亀吉",
    "comment": "りりんラハウス呑んだくれ大会",
    "order": 90043
  }, {
    "_id": "w46",
    "face_id": "w46",
    "name": "梅子",
    "order": 90044,
    "comment": "お誕生日記念☆"
  }, {
    "face_id": "w47",
    "name": "置壱",
    "comment": "日本の美徳強化月間",
    "order": 90045,
    "_id": "w47"
  }, {
    "face_id": "all",
    "name": "パルック",
    "order": 99999,
    "_id": "all"
  }, {
    "_id": "g04",
    "face_id": "g04",
    "name": "攻芸",
    "comment": "台湾男性名",
    "order": 10005
  }, {
    "_id": "g05",
    "face_id": "g05",
    "name": "麻雀",
    "comment": "中国女性名",
    "order": 10006
  }, {
    "_id": "g06",
    "face_id": "g06",
    "name": "黍炉",
    "comment": "ダリダイ・オッチギン",
    "order": 10007
  }, {
    "_id": "mad07",
    "face_id": "mad07",
    "name": "ダイミ",
    "comment": "阿片窟からきました",
    "order": 20007
  }, {
    "_id": "mad08",
    "face_id": "mad08",
    "name": "エフェドラ",
    "comment": "阿片窟からきました",
    "order": 20008
  }, {
    "_id": "t06",
    "face_id": "t06",
    "name": "サミュエル",
    "comment": "トランスフォーマー",
    "order": 30006
  }, {
    "_id": "t07",
    "face_id": "t07",
    "name": "アカリ",
    "comment": "時をかける少女",
    "order": 30007
  }, {
    "_id": "t08",
    "face_id": "t08",
    "name": "ミルフィ",
    "comment": "海賊戦隊ゴーカイジャー",
    "order": 30008
  }, {
    "_id": "t09",
    "face_id": "t09",
    "name": "ゴロウ",
    "comment": "時をかける少女",
    "order": 30009
  }, {
    "_id": "t10",
    "face_id": "t10",
    "name": "トレイル",
    "comment": "ゼルダの伝説 ムジュラの仮面",
    "order": 30010
  }, {
    "_id": "t11",
    "face_id": "t11",
    "name": "マドカ",
    "comment": "宇宙戦艦ヤマモト・ヨーコ",
    "order": 30011
  }, {
    "_id": "t12",
    "face_id": "t12",
    "name": "フランク",
    "comment": "オーロラの彼方へ",
    "order": 30012
  }, {
    "_id": "t13",
    "face_id": "t13",
    "name": "ジャニス",
    "comment": "フラッシュフォワード",
    "order": 30013
  }, {
    "_id": "t14",
    "face_id": "t14",
    "name": "クシャミ",
    "comment": "吾輩は猫である。",
    "order": 30014
  }, {
    "_id": "t15",
    "face_id": "t15",
    "name": "ガーディ",
    "comment": "ベイカー街少年探偵団",
    "order": 30015
  }, {
    "_id": "sf20",
    "face_id": "sf20",
    "name": "ティソ",
    "comment": null,
    "order": 80020
  }, {
    "_id": "g07",
    "face_id": "g07",
    "name": "ジリヤ",
    "comment": "ロシア女性名",
    "order": 10008
  }, {
    "_id": "t16",
    "face_id": "t16",
    "name": "アラン",
    "comment": "映画監督たちの共用偽名",
    "order": 30016
  }, {
    "_id": "w48",
    "face_id": "w48",
    "name": "直円",
    "comment": "和算復活月間",
    "order": 90048
  }, {
    "_id": "w49",
    "face_id": "w49",
    "name": "錠",
    "comment": "ポルトガル人にジオゴっているんだぜ。へー。かっこいー。",
    "order": 90049
  }, {
    "_id": "w50",
    "face_id": "w50",
    "name": "丁助",
    "comment": "負けるたびに追い博打",
    "order": 90050
  }, {
    "_id": "t17",
    "face_id": "t17",
    "name": "ススム",
    "comment": "おもいっきり探偵団 覇悪怒組",
    "order": 30018
  }, {
    "_id": "t18",
    "face_id": "t18",
    "name": "マユミ",
    "comment": "まんがはじめて物語（二代目）",
    "order": 30019
  }, {
    "_id": "c110",
    "face_id": "c110",
    "name": "リー",
    "comment": "",
    "order": 92
  }, {
    "_id": "t19",
    "face_id": "t19",
    "name": "ハルカ",
    "comment": "はるかリフレイン",
    "order": 30017
  }, {
    "_id": "w51",
    "face_id": "w51",
    "name": "鬼丞",
    "comment": "リニューアル記念！",
    "order": 90051
  }, {
    "_id": "w52",
    "face_id": "w52",
    "name": "櫻子",
    "comment": "リニューアル記念！",
    "order": 90052
  }, {
    "_id": "c111",
    "face_id": "c111",
    "name": "スージー",
    "comment": "リニューアル記念！ 弟がいるという噂が…",
    "order": 93
  }, {
    "_id": "c113",
    "face_id": "c113",
    "name": "ジェレミー",
    "comment": "リニューアル記念！",
    "order": 94
  }, {
    "_id": "c112",
    "face_id": "c112",
    "name": "ニコラス",
    "comment": "！？",
    "order": 128
  }, {
    "_id": "m16",
    "face_id": "m16",
    "name": "アーサー",
    "comment": "円卓の騎士",
    "order": 70018
  }, {
    "_id": "t20",
    "face_id": "t20",
    "name": "エリ",
    "comment": "英国情報局秘密組織チェラブ (CHERUB)",
    "order": 30020
  }, {
    "_id": "g08",
    "face_id": "g08",
    "name": "イワン",
    "comment": "Иван-дурак",
    "order": 10009
  }, {
    "_id": "c114",
    "face_id": "c114",
    "name": "モンド",
    "comment": "８８件のご応募、ありがとう。そして、ありがとう。",
    "order": 131
  }, {
    "_id": "m18",
    "face_id": "m18",
    "name": "ミーム",
    "comment": "インターネット・ミームから。 えんいー",
    "order": 70020
  }, {
    "_id": "m19",
    "face_id": "m19",
    "name": "タルト",
    "comment": "https://twitter.com/7korobi/status/510069062974447617",
    "order": 70021
  }, {
    "_id": "m20",
    "face_id": "m20",
    "name": "ショコラ",
    "comment": "https://twitter.com/noa_marimo/status/510100541536358400",
    "order": 70022
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "ger",
    "admin": "闇の呟き",
    "maker": "馬頭琴の調",
    "caption": "エクスパンション・セット「大陸議事」",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "エクスパンション・セット「大陸議事」",
    "csid": "ger",
    "face_id": "g03",
    "say_0": "まさか……これは……？\u003Cbr\u003E\u003Cbr\u003E真相が分かったわ！\u003Cbr\u003E日が出たらすぐ、麓の皆に知らせないと！",
    "say_1": "飛車が…壊れてる……\u003Cbr\u003E葛橋が…焼けてる……\u003Cbr\u003E\u003Cbr\u003E！　なんだ、猫か……。おどかさないでよ。\u003Cbr\u003Eん？",
    "_id": "ger_g03",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "g01",
    "job": "三元道士",
    "_id": "ger_g01",
    "chr_set_id": "ger"
  }, {
    "face_id": "g02",
    "job": "白鶴拳",
    "_id": "ger_g02",
    "chr_set_id": "ger"
  }, {
    "face_id": "g03",
    "job": "吹牛方士",
    "_id": "ger_g03",
    "chr_set_id": "ger"
  }, {
    "face_id": "gc61",
    "job": "釣り師",
    "_id": "ger_gc61",
    "chr_set_id": "ger"
  }, {
    "face_id": "g04",
    "job": "心意六合拳",
    "_id": "ger_g04",
    "chr_set_id": "ger"
  }, {
    "face_id": "g05",
    "job": "本草方士",
    "_id": "ger_g05",
    "chr_set_id": "ger"
  }, {
    "face_id": "g06",
    "job": "宝飾交易",
    "_id": "ger_g06",
    "chr_set_id": "ger"
  }, {
    "face_id": "g07",
    "job": "お針子",
    "_id": "ger_g07",
    "chr_set_id": "ger"
  }, {
    "face_id": "g08",
    "job": "馬鹿",
    "_id": "ger_g08",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "mad",
    "admin": "闇の呟き",
    "maker": "天上の調べ",
    "caption": "エクスパンション・セット「狂騒議事」",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "エクスパンション・セット「狂騒議事」",
    "csid": "mad",
    "face_id": "c83",
    "say_0": "どうせ、殺されるわみんな。…みんな\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E/* 死ねばいいのに */",
    "say_1": "１人になるのゎ私ばっか。どっちの道ぉ選んでも、\u003Cbr\u003E私ゎ十分です。明日も待っててね。お願いだから、\u003Cbr\u003E離れて行かないで？\u003Cbr\u003Eいつまでも、\u003Cbr\u003Eなんで私ばっか\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003E日記はそこで途切れ、発見されるまで打ち捨てられていた。\u003C/b\u003E",
    "_id": "mad_c83",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "c103",
    "job": "厭世家",
    "_id": "mad_c103",
    "chr_set_id": "mad"
  }, {
    "face_id": "c83",
    "job": "虹追い",
    "_id": "mad_c83",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad01",
    "job": "青い鳥",
    "_id": "mad_mad01",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad02",
    "job": "蟻塚崩し",
    "_id": "mad_mad02",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad03",
    "job": "露店巡り",
    "_id": "mad_mad03",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad04",
    "job": "酸味探し",
    "_id": "mad_mad04",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad05",
    "job": "天井手繰り",
    "_id": "mad_mad05",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad06",
    "job": "隠れん坊",
    "_id": "mad_mad06",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad07",
    "job": "早口言葉",
    "_id": "mad_mad07",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad08",
    "job": "妄執の誓い",
    "_id": "mad_mad08",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "school",
    "admin": "校内放送",
    "maker": "校内放送",
    "caption": "私立七転学園",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "私立七転学園",
    "csid": "school",
    "face_id": "c99",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "school_c99",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "c01",
    "job": "華道部",
    "_id": "school_c01",
    "chr_set_id": "school"
  }, {
    "face_id": "c02",
    "job": "校長",
    "_id": "school_c02",
    "chr_set_id": "school"
  }, {
    "face_id": "c03",
    "job": "化学教師",
    "_id": "school_c03",
    "chr_set_id": "school"
  }, {
    "face_id": "c04",
    "job": "ＳＯＳ団",
    "_id": "school_c04",
    "chr_set_id": "school"
  }, {
    "face_id": "c05",
    "job": "留年生",
    "_id": "school_c05",
    "chr_set_id": "school"
  }, {
    "face_id": "c06",
    "job": "保健体育教師",
    "_id": "school_c06",
    "chr_set_id": "school"
  }, {
    "face_id": "c07",
    "job": "歴史教師",
    "_id": "school_c07",
    "chr_set_id": "school"
  }, {
    "face_id": "c08",
    "job": "図書委員",
    "_id": "school_c08",
    "chr_set_id": "school"
  }, {
    "face_id": "c09",
    "job": "動く銅像",
    "_id": "school_c09",
    "chr_set_id": "school"
  }, {
    "face_id": "c10",
    "job": "ミーハー",
    "_id": "school_c10",
    "chr_set_id": "school"
  }, {
    "face_id": "c11",
    "job": "優等生",
    "_id": "school_c11",
    "chr_set_id": "school"
  }, {
    "face_id": "c12",
    "job": "用務員",
    "_id": "school_c12",
    "chr_set_id": "school"
  }, {
    "face_id": "c13",
    "job": "生物教師",
    "_id": "school_c13",
    "chr_set_id": "school"
  }, {
    "face_id": "c14",
    "job": "コーラス部",
    "_id": "school_c14",
    "chr_set_id": "school"
  }, {
    "face_id": "c15",
    "job": "地理教師",
    "_id": "school_c15",
    "chr_set_id": "school"
  }, {
    "face_id": "c16",
    "job": "食堂のおねいさん",
    "_id": "school_c16",
    "chr_set_id": "school"
  }, {
    "face_id": "c17",
    "job": "演劇部顧問",
    "_id": "school_c17",
    "chr_set_id": "school"
  }, {
    "face_id": "c18",
    "job": "数学教師",
    "_id": "school_c18",
    "chr_set_id": "school"
  }, {
    "face_id": "c19",
    "job": "チアリーダー",
    "_id": "school_c19",
    "chr_set_id": "school"
  }, {
    "face_id": "c20",
    "job": "理事長の孫",
    "_id": "school_c20",
    "chr_set_id": "school"
  }, {
    "face_id": "c21",
    "job": "球部顧問",
    "_id": "school_c21",
    "chr_set_id": "school"
  }, {
    "face_id": "c22",
    "job": "農業科",
    "_id": "school_c22",
    "chr_set_id": "school"
  }, {
    "face_id": "c23",
    "job": "現国教師",
    "_id": "school_c23",
    "chr_set_id": "school"
  }, {
    "face_id": "c24",
    "job": "理事長",
    "_id": "school_c24",
    "chr_set_id": "school"
  }, {
    "face_id": "c25",
    "job": "校長の孫",
    "_id": "school_c25",
    "chr_set_id": "school"
  }, {
    "face_id": "c26",
    "job": "吹奏楽部",
    "_id": "school_c26",
    "chr_set_id": "school"
  }, {
    "face_id": "c27",
    "job": "手芸部",
    "_id": "school_c27",
    "chr_set_id": "school"
  }, {
    "face_id": "c28",
    "job": "文芸部",
    "_id": "school_c28",
    "chr_set_id": "school"
  }, {
    "face_id": "c29",
    "job": "新聞部",
    "_id": "school_c29",
    "chr_set_id": "school"
  }, {
    "face_id": "c30",
    "job": "飼育委員",
    "_id": "school_c30",
    "chr_set_id": "school"
  }, {
    "face_id": "c31",
    "job": "漫画研究部",
    "_id": "school_c31",
    "chr_set_id": "school"
  }, {
    "face_id": "c32",
    "job": "演劇部",
    "_id": "school_c32",
    "chr_set_id": "school"
  }, {
    "face_id": "c33",
    "job": "演劇部",
    "_id": "school_c33",
    "chr_set_id": "school"
  }, {
    "face_id": "c34",
    "job": "球児",
    "_id": "school_c34",
    "chr_set_id": "school"
  }, {
    "face_id": "c35",
    "job": "体育教師",
    "_id": "school_c35",
    "chr_set_id": "school"
  }, {
    "face_id": "c36",
    "job": "美術部",
    "_id": "school_c36",
    "chr_set_id": "school"
  }, {
    "face_id": "c37",
    "job": "音楽教師",
    "_id": "school_c37",
    "chr_set_id": "school"
  }, {
    "face_id": "c38",
    "job": "軽音楽部",
    "_id": "school_c38",
    "chr_set_id": "school"
  }, {
    "face_id": "c39",
    "job": "家政科教師",
    "_id": "school_c39",
    "chr_set_id": "school"
  }, {
    "face_id": "c40",
    "job": "教頭先生",
    "_id": "school_c40",
    "chr_set_id": "school"
  }, {
    "face_id": "c41",
    "job": "登山部",
    "_id": "school_c41",
    "chr_set_id": "school"
  }, {
    "face_id": "c42",
    "job": "生徒会執行部",
    "_id": "school_c42",
    "chr_set_id": "school"
  }, {
    "face_id": "c43",
    "job": "番長",
    "_id": "school_c43",
    "chr_set_id": "school"
  }, {
    "face_id": "c44",
    "job": "問題児",
    "_id": "school_c44",
    "chr_set_id": "school"
  }, {
    "face_id": "c45",
    "job": "スケバン",
    "_id": "school_c45",
    "chr_set_id": "school"
  }, {
    "face_id": "c46",
    "job": "保険医",
    "_id": "school_c46",
    "chr_set_id": "school"
  }, {
    "face_id": "c47",
    "job": "転校生",
    "_id": "school_c47",
    "chr_set_id": "school"
  }, {
    "face_id": "c48",
    "job": "美術教師",
    "_id": "school_c48",
    "chr_set_id": "school"
  }, {
    "face_id": "c49",
    "job": "技術教師",
    "_id": "school_c49",
    "chr_set_id": "school"
  }, {
    "face_id": "c50",
    "job": "風紀委員",
    "_id": "school_c50",
    "chr_set_id": "school"
  }, {
    "face_id": "c51",
    "job": "幽霊部員",
    "_id": "school_c51",
    "chr_set_id": "school"
  }, {
    "face_id": "c52",
    "job": "映画研究会",
    "_id": "school_c52",
    "chr_set_id": "school"
  }, {
    "face_id": "c53",
    "job": "寮管理人",
    "_id": "school_c53",
    "chr_set_id": "school"
  }, {
    "face_id": "c54",
    "job": "野球部",
    "_id": "school_c54",
    "chr_set_id": "school"
  }, {
    "face_id": "c55",
    "job": "肖像画",
    "_id": "school_c55",
    "chr_set_id": "school"
  }, {
    "face_id": "c56",
    "job": "世界史教師",
    "_id": "school_c56",
    "chr_set_id": "school"
  }, {
    "face_id": "c57",
    "job": "修士",
    "_id": "school_c57",
    "chr_set_id": "school"
  }, {
    "face_id": "c58",
    "job": "名誉教授",
    "_id": "school_c58",
    "chr_set_id": "school"
  }, {
    "face_id": "c59",
    "job": "修士",
    "_id": "school_c59",
    "chr_set_id": "school"
  }, {
    "face_id": "c60",
    "job": "ラクロス部",
    "_id": "school_c60",
    "chr_set_id": "school"
  }, {
    "face_id": "c61",
    "job": "魚拓部",
    "_id": "school_c61",
    "chr_set_id": "school"
  }, {
    "face_id": "c62",
    "job": "守衛",
    "_id": "school_c62",
    "chr_set_id": "school"
  }, {
    "face_id": "c63",
    "job": "マネージャー",
    "_id": "school_c63",
    "chr_set_id": "school"
  }, {
    "face_id": "c64",
    "job": "格闘技同好会",
    "_id": "school_c64",
    "chr_set_id": "school"
  }, {
    "face_id": "c65",
    "job": "教育実習",
    "_id": "school_c65",
    "chr_set_id": "school"
  }, {
    "face_id": "c66",
    "job": "茶道部顧問",
    "_id": "school_c66",
    "chr_set_id": "school"
  }, {
    "face_id": "c67",
    "job": "購買部",
    "_id": "school_c67",
    "chr_set_id": "school"
  }, {
    "face_id": "c68",
    "job": "後援者",
    "_id": "school_c68",
    "chr_set_id": "school"
  }, {
    "face_id": "c69",
    "job": "陶芸部",
    "_id": "school_c69",
    "chr_set_id": "school"
  }, {
    "face_id": "c70",
    "job": "先輩",
    "_id": "school_c70",
    "chr_set_id": "school"
  }, {
    "face_id": "c71",
    "job": "帰宅部",
    "_id": "school_c71",
    "chr_set_id": "school"
  }, {
    "face_id": "c72",
    "job": "ヴィジュアル系バンド部",
    "_id": "school_c72",
    "chr_set_id": "school"
  }, {
    "face_id": "c73",
    "job": "チアガール",
    "_id": "school_c73",
    "chr_set_id": "school"
  }, {
    "face_id": "c74",
    "job": "社交ダンス部",
    "_id": "school_c74",
    "chr_set_id": "school"
  }, {
    "face_id": "c75",
    "job": "演奏講師",
    "_id": "school_c75",
    "chr_set_id": "school"
  }, {
    "face_id": "c76",
    "job": "委員長",
    "_id": "school_c76",
    "chr_set_id": "school"
  }, {
    "face_id": "c77",
    "job": "いきもの係",
    "_id": "school_c77",
    "chr_set_id": "school"
  }, {
    "face_id": "c78",
    "job": "演劇部",
    "_id": "school_c78",
    "chr_set_id": "school"
  }, {
    "face_id": "c79",
    "job": "水泳部",
    "_id": "school_c79",
    "chr_set_id": "school"
  }, {
    "face_id": "c80",
    "job": "陸上部",
    "_id": "school_c80",
    "chr_set_id": "school"
  }, {
    "face_id": "c81",
    "job": "科学部",
    "_id": "school_c81",
    "chr_set_id": "school"
  }, {
    "face_id": "c82",
    "job": "ガリ勉",
    "_id": "school_c82",
    "chr_set_id": "school"
  }, {
    "face_id": "c83",
    "job": "放送部",
    "_id": "school_c83",
    "chr_set_id": "school"
  }, {
    "face_id": "c99",
    "job": "不登校児",
    "_id": "school_c99",
    "chr_set_id": "school"
  }, {
    "face_id": "c86",
    "job": "柔道部",
    "_id": "school_c86",
    "chr_set_id": "school"
  }, {
    "face_id": "c94",
    "job": "PTA会長",
    "_id": "school_c94",
    "chr_set_id": "school"
  }, {
    "face_id": "c92",
    "job": "テニス部",
    "_id": "school_c92",
    "chr_set_id": "school"
  }, {
    "face_id": "c90",
    "job": "ラグビー部",
    "_id": "school_c90",
    "chr_set_id": "school"
  }, {
    "face_id": "c95",
    "job": "人体模型",
    "_id": "school_c95",
    "chr_set_id": "school"
  }, {
    "face_id": "c97",
    "job": "駐在さん",
    "_id": "school_c97",
    "chr_set_id": "school"
  }, {
    "face_id": "c100",
    "job": "サッカー部",
    "_id": "school_c100",
    "chr_set_id": "school"
  }, {
    "face_id": "c106",
    "job": "水泳部顧問",
    "_id": "school_c106",
    "chr_set_id": "school"
  }, {
    "face_id": "c89",
    "job": "新任教師",
    "_id": "school_c89",
    "chr_set_id": "school"
  }, {
    "face_id": "c91",
    "job": "緑のおばさん",
    "_id": "school_c91",
    "chr_set_id": "school"
  }, {
    "face_id": "c93",
    "job": "書道部",
    "_id": "school_c93",
    "chr_set_id": "school"
  }, {
    "face_id": "c107",
    "job": "前理事長",
    "_id": "school_c107",
    "chr_set_id": "school"
  }, {
    "face_id": "c85",
    "job": "おてんば",
    "_id": "school_c85",
    "chr_set_id": "school"
  }, {
    "face_id": "c105",
    "job": "弓道部",
    "_id": "school_c105",
    "chr_set_id": "school"
  }, {
    "face_id": "c96",
    "job": "助教授",
    "_id": "school_c96",
    "chr_set_id": "school"
  }, {
    "face_id": "c98",
    "job": "教授",
    "_id": "school_c98",
    "chr_set_id": "school"
  }, {
    "face_id": "c101",
    "job": "園芸部",
    "_id": "school_c101",
    "chr_set_id": "school"
  }, {
    "face_id": "c104",
    "job": "剣道部",
    "_id": "school_c104",
    "chr_set_id": "school"
  }, {
    "face_id": "c108",
    "job": "無線部",
    "_id": "school_c108",
    "chr_set_id": "school"
  }, {
    "face_id": "c88",
    "job": "栄養士",
    "_id": "school_c88",
    "chr_set_id": "school"
  }, {
    "face_id": "c84",
    "job": "講師",
    "_id": "school_c84",
    "chr_set_id": "school"
  }, {
    "face_id": "c109",
    "job": "占い研究会",
    "_id": "school_c109",
    "chr_set_id": "school"
  }, {
    "face_id": "c102",
    "job": "前校長",
    "_id": "school_c102",
    "chr_set_id": "school"
  }, {
    "face_id": "c87",
    "job": "天文部",
    "_id": "school_c87",
    "chr_set_id": "school"
  }, {
    "face_id": "c103",
    "job": "オカルト同好会",
    "_id": "school_c103",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "sf",
    "admin": "黒体放射のエヴェレット解釈",
    "maker": "重ね合せ猫のユニタリ変換",
    "caption": "明後日への道標",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "明後日への道標",
    "csid": "SF",
    "face_id": "sf04",
    "say_0": "とたたたたんっ。\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003Eめざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\u003Cbr\u003Eいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。\u003C/b\u003E ",
    "say_1": "ちゅー！\u003Cbr\u003E\u003Cbr\u003E　ちゅー！\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003Eがりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……\u003C/b\u003E ",
    "_id": "sf_sf04",
    "chr_set_id": "sf"
  }, {
    "caption": "明後日への道標（ナユタ）",
    "csid": "SF_sf10",
    "face_id": "sf10",
    "say_0": "f*ck！またチオチモリンと二酸化炭素分圧だし！\u003Cbr\u003Eエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003E同日 整備日誌\u003Cbr\u003E　定期点検。ただちに健康に影響はないが、擦過痕…\u003C/b\u003E",
    "say_1": "よーf*ck'nおまえら。\u003Cbr\u003Eマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\u003Cbr\u003Eマジ怒んねーから手ぇ挙げ\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003Eぷつん\u003C/b\u003E\u003Cbr\u003E\u003Cbr\u003Eっと。瞬停った…。f*ck。\u003Cbr\u003Eちょっと外の様子見てくる。俺のプリン残しといてくれよ。\u003Cbr\u003E",
    "_id": "sf_sf10",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "sf01",
    "job": "通信士",
    "_id": "sf_sf01",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf02",
    "job": "哲学者",
    "_id": "sf_sf02",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf03",
    "job": "道案内",
    "_id": "sf_sf03",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf04",
    "job": "お散歩隊長",
    "_id": "sf_sf04",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf05",
    "job": "新製品",
    "_id": "sf_sf05",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf06",
    "job": "士官",
    "_id": "sf_sf06",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf07",
    "job": "遊泳員",
    "_id": "sf_sf07",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf08",
    "job": "服飾商",
    "_id": "sf_sf08",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf09",
    "job": "研修生",
    "_id": "sf_sf09",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf10",
    "job": "保安技師",
    "_id": "sf_sf10",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf11",
    "job": "艇長",
    "_id": "sf_sf11",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf12",
    "job": "廃神",
    "_id": "sf_sf12",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf13",
    "job": "消防隊長",
    "_id": "sf_sf13",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf14",
    "job": "対面販売",
    "_id": "sf_sf14",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf15",
    "job": "忍者隊",
    "_id": "sf_sf15",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf16",
    "job": "保険調査",
    "_id": "sf_sf16",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf17",
    "job": "幽閉児",
    "_id": "sf_sf17",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf18",
    "job": "感性子",
    "_id": "sf_sf18",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf19",
    "job": "理性子",
    "_id": "sf_sf19",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf20",
    "job": "測量士",
    "_id": "sf_sf20",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "time",
    "admin": "第四の壁の深奥",
    "maker": "次元X式コンピューター",
    "caption": "エクスパンション・セット「帰還者議事」",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "エクスパンション・セット「帰還者議事」",
    "csid": "time",
    "face_id": "c10",
    "say_0": "M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。",
    "say_1": "やっぱさ、銃を持った善人がいないとさ。\u003Cbr\u003E\u003Cbr\u003Eちょっと出かけてくる！プリン食べちゃダメだよ！",
    "_id": "time_c10",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "c10",
    "job": "小銃協会",
    "_id": "time_c10",
    "chr_set_id": "time"
  }, {
    "face_id": "t01",
    "job": "友愛組合",
    "_id": "time_t01",
    "chr_set_id": "time"
  }, {
    "face_id": "t02",
    "job": "幸運の科学",
    "_id": "time_t02",
    "chr_set_id": "time"
  }, {
    "face_id": "t03",
    "job": "FSM団",
    "_id": "time_t03",
    "chr_set_id": "time"
  }, {
    "face_id": "t04",
    "job": "截拳道",
    "_id": "time_t04",
    "chr_set_id": "time"
  }, {
    "face_id": "t05",
    "job": "開放的市民",
    "_id": "time_t05",
    "chr_set_id": "time"
  }, {
    "face_id": "c09",
    "job": "暗殺教団",
    "_id": "time_c09",
    "chr_set_id": "time"
  }, {
    "face_id": "t06",
    "job": "死ね死ね団",
    "_id": "time_t06",
    "chr_set_id": "time"
  }, {
    "face_id": "t07",
    "job": "勧善懲悪委",
    "_id": "time_t07",
    "chr_set_id": "time"
  }, {
    "face_id": "t08",
    "job": "覆面嫉妬団",
    "_id": "time_t08",
    "chr_set_id": "time"
  }, {
    "face_id": "t09",
    "job": "匿名軍団",
    "_id": "time_t09",
    "chr_set_id": "time"
  }, {
    "face_id": "t10",
    "job": "営利政府",
    "_id": "time_t10",
    "chr_set_id": "time"
  }, {
    "face_id": "t11",
    "job": "鷹の爪団",
    "_id": "time_t11",
    "chr_set_id": "time"
  }, {
    "face_id": "t12",
    "job": "地下鉄道",
    "_id": "time_t12",
    "chr_set_id": "time"
  }, {
    "face_id": "t13",
    "job": "MNU機関",
    "_id": "time_t13",
    "chr_set_id": "time"
  }, {
    "face_id": "t14",
    "job": "猫の集会",
    "_id": "time_t14",
    "chr_set_id": "time"
  }, {
    "face_id": "t15",
    "job": "少年探偵団",
    "_id": "time_t15",
    "chr_set_id": "time"
  }, {
    "face_id": "t16",
    "job": "安全保障局",
    "_id": "time_t16",
    "chr_set_id": "time"
  }, {
    "face_id": "t17",
    "job": "薔薇∴十字",
    "_id": "time_t17",
    "chr_set_id": "time"
  }, {
    "face_id": "t18",
    "job": "白銀∴秘星",
    "_id": "time_t18",
    "chr_set_id": "time"
  }, {
    "face_id": "t19",
    "job": "聖戦士募集",
    "_id": "time_t19",
    "chr_set_id": "time"
  }, {
    "face_id": "t20",
    "job": "MI:18",
    "_id": "time_t20",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "wa",
    "admin": "闇の呟き",
    "maker": "稲荷のお告げ",
    "caption": "和の国てやんでえ",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "和の国てやんでえ",
    "csid": "wa",
    "face_id": "w17",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "wa_w17",
    "chr_set_id": "wa"
  }, {
    "caption": "和の国てやんでえ（仁右衛門）",
    "csid": "wa_w23",
    "face_id": "w23",
    "say_0": "なんと、これは奇っ怪……分かったゾ！",
    "say_1": "やっぱり人狼は実在するんだヨ！　うっひょひょーい！",
    "_id": "wa_w23",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "w01",
    "job": "役者",
    "_id": "wa_w01",
    "chr_set_id": "wa"
  }, {
    "face_id": "w02",
    "job": "浪人",
    "_id": "wa_w02",
    "chr_set_id": "wa"
  }, {
    "face_id": "w03",
    "job": "忍者",
    "_id": "wa_w03",
    "chr_set_id": "wa"
  }, {
    "face_id": "w04",
    "job": "町娘",
    "_id": "wa_w04",
    "chr_set_id": "wa"
  }, {
    "face_id": "w05",
    "job": "飴師",
    "_id": "wa_w05",
    "chr_set_id": "wa"
  }, {
    "face_id": "w06",
    "job": "巫女",
    "_id": "wa_w06",
    "chr_set_id": "wa"
  }, {
    "face_id": "w07",
    "job": "双子",
    "_id": "wa_w07",
    "chr_set_id": "wa"
  }, {
    "face_id": "w08",
    "job": "双子",
    "_id": "wa_w08",
    "chr_set_id": "wa"
  }, {
    "face_id": "w09",
    "job": "宣教師",
    "_id": "wa_w09",
    "chr_set_id": "wa"
  }, {
    "face_id": "w10",
    "job": "刺客",
    "_id": "wa_w10",
    "chr_set_id": "wa"
  }, {
    "face_id": "w11",
    "job": "釣り師",
    "_id": "wa_w11",
    "chr_set_id": "wa"
  }, {
    "face_id": "w12",
    "job": "女中",
    "_id": "wa_w12",
    "chr_set_id": "wa"
  }, {
    "face_id": "w13",
    "job": "団子屋",
    "_id": "wa_w13",
    "chr_set_id": "wa"
  }, {
    "face_id": "w14",
    "job": "手妻師",
    "_id": "wa_w14",
    "chr_set_id": "wa"
  }, {
    "face_id": "w15",
    "job": "山姥",
    "_id": "wa_w15",
    "chr_set_id": "wa"
  }, {
    "face_id": "w16",
    "job": "髪結い",
    "_id": "wa_w16",
    "chr_set_id": "wa"
  }, {
    "face_id": "w17",
    "job": "病人",
    "_id": "wa_w17",
    "chr_set_id": "wa"
  }, {
    "face_id": "w18",
    "job": "後妻",
    "_id": "wa_w18",
    "chr_set_id": "wa"
  }, {
    "face_id": "w20",
    "job": "呉服問屋",
    "_id": "wa_w20",
    "chr_set_id": "wa"
  }, {
    "face_id": "w21",
    "job": "うどん職人",
    "_id": "wa_w21",
    "chr_set_id": "wa"
  }, {
    "face_id": "w22",
    "job": "そば職人",
    "_id": "wa_w22",
    "chr_set_id": "wa"
  }, {
    "face_id": "w23",
    "job": "弁士",
    "_id": "wa_w23",
    "chr_set_id": "wa"
  }, {
    "face_id": "w24",
    "job": "喧嘩屋",
    "_id": "wa_w24",
    "chr_set_id": "wa"
  }, {
    "face_id": "w25",
    "job": "説法師",
    "_id": "wa_w25",
    "chr_set_id": "wa"
  }, {
    "face_id": "w26",
    "job": "餓鬼大将",
    "_id": "wa_w26",
    "chr_set_id": "wa"
  }, {
    "face_id": "w27",
    "job": "発明家",
    "_id": "wa_w27",
    "chr_set_id": "wa"
  }, {
    "face_id": "w28",
    "job": "飛脚",
    "_id": "wa_w28",
    "chr_set_id": "wa"
  }, {
    "face_id": "w29",
    "job": "琴弾き",
    "_id": "wa_w29",
    "chr_set_id": "wa"
  }, {
    "face_id": "w30",
    "job": "宗主",
    "_id": "wa_w30",
    "chr_set_id": "wa"
  }, {
    "face_id": "w31",
    "job": "子守り",
    "_id": "wa_w31",
    "chr_set_id": "wa"
  }, {
    "face_id": "w32",
    "job": "落胤",
    "_id": "wa_w32",
    "chr_set_id": "wa"
  }, {
    "face_id": "w33",
    "job": "船大工",
    "_id": "wa_w33",
    "chr_set_id": "wa"
  }, {
    "face_id": "w34",
    "job": "野伏り",
    "_id": "wa_w34",
    "chr_set_id": "wa"
  }, {
    "face_id": "w35",
    "job": "神主",
    "_id": "wa_w35",
    "chr_set_id": "wa"
  }, {
    "face_id": "w36",
    "job": "楽士",
    "_id": "wa_w36",
    "chr_set_id": "wa"
  }, {
    "face_id": "w37",
    "job": "薬売り",
    "_id": "wa_w37",
    "chr_set_id": "wa"
  }, {
    "face_id": "w38",
    "job": "門下生",
    "_id": "wa_w38",
    "chr_set_id": "wa"
  }, {
    "face_id": "w39",
    "job": "武家の娘",
    "_id": "wa_w39",
    "chr_set_id": "wa"
  }, {
    "face_id": "w40",
    "job": "懐刀",
    "_id": "wa_w40",
    "chr_set_id": "wa"
  }, {
    "face_id": "w41",
    "job": "物乞い",
    "_id": "wa_w41",
    "chr_set_id": "wa"
  }, {
    "face_id": "w43",
    "job": "丁稚",
    "_id": "wa_w43",
    "chr_set_id": "wa"
  }, {
    "face_id": "w44",
    "job": "機織り",
    "_id": "wa_w44",
    "chr_set_id": "wa"
  }, {
    "face_id": "w45",
    "job": "座敷守",
    "_id": "wa_w45",
    "chr_set_id": "wa"
  }, {
    "face_id": "w46",
    "job": "屍漁り",
    "_id": "wa_w46",
    "chr_set_id": "wa"
  }, {
    "face_id": "w47",
    "job": "肥代取り",
    "_id": "wa_w47",
    "chr_set_id": "wa"
  }, {
    "face_id": "w48",
    "job": "和算家",
    "_id": "wa_w48",
    "chr_set_id": "wa"
  }, {
    "_id": "wa_w49",
    "face_id": "w49",
    "job": "抜荷",
    "chr_set_id": "wa"
  }, {
    "face_id": "w50",
    "job": "半の目",
    "_id": "wa_w50",
    "chr_set_id": "wa"
  }, {
    "face_id": "w51",
    "job": "真剣師",
    "_id": "wa_w51",
    "chr_set_id": "wa"
  }, {
    "face_id": "w52",
    "job": "看板娘",
    "_id": "wa_w52",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "ririnra",
    "admin": "闇の呟き",
    "maker": "天のお告げ",
    "caption": "人狼議事",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "人狼議事（キャサリン）",
    "csid": "ririnra_c05",
    "face_id": "c05",
    "say_0": "たいへん、たいへん、たいへん！",
    "say_1": "大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！",
    "_id": "ririnra_c05",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ベネット）",
    "csid": "ririnra_c08",
    "face_id": "c08",
    "say_0": "壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\u003Cbr\u003E明日は、もう……",
    "say_1": "足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003E日記はそこで途切れ、発見されるまで打ち捨てられていた。\u003C/b\u003E",
    "_id": "ririnra_c08",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（タバサ）",
    "csid": "ririnra_c19",
    "face_id": "c19",
    "say_0": "ねぇ、遊んでかない？今夜はあなたが狼よ……",
    "say_1": "人狼なんているわけないじゃん？みんな大げさなのさ。",
    "_id": "ririnra_c19",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ソフィア）",
    "csid": "ririnra_c67",
    "face_id": "c67",
    "say_0": "こんばんわ、こんな遅くにたいへんですね。\u003Cbr\u003E\u003Cbr\u003E………\u003Cbr\u003E行っちゃった。へんなの。",
    "say_1": "まさかあの時、あのひとが……？\u003Cbr\u003E人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！",
    "_id": "ririnra_c67",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ヨアヒム）",
    "csid": "ririnra_c68",
    "face_id": "c68",
    "say_0": "ふひ、ふひひ！人狼になど……くれてやるものかヨ！",
    "say_1": "人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！",
    "_id": "ririnra_c68",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ヴェスパタイン）",
    "csid": "ririnra_c72",
    "face_id": "c72",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "ririnra_c72",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ヨーランダ）",
    "csid": "ririnra_c51",
    "face_id": "c51",
    "say_0": "夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……",
    "say_1": "……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\u003Cbr\u003E幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。",
    "_id": "ririnra_c51",
    "chr_set_id": "ririnra"
  }, {
    "_id": "ririnra_c20",
    "caption": "人狼議事（グロリア）",
    "csid": "ririnra_c20",
    "face_id": "c20",
    "say_0": "紳士ならびに淑女の皆様、わたくしの館へようこそ。\u003Cbr\u003E世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。",
    "say_1": "ちょっと！そこの貴方、何をしているの！\u003Cbr\u003E聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（オスカー）",
    "csid": "ririnra_c32",
    "face_id": "c32",
    "say_0": "…そっちじゃないよ、こっちだよ。\u003Cbr\u003Eここ、秘密基地なんだ。雨もへいきだし暖かいよ。",
    "say_1": "ねえ。見て見て。パン持ってきたんだ。\u003Cbr\u003Eみんなにはナイショだよ？",
    "_id": "ririnra_c32",
    "chr_set_id": "ririnra"
  }, {
    "csid": "ririnra",
    "caption": "人狼議事",
    "say_0": "嗚呼、聞こえ る。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "face_id": "c99",
    "_id": "ririnra_c99",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "c01",
    "job": "花売り",
    "_id": "ririnra_c01",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c02",
    "job": "村長",
    "_id": "ririnra_c02",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c03",
    "job": "見習い医師",
    "_id": "ririnra_c03",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c04",
    "job": "女中",
    "_id": "ririnra_c04",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c05",
    "job": "病人",
    "_id": "ririnra_c05",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c06",
    "job": "紐",
    "_id": "ririnra_c06",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c07",
    "job": "雑貨屋",
    "_id": "ririnra_c07",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c08",
    "job": "本屋",
    "_id": "ririnra_c08",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c09",
    "job": "刺客",
    "_id": "ririnra_c09",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c10",
    "job": "小娘",
    "_id": "ririnra_c10",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c11",
    "job": "小僧",
    "_id": "ririnra_c11",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c12",
    "job": "御者",
    "_id": "ririnra_c12",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c13",
    "job": "ベテラン医師",
    "_id": "ririnra_c13",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c14",
    "job": "聖歌隊員",
    "_id": "ririnra_c14",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c15",
    "job": "郵便屋",
    "_id": "ririnra_c15",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c16",
    "job": "食いしん坊",
    "_id": "ririnra_c16",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c17",
    "job": "詩人",
    "_id": "ririnra_c17",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c18",
    "job": "ベテラン看護婦",
    "_id": "ririnra_c18",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c19",
    "job": "水商売",
    "_id": "ririnra_c19",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c20",
    "job": "良家の娘",
    "_id": "ririnra_c20",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c21",
    "job": "肉屋",
    "_id": "ririnra_c21",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c22",
    "job": "百姓",
    "_id": "ririnra_c22",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c23",
    "job": "伝道師",
    "_id": "ririnra_c23",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c24",
    "job": "長老",
    "_id": "ririnra_c24",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c25",
    "job": "良家の息子",
    "_id": "ririnra_c25",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c26",
    "job": "楽器職人",
    "_id": "ririnra_c26",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c27",
    "job": "牧人",
    "_id": "ririnra_c27",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c28",
    "job": "読書家",
    "_id": "ririnra_c28",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c29",
    "job": "記者",
    "_id": "ririnra_c29",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c30",
    "job": "鳥使い",
    "_id": "ririnra_c30",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c31",
    "job": "童話作家",
    "_id": "ririnra_c31",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c32",
    "job": "双生児",
    "_id": "ririnra_c32",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c33",
    "job": "双生児",
    "_id": "ririnra_c33",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c34",
    "job": "靴磨き",
    "_id": "ririnra_c34",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c35",
    "job": "親方",
    "_id": "ririnra_c35",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c36",
    "job": "飾り職",
    "_id": "ririnra_c36",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c37",
    "job": "奏者",
    "_id": "ririnra_c37",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c38",
    "job": "歌い手",
    "_id": "ririnra_c38",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c39",
    "job": "仕立て屋",
    "_id": "ririnra_c39",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c40",
    "job": "執事",
    "_id": "ririnra_c40",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c41",
    "job": "さすらい人",
    "_id": "ririnra_c41",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c42",
    "job": "掃除夫",
    "_id": "ririnra_c42",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c43",
    "job": "森番",
    "_id": "ririnra_c43",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c44",
    "job": "小悪党",
    "_id": "ririnra_c44",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c45",
    "job": "博徒",
    "_id": "ririnra_c45",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c46",
    "job": "助手",
    "_id": "ririnra_c46",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c47",
    "job": "流浪者",
    "_id": "ririnra_c47",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c48",
    "job": "宝石収集家",
    "_id": "ririnra_c48",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c49",
    "job": "石工",
    "_id": "ririnra_c49",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c50",
    "job": "会計士",
    "_id": "ririnra_c50",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c51",
    "job": "墓守",
    "_id": "ririnra_c51",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c52",
    "job": "墓堀",
    "_id": "ririnra_c52",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c53",
    "job": "大地主",
    "_id": "ririnra_c53",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c54",
    "job": "理髪師",
    "_id": "ririnra_c54",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c55",
    "job": "寡婦",
    "_id": "ririnra_c55",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c56",
    "job": "酒屋",
    "_id": "ririnra_c56",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c57",
    "job": "修道女",
    "_id": "ririnra_c57",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c58",
    "job": "司祭",
    "_id": "ririnra_c58",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c59",
    "job": "修道士",
    "_id": "ririnra_c59",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c60",
    "job": "良家の末娘",
    "_id": "ririnra_c60",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c61",
    "job": "釣り師",
    "_id": "ririnra_c61",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c62",
    "job": "風来坊",
    "_id": "ririnra_c62",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c63",
    "job": "漂白工",
    "_id": "ririnra_c63",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c64",
    "job": "墓荒らし",
    "_id": "ririnra_c64",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c65",
    "job": "始末屋",
    "_id": "ririnra_c65",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c66",
    "job": "紅茶屋",
    "_id": "ririnra_c66",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c67",
    "job": "店番",
    "_id": "ririnra_c67",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c68",
    "job": "賭場の主",
    "_id": "ririnra_c68",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c69",
    "job": "美術家",
    "_id": "ririnra_c69",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c70",
    "job": "子守り",
    "_id": "ririnra_c70",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c71",
    "job": "道案内",
    "_id": "ririnra_c71",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c72",
    "job": "ランタン職人",
    "_id": "ririnra_c72",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c73",
    "job": "水商売",
    "_id": "ririnra_c73",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c74",
    "job": "踊り手",
    "_id": "ririnra_c74",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c75",
    "job": "奏者",
    "_id": "ririnra_c75",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c76",
    "job": "留守番",
    "_id": "ririnra_c76",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c77",
    "job": "馬飼い",
    "_id": "ririnra_c77",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c78",
    "job": "道化師",
    "_id": "ririnra_c78",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c79",
    "job": "長老の孫",
    "_id": "ririnra_c79",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c80",
    "job": "若者",
    "_id": "ririnra_c80",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c81",
    "job": "薬屋",
    "_id": "ririnra_c81",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c82",
    "job": "執事見習い",
    "_id": "ririnra_c82",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c83",
    "job": "受付",
    "_id": "ririnra_c83",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c84",
    "job": "妻",
    "_id": "ririnra_c84",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c85",
    "job": "お使い",
    "_id": "ririnra_c85",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c86",
    "job": "放蕩者",
    "_id": "ririnra_c86",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c87",
    "job": "病人",
    "_id": "ririnra_c87",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c88",
    "job": "料理人",
    "_id": "ririnra_c88",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c99",
    "job": "厭世家",
    "_id": "ririnra_c99",
    "chr_set_id": "ririnra"
  }, {
    "job": "新妻",
    "face_id": "c89",
    "_id": "ririnra_c89",
    "chr_set_id": "ririnra"
  }, {
    "job": "粉ひき",
    "face_id": "c90",
    "_id": "ririnra_c90",
    "chr_set_id": "ririnra"
  }, {
    "job": "洗濯婦",
    "face_id": "c91",
    "_id": "ririnra_c91",
    "chr_set_id": "ririnra"
  }, {
    "job": "洗濯婦",
    "face_id": "c92",
    "_id": "ririnra_c92",
    "chr_set_id": "ririnra"
  }, {
    "job": "洗濯婦",
    "face_id": "c93",
    "_id": "ririnra_c93",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c94",
    "job": "女主人",
    "_id": "ririnra_c94",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c95",
    "job": "新聞配達",
    "_id": "ririnra_c95",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c96",
    "job": "学者",
    "_id": "ririnra_c96",
    "chr_set_id": "ririnra"
  }, {
    "job": "捜査官",
    "face_id": "c97",
    "_id": "ririnra_c97",
    "chr_set_id": "ririnra"
  }, {
    "job": "探偵",
    "face_id": "c98",
    "_id": "ririnra_c98",
    "chr_set_id": "ririnra"
  }, {
    "job": "徒弟",
    "face_id": "c100",
    "_id": "ririnra_c100",
    "chr_set_id": "ririnra"
  }, {
    "job": "手伝い",
    "face_id": "c101",
    "_id": "ririnra_c101",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c102",
    "job": "指揮者",
    "_id": "ririnra_c102",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c103",
    "job": "厭世家",
    "_id": "ririnra_c103",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c104",
    "job": "負傷兵",
    "_id": "ririnra_c104",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c105",
    "job": "教え子",
    "_id": "ririnra_c105",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c106",
    "job": "魚屋",
    "_id": "ririnra_c106",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c107",
    "job": "成金",
    "_id": "ririnra_c107",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c108",
    "job": "採集人",
    "_id": "ririnra_c108",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c109",
    "job": "村娘",
    "_id": "ririnra_c109",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c110",
    "job": "ろくでなし",
    "_id": "ririnra_c110",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c111",
    "job": "愛人",
    "_id": "ririnra_c111",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c112",
    "job": "許婚",
    "_id": "ririnra_c112",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c113",
    "job": "紐",
    "_id": "ririnra_c113",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c114",
    "job": "革命家",
    "_id": "ririnra_c114",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "animal",
    "admin": "大地の震動",
    "maker": "草原のざわめき",
    "caption": "うきうきサバンナ",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "うきうきサバンナ",
    "csid": "animal",
    "face_id": "c99",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "animal_c99",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "c01",
    "job": "こじか",
    "_id": "animal_c01",
    "chr_set_id": "animal"
  }, {
    "face_id": "c02",
    "job": "よーくしゃーてりあ",
    "_id": "animal_c02",
    "chr_set_id": "animal"
  }, {
    "face_id": "c03",
    "job": "かもすぞ",
    "_id": "animal_c03",
    "chr_set_id": "animal"
  }, {
    "face_id": "c04",
    "job": "くろひょう",
    "_id": "animal_c04",
    "chr_set_id": "animal"
  }, {
    "face_id": "c05",
    "job": "いとまきえい",
    "_id": "animal_c05",
    "chr_set_id": "animal"
  }, {
    "face_id": "c06",
    "job": "へび",
    "_id": "animal_c06",
    "chr_set_id": "animal"
  }, {
    "face_id": "c07",
    "job": "てのりぶんちょう",
    "_id": "animal_c07",
    "chr_set_id": "animal"
  }, {
    "face_id": "c08",
    "job": "たぬき",
    "_id": "animal_c08",
    "chr_set_id": "animal"
  }, {
    "face_id": "c09",
    "job": "にほんおおかみ",
    "_id": "animal_c09",
    "chr_set_id": "animal"
  }, {
    "face_id": "c10",
    "job": "そまり",
    "_id": "animal_c10",
    "chr_set_id": "animal"
  }, {
    "face_id": "c11",
    "job": "みけ",
    "_id": "animal_c11",
    "chr_set_id": "animal"
  }, {
    "face_id": "r12",
    "job": "うえきばち",
    "_id": "animal_r12",
    "chr_set_id": "animal"
  }, {
    "face_id": "c13",
    "job": "かたつむり",
    "_id": "animal_c13",
    "chr_set_id": "animal"
  }, {
    "face_id": "c14",
    "job": "くらげ",
    "_id": "animal_c14",
    "chr_set_id": "animal"
  }, {
    "face_id": "c15",
    "job": "しゃち",
    "_id": "animal_c15",
    "chr_set_id": "animal"
  }, {
    "face_id": "c16",
    "job": "あふりかぞう",
    "_id": "animal_c16",
    "chr_set_id": "animal"
  }, {
    "face_id": "c17",
    "job": "おらうーたん",
    "_id": "animal_c17",
    "chr_set_id": "animal"
  }, {
    "face_id": "c18",
    "job": "かまきり",
    "_id": "animal_c18",
    "chr_set_id": "animal"
  }, {
    "face_id": "c19",
    "job": "あげはちょう",
    "_id": "animal_c19",
    "chr_set_id": "animal"
  }, {
    "face_id": "c20",
    "job": "とら",
    "_id": "animal_c20",
    "chr_set_id": "animal"
  }, {
    "face_id": "c21",
    "job": "おおたこ",
    "_id": "animal_c21",
    "chr_set_id": "animal"
  }, {
    "face_id": "c22",
    "job": "うちゅうせん",
    "_id": "animal_c22",
    "chr_set_id": "animal"
  }, {
    "face_id": "c23",
    "job": "ぱんだ",
    "_id": "animal_c23",
    "chr_set_id": "animal"
  }, {
    "face_id": "c24",
    "job": "ぶるどっぐ",
    "_id": "animal_c24",
    "chr_set_id": "animal"
  }, {
    "face_id": "c25",
    "job": "うし",
    "_id": "animal_c25",
    "chr_set_id": "animal"
  }, {
    "face_id": "c26",
    "job": "えりまきとかげ",
    "_id": "animal_c26",
    "chr_set_id": "animal"
  }, {
    "face_id": "c27",
    "job": "ひつじ",
    "_id": "animal_c27",
    "chr_set_id": "animal"
  }, {
    "face_id": "c28",
    "job": "うさぎ",
    "_id": "animal_c28",
    "chr_set_id": "animal"
  }, {
    "face_id": "c29",
    "job": "しまうま",
    "_id": "animal_c29",
    "chr_set_id": "animal"
  }, {
    "face_id": "c30",
    "job": "おうむ",
    "_id": "animal_c30",
    "chr_set_id": "animal"
  }, {
    "face_id": "c31",
    "job": "かえる",
    "_id": "animal_c31",
    "chr_set_id": "animal"
  }, {
    "face_id": "c32",
    "job": "きんぎょ",
    "_id": "animal_c32",
    "chr_set_id": "animal"
  }, {
    "face_id": "c33",
    "job": "ねったいぎょ",
    "_id": "animal_c33",
    "chr_set_id": "animal"
  }, {
    "face_id": "c34",
    "job": "すなねずみ",
    "_id": "animal_c34",
    "chr_set_id": "animal"
  }, {
    "face_id": "c35",
    "job": "ごりら",
    "_id": "animal_c35",
    "chr_set_id": "animal"
  }, {
    "face_id": "c36",
    "job": "さらぶれっど",
    "_id": "animal_c36",
    "chr_set_id": "animal"
  }, {
    "face_id": "c37",
    "job": "ぺるしゃ",
    "_id": "animal_c37",
    "chr_set_id": "animal"
  }, {
    "face_id": "c38",
    "job": "だいおういか",
    "_id": "animal_c38",
    "chr_set_id": "animal"
  }, {
    "face_id": "c39",
    "job": "もみのき",
    "_id": "animal_c39",
    "chr_set_id": "animal"
  }, {
    "face_id": "c40",
    "job": "らいおん",
    "_id": "animal_c40",
    "chr_set_id": "animal"
  }, {
    "face_id": "c41",
    "job": "ろぶすたー",
    "_id": "animal_c41",
    "chr_set_id": "animal"
  }, {
    "face_id": "c42",
    "job": "みつりょうしゃ",
    "_id": "animal_c42",
    "chr_set_id": "animal"
  }, {
    "face_id": "c43",
    "job": "くまー",
    "_id": "animal_c43",
    "chr_set_id": "animal"
  }, {
    "face_id": "c44",
    "job": "いわとびぺんぎん",
    "_id": "animal_c44",
    "chr_set_id": "animal"
  }, {
    "face_id": "c45",
    "job": "はいえな",
    "_id": "animal_c45",
    "chr_set_id": "animal"
  }, {
    "face_id": "c46",
    "job": "あらいぐま",
    "_id": "animal_c46",
    "chr_set_id": "animal"
  }, {
    "face_id": "c47",
    "job": "しろまどうし",
    "_id": "animal_c47",
    "chr_set_id": "animal"
  }, {
    "face_id": "c48",
    "job": "くじゃく",
    "_id": "animal_c48",
    "chr_set_id": "animal"
  }, {
    "face_id": "c49",
    "job": "にほんざる",
    "_id": "animal_c49",
    "chr_set_id": "animal"
  }, {
    "face_id": "c50",
    "job": "きつね",
    "_id": "animal_c50",
    "chr_set_id": "animal"
  }, {
    "face_id": "c51",
    "job": "かげろう",
    "_id": "animal_c51",
    "chr_set_id": "animal"
  }, {
    "face_id": "c52",
    "job": "ありじごく",
    "_id": "animal_c52",
    "chr_set_id": "animal"
  }, {
    "face_id": "c53",
    "job": "やみふくろう",
    "_id": "animal_c53",
    "chr_set_id": "animal"
  }, {
    "face_id": "c54",
    "job": "さめ",
    "_id": "animal_c54",
    "chr_set_id": "animal"
  }, {
    "face_id": "c55",
    "job": "もるふぉちょう",
    "_id": "animal_c55",
    "chr_set_id": "animal"
  }, {
    "face_id": "c56",
    "job": "ぶた",
    "_id": "animal_c56",
    "chr_set_id": "animal"
  }, {
    "face_id": "c57",
    "job": "らくだ",
    "_id": "animal_c57",
    "chr_set_id": "animal"
  }, {
    "face_id": "c58",
    "job": "ゆにこーん",
    "_id": "animal_c58",
    "chr_set_id": "animal"
  }, {
    "face_id": "c59",
    "job": "れとりばー",
    "_id": "animal_c59",
    "chr_set_id": "animal"
  }, {
    "face_id": "c60",
    "job": "はむすたー",
    "_id": "animal_c60",
    "chr_set_id": "animal"
  }, {
    "face_id": "c61",
    "job": "すっぽん",
    "_id": "animal_c61",
    "chr_set_id": "animal"
  }, {
    "face_id": "c62",
    "job": "きつねりす",
    "_id": "animal_c62",
    "chr_set_id": "animal"
  }, {
    "face_id": "c63",
    "job": "おこじょ",
    "_id": "animal_c63",
    "chr_set_id": "animal"
  }, {
    "face_id": "c64",
    "job": "やまあらし",
    "_id": "animal_c64",
    "chr_set_id": "animal"
  }, {
    "face_id": "c65",
    "job": "ちすいこうもり",
    "_id": "animal_c65",
    "chr_set_id": "animal"
  }, {
    "face_id": "c66",
    "job": "ばいにん",
    "_id": "animal_c66",
    "chr_set_id": "animal"
  }, {
    "face_id": "c67",
    "job": "りす",
    "_id": "animal_c67",
    "chr_set_id": "animal"
  }, {
    "face_id": "c68",
    "job": "なまこ",
    "_id": "animal_c68",
    "chr_set_id": "animal"
  }, {
    "face_id": "c69",
    "job": "びーる",
    "_id": "animal_c69",
    "chr_set_id": "animal"
  }, {
    "face_id": "c70",
    "job": "かんがるー",
    "_id": "animal_c70",
    "chr_set_id": "animal"
  }, {
    "face_id": "c71",
    "job": "なまけもの",
    "_id": "animal_c71",
    "chr_set_id": "animal"
  }, {
    "face_id": "c72",
    "job": "ほたる",
    "_id": "animal_c72",
    "chr_set_id": "animal"
  }, {
    "face_id": "c73",
    "job": "くりおね",
    "_id": "animal_c73",
    "chr_set_id": "animal"
  }, {
    "face_id": "c74",
    "job": "はいびすかす",
    "_id": "animal_c74",
    "chr_set_id": "animal"
  }, {
    "face_id": "c75",
    "job": "いえてぃ",
    "_id": "animal_c75",
    "chr_set_id": "animal"
  }, {
    "face_id": "c76",
    "job": "めがねざる",
    "_id": "animal_c76",
    "chr_set_id": "animal"
  }, {
    "face_id": "c77",
    "job": "にんじん",
    "_id": "animal_c77",
    "chr_set_id": "animal"
  }, {
    "face_id": "c78",
    "job": "かめれおん",
    "_id": "animal_c78",
    "chr_set_id": "animal"
  }, {
    "face_id": "c79",
    "job": "わかめ",
    "_id": "animal_c79",
    "chr_set_id": "animal"
  }, {
    "face_id": "c80",
    "job": "りかおん",
    "_id": "animal_c80",
    "chr_set_id": "animal"
  }, {
    "face_id": "c81",
    "job": "ふぇねっく",
    "_id": "animal_c81",
    "chr_set_id": "animal"
  }, {
    "face_id": "c82",
    "job": "どぶねずみ",
    "_id": "animal_c82",
    "chr_set_id": "animal"
  }, {
    "face_id": "c83",
    "job": "いそぎんちゃく",
    "_id": "animal_c83",
    "chr_set_id": "animal"
  }, {
    "face_id": "c99",
    "job": "しんかいぎょ",
    "_id": "animal_c99",
    "chr_set_id": "animal"
  }, {
    "face_id": "c86",
    "job": "かも",
    "_id": "animal_c86",
    "chr_set_id": "animal"
  }, {
    "face_id": "c94",
    "job": "あかまむし",
    "_id": "animal_c94",
    "chr_set_id": "animal"
  }, {
    "face_id": "c92",
    "job": "さば",
    "_id": "animal_c92",
    "chr_set_id": "animal"
  }, {
    "face_id": "c90",
    "job": "さい",
    "_id": "animal_c90",
    "chr_set_id": "animal"
  }, {
    "face_id": "c95",
    "job": "やもり",
    "_id": "animal_c95",
    "chr_set_id": "animal"
  }, {
    "face_id": "c97",
    "job": "しぇぱーど",
    "_id": "animal_c97",
    "chr_set_id": "animal"
  }, {
    "face_id": "c100",
    "job": "びーばー",
    "_id": "animal_c100",
    "chr_set_id": "animal"
  }, {
    "face_id": "c106",
    "job": "まんぼう",
    "_id": "animal_c106",
    "chr_set_id": "animal"
  }, {
    "face_id": "c89",
    "job": "かば",
    "_id": "animal_c89",
    "chr_set_id": "animal"
  }, {
    "face_id": "c91",
    "job": "あるぱか",
    "_id": "animal_c91",
    "chr_set_id": "animal"
  }, {
    "face_id": "c93",
    "job": "わらいかわせみ",
    "_id": "animal_c93",
    "chr_set_id": "animal"
  }, {
    "face_id": "c107",
    "job": "いぼいのしし",
    "_id": "animal_c107",
    "chr_set_id": "animal"
  }, {
    "face_id": "c85",
    "job": "かみつきがめ",
    "_id": "animal_c85",
    "chr_set_id": "animal"
  }, {
    "face_id": "c105",
    "job": "うみねこ",
    "_id": "animal_c105",
    "chr_set_id": "animal"
  }, {
    "face_id": "c96",
    "job": "せあかごけぐも",
    "_id": "animal_c96",
    "chr_set_id": "animal"
  }, {
    "face_id": "c98",
    "job": "はしびろこう",
    "_id": "animal_c98",
    "chr_set_id": "animal"
  }, {
    "face_id": "c101",
    "job": "すずらん",
    "_id": "animal_c101",
    "chr_set_id": "animal"
  }, {
    "face_id": "c104",
    "job": "みいら",
    "_id": "animal_c104",
    "chr_set_id": "animal"
  }, {
    "face_id": "c108",
    "job": "ぶろっこりー",
    "_id": "animal_c108",
    "chr_set_id": "animal"
  }, {
    "face_id": "c88",
    "job": "ゆでたまご",
    "_id": "animal_c88",
    "chr_set_id": "animal"
  }, {
    "face_id": "c84",
    "job": "しろへび",
    "_id": "animal_c84",
    "chr_set_id": "animal"
  }, {
    "face_id": "c109",
    "job": "しろちゃとら",
    "_id": "animal_c109",
    "chr_set_id": "animal"
  }, {
    "face_id": "c102",
    "job": "さんた",
    "_id": "animal_c102",
    "chr_set_id": "animal"
  }, {
    "face_id": "c87",
    "job": "りゅう",
    "_id": "animal_c87",
    "chr_set_id": "animal"
  }, {
    "face_id": "c103",
    "job": "おうむがい",
    "_id": "animal_c103",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "changed",
    "admin": "闇の呟き",
    "maker": "広場のお告げ",
    "caption": "はおうの広場",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "とのさま広場",
    "csid": "changed",
    "face_id": "m08",
    "say_0": "じんろう？\u003Cbr\u003Eそんななまえのこ、いたかしら……",
    "say_1": "さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。",
    "_id": "changed_m08",
    "chr_set_id": "changed"
  }, {
    "_id": "changed_m05",
    "caption": "はおうの広場",
    "csid": "changed_m05",
    "face_id": "m05",
    "say_0": "ママ？ママなの？\u003Cbr\u003E…もう大丈夫なの？ここには人狼なんていないのかい？\u003Cbr\u003E\u003Cbr\u003E…そっかあ…\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E人狼だって？！",
    "say_1": "誰にも、腰抜けなんて…言わせないぞっ",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "b44",
    "job": "こあくとう",
    "_id": "changed_b44",
    "chr_set_id": "changed"
  }, {
    "face_id": "b49",
    "job": "いしく",
    "_id": "changed_b49",
    "chr_set_id": "changed"
  }, {
    "face_id": "m01",
    "job": "ようせい",
    "_id": "changed_m01",
    "chr_set_id": "changed"
  }, {
    "face_id": "m02",
    "job": "ようせい",
    "_id": "changed_m02",
    "chr_set_id": "changed"
  }, {
    "face_id": "m03",
    "job": "しょうぐん",
    "_id": "changed_m03",
    "chr_set_id": "changed"
  }, {
    "face_id": "m04",
    "job": "すくみず",
    "_id": "changed_m04",
    "chr_set_id": "changed"
  }, {
    "face_id": "m05",
    "job": "はおう",
    "_id": "changed_m05",
    "chr_set_id": "changed"
  }, {
    "face_id": "m06",
    "job": "きゅうていがか",
    "_id": "changed_m06",
    "chr_set_id": "changed"
  }, {
    "face_id": "m07",
    "job": "こひつじ",
    "_id": "changed_m07",
    "chr_set_id": "changed"
  }, {
    "face_id": "m08",
    "job": "おふくろのあじ",
    "_id": "changed_m08",
    "chr_set_id": "changed"
  }, {
    "face_id": "m09",
    "job": "しーさー",
    "_id": "changed_m09",
    "chr_set_id": "changed"
  }, {
    "face_id": "m10",
    "job": "ころぽっくる",
    "_id": "changed_m10",
    "chr_set_id": "changed"
  }, {
    "face_id": "m11",
    "job": "神聖騎士",
    "_id": "changed_m11",
    "chr_set_id": "changed"
  }, {
    "face_id": "m12",
    "job": "暗黒騎士",
    "_id": "changed_m12",
    "chr_set_id": "changed"
  }, {
    "face_id": "m13",
    "job": "調律師",
    "_id": "changed_m13",
    "chr_set_id": "changed"
  }, {
    "face_id": "m14",
    "job": "奇跡の子",
    "_id": "changed_m14",
    "chr_set_id": "changed"
  }, {
    "face_id": "m15",
    "job": "びじん",
    "_id": "changed_m15",
    "chr_set_id": "changed"
  }, {
    "face_id": "m16",
    "job": "りゅうきへい",
    "_id": "changed_m16",
    "chr_set_id": "changed"
  }, {
    "face_id": "m18",
    "job": "記号の妖精",
    "_id": "changed_m18",
    "chr_set_id": "changed"
  }, {
    "face_id": "m19",
    "job": "おひめさま",
    "_id": "changed_m19",
    "chr_set_id": "changed"
  }, {
    "face_id": "m20",
    "job": "げぼく",
    "_id": "changed_m20",
    "chr_set_id": "changed"
  }, {
    "face_id": "m99",
    "job": "かみさま",
    "_id": "changed_m99",
    "chr_set_id": "changed"
  }, {
    "face_id": "r30",
    "job": "ひとづかい",
    "_id": "changed_r30",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "all",
    "admin": "闇の呟き",
    "maker": "天のお告げ",
    "caption": "人狼議事 ちゃんぷる",
    "chr_set_id": "all"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "人狼議事 ちゃんぷる",
    "csid": "all",
    "face_id": "all",
    "say_0": "ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\u003Cbr\u003Eいたるところから…そう、地平の果てや、宇宙の彼方からも。\u003Cbr\u003E\u003Cbr\u003E中には、主様を消してくださるような方もいらっしゃるかもしれません。",
    "say_1": "皆さまお集まりありがとうございます。えー、ごほん。\u003Cbr\u003Eこの催し物、しっかりと楽しんでくださいませ。\u003Cbr\u003E\u003Cbr\u003E…何があっても、文句は言いませんよう、ご了承くださいませ。\u003Cbr\u003E",
    "_id": "all_all",
    "chr_set_id": "all"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "all",
    "job": "かみさま",
    "_id": "all_all",
    "chr_set_id": "all"
  }
]);

list = [];

order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school"];

_ref = Cache.faces.sort();
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  face = _ref[_i];
  chr_set_id = "all";
  face_id = face._id;
  _id = "all_" + face_id;
  faced_jobs = Cache.chr_jobs.where({
    face: [face_id]
  }).sort();
  if (faced_jobs != null) {
    job = (_ref1 = _.sortBy(faced_jobs, function(o) {
      return order.indexOf(o.chr_set_id);
    })) != null ? (_ref2 = _ref1.first) != null ? _ref2.job : void 0 : void 0;
  }
  if (job != null) {
    list.push({
      chr_set_id: chr_set_id,
      face_id: face_id,
      job: job,
      _id: _id
    });
  }
}

Cache.rule.chr_job.merge(list);
var GAME, RAILS;

RAILS = {
  "head_img": {
    "770": {
      "cinema": ["morning.png", "moon.png"],
      "wa": ["morning.png", "lupino.png"],
      "night": ["morning.png", "moon.png"],
      "star": ["morning.png", "lupino.png"],
      "juna": ["morning.png", "lupino.png"],
      "sow": ["morning.png", "lupino.png"]
    },
    "580": {
      "cinema": ["b.jpg", "w.jpg"],
      "wa": ["b.jpg", "w.jpg"],
      "night": ["b.jpg", "w.jpg"],
      "star": ["r.jpg", "c.jpg"],
      "juna": ["b.jpg", "w.jpg"],
      "sow": ["r.jpg", "c.jpg"]
    },
    "458": {
      "cinema": ["b.jpg", "w.jpg"],
      "wa": ["b.jpg", "w.jpg"],
      "night": ["b.jpg", "w.jpg"],
      "star": ["r.jpg", "c.jpg"],
      "juna": ["b.jpg", "w.jpg"],
      "sow": ["r.jpg", "c.jpg"]
    }
  },
  "rating": {
    "default": {
      "caption": "とくになし"
    },
    "love": {
      "caption": "[愛] 恋愛を重視",
      "alt": "愛"
    },
    "sexy": {
      "caption": "[性] 性表現あり",
      "alt": "性"
    },
    "sexylove": {
      "caption": "[性愛] 大人の恋愛",
      "alt": "性愛"
    },
    "violence": {
      "caption": "[暴] 暴力、グロ",
      "alt": "暴"
    },
    "sexyviolence": {
      "caption": "[性暴] えろぐろ",
      "alt": "性暴"
    },
    "teller": {
      "caption": "[怖] 恐怖を煽る",
      "alt": "怖"
    },
    "drunk": {
      "caption": "[楽] 享楽に耽る",
      "alt": "楽"
    },
    "gamble": {
      "caption": "[賭] 賭博に耽る",
      "alt": "賭"
    },
    "crime": {
      "caption": "[罪] 犯罪描写あり",
      "alt": "罪"
    },
    "drug": {
      "caption": "[薬] 薬物表現あり",
      "alt": "薬"
    },
    "word": {
      "caption": "[言] 殺伐、暴言あり",
      "alt": "言"
    },
    "fireplace": {
      "caption": "[暢] のんびり雑談",
      "alt": "暢"
    },
    "appare": {
      "caption": "[遖] あっぱれネタ風味",
      "alt": "遖"
    },
    "ukkari": {
      "caption": "[張] うっかりハリセン",
      "alt": "張"
    },
    "child": {
      "caption": "[全] 大人も子供も初心者も、みんな安心",
      "alt": "全"
    },
    "biohazard": {
      "caption": "[危] 無茶ぶり上等",
      "alt": "危"
    },
    "": {
      "caption": "null",
      "alt": ""
    },
    "0": {
      "caption": "0",
      "alt": ""
    },
    "r15": {
      "caption": "１５禁",
      "alt": ""
    },
    "r18": {
      "caption": "１８禁",
      "alt": ""
    },
    "gro": {
      "caption": "暴力、グロ",
      "alt": ""
    },
    "view": {
      "caption": "view"
    },
    "alert": {
      "caption": "要注意",
      "alt": ""
    }
  },
  "map_faces_orders": {
    "all": {
      "caption": "登場",
      "headline": "登場した",
      "order": "合計"
    },
    "human": {
      "caption": "村側",
      "headline": "人間だった",
      "order": "村人陣営"
    },
    "wolf": {
      "caption": "狼側",
      "headline": "人狼だった",
      "order": "人狼陣営"
    },
    "enemy": {
      "caption": "敵側",
      "headline": "敵側の人間だった",
      "order": "敵側の人間"
    },
    "pixi": {
      "caption": "妖精",
      "headline": "妖精だった",
      "order": "妖精"
    },
    "other": {
      "caption": "その他",
      "headline": "その他だった",
      "order": "その他"
    }
  },
  "options": {
    "seq-event": {
      "help": "事件が順序どおりに発生する"
    },
    "show-id": {
      "help": "ユーザーIDを公開する"
    },
    "entrust": {
      "help": "委任投票をする"
    },
    "select-role": {
      "help": "役職希望を受け付ける"
    },
    "random-target": {
      "help": "投票・能力の対象に「ランダム」を含める"
    },
    "undead-talk": {
      "help": "狼・妖精と死者との間で、会話ができる"
    },
    "aiming-talk": {
      "help": "ふたりだけの内緒話をすることができる"
    }
  },
  "roletable": {
    "secret": "詳細は黒幕だけが知っています。",
    "custom": "自由設定",
    "default": "標準",
    "hamster": "ハムスター",
    "mistery": "（なんだっけ？？？）",
    "random": "ランダム",
    "test1st": "人狼審問試験壱型",
    "test2nd": "人狼審問試験弐型",
    "ultimate": "アルティメット",
    "wbbs_c": "人狼BBS-C国",
    "wbbs_f": "人狼BBS-F国",
    "wbbs_g": "人狼BBS-G国",
    "lover": "恋愛天使"
  },
  "vote": {
    "sign": {
      "CAPTION": "記名で投票"
    },
    "anonymity": {
      "CAPTION": "匿名で投票"
    }
  },
  "mes_text": ["mes_text", "mes_text_monospace", "mes_text_report"],
  "monospace": {
    "mono": 1,
    "head": 2
  },
  "n_rule_name": ["短期はここではできない。", "情報ページ（ここ）を熟読する。", "ルールを守り、つねに心構えに気を配る。", "進行中は、どんな嘘でもＯＫ。", "ただし、（村建て人）、（管理人）の発言では嘘をつかないこと。", "突然死をしない。"],
  "switch": {
    "wolf": {
      "mestype": "WSAY"
    },
    "pixi": {
      "mestype": "XSAY"
    },
    "muppet": {
      "mestype": "SAY"
    },
    "sympathy": {
      "mestype": "SPSAY"
    }
  },
  "loves": {
    "love": {
      "win": "LOVER"
    },
    "hate": {
      "win": "HATER"
    }
  },
  "wins": {
    "MOB": {
      "name": "見物人"
    },
    "NONE": {
      "name": "その他"
    },
    "HUMAN": {
      "name": "村人陣営"
    },
    "WOLF": {
      "name": "人狼陣営"
    },
    "EVIL": {
      "name": "敵側の人間"
    },
    "GURU": {
      "name": "笛吹き"
    },
    "PIXI": {
      "name": "妖精"
    },
    "LONEWOLF": {
      "name": "一匹狼"
    },
    "LOVER": {
      "name": "恋人陣営"
    },
    "HATER": {
      "name": "邪気陣営"
    },
    "DISH": {
      "name": "据え膳"
    }
  },
  "groups": {
    "MOB": {
      "name": "見物人"
    },
    "OTHER": {
      "name": "その他"
    },
    "HUMAN": {
      "name": "村人陣営"
    },
    "WOLF": {
      "name": "人狼陣営"
    },
    "EVIL": {
      "name": "敵側の人間"
    },
    "PIXI": {
      "name": "妖精"
    }
  },
  "specials": {
    "mob": {
      "name": "見物人",
      "win": "MOB"
    }
  },
  "roles": {
    "mob": {
      "name": "見物人",
      "win": "MOB",
      "group": "OTHER"
    },
    "lover": {
      "name": "弟子",
      "win": null,
      "group": "OTHER"
    },
    "robber": {
      "name": "盗賊",
      "win": null,
      "group": "OTHER"
    },
    "tangle": {
      "name": "怨念",
      "win": null,
      "group": "OTHER"
    },
    "villager": {
      "name": "村人",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "stigma": {
      "name": "聖痕者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "fm": {
      "name": "結社員",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "sympathy": {
      "name": "共鳴者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "seer": {
      "name": "占い師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "seerwin": {
      "name": "信仰占師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "oura": {
      "name": "気占師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "aura": {
      "name": "気占師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "seerrole": {
      "name": "賢者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "guard": {
      "name": "守護者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "medium": {
      "name": "霊能者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "mediumwin": {
      "name": "信仰霊能者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "mediumrole": {
      "name": "導師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "necromancer": {
      "name": "降霊者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "follow": {
      "name": "追従者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "fan": {
      "name": "煽動者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "hunter": {
      "name": "賞金稼",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "weredog": {
      "name": "人犬",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "prince": {
      "name": "王子様",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "rightwolf": {
      "name": "狼血族",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "doctor": {
      "name": "医師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "curse": {
      "name": "呪人",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "dying": {
      "name": "預言者",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "invalid": {
      "name": "病人",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "alchemist": {
      "name": "錬金術師",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "witch": {
      "name": "魔女",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "girl": {
      "name": "少女",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "scapegoat": {
      "name": "生贄",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "elder": {
      "name": "長老",
      "win": "HUMAN",
      "group": "HUMAN"
    },
    "jammer": {
      "name": "邪魔之民",
      "win": "EVIL",
      "group": "EVIL"
    },
    "snatch": {
      "name": "宿借之民",
      "win": "EVIL",
      "group": "EVIL"
    },
    "bat": {
      "name": "念波之民",
      "win": "EVIL",
      "group": "EVIL"
    },
    "cpossess": {
      "name": "囁き狂人",
      "win": "EVIL",
      "group": "EVIL"
    },
    "possess": {
      "name": "狂人",
      "win": "EVIL",
      "group": "EVIL"
    },
    "fanatic": {
      "name": "狂信者",
      "win": "EVIL",
      "group": "EVIL"
    },
    "muppeting": {
      "name": "人形使い",
      "win": "EVIL",
      "group": "EVIL"
    },
    "wisper": {
      "name": "囁き狂人",
      "win": "EVIL",
      "group": "EVIL"
    },
    "semiwolf": {
      "name": "半狼",
      "win": "EVIL",
      "group": "EVIL"
    },
    "dyingpossess": {
      "name": "---",
      "win": "EVIL",
      "group": "EVIL"
    },
    "oracle": {
      "name": "魔神官",
      "win": "EVIL",
      "group": "EVIL"
    },
    "sorcerer": {
      "name": "魔術師",
      "win": "EVIL",
      "group": "EVIL"
    },
    "walpurgis": {
      "name": "魔法少年",
      "win": "EVIL",
      "group": "EVIL"
    },
    "headless": {
      "name": "首無騎士",
      "win": "WOLF",
      "group": "WOLF"
    },
    "wolf": {
      "name": "人狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "aurawolf": {
      "name": "---",
      "win": "WOLF",
      "group": "WOLF"
    },
    "intwolf": {
      "name": "智狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "cwolf": {
      "name": "呪狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "cursewolf": {
      "name": "呪狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "whitewolf": {
      "name": "白狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "childwolf": {
      "name": "仔狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "dyingwolf": {
      "name": "衰狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "silentwolf": {
      "name": "黙狼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "werebat": {
      "name": "コウモリ人間",
      "win": "PIXI",
      "group": "PIXI"
    },
    "hamster": {
      "name": "栗鼠妖精",
      "win": "PIXI",
      "group": "PIXI"
    },
    "mimicry": {
      "name": "擬狼妖精",
      "win": "PIXI",
      "group": "PIXI"
    },
    "dyingpixi": {
      "name": "風花妖精",
      "win": "PIXI",
      "group": "PIXI"
    },
    "trickster": {
      "name": "悪戯妖精",
      "win": "PIXI",
      "group": "PIXI"
    },
    "hatedevil": {
      "name": "邪気悪魔",
      "win": "HATER",
      "group": "OTHER"
    },
    "loveangel": {
      "name": "恋愛天使",
      "win": "LOVER",
      "group": "OTHER"
    },
    "passion": {
      "name": "片思い",
      "win": "LOVER",
      "group": "OTHER"
    },
    "lonewolf": {
      "name": "一匹狼",
      "win": "LONEWOLF",
      "group": "WOLF"
    },
    "guru": {
      "name": "笛吹き",
      "win": "GURU",
      "group": "OTHER"
    },
    "dish": {
      "name": "鱗魚人",
      "win": "DISH",
      "group": "OTHER"
    },
    "bitch": {
      "name": "遊び人",
      "win": "LOVER",
      "group": "OTHER"
    }
  },
  "gifts": {
    "none": {
      "name": "",
      "win": null,
      "group": null
    },
    "lost": {
      "name": "喪失",
      "win": null,
      "group": "OTHER"
    },
    "bind": {
      "name": "---",
      "win": null,
      "group": null
    },
    "shield": {
      "name": "光の輪",
      "win": null,
      "group": "OTHER"
    },
    "glass": {
      "name": "魔鏡",
      "win": null,
      "group": "OTHER"
    },
    "ogre": {
      "name": "悪鬼",
      "win": "WOLF",
      "group": "WOLF"
    },
    "fairy": {
      "name": "妖精の子",
      "win": "PIXI",
      "group": "PIXI"
    },
    "fink": {
      "name": "半端者",
      "win": "EVIL",
      "group": "EVIL"
    },
    "decide": {
      "name": "決定者",
      "win": null,
      "group": "OTHER"
    },
    "seeronce": {
      "name": "夢占師",
      "win": null,
      "group": "OTHER"
    },
    "dipsy": {
      "name": "酔払い",
      "win": null,
      "group": "OTHER"
    }
  },
  "events": {
    "nothing": {
      "name": "普通の日"
    },
    "aprilfool": {
      "name": "四月馬鹿"
    },
    "turnfink": {
      "name": "二重スパイ"
    },
    "turnfairy": {
      "name": "妖精の輪"
    },
    "eclipse": {
      "name": "日蝕"
    },
    "cointoss": {
      "name": "Sir Cointoss"
    },
    "force": {
      "name": "影響力"
    },
    "miracle": {
      "name": "奇跡"
    },
    "prophecy": {
      "name": "聖者のお告げ"
    },
    "clamor": {
      "name": "不満"
    },
    "fire": {
      "name": "熱意"
    },
    "nightmare": {
      "name": "悪夢"
    },
    "ghost": {
      "name": "亡霊"
    },
    "escape": {
      "name": "逃亡"
    },
    "seance": {
      "name": "降霊会"
    }
  },
  "maskstates": {
    "268435200": null,
    "1024": "投票対象外",
    "512": "恩恵対象外",
    "256": "能力対象外",
    "64": "感染",
    "32": "負傷",
    "8": "\u003Cs\u003E投票\u003C/s\u003E",
    "7": "\u003Cs\u003E全能力\u003C/s\u003E",
    "4": "\u003Cs\u003E恩恵\u003C/s\u003E",
    "3": "\u003Cs\u003E能力\u003C/s\u003E",
    "2": "\u003Cs\u003E毒薬\u003C/s\u003E",
    "1": "\u003Cs\u003E蘇生薬\u003C/s\u003E"
  },
  "live": {
    "live": "生存者",
    "executed": "処刑",
    "victim": "襲撃",
    "cursed": "呪詛",
    "droop": "衰退",
    "suicide": "後追",
    "feared": "恐怖",
    "suddendead": "突然死",
    "mob": "見物人"
  },
  "live_caption": {
    "live": "生存者",
    "executed": "処刑",
    "victim": "犠牲者",
    "cursed": "犠牲者",
    "droop": "犠牲者",
    "suicide": "犠牲者",
    "feared": "犠牲者",
    "suddendead": "突然死",
    "mob": "見物人"
  },
  "mob": {
    "visiter": {
      "CAPTION": "客席",
      "HELP": "進行中会話は客席同士のみ"
    },
    "grave": {
      "CAPTION": "裏方",
      "HELP": "進行中会話は墓下と"
    },
    "alive": {
      "CAPTION": "舞台",
      "HELP": "進行中会話は地上、墓下、両方と"
    },
    "juror": {
      "CAPTION": "陪審",
      "HELP": "進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"
    },
    "gamemaster": {
      "CAPTION": "黒幕",
      "HELP": "進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"
    }
  },
  "game_rule": {
    "TABULA": {
      "CAPTION": "タブラの人狼",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、ランダムに処刑する。\n\u003Cli\u003E狼を全滅させると、村勝利。\n\u003Cli\u003E人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"
    },
    "MILLERHOLLOW": {
      "CAPTION": "ミラーズホロウ",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、処刑をとりやめる。\n\u003Cli\u003Eすべての死者は役職が公開される。\n\u003Cli\u003E狼を全滅させると、村勝利。\n\u003Cli\u003E「村人」を全滅させると、狼勝利。\u003Cbr\u003E役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"
    },
    "LIVE_TABULA": {
      "CAPTION": "タブラの人狼（死んだら負け）",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、ランダムに処刑する。\n\u003Cli\u003E狼を全滅させると、村側の生存者が勝利。\n\u003Cli\u003E人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n\u003Cli\u003Eただし、仲間が勝利していても、死んでしまった者は敗北である。\n"
    },
    "LIVE_MILLERHOLLOW": {
      "CAPTION": "ミラーズホロウ（死んだら負け）",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、処刑をとりやめる。\n\u003Cli\u003E狼を全滅させると、村側の生存者が勝利。\n\u003Cli\u003E「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n\u003Cli\u003Eただし、仲間が勝利していても、死んでしまった者は敗北である。\n"
    },
    "TROUBLE": {
      "CAPTION": "Trouble☆Aliens",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、ランダムに処刑する。\n\u003Cli\u003E人狼は会話できない。襲撃候補リストで判断できない。\n\u003Cli\u003E襲撃先は翌日、犠牲候補と人狼に開示される。\n\u003Cli\u003E守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n\u003Cli\u003E１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n\u003Cli\u003E狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n\u003Cli\u003E人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"
    },
    "MISTERY": {
      "CAPTION": "深い霧の夜",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、ランダムに処刑する。\n\u003Cli\u003E村側は自分の役職を自覚しない。\n\u003Cli\u003E村側は、能力の結果不審者を見かけることがある。\n\u003Cli\u003E人狼の行動対象に選ばれると、不審者を見かける。\n\u003Cli\u003E狼を全滅させると、村勝利。\n\u003Cli\u003E役職「村人」を全滅させると、狼勝利。\u003Cbr\u003E役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"
    },
    "VOV": {
      "CAPTION": "狂犬病の谷",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、ランダムに処刑する。\n\u003Cli\u003E１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n\u003Cli\u003E狼を全滅させると、村勝利。\n\u003Cli\u003E人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"
    },
    "SECRET": {
      "CAPTION": "陰謀に集う胡蝶",
      "HELP": "\u003Cli\u003E同数票の処刑候補が複数いた場合、ランダムに処刑する。\n\u003Cli\u003E人狼は会話できない。襲撃候補リストで判断できない。\n\u003Cli\u003E襲撃先は翌日、犠牲候補と人狼に開示される。\n\u003Cli\u003E狼を全滅させると、村側の生存者が勝利。\n\u003Cli\u003E人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n\u003Cli\u003Eいかなる場合も、死んでしまったものは敗北である。\n"
    }
  },
  "trs": {
    "all": {
      "CAPTION": "オール☆スター",
      "HELP": "すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。また、進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。"
    },
    "simple": {
      "CAPTION": "ラッキー☆スター",
      "HELP": "初心者向けの、シンプルな設定です。拡張設定の一部が固定になっています。"
    },
    "star": {
      "CAPTION": "Orbital☆Star",
      "HELP": "すべての役職、恩恵、事件を楽しむことができます。また、進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。\u003Cbr\u003E宇宙時代に突入した「全部入り」のセットです。村落共同体は渓谷や高原ではなく、小惑星帯や人工コロニー、移民船にあるでしょう。事件が始まるまでは、とても充実した近代的なインフラが整っていたのですが……"
    },
    "regend": {
      "CAPTION": "議事☆伝承",
      "HELP": "すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。アクション内容は穏当になり、未来的ですばらしいクローンも居ません。"
    },
    "fool": {
      "CAPTION": "適当系",
      "HELP": "てきとーな感じ。"
    },
    "sow": {
      "CAPTION": "人狼物語",
      "HELP": "ウェブゲーム「人狼物語」風の役職を楽しめます。ただし、細かい動作に違いがあります。"
    },
    "wbbs": {
      "CAPTION": "人狼BBS",
      "HELP": "ウェブゲーム「人狼BBS」風の役職を楽しめます。ただし、細かい動作に違いがあります。"
    },
    "juna": {
      "CAPTION": "人狼審問",
      "HELP": "ウェブゲーム「人狼審問」風の役職を楽しめます。ただし、細かい動作に違いがあります。"
    },
    "complex": {
      "CAPTION": "PARANOIA",
      "HELP": "ようこそ、トラブルシューター。市民達は進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。\u003Cbr\u003E！注意！　入村直後の市民はクローンではありません。ただちに別れを告げてあげましょう。　！注意！"
    },
    "complexx": {
      "CAPTION": "ParanoiA",
      "HELP": "ようこそ、トラブルシューター。市民達は進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。\u003Cbr\u003E！注意！　入村直後の市民はクローンではありません。ただちに別れを告げてあげましょう。　！注意！"
    },
    "cabala": {
      "CAPTION": "ギロチン広場",
      "HELP": "権謀術数を弄び、虚実まじえた会話を楽しむためのセットです。"
    },
    "tabula": {
      "CAPTION": "タブラの人狼",
      "HELP": "カードゲーム「Lupus in Tabula」風の役職を楽しめます。ただし、疫病神、公証人、悪魔くん、には対応していません。"
    },
    "millerhollow": {
      "CAPTION": "ミラーズホロウ",
      "HELP": "カードゲーム「The Werewolves of Millers Hollow + New Moon」風の役職を楽しめます。ただし、愚か者には対応していません。守護者、笛吹きにすこし違いがあります。"
    },
    "ultimate": {
      "CAPTION": "アルティメット",
      "HELP": "カードゲーム「アルティメット人狼」風の役職を楽しめます。ただし、ドワーフ、ドッペルゲンガー、アル中、愚か者、倫理学者には対応していません。"
    }
  },
  "saycnt": {
    "sow": {
      "CAPTION": "人狼物語",
      "HELP": null
    },
    "say5": {
      "CAPTION": "寡黙への挑戦",
      "COST_SAY": "count",
      "COST_MEMO": "none",
      "COST_ACT": "count",
      "RECOVERY": 1,
      "MAX_SAY": 5,
      "MAX_TSAY": 5,
      "MAX_SPSAY": 5,
      "MAX_WSAY": 10,
      "MAX_GSAY": 10,
      "MAX_PSAY": 10,
      "MAX_ESAY": 999,
      "MAX_SAY_ACT": 5,
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "MAX_MESLINE": 10
    },
    "point": {
      "COST_SAY": "point",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "MAX_ESAY": 9999
    },
    "count": {
      "COST_SAY": "count",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0
    },
    "lobby": {
      "CAPTION": "ロビー",
      "HELP": "∞pt/∞act",
      "COST_SAY": "none",
      "COST_MEMO": "none",
      "COST_ACT": "none",
      "RECOVERY": 1,
      "MAX_SAY": 9999,
      "MAX_TSAY": 9999,
      "MAX_SPSAY": 9999,
      "MAX_WSAY": 9999,
      "MAX_GSAY": 9999,
      "MAX_PSAY": 9999,
      "MAX_ESAY": 9999,
      "MAX_SAY_ACT": 99,
      "ADD_SAY": 9999,
      "MAX_ADDSAY": 0,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    },
    "say5x200": {
      "CAPTION": "寡黙への挑戦",
      "COST_SAY": "count",
      "COST_MEMO": "none",
      "COST_ACT": "count",
      "RECOVERY": 1,
      "MAX_SAY": 5,
      "MAX_TSAY": 5,
      "MAX_SPSAY": 5,
      "MAX_WSAY": 10,
      "MAX_GSAY": 10,
      "MAX_PSAY": 10,
      "MAX_ESAY": 999,
      "MAX_SAY_ACT": 5,
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "MAX_MESLINE": 10,
      "HELP": "（24h回復） 200字x5回/5act'",
      "MAX_MESCNT": 200
    },
    "say5x300": {
      "CAPTION": "小論文への挑戦",
      "COST_SAY": "count",
      "COST_MEMO": "none",
      "COST_ACT": "count",
      "RECOVERY": 1,
      "MAX_SAY": 5,
      "MAX_TSAY": 5,
      "MAX_SPSAY": 5,
      "MAX_WSAY": 10,
      "MAX_GSAY": 10,
      "MAX_PSAY": 10,
      "MAX_ESAY": 999,
      "MAX_SAY_ACT": 5,
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "MAX_MESLINE": 10,
      "HELP": "（24h回復） 300字x5回/15act'",
      "MAX_MESCNT": 300
    },
    "saving": {
      "COST_SAY": "count",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "CAPTION": "節約",
      "HELP": "250字x20回/15act",
      "RECOVERY": 0,
      "MAX_SAY": 20,
      "MAX_TSAY": 10,
      "MAX_SPSAY": 10,
      "MAX_WSAY": 30,
      "MAX_GSAY": 20,
      "MAX_PSAY": 20,
      "MAX_ESAY": 999,
      "MAX_SAY_ACT": 15,
      "MAX_MESCNT": 250,
      "MAX_MESLINE": 10
    },
    "wbbs": {
      "COST_SAY": "count",
      "COST_MEMO": "none",
      "COST_ACT": "count",
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "CAPTION": "人狼BBS",
      "HELP": "200字x20回",
      "RECOVERY": 0,
      "MAX_SAY": 20,
      "MAX_TSAY": 5,
      "MAX_SPSAY": 20,
      "MAX_WSAY": 40,
      "MAX_GSAY": 20,
      "MAX_PSAY": 20,
      "MAX_ESAY": 999,
      "MAX_SAY_ACT": 0,
      "MAX_MESCNT": 200,
      "MAX_MESLINE": 5
    },
    "euro": {
      "COST_SAY": "count",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "CAPTION": "欧州",
      "HELP": "（24h回復） 800字x30回/30act",
      "RECOVERY": 1,
      "MAX_SAY": 30,
      "MAX_TSAY": 999,
      "MAX_SPSAY": 999,
      "MAX_WSAY": 999,
      "MAX_GSAY": 999,
      "MAX_PSAY": 30,
      "MAX_ESAY": 999,
      "MAX_SAY_ACT": 30,
      "MAX_MESCNT": 800,
      "MAX_MESLINE": 20
    },
    "tiny": {
      "COST_SAY": "point",
      "COST_MEMO": "point",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "たりない",
      "HELP": "（24h回復）（メモは20pt） 333pt/9act",
      "RECOVERY": 1,
      "MAX_SAY": 333,
      "MAX_TSAY": 999,
      "MAX_SPSAY": 333,
      "MAX_WSAY": 999,
      "MAX_GSAY": 999,
      "MAX_PSAY": 999,
      "MAX_SAY_ACT": 9,
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "MAX_MESCNT": 300,
      "MAX_MESLINE": 10
    },
    "weak": {
      "COST_SAY": "point",
      "COST_MEMO": "point",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "むりせず",
      "HELP": "（24h回復）（メモは20pt） 777pt/15act",
      "RECOVERY": 1,
      "MAX_SAY": 777,
      "MAX_TSAY": 777,
      "MAX_SPSAY": 777,
      "MAX_WSAY": 999,
      "MAX_GSAY": 999,
      "MAX_PSAY": 1200,
      "MAX_SAY_ACT": 15,
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "MAX_MESCNT": 600,
      "MAX_MESLINE": 15
    },
    "juna": {
      "COST_SAY": "point",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "しんもん",
      "HELP": "（24h回復） 1200pt/24act",
      "RECOVERY": 1,
      "MAX_SAY": 1200,
      "MAX_TSAY": 700,
      "MAX_SPSAY": 700,
      "MAX_WSAY": 3000,
      "MAX_GSAY": 2000,
      "MAX_PSAY": 2000,
      "MAX_SAY_ACT": 24,
      "ADD_SAY": 0,
      "MAX_ADDSAY": 0,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    },
    "vulcan": {
      "COST_SAY": "point",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "いっぱい",
      "HELP": "（24h回復） 1000pt+++300pt/36act",
      "RECOVERY": 1,
      "MAX_SAY": 1000,
      "MAX_TSAY": 1000,
      "MAX_SPSAY": 1500,
      "MAX_WSAY": 4000,
      "MAX_GSAY": 3000,
      "MAX_PSAY": 3000,
      "MAX_SAY_ACT": 36,
      "ADD_SAY": 300,
      "MAX_ADDSAY": 3,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    },
    "infinity": {
      "CAPTION": "むげん",
      "HELP": "∞pt/∞act",
      "COST_SAY": "none",
      "COST_MEMO": "none",
      "COST_ACT": "none",
      "RECOVERY": 1,
      "MAX_SAY": 9999,
      "MAX_TSAY": 9999,
      "MAX_SPSAY": 9999,
      "MAX_WSAY": 9999,
      "MAX_GSAY": 9999,
      "MAX_PSAY": 9999,
      "MAX_ESAY": 9999,
      "MAX_SAY_ACT": 99,
      "ADD_SAY": 9999,
      "MAX_ADDSAY": 0,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    },
    "weak_braid": {
      "COST_SAY": "point",
      "COST_MEMO": "point",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "むりせず",
      "HELP": "（24h回復）（メモは20pt） 600pt++100pt/15act",
      "RECOVERY": 1,
      "MAX_SAY": 600,
      "MAX_TSAY": 600,
      "MAX_SPSAY": 600,
      "MAX_WSAY": 999,
      "MAX_GSAY": 999,
      "MAX_PSAY": 1200,
      "MAX_SAY_ACT": 15,
      "ADD_SAY": 100,
      "MAX_ADDSAY": 2,
      "MAX_MESCNT": 600,
      "MAX_MESLINE": 15
    },
    "juna_braid": {
      "COST_SAY": "point",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "しんもん",
      "HELP": "（24h回復） 800pt++200pt/24act",
      "RECOVERY": 1,
      "MAX_SAY": 800,
      "MAX_TSAY": 700,
      "MAX_SPSAY": 700,
      "MAX_WSAY": 3000,
      "MAX_GSAY": 2000,
      "MAX_PSAY": 2000,
      "MAX_SAY_ACT": 24,
      "ADD_SAY": 200,
      "MAX_ADDSAY": 2,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    },
    "vulcan_braid": {
      "COST_SAY": "point",
      "COST_MEMO": "count",
      "COST_ACT": "count",
      "MAX_ESAY": 9999,
      "CAPTION": "いっぱい",
      "HELP": "（24h回復） 1000pt+++300pt/36act",
      "RECOVERY": 1,
      "MAX_SAY": 1000,
      "MAX_TSAY": 1000,
      "MAX_SPSAY": 1500,
      "MAX_WSAY": 4000,
      "MAX_GSAY": 3000,
      "MAX_PSAY": 3000,
      "MAX_SAY_ACT": 36,
      "ADD_SAY": 300,
      "MAX_ADDSAY": 3,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    },
    "infinity_braid": {
      "CAPTION": "むげん",
      "HELP": "∞pt/∞act",
      "COST_SAY": "none",
      "COST_MEMO": "none",
      "COST_ACT": "none",
      "RECOVERY": 1,
      "MAX_SAY": 9999,
      "MAX_TSAY": 9999,
      "MAX_SPSAY": 9999,
      "MAX_WSAY": 9999,
      "MAX_GSAY": 9999,
      "MAX_PSAY": 9999,
      "MAX_ESAY": 9999,
      "MAX_SAY_ACT": 99,
      "ADD_SAY": 9999,
      "MAX_ADDSAY": 0,
      "MAX_MESCNT": 1000,
      "MAX_MESLINE": 20
    }
  },
  "log": {
    "anchor": {
      "q": null,
      "m": "#",
      "a": "%",
      "S": "",
      "T": "-",
      "W": "*",
      "G": "+",
      "P": "=",
      "X": "!",
      "V": "@"
    },
    "mestypetext": [null, null, "【管理人削除】", null, null, null, "【未確】", null, "【削除】", "【人】", "【独】", "【赤】", "【墓】", "【鳴】", "【念】", "【見】", "【憑】", null, null, null],
    "font": [null, null, "color=\"gray\"", null, null, null, null, null, "color=\"gray\"", null, "color=\"gray\"", "color=\"red\"", "color=\"teal\"", "color=\"blue\"", "color=\"green\"", "color=\"maroon\"", null, "color=\"purple\"", null, "color=\"red\""]
  }
};

GAME = {
  "PERL_DEFAULT": {
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "path": {
        "DIR_LIB": "../cabala/lib",
        "DIR_HTML": "../cabala/html",
        "DIR_RS": "../cabala/rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [0, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      }
    }
  },
  "PERL_NEW": {
    "config": {
      "trsid": ["all", "star", "regend", "heavy", "complexx", "secret"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"]
    }
  },
  "PERL_GAME": {
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      }
    }
  },
  "PERL_UNION": {
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "wbbs", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "cfg": {
        "TYPE": "CABALA",
        "RULE": "UNION",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 3,
        "TIMEOUT_SCRAP": 10,
        "TOPPAGE_INFO": "../sow/_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp"
      }
    }
  },
  "PERL_BRAID": {
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "vulcan"],
      "game": ["TABULA", "MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [0, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "BRAID",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp"
      }
    }
  },
  "TESTBED": {
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "say5x200", "say5x300", "wbbs", "saving", "euro", "vulcan", "infinity"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
      "path": {
        "DIR_LIB": "../testbed/lib",
        "DIR_HTML": "../testbed/html",
        "DIR_RS": "../testbed/rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "cfg": {
        "TYPE": "CABALA",
        "RULE": "ALLSTAR",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 1,
        "TIMEOUT_SCRAP": 1,
        "TOPPAGE_INFO": "../sow/_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://utage.family.jp/testbed",
        "BASEDIR_CGIERR": "http://utage.family.jp//testbed",
        "NAME_HOME": "人狼議事 手元テスト",
        "MAX_VILLAGES": 9
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [0, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      },
      "pl": "/www/giji_log/testbed/config.pl"
    }
  },
  "PERJURY_OLD": {
    "server": "utage.family.jp",
    "oldlog": "/perjury/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/perjury/sow.cgi?cmd=rss",
    "folder": "PERJURY_OLD",
    "info_url": "/perjury/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:Bp",
    "epi_url": "/perjury/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "Bp",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "vulcan"],
      "game": ["TABULA", "MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [0, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "CABALA",
        "RULE": "BRAID",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 0,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "../sow/_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://utage.family.jp/perjury",
        "BASEDIR_CGIERR": "http://utage.family.jp//perjury",
        "NAME_HOME": "人狼議事 Role Play braid perjury",
        "MAX_VILLAGES": 0
      },
      "path": {
        "DIR_LIB": "../cabala/lib",
        "DIR_HTML": "../cabala/html",
        "DIR_RS": "../cabala/rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "pl": "/www/giji_log/perjury/config.pl"
    }
  },
  "PRETENSE": {
    "server": "utage.family.jp",
    "oldlog": "/pretense/sow.cgi?cmd=oldlog\u0026rowall=on",
    "folder": "PRETENSE",
    "info_url": "/pretense/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:A",
    "epi_url": "/pretense/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "A"
  },
  "RP": {
    "server": "utage.family.jp",
    "oldlog": "/rp/sow.cgi?cmd=oldlog\u0026rowall=on",
    "folder": "RP",
    "info_url": "/rp/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:",
    "epi_url": "/rp/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": ""
  },
  "CABALA_OLD": {
    "server": "utage.family.jp",
    "oldlog": "/cabala/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/cabala/sow.cgi?cmd=rss",
    "folder": "CABALA",
    "info_url": "/cabala/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事陰謀:",
    "epi_url": "/cabala/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "C",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "path": {
        "DIR_LIB": "../cabala/lib",
        "DIR_HTML": "../cabala/html",
        "DIR_RS": "../cabala/rs",
        "DIR_VIL": "../cafe/data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "CABALA",
        "RULE": "CABALA",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 3,
        "TIMEOUT_SCRAP": 10,
        "TOPPAGE_INFO": "../sow/_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://utage.family.jp/cabala",
        "BASEDIR_CGIERR": "http://utage.family.jp//cabala",
        "NAME_HOME": "人狼議事 陰謀の苑",
        "MAX_VILLAGES": 0
      },
      "pl": "/www/giji_log/cabala/config.pl"
    }
  },
  "ALLSTAR_OLD": {
    "server": "utage.family.jp",
    "oldlog": "/allstar/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/allstar/sow.cgi?cmd=rss",
    "folder": "ALLSTAR",
    "info_url": "/allstar/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事大乱闘:A",
    "epi_url": "/allstar/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "A",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "wbbs", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
      "path": {
        "DIR_LIB": "../cabala/lib",
        "DIR_HTML": "../cabala/html",
        "DIR_RS": "../cabala/rs",
        "DIR_VIL": "../jksy/data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "cfg": {
        "TYPE": "CABALA",
        "RULE": "ALLSTAR",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 3,
        "TIMEOUT_SCRAP": 10,
        "TOPPAGE_INFO": "../sow/_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://utage.family.jp/allstar",
        "BASEDIR_CGIERR": "http://utage.family.jp//allstar",
        "NAME_HOME": "人狼議事 大乱闘オールスター",
        "MAX_VILLAGES": 0
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      },
      "pl": "/www/giji_log/allstar/config.pl"
    }
  },
  "ULTIMATE": {
    "server": "utage.family.jp",
    "oldlog": "/ultimate/sow.cgi?cmd=oldlog\u0026rowall=on",
    "folder": "ULTIMATE",
    "info_url": "/ultimate/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事大乱闘:",
    "epi_url": "/ultimate/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": ""
  },
  "WOLF": {
    "folder": "WOLF",
    "nation": "人狼議事標準:",
    "server": "utage.family.jp",
    "oldlog": "/wolf/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/wolf/sow.cgi?cmd=rss",
    "info_url": "/wolf/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "epi_url": "/wolf/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": ""
  },
  "PAN": {
    "server": "soy-bean.sakura.ne.jp",
    "oldlog": "/pan/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/pan/sow.cgi?cmd=rss",
    "folder": "PAN",
    "info_url": "/pan/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "似顔絵人狼",
    "epi_url": "/pan/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "config": {
      "csid": ["sow", "juna", "name", "bloody", "orange", "15girls", "tmmi", "cat", "bunmei"],
      "erb": "./app/views/sow/pan.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "wbbs", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "./data/user"
      },
      "cfg": {
        "TYPE": "CABALA",
        "RULE": "PAN",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 3,
        "TIMEOUT_SCRAP": 10,
        "TOPPAGE_INFO": "../sow/_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://soy-bean.sakura.ne.jp/pan",
        "BASEDIR_CGIERR": "http://soy-bean.sakura.ne.jp/pan//",
        "NAME_HOME": "似顔絵人狼",
        "MAX_VILLAGES": 1
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [0, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"],
        "ENABLED_SEQ_EVENT": [0, "0:ランダムイベント 1:順序通りのイベント"]
      },
      "pl": "/www/giji_log/pan/config.pl",
      "is_angular": "show-fix"
    }
  },
  "MORPHE": {
    "server": "morphe.sakura.ne.jp",
    "oldlog": "/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/sow.cgi?cmd=rss",
    "folder": "MORPHE",
    "info_url": "/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事:M",
    "epi_url": "/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "M",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "vulcan", "say5x200", "say5x300", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "./data/user"
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "MORPHE",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://morphe.sakura.ne.jp/morphe",
        "BASEDIR_CGIERR": "http://morphe.sakura.ne.jp/morphe//",
        "NAME_HOME": "人狼議事 夢の形",
        "MAX_VILLAGES": 4
      },
      "pl": "/www/giji_log/morphe/config.pl"
    }
  },
  "SOYBEAN": {
    "server": "soy-bean.sakura.ne.jp",
    "oldlog": "/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/sow.cgi?cmd=rss",
    "folder": "SOYBEAN",
    "info_url": "/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:Cs",
    "epi_url": "/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "Bs",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "vulcan", "infinity"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["all", "star", "regend", "heavy", "complexx", "secret"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"],
        "ENABLED_SEQ_EVENT": [1, "1:事件正順の選択を有効にする。"],
        "ENABLED_TEST_ROLE": [1, "1:テスト中役職を有効にする。"]
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "BRAID",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://soy-bean.sakura.ne.jp/soy-bean",
        "BASEDIR_CGIERR": "http://soy-bean.sakura.ne.jp/soy-bean//",
        "NAME_HOME": "人狼議事 鯖の味噌煮",
        "MAX_VILLAGES": 2
      },
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "./data/user"
      },
      "pl": "/www/giji_log/soy-bean/config.pl",
      "is_angular": "show-fix"
    }
  },
  "CIEL": {
    "server": "ciel.moo.jp",
    "oldlog": "/cheat/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/cheat/sow.cgi?cmd=rss",
    "folder": "CIEL",
    "info_url": "/cheat/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:Cc",
    "epi_url": "/cheat/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "Cc",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "vulcan", "infinity"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["all", "star", "regend", "heavy", "complexx", "secret"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [0, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "CHEAT",
        "RULE": "CIEL",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "BASEDIR_CGIERR": "http://ciel.moo.jp//cheat",
        "URL_SW": "http://ciel.moo.jp/cheat",
        "MAX_VILLAGES": 2,
        "NAME_HOME": "人狼議事 ciel\u003Cbr\u003E- Role Play Cheat -"
      },
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "./data/user"
      },
      "pl": "/www/giji_log/ciel/config.pl",
      "is_angular": "show-fix"
    }
  },
  "PERJURY": {
    "server": "perjury.rulez.jp",
    "oldlog": "/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/sow.cgi?cmd=rss",
    "folder": "PERJURY",
    "info_url": "/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:Cp",
    "epi_url": "/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "Bp",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "vulcan", "infinity"],
      "game": ["TABULA", "MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [0, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "CHEAT",
        "RULE": "PERJURY",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "BASEDIR_CGIERR": "http://perjury.rulez.jp//",
        "URL_SW": "http://perjury.rulez.jp",
        "MAX_VILLAGES": 2,
        "NAME_HOME": "人狼議事 perjury rulez\u003Cbr\u003E- Role Play Cheat -"
      },
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "pl": "/www/giji_log/vage/config.pl",
      "is_angular": "show-fix"
    }
  },
  "XEBEC": {
    "server": "xebec.x0.to",
    "oldlog": "/xebec/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/xebec/sow.cgi?cmd=rss",
    "folder": "XEBEC",
    "info_url": "/xebec/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:Bx",
    "epi_url": "/xebec/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "Bx",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["weak", "juna", "vulcan"],
      "game": ["TABULA", "MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [0, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "BRAID",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://xebec.x0.to/xebec",
        "BASEDIR_CGIERR": "http://xebec.x0.to//xebec",
        "NAME_HOME": "人狼議事 xebec\u003Cbr\u003E- Role Play braid -",
        "MAX_VILLAGES": 3
      },
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "pl": "/www/giji_log/xebec/config.pl"
    }
  },
  "CRAZY": {
    "server": "crazy-crazy.sakura.ne.jp",
    "oldlog": "/crazy/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/crazy/sow.cgi?cmd=rss",
    "folder": "CRAZY",
    "info_url": "/crazy/sow.cgi?\\ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事RP:Bc",
    "epi_url": "/crazy/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "Bc",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "演",
      "maxsize": {
        "MAXSIZE_ACTION": 120,
        "MAXSIZE_MEMOCNT": 2000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["infinity"],
      "game": ["TABULA", "MILLERHOLLOW", "TROUBLE", "MISTERY"],
      "trsid": ["all", "star", "regend", "heavy", "complexx"],
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [0, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [0, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [0, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [1, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [0, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [0, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "BRAID",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://crazy-crazy.sakura.ne.jp/crazy",
        "BASEDIR_CGIERR": "http://crazy-crazy.sakura.ne.jp//crazy",
        "NAME_HOME": "人狼議事 crazy\u003Cbr\u003E- Role Play braid -",
        "MAX_VILLAGES": 2
      },
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "./data/user"
      },
      "pl": "/www/giji_log/crazy/config.pl"
    }
  },
  "CABALA": {
    "server": "cabala.halfmoon.jp",
    "oldlog": "/cafe/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/cafe/sow.cgi?cmd=rss",
    "folder": "CABALA",
    "info_url": "/cafe/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事CabalaCafe:",
    "epi_url": "/cafe/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "C",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["all", "star", "regend", "heavy", "complexx", "secret"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "CABALA",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 1,
        "TIMEOUT_ENTRY": 2,
        "TIMEOUT_SCRAP": 5,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://cabala.halfmoon.jp/cafe",
        "BASEDIR_CGIERR": "http://cabala.halfmoon.jp//cafe",
        "NAME_HOME": "人狼議事 Cabala Cafe",
        "MAX_VILLAGES": 4
      },
      "pl": "/www/giji_log/cafe/config.pl",
      "is_angular": "show-fix"
    }
  },
  "ALLSTAR": {
    "server": "jinro.jksy.org",
    "oldlog": "/~nanakorobi?cmd=oldlog\u0026rowall=on",
    "livelog": "/~nanakorobi?cmd=rss",
    "folder": "ALLSTAR",
    "info_url": "/~nanakorobi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事大乱闘:A",
    "epi_url": "/~nanakorobi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "A",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["tiny", "weak", "juna", "say5x200", "say5x300", "wbbs", "saving", "euro"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../sow/data/user"
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "ALLSTAR",
        "USERID_NPC": "master",
        "USERID_ADMIN": "admin",
        "ENABLED_VMAKE": 0,
        "TIMEOUT_ENTRY": 3,
        "TIMEOUT_SCRAP": 10,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://jinro.jksy.org/~nanakorobi",
        "BASEDIR_CGIERR": "http://jinro.jksy.org//~nanakorobi",
        "NAME_HOME": "人狼議事 大乱闘All☆Star",
        "MAX_VILLAGES": 4
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [1, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [0, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"]
      },
      "pl": "/www/giji_log/jksy/config.pl"
    }
  },
  "LOBBY_OLD": {
    "folder": "LOBBY_OLD",
    "nation": "人狼議事旧ロビー",
    "vid_code": "O"
  },
  "LOBBY": {
    "server": "crazy-crazy.sakura.ne.jp",
    "oldlog": "/giji_lobby/lobby/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/giji_lobby/lobby/sow.cgi?cmd=rss",
    "folder": "LOBBY",
    "info_url": "/giji_lobby/lobby/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事ロビー",
    "epi_url": "/giji_lobby/lobby/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "L",
    "config": {
      "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
      "erb": "./app/views/sow/giji.pl.erb",
      "cd_default": "戦",
      "maxsize": {
        "MAXSIZE_ACTION": 60,
        "MAXSIZE_MEMOCNT": 1000,
        "MAXSIZE_MEMOLINE": 25
      },
      "saycnt": ["lobby"],
      "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
      "trsid": ["all", "star", "regend", "heavy", "complexx", "secret"],
      "path": {
        "DIR_LIB": "./lib",
        "DIR_HTML": "./html",
        "DIR_RS": "./rs",
        "DIR_VIL": "./data/vil",
        "DIR_USER": "../data/user"
      },
      "cfg": {
        "TYPE": "BRAID",
        "RULE": "LOBBY",
        "USERID_NPC": "master",
        "USERID_ADMIN": "master",
        "ENABLED_VMAKE": 0,
        "TIMEOUT_ENTRY": 3,
        "TIMEOUT_SCRAP": 365,
        "TOPPAGE_INFO": "./_info.pl",
        "BASEDIR_CGI": ".",
        "BASEDIR_DAT": "./data",
        "BASEDIR_DOC": "http://7korobi.gehirn.ne.jp",
        "URL_SW": "http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby",
        "BASEDIR_CGIERR": "http://crazy-crazy.sakura.ne.jp//giji_lobby/lobby",
        "NAME_HOME": "人狼議事 ロビー",
        "MAX_VILLAGES": 10,
        "MAX_LOG": 750
      },
      "enable": {
        "DEFAULT_VOTETYPE": ["anonymity", "標準の投票方法(sign: 記名、anonymity:無記名)"],
        "ENABLED_DELETED": [1, "削除発言を表示するかどうか"],
        "ENABLED_WINNER_LABEL": [1, "1:勝利者表示をする。"],
        "ENABLED_MAX_ESAY": [0, "エピローグを発言制限対象に 0:しない、1:する"],
        "ENABLED_RANDOMTARGET": [1, "1:投票・能力先に「ランダム」を含める"],
        "ENABLED_SUDDENDEATH": [1, "1:突然死あり"],
        "ENABLED_BITTY": [1, "少女や交霊者ののぞきみがひらがなのみ。"],
        "ENABLED_PERMIT_DEAD": [0, "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],
        "ENABLED_UNDEAD": [0, "1:幽界トーク村を設定可能"],
        "ENABLED_AIMING": [1, "1:対象を指定した発言（内緒話）を含める"],
        "ENABLED_MOB_AIMING": [1, "1:見物人が内緒話を使える。"],
        "ENABLED_AMBIDEXTER": [1, "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],
        "ENABLED_SUICIDE_VOTE": [1, "1:自殺投票"],
        "ENABLED_SEQ_EVENT": [0, "0:ランダムイベント 1:順序通りのイベント"]
      },
      "pl": "/www/giji_log/lobby/config.pl",
      "is_angular": "show-fix"
    }
  },
  "OFFPARTY": {
    "server": "party.ps.land.to",
    "oldlog": "/kitchen/sow.cgi?cmd=oldlog\u0026rowall=on",
    "livelog": "/kitchen/sow.cgi?cmd=rss",
    "folder": "OFFPARTY",
    "info_url": "/kitchen/sow.cgi?ua=mb\u0026vid=%s\u0026cmd=vinfo",
    "nation": "人狼議事オフ相談所",
    "epi_url": "/kitchen/sow.cgi?ua=mb\u0026vid=%s\u0026turn=%s\u0026move=page\u0026pageno=1\u0026row=50",
    "vid_code": "P"
  }
};
var _ref;

Url.options = LOCATION.options;

Url.bind = LOCATION.bind;

Url.routes = {
  pathname: {
    folder: new Url("/:folder/stories")
  },
  search: {
    folder: new Url("folder=:folder", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) && "?"
    }),
    stories: new Url("stories=:game~:rating~:event~:config~:say_limit~:player_length~:update_at~:update_interval~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) && "?"
    }),
    faces: new Url("faces=:chr_set~:order~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? (_ref = gon.map_reduce) != null ? _ref.faces : void 0 : void 0) != null) && "?"
    }),
    scroll: new Url("scroll=:scroll", {
      unmatch: "?"
    }),
    css: new Url("css=:theme~:width~:layout~:font", {
      cookie: {
        time: 12,
        path: "/"
      },
      unmatch: "?",
      change: function(params) {
        var h, key, val, _ref1;
        h = {};
        for (key in params) {
          val = params[key];
          if ((key != null) && (val != null) && "String" === (((_ref1 = Url.options[key]) != null ? _ref1.type : void 0) || "String")) {
            h["" + val + "-" + key] = true;
          }
        }
        return GUI.header(Object.keys(h));
      }
    })
  }
};
new Cache.Rule("map_face").schema(function() {
  this.belongs_to("face", {
    dependent: true
  });
  this.fields({
    _id: function(o) {
      var chr_job, list;
      o._id = o.face_id;
      list = Cache.chr_jobs.where({
        face: [o.face_id]
      }).sort();
      if (list) {
        o.search_words = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            chr_job = list[_i];
            _results.push(chr_job.job);
          }
          return _results;
        })();
        o.chr_set_ids = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            chr_job = list[_i];
            _results.push(chr_job.chr_set_id);
          }
          return _results;
        })();
      } else {
        o.search_words = o.chr_set_ids = [];
      }
      return o.win.value.合計 = o.win.all;
    },
    face_name: function(o) {
      var sow_auth_id, _results;
      o.search_words.push(o.face.name);
      _results = [];
      for (sow_auth_id in o.sow_auth_id.value) {
        _results.push(o.search_words.push(sow_auth_id));
      }
      return _results;
    }
  });
  this.scope("chr_set", function(o) {
    return o.chr_set_ids;
  });
  return this.search(function(o) {
    return o.search_words;
  });
});

new Cache.Rule("map_face_story_log").schema(function() {
  this.scope("folder", function(o) {
    return [o.folder];
  });
  this.fields({
    _id: function(o) {
      o._id = o.logid_head;
      return o.folder = o.logid_head.split("-")[0].toUpperCase();
    }
  });
  return this.order(function(o) {
    return o.date.max;
  });
});

new Cache.Rule("story").schema(function() {
  var caption;
  this.scope("folder", function(o) {
    return [o.folder];
  });
  this.scope("game", function(o) {
    return [o.type.game];
  });
  this.scope("rating", function(o) {
    return [o.rating];
  });
  this.scope("say_limit", function(o) {
    return [o.view.say_limit];
  });
  this.scope("update_at", function(o) {
    return [o.view.update_at];
  });
  this.scope("update_interval", function(o) {
    return [o.view.update_interval];
  });
  this.scope("player_length", function(o) {
    return [o.view.player_length];
  });
  this.scope("config", function(o) {
    return o.view.config_types;
  });
  this.scope("event", function(o) {
    return o.view.event_types;
  });
  this.search(function(o) {
    return [o.name];
  });
  caption = function(field, key) {
    var data;
    data = field[key];
    if (data) {
      return data.CAPTION;
    } else {
      return null;
    }
  };
  return this.fields({
    _id: function(o) {
      return o.view = {
        rating: m("img", {
          src: "//7korobi.gehirn.ne.jp/images/icon/cd_" + o.rating + ".png"
        }),
        update_at: Timer.hhmm(o.upd.hour, o.upd.minute),
        update_interval: "" + (o.upd.interval * 24) + "時間",
        player_length: o.vpl.last,
        config_types: GUI.names.config(o.card.config, function(name, size) {
          return name;
        }),
        event_types: GUI.names.config(o.card.event, function(name, size) {
          return name;
        }),
        configs: GUI.names.config(o.card.config, function(name, size) {
          return m("kbd", "" + name + "x" + size);
        }),
        events: GUI.names.config(o.card.event, function(name, size) {
          return m("kbd", "" + name + "x" + size);
        }),
        say_limit: caption(RAILS.saycnt, o.type.say) || "――",
        game_rule: caption(RAILS.game_rule, o.type.game) || "タブラの人狼"
      };
    }
  });
});
var face, map_orders, scroll_spy, _ref;

GUI.ScrollSpy.global = new GUI.ScrollSpy(Url.prop.scroll);

scroll_spy = new GUI.ScrollSpy(Url.prop.scroll);

if ((typeof gon !== "undefined" && gon !== null ? (_ref = gon.map_reduce) != null ? _ref.faces : void 0 : void 0) != null) {
  Cache.rule.chr_set.schema(function() {
    return this.order(function(o) {
      return Cache.map_faces.reduce.chr_set[o._id].count;
    });
  });
  Cache.rule.map_face.set(gon.map_reduce.faces);
  map_orders = function(prop) {
    var order;
    order = RAILS.map_faces_orders[prop];
    order.func = function(o) {
      var _base, _name;
      return (_base = o.win.value)[_name = order.order] != null ? _base[_name] : _base[_name] = 0;
    };
    Cache.rule.map_face.schema(function() {
      return this.order(function(o) {
        return order.func(o);
      });
    });
    return order;
  };
  GUI.if_exist("#map_faces", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var chrs, headline, map_order_set;
        map_order_set = map_orders(Url.prop.order());
        chrs = Cache.map_faces.search(Url.prop.search()).where({
          chr_set: [Url.prop.chr_set()]
        }).sort("desc");
        headline = "";
        if (chrs != null ? chrs.length : void 0) {
          headline = [m("span.badge.badge-info", Cache.chr_sets.find(Url.prop.chr_set()).caption), "の" + chrs.length + "人を、", m("span.badge.badge-info", map_order_set.headline), "回数で並べています"];
        }
        return GUI.chrs(chrs, headline, function(o, face) {
          var chr_job, job_name;
          chr_job = Cache.chr_jobs.find("" + (Url.prop.chr_set()) + "_" + face._id);
          job_name = chr_job.job;
          return [
            m("div", job_name), m("div", face.name), m("div", m("a.mark", {
              href: "/map_reduce/faces/" + face._id
            }, "" + map_order_set.caption + " " + (map_order_set.func(o)) + "回")), m("div", "♥" + o.sow_auth_id.max_is)
          ];
        });
      }
    });
  });
  GUI.if_exist("#chr_sets", function(dom) {
    var touch;
    touch = new GUI.TouchMenu();
    touch.menu_set(Cache.map_faces, Url.prop, "count", {
      order: function() {
        var key, o, _ref1, _results;
        _ref1 = RAILS.map_faces_orders;
        _results = [];
        for (key in _ref1) {
          o = _ref1[key];
          _results.push(m("a", touch.btn(Url.prop.order, key), o.caption));
        }
        return _results;
      },
      chr_set: function() {
        return this.btn_list(function(key, o) {
          return Cache.chr_sets.find(key).caption;
        });
      }
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return touch.menu(GUI.ScrollSpy.global.mark("menu"), m("input.form-control", {
          onblur: m.withAttr("value", Url.prop.search),
          onchange: m.withAttr("value", Url.prop.search),
          value: Url.prop.search()
        }), "キャラセットを選んでみよう ", m("span.btn.btn-default.dropdown-toggle", touch.start("order"), "並び順", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("chr_set"), "キャラセット", m("i.caret")));
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.face : void 0) != null) {
  face = Cache.map_face_detail = gon.face;
  Cache.rule.map_face_story_log.set(face.story_logs);
  face.name = Cache.faces.find(face.face_id).name;
  face.story_id_of_folders = _.groupBy(face.story_ids, function(_arg) {
    var count, k, _ref1;
    k = _arg[0], count = _arg[1];
    return (_ref1 = k.split("-")) != null ? _ref1[0] : void 0;
  });
  face.role_of_wins = _.groupBy(face.roles, function(_arg) {
    var count, k, role;
    k = _arg[0], count = _arg[1];
    role = RAILS.gifts[k] || RAILS.roles[k] || {
      group: "OTHER"
    };
    return RAILS.groups[role.group].name;
  });
  GUI.if_exist("#summary", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var letters, role, rolename, width, win;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", face.role.all), "の役職になりました"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.win.keys;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              win = _ref1[_i];
              _results.push(GUI.letter("", "" + win + " x" + face.win.value[win] + "回", (function() {
                var _j, _len1, _ref2, _results1;
                _ref2 = face.role_of_wins[win];
                _results1 = [];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  role = _ref2[_j];
                  rolename = GUI.name.config(role[0]);
                  width = (function() {
                    switch (false) {
                      case !(4 < rolename.length):
                        return 10.35;
                      default:
                        return 3.75;
                    }
                  })();
                  _results1.push(GUI.inline_item(function() {
                    return [this.center(width, rolename), this.right(2.5, "x" + role[1])];
                  }));
                }
                return _results1;
              })()));
            }
            return _results;
          })()
        ];
        return [m("h2", face.name + " の活躍"), face.says[0] != null ? m("h6", m("span.code", Timer.date_time_stamp(face.says[0].date.min)), m.trust("&nbsp;〜&nbsp;"), m("span.code", Timer.date_time_stamp(face.says[0].date.max))) : void 0, m("table.say.SAY", scroll_spy.mark("summary"), m("tbody", m("tr", m("td.img", GUI.portrate(face.face_id)), m("td.field", m(".msg", letters)))))];
      }
    });
  });
  GUI.if_exist("#calc", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var say, says_calc_line, says_calc_lines, says_count_line, says_count_lines, _i, _len, _ref1;
        says_count_lines = [
          m("tr.caution", m("th.msg", {
            colspan: 2
          }, "総合値"), m("th.msg", {
            style: "text-align:right"
          }, "一番長い発言"), m("th.msg", {
            style: "text-align:right"
          }, "総文字数"), m("th.msg", {
            style: "text-align:right"
          }, "総発言回数"))
        ];
        says_calc_lines = [
          m("tr.caution", m("th.msg", {
            colspan: 2
          }, "平均値"), m("th.msg", {
            style: "text-align:right"
          }, "／村数"), m("th.msg", {
            style: "text-align:right"
          }, "文字数"), m("th.msg", {
            style: "text-align:right"
          }, "発言回数"))
        ];
        _ref1 = face.says;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          say = _ref1[_i];
          says_count_line = m("tr." + say.logid_head + "AY", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.max)) + " 字"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.all)) + " 字"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.count)) + " 回"));
          says_calc_line = m("tr." + say.logid_head + "AY", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.vil)) + " 村"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.all / say.vil)) + " 字"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.count / say.vil)) + " 回"));
          says_count_lines.push(says_count_line);
          says_calc_lines.push(says_calc_line);
        }
        return [m("table.say.info", scroll_spy.mark("says_count"), says_count_lines), m("table.say.info", scroll_spy.mark("says_calc"), says_calc_lines)];
      }
    });
  });
  GUI.if_exist("#village", function(dom) {
    var touch;
    touch = new GUI.TouchMenu();
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var folder, letters, story_id;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", "" + face.folder.all + "回"), "登場しました。"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.folder.keys;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              folder = _ref1[_i];
              _results.push(GUI.letter("", "" + folder + " x" + face.folder.value[folder] + "回", (function() {
                var _j, _len1, _ref2, _results1;
                _ref2 = face.story_id_of_folders[folder];
                _results1 = [];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  story_id = _ref2[_j];
                  _results1.push(GUI.inline_item(function() {
                    return m("a", {
                      style: "display:block; width:" + (2.8 + folder.length * 0.65) + "em; text-align:left;",
                      href: "//7korobi.gehirn.ne.jp/stories/" + story_id[0] + ".html"
                    }, story_id[0]);
                  }));
                }
                return _results1;
              })()));
            }
            return _results;
          })()
        ];
        return m(".MAKER.guide", scroll_spy.mark("villages"), letters);
      }
    });
  });
  GUI.if_exist("#sow_user", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var length, letters, sow_auth_id, width;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", "" + face.sow_auth_ids.length + "人"), "が、", m("span.mark", "" + face.sow_auth_id.all + "回"), "登場しました。"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.sow_auth_ids;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              sow_auth_id = _ref1[_i];
              length = sow_auth_id[0].sjis_length;
              width = (function() {
                switch (false) {
                  case !(17 < length):
                    return 14.45;
                  case !(11 < length):
                    return 10.25;
                  default:
                    return 6.0;
                }
              })();
              _results.push(GUI.inline_item(function() {
                return [this.right(width, sow_auth_id[0]), this.right(2.0, "x" + sow_auth_id[1])];
              }));
            }
            return _results;
          })()
        ];
        return m(".ADMIN.guide", scroll_spy.mark("sow_users"), letters);
      }
    });
  });
}

GUI.if_exist("#buttons", function(dom) {
  var layout, touch;
  layout = new Layout(-12, -1, dom);
  touch = new GUI.TouchMenu();
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var o;
      return m("nav", m("span", m("a.btn.btn-default.click.glyphicon.glyphicon-search", GUI.attrs(function() {
        return this.start(function() {
          return GUI.ScrollSpy.go("menu");
        });
      }))), m("span", m("a.btn.btn-default.click.glyphicon.glyphicon-pencil", GUI.attrs(function() {
        return this.start(function() {
          return GUI.ScrollSpy.go("form");
        });
      }))), (function() {
        var _i, _len, _ref1, _results;
        _ref1 = [];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          o = _ref1[_i];
          _results.push(m("span", m("a.btn.click", o.name)));
        }
        return _results;
      })(), m("a.btn.btn-default", touch.start(), "✗"));
    }
  });
});

GUI.if_exist("#sayfilter", function(dom) {
  var layout;
  layout = new Layout(1, -1, dom);
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return [];
    }
  });
});

GUI.if_exist("#topviewer", function(dom) {
  var layout;
  layout = new Layout(0, -1, dom);
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return [];
    }
  });
});

GUI.if_exist("#css_changer", function(dom) {
  var touch;
  touch = new GUI.TouchMenu({
    css: function(touch) {
      return [m("h6", "幅の広さ"), m(".form-inline", m(".form-group", m("a", touch.btn(Url.prop.width, "mini"), "携帯"), m("a", touch.btn(Url.prop.width, "std"), "普通"), m("a", touch.btn(Url.prop.width, "wide"), "広域"))), m("h6", "位置"), m(".form-inline", m(".form-group", m("a", touch.btn(Url.prop.layout, "left"), "左詰"), m("a", touch.btn(Url.prop.layout, "center"), "中央"), m("a", touch.btn(Url.prop.layout, "right"), "右詰"))), m("h6", "位置"), m(".form-inline", m(".form-group", m("a", touch.btn(Url.prop.font, "large"), "大判"), m("a", touch.btn(Url.prop.font, "novel"), "明朝"), m("a", touch.btn(Url.prop.font, "std"), "ゴシック"), m("a", touch.btn(Url.prop.font, "small"), "繊細")))];
    }
  });
  return m.module(dom, {
    controller: function() {},
    view: function() {
      win["do"].resize();
      return touch.menu({}, m("a.mark", touch.btn(Url.prop.theme, "cinema"), "煉瓦"), m("a.mark", touch.btn(Url.prop.theme, "night"), "月夜"), m("a.mark", touch.btn(Url.prop.theme, "star"), "蒼穹"), m("a.mark", touch.btn(Url.prop.theme, "wa"), "和の国"), m("a.bigicon.glyphicon.glyphicon-cog", touch.start("css")));
    }
  });
});

if ((typeof gon !== "undefined" && gon !== null ? gon.villages : void 0) != null) {
  GUI.if_exist("#villages", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", gon.villages, function(v) {
          return GUI.message.action(v);
        });
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.byebyes : void 0) != null) {
  GUI.if_exist("#byebyes", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", gon.byebyes, function(v) {
          return GUI.message.action(v);
        });
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.history : void 0) != null) {
  GUI.if_exist("#history", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", gon.history, function(v) {
          return GUI.message.say(v);
        });
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) {
  Cache.rule.story.set(gon.stories);
  GUI.if_exist("#stories", function(dom) {
    var touch, touch_sw;
    scroll_spy.avg_height = 22;
    touch_sw = new GUI.TouchMenu();
    touch = new GUI.TouchMenu();
    touch.menu_set(Cache.storys, Url.prop, "count", {
      folder: function() {
        return this.btn_list(function(key) {
          var _ref1;
          return (_ref1 = GAME[key]) != null ? _ref1.nation : void 0;
        });
      },
      game: function() {
        return this.btn_list(function(key, o) {
          return o.first.view.game_rule;
        });
      },
      rating: function() {
        return this.btn_list(function(key, o) {
          return m("span", o.first.view.rating, RAILS.rating[key].caption);
        });
      },
      config: function() {
        return this.btn_list(function(key) {
          return key;
        });
      },
      event: function() {
        return this.btn_list(function(key) {
          return key;
        });
      },
      say_limit: function() {
        return this.btn_list(function(key, o) {
          return o.first.view.say_limit;
        });
      },
      player_length: function() {
        return this.btn_list(function(key, o) {
          return o.first.view.player_length + "人";
        });
      },
      update_at: function() {
        return this.btn_list(function(key, o) {
          return o.first.view.update_at;
        });
      },
      update_interval: function() {
        return this.btn_list(function(key, o) {
          return o.first.view.update_interval;
        });
      }
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var icon, storys;
        storys = touch.by_menu().search(Url.prop.search());
        icon = touch_sw.state() ? "glyphicon-resize-small" : "glyphicon-resize-full";
        return m("div", touch.menu(GUI.ScrollSpy.global.mark("menu"), m("h6", "検索する。　　　　"), m("input.form-control", {
          onblur: m.withAttr("value", Url.prop.search),
          onchange: m.withAttr("value", Url.prop.search),
          value: Url.prop.search()
        }), m("span.btn.btn-default.dropdown-toggle", touch_sw.start(true), m("i.glyphicon." + icon)), m("span.btn.btn-default.dropdown-toggle", touch.start("folder"), m("i.glyphicon.glyphicon-book"), m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("game"), "ルール", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("event"), "事件", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("config"), "役職", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("rating"), "こだわり", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("say_limit"), "発言制限", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("player_length"), "人数", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("update_at"), "更新時刻", m("i.caret")), m("span.btn.btn-default.dropdown-toggle", touch.start("update_interval"), "更新間隔", m("i.caret"))), m("table.table.table-border.table-hover", m("thead", m("tr", m("th"))), scroll_spy.pager("tbody", storys.list(), function(o) {
          if (touch_sw.state()) {
            return m("tr", m("td", m("a", {
              href: o.link
            }, m("code.glyphicon.glyphicon-film")), m("kbd.note", o._id), m("a", {
              href: o.file
            }, m.trust(o.name)), o.view.rating, m("table", m("tbody", m("tr", m("th", "更新"), m("td", "" + o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", "" + o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m("div", o.view.configs), m("div", o.view.events)));
          } else {
            return m("tr", m("td", m("a", {
              href: o.link
            }, m("code.glyphicon.glyphicon-film")), m("kbd.note", o._id), m("a", {
              href: o.file
            }, o.name), o.view.rating));
          }
        })));
      }
    });
  });
}

GUI.if_exist("#headline", function(dom) {
  var touch;
  touch = new GUI.TouchMenu();
  touch.state("finish");
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var max_all, max_cafe, max_ciel, max_crazy, max_morphe, max_pan, max_vage, max_xebec;
      max_vage = GAME.PERJURY.config.cfg.MAX_VILLAGES;
      max_crazy = GAME.CRAZY.config.cfg.MAX_VILLAGES;
      max_xebec = GAME.XEBEC.config.cfg.MAX_VILLAGES;
      max_ciel = GAME.CIEL.config.cfg.MAX_VILLAGES;
      max_cafe = GAME.CABALA.config.cfg.MAX_VILLAGES;
      max_pan = GAME.PAN.config.cfg.MAX_VILLAGES;
      max_morphe = GAME.MORPHE.config.cfg.MAX_VILLAGES;
      max_all = max_vage + max_crazy + max_xebec + max_ciel;
      max_all += max_cafe + max_morphe;
      return m(".choice", m("table.board", "progress" === touch.state() ? m("tr", m("th.choice[colspan=2]", m("strong", "進行中の村")), m("th.no_choice[colspan=2]", m("a", touch.start("finish"), "終了した村を見る"))) : void 0, "finish" === touch.state() ? m("tr", m("th.no_choice[colspan=2]", m("a", touch.start("progress"), "進行中の村を見る")), m("th.choice[colspan=2]", m("strong", "終了した村"))) : void 0, m("tr.link", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ")), "progress" === touch.state() ? m("tr", m("td.no_choice", m("a", {
        href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
      }, "lobby"), m("br"), "offparty", m("br"), m("br"), m("br")), m("td.no_choice", "" + max_morphe + "村:", m("a", {
        href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
      }, "morphe"), m("br"), "" + max_cafe + "村:", m("a", {
        href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
      }, "cafe"), m("br"), m("br"), m("br")), m("td.no_choice", "wolf", m("br"), "ultimate", m("br"), "allstar", m("br"), "cabala", m("br")), m("td.no_choice", "role-play", m("br"), "RP-advance", m("br"), "" + max_vage + "村:", m("a", {
        href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
      }, "perjury"), m("br"), "" + max_xebec + "村:", m("a", {
        href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
      }, "xebec"), m("br"), "" + max_crazy + "村:", m("a", {
        href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
      }, "crazy"), m("br"), "" + max_ciel + "村:", m("a", {
        href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
      }, "ciel"))) : void 0, "finish" === touch.state() ? m("tr", m("td.no_choice", m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=LOBBY"
      }, "lobby"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=OFFPARTY"
      }, "offparty"), m("br"), m("br"), m("br")), m("td.no_choice", m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=MORPHE"
      }, "morphe"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
      }, "cafe"), m("br"), m("br"), m("br")), m("td.no_choice", m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=WOLF"
      }, "wolf"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=ULTIMATE"
      }, "ultimate"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=ALLSTAR"
      }, "allstar"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
      }, "cabala"), m("br")), m("td.no_choice", m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=RP"
      }, "role-play"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=PRETENSE"
      }, "advance"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=PERJURY"
      }, "perjury"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=XEBEC"
      }, "xebec"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=CRAZY"
      }, "crazy"), m("br"), m("a", {
        href: "//7korobi.gehirn.ne.jp/stories/all?folder=CIEL"
      }, "ciel"))) : void 0));
    }
  });
});


/*
  css: new Url "css=:theme-:width-:layout-:font", (params)->

  .pagenavi
    h6(ng-if="mode" style="text-align:left;") 見るログを選ぶ
    .form-inline(ng-if="mode" style="text-align:left;")
      .form-group
        a.mark(ng-click="event.show_info()") 情報
      | &thinsp;
      .form-group(ng-repeat="e in events")
        a.mark(ng-click="e.show_talk()") {{e.name}}
      .form-group(ng-if="story.news().is_progress")
        | &thinsp;/&thinsp;
        a.mark(ng-click="story.news().show_news()") 最新
        | &thinsp;
        a.mark(ng-click="story.news().show_unread()") 未読

    h6(ng-if="show_style_navi && msg_style") ログの表示方法
    .form-inline(ng-if="show_style_navi && msg_style")
      .form-group
        label
          select.form-control.input-medium(ng-model="css.value" ng-options="o.val as o.name group by o.group for o in css.select")
      | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.power"   ng-options="key as selectors.power[key] for key in selector_keys.power" )
        | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.order"   ng-options="key as selectors.order[key] for key in selector_keys.order" )
        | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.row"   ng-options="key as selectors.row[key] for key in selector_keys.row" )
        | &thinsp;

    h6(ng-if="show_style_navi && mode") ログから表示する部分を選ぶ
    .form-inline(ng-if="show_style_navi && mode")
      .form-group.mark
        label
          input(type="radio" tabindex="-1" value="open"  ng-model="modes.view") 公開
        label
          input(type="radio" tabindex="-1" value="clan"  ng-model="modes.view") 内緒話
        label
          input(type="radio" tabindex="-1" value="think" ng-model="modes.view") 独り言
        label
          input(type="radio" tabindex="-1" value="all"   ng-model="modes.view") 全部
      | &thinsp;
      .form-group.mark
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="modes.last") 最後の言葉
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="modes.open") 公開発言
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="msg_styles.pl") 中身発言


    h6(ng-if="event") ページ移動
    .form-inline(ng-if="event" style="text-align:right;")
      .form-group(ng-if="page && ! event.is_news" template="navi/paginate")
      | &thinsp;
      .form-group(ng-if="mode")
        a.mark.click(ng-click="mode.value = mode_common[1].value") メモ
      | &thinsp;
      .form-group(ng-if="mode")
        a.mark.click(ng-click="mode.value = mode_common[2].value") 議事
      | &thinsp;
      .form-group
        input.form-control.input-medium(type="text" ng-model="search_input" ng-blur="search.value = search_input" placeholder="ログを探す")
      | &thinsp;
      .form-group(ng-if="event.is_progress")
        a.mark.click.glyphicon.glyphicon-pencil(ng-click="go.form()")
 */

GUI.if_exist("#to_root", function(dom) {
  var day_or_night;
  day_or_night = m.prop();
  return m.module(document.getElementById("to_root"), {
    controller: function() {
      var hour;
      hour = 1000 * 60 * 60;
      return GUI.do_tick(function(now) {
        var zone;
        zone = now + 3 * hour;
        day_or_night(Math.floor(zone / (12 * hour)) % 2);
        return 12 * hour - zone % (12 * hour);
      });
    },
    view: function() {
      return [
        m("a", {
          href: "//giji.check.jp/"
        }, GUI.title(Url.prop.w(), Url.prop.theme(), day_or_night()))
      ];
    }
  });
});

m.endComputation();
var scroll;

if ("onorientationchange" in window) {
  window.addEventListener('orientationchange', function() {
    return window.requestAnimationFrame(win["do"].resize);
  });
  window.addEventListener('orientationchange', _.throttle(win["do"].scroll, DELAY.lento));
} else {
  window.addEventListener('resize', function() {
    return window.requestAnimationFrame(win["do"].resize);
  });
  window.addEventListener('resize', _.throttle(win["do"].scroll, DELAY.lento));
}

window.addEventListener('scroll', function() {
  return window.requestAnimationFrame(win["do"].scroll);
});

window.addEventListener('scroll', _.throttle(win["do"].resize, DELAY.lento));

if ("ondevicemotion" in window) {
  window.addEventListener('devicemotion', function() {
    return window.requestAnimationFrame(win["do"].motion);
  });
}

if ("ongesturestart" in window) {
  window.addEventListener('gesturestart', _.throttle(win["do"].start, DELAY.presto));
  window.addEventListener('gesturechange', _.throttle(win["do"].move, DELAY.presto));
  window.addEventListener('gestureend', _.throttle(win["do"].end, DELAY.presto));
}

if ("ontouchstart" in window) {
  window.addEventListener('touchstart', _.throttle(win["do"].start, DELAY.presto));
  window.addEventListener('touchmove', _.throttle(win["do"].move, DELAY.presto));
  window.addEventListener('touchend', _.throttle(win["do"].end, DELAY.presto));
} else {
  window.addEventListener('mousedown', _.throttle(win["do"].start, DELAY.presto));
  window.addEventListener('mousemove', _.throttle(win["do"].move, DELAY.presto));
  window.addEventListener('mouseup', _.throttle(win["do"].end, DELAY.presto));
}

if ("onhashchange" in window) {
  window.addEventListener("hashchange", function(event) {
    if (event.clipboardData) {
      return console.log(event);
    } else {
      return Url.popstate();
    }
  });
}

if ("onpopstate" in window) {
  window.addEventListener("popstate", function(event) {
    if (event.clipboardData) {
      return console.log(event);
    } else {
      return Url.popstate();
    }
  });
  if (!head.browser.safari) {
    Url.popstate();
  }
}

if ("onmessage" in window) {
  window.addEventListener("message", function(event) {
    return console.log("on message");
  });
}

if ("onoffline" in window) {
  window.addEventListener("offline", function(event) {
    return console.log("on offline");
  });
}

if ("ononline" in window) {
  window.addEventListener("online", function(event) {
    return console.log("on online");
  });
}

if ("onstorage" in window) {
  window.addEventListener("storage", function(event) {
    return console.log("on storage");
  });
}

if ("onload" in window) {
  window.addEventListener("load", win["do"].load);
}

scroll = function() {
  return GUI.ScrollSpy.scroll();
};

win.on.scroll.push(_.debounce(scroll, DELAY.animato));



