(function() {
  this.CONF_FOLDER = {
    "PERL_DEFAULT": {
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
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
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
    "UNION": {
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"
        }
      }
    },
    "BRAID": {
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"
        }
      }
    },
    "all": {
      "nation": "- すべて -"
    },
    "TEST": {
      "nation": "人狼議事テスト",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "PERJURY_OLD",
      "nation": "人狼議事RP:Bp",
      "vid_code": "Bp",
      "server": "utage.family.jp",
      "oldlog": "/perjury/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/perjury/sow.cgi?cmd=rss",
      "info_url": "/perjury/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/perjury/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "PRETENSE",
      "nation": "人狼議事RP:Advance",
      "vid_code": "A",
      "server": "utage.family.jp",
      "oldlog": "/pretense/sow.cgi?cmd=oldlog&rowall=on",
      "info_url": "/pretense/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/pretense/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      }
    },
    "RP": {
      "folder": "RP",
      "nation": "人狼議事RP:",
      "vid_code": "",
      "server": "utage.family.jp",
      "oldlog": "/rp/sow.cgi?cmd=oldlog&rowall=on",
      "info_url": "/rp/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/rp/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      }
    },
    "CABALA_OLD": {
      "folder": "CABALA",
      "nation": "人狼議事陰謀:",
      "vid_code": "C",
      "server": "utage.family.jp",
      "oldlog": "/cabala/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/cabala/sow.cgi?cmd=rss",
      "info_url": "/cabala/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/cabala/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://utage.family.jp/cabala",
          "BASEDIR_CGIERR": "http://utage.family.jp//cabala",
          "NAME_HOME": "人狼議事 陰謀の苑",
          "MAX_VILLAGES": 0
        },
        "pl": "/www/giji_log/cabala/config.pl"
      }
    },
    "ALLSTAR_OLD": {
      "folder": "ALLSTAR",
      "nation": "人狼議事大乱闘:A",
      "vid_code": "A",
      "server": "utage.family.jp",
      "oldlog": "/allstar/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/allstar/sow.cgi?cmd=rss",
      "info_url": "/allstar/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/allstar/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "ULTIMATE",
      "nation": "人狼議事大乱闘:",
      "vid_code": "",
      "server": "utage.family.jp",
      "oldlog": "/ultimate/sow.cgi?cmd=oldlog&rowall=on",
      "info_url": "/ultimate/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/ultimate/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      }
    },
    "WOLF": {
      "folder": "WOLF",
      "nation": "人狼議事標準",
      "vid_code": "",
      "server": "utage.family.jp",
      "oldlog": "/wolf/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/wolf/sow.cgi?cmd=rss",
      "info_url": "/wolf/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/wolf/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": false
      }
    },
    "PAN": {
      "folder": "PAN",
      "nation": "似顔絵人狼",
      "server": "soy-bean.sakura.ne.jp",
      "oldlog": "/pan/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/pan/sow.cgi?cmd=rss",
      "info_url": "/pan/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/pan/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": false
      },
      "config": {
        "csid": ["sow", "juna", "name", "bloody", "orange", "15girls", "tmmi", "cat", "bunmei"],
        "erb": "./asset/sow/pan.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "MORPHE",
      "nation": "人狼議事 モルペウス",
      "vid_code": "M",
      "server": "morphe.sakura.ne.jp",
      "oldlog": "/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/sow.cgi?cmd=rss",
      "info_url": "/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://morphe.sakura.ne.jp/morphe",
          "BASEDIR_CGIERR": "http://morphe.sakura.ne.jp/morphe//",
          "NAME_HOME": "人狼議事 夢の形",
          "MAX_VILLAGES": 4
        },
        "pl": "/www/giji_log/morphe/config.pl"
      }
    },
    "SOYBEAN": {
      "folder": "SOYBEAN",
      "nation": "人狼議事鯖の味噌煮",
      "vid_code": "Bs",
      "server": "soy-bean.sakura.ne.jp",
      "oldlog": "/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/sow.cgi?cmd=rss",
      "info_url": "/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "CIEL",
      "nation": "人狼議事RP:Cheat Ciel",
      "vid_code": "Cc",
      "server": "ciel.moo.jp",
      "oldlog": "/cheat/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/cheat/sow.cgi?cmd=rss",
      "info_url": "/cheat/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/cheat/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "BASEDIR_CGIERR": "http://ciel.moo.jp//cheat",
          "URL_SW": "http://ciel.moo.jp/cheat",
          "MAX_VILLAGES": 2,
          "NAME_HOME": "人狼議事 ciel<br>- Role Play Cheat -"
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
      "folder": "PERJURY",
      "nation": "人狼議事RP:Braid Perjury",
      "vid_code": "Bp",
      "server": "perjury.rulez.jp",
      "oldlog": "/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/sow.cgi?cmd=rss",
      "info_url": "/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "TYPE": "BRAID",
          "RULE": "PERJURY",
          "USERID_NPC": "master",
          "USERID_ADMIN": "admin",
          "ENABLED_VMAKE": 1,
          "TIMEOUT_ENTRY": 2,
          "TIMEOUT_SCRAP": 5,
          "TOPPAGE_INFO": "./_info.pl",
          "BASEDIR_CGI": ".",
          "BASEDIR_DAT": "./data",
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://perjury.rulez.jp",
          "BASEDIR_CGIERR": "http://perjury.rulez.jp//",
          "MAX_VILLAGES": 2,
          "NAME_HOME": "人狼議事 perjury rulez<br>- Role Play braid -"
        },
        "path": {
          "DIR_LIB": "./lib",
          "DIR_HTML": "./html",
          "DIR_RS": "./rs",
          "DIR_VIL": "./data/vil",
          "DIR_USER": "../sow/data/user"
        },
        "pl": "/www/giji_log/vage/config.pl"
      }
    },
    "XEBEC": {
      "folder": "XEBEC",
      "nation": "人狼議事RP:Braid XEBEC",
      "vid_code": "Bx",
      "server": "xebec.x0.to",
      "oldlog": "/xebec/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/xebec/sow.cgi?cmd=rss",
      "info_url": "/xebec/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/xebec/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://xebec.x0.to/xebec",
          "BASEDIR_CGIERR": "http://xebec.x0.to//xebec",
          "NAME_HOME": "人狼議事 xebec<br>- Role Play braid -",
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
      "folder": "CRAZY",
      "nation": "人狼議事RP:Braid Crazy",
      "vid_code": "Bc",
      "server": "crazy-crazy.sakura.ne.jp",
      "oldlog": "/crazy/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/crazy/sow.cgi?cmd=rss",
      "info_url": "/crazy/sow.cgi?\\ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/crazy/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://crazy-crazy.sakura.ne.jp/crazy",
          "BASEDIR_CGIERR": "http://crazy-crazy.sakura.ne.jp//crazy",
          "NAME_HOME": "人狼議事 crazy<br>- Role Play braid -",
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
      "folder": "CABALA",
      "nation": "人狼議事CabalaCafe",
      "vid_code": "C",
      "server": "cabala.halfmoon.jp",
      "oldlog": "/cafe/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/cafe/sow.cgi?cmd=rss",
      "info_url": "/cafe/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/cafe/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://cabala.halfmoon.jp/cafe",
          "BASEDIR_CGIERR": "http://cabala.halfmoon.jp//cafe",
          "NAME_HOME": "人狼議事 Cabala Cafe",
          "MAX_VILLAGES": 4
        },
        "pl": "/www/giji_log/cafe/config.pl"
      }
    },
    "ALLSTAR": {
      "folder": "ALLSTAR",
      "nation": "人狼議事大乱闘:AllStar",
      "vid_code": "A",
      "server": "jinro.jksy.org",
      "oldlog": "/~nanakorobi?cmd=oldlog&rowall=on",
      "livelog": "/~nanakorobi?cmd=rss",
      "info_url": "/~nanakorobi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/~nanakorobi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "LOBBY",
      "nation": "人狼議事ロビー",
      "vid_code": "L",
      "server": "crazy-crazy.sakura.ne.jp",
      "oldlog": "/giji_lobby/lobby/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/giji_lobby/lobby/sow.cgi?cmd=rss",
      "info_url": "/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
        "cd_default": "戦",
        "maxsize": {
          "MAXSIZE_ACTION": 60,
          "MAXSIZE_MEMOCNT": 1000,
          "MAXSIZE_MEMOLINE": 25
        },
        "saycnt": ["lobby"],
        "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
        "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "OFFPARTY",
      "nation": "人狼議事オフ相談所",
      "vid_code": "P",
      "server": "party.ps.land.to",
      "oldlog": "/kitchen/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/kitchen/sow.cgi?cmd=rss",
      "info_url": "/kitchen/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/kitchen/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      }
    }
  };

  this.SOW_RECORD = {
    "monospace": [null, "mono", "head", null],
    "roles": [null, "villager", "stigma", "fm", "sympathy", "seer", "seerwin", "aura", "seerrole", "guard", "medium", "mediumwin", "mediumrole", "necromancer", "follow", "fan", "hunter", "weredog", "prince", "rightwolf", "doctor", "curse", "dying", "invalid", "alchemist", "witch", "girl", "scapegoat", "elder", 29, 30, "jammer", "snatch", "bat", 34, 35, 36, 37, 38, 39, 40, "possess", "fanatic", "muppeting", "wisper", "semiwolf", "__dyingpossess", "oracle", "sorcerer", "walpurgis", 50, 51, "headless", 53, 54, 55, 56, 57, 58, 59, 60, "wolf", "__aurawolf", "intwolf", "cursewolf", "whitewolf", "childwolf", "dyingwolf", "silentwolf", 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, "hamster", 82, 83, 84, 85, "mimicry", 87, "dyingpixi", "trickster", "hatedevil", "loveangel", "passion", "lover", "robber", 95, "lonewolf", "guru", "dish", 99, 100, "bitch", "tangle", 103, 104, 105, 106, 107, 108, 109],
    "gifts": [null, null, "lost", "__bind", 4, "shield", "glass", "ogre", "fairy", "fink", 10, "decide", "seeronce", "dipsy", 14, 15, 16, 17, 18, 19, null],
    "events": ["blank", "nothing", "aprilfool", "turnfink", "turnfairy", "eclipse", "cointoss", "force", "miracle", "prophecy", 10, "clamor", "fire", "nightmare", "ghost", 15, "seance", 17, 18, 19, null],
    "winners": ["WIN_NONE", "WIN_HUMAN", "WIN_WOLF", "WIN_GURU", "WIN_PIXI", "WIN_PIXI", "WIN_LONEWOLF", "WIN_LOVER", "WIN_HATER", null],
    "mestypes": [null, "INFOSP", "DELETEDADMIN", "CAST", "MAKER", "ADMIN", "QUEUE", "INFONOM", "DELETED", "SAY", "TSAY", "WSAY", "GSAY", "SPSAY", "XSAY", "VSAY", "MSAY", "AIM", "ANONYMOUS", "INFOWOLF", null]
  };

  this.URL_PROPS = {
    "pins": {
      "type": "Keys",
      "current": {}
    },
    "scroll": {
      "type": "Text",
      "current": ""
    },
    "back": {
      "type": "Text",
      "current": ""
    },
    "icon": {
      "type": "Text",
      "current": ""
    },
    "search": {
      "type": "Text",
      "current": ""
    },
    "turn": {
      "type": "Number"
    },
    "updated_at": {
      "type": "Date"
    },
    "uid": null,
    "pwd": {
      "type": "Text"
    },
    "item": null,
    "color": null,
    "title": null,
    "nation": null,
    "message_id": null,
    "event_id": null,
    "story_id": null,
    "mode_id": {
      "current": "talk"
    },
    "tag": {
      "current": "all"
    },
    "width": {
      "current": "wide"
    },
    "layout": {
      "current": "center"
    },
    "font": {
      "current": "std"
    },
    "theme": {
      "current": "cinema"
    },
    "potofs_hide": {
      "type": "Keys",
      "current": {}
    },
    "potofs_desc": {
      "type": "Bool",
      "current": true
    },
    "potofs_order": {
      "current": "said_num"
    },
    "memo_at": {
      "type": "Text",
      "current": ""
    },
    "talk_at": {
      "type": "Text",
      "current": ""
    },
    "home_at": {
      "type": "Text",
      "current": ""
    },
    "open": {
      "type": "Bool",
      "current": true
    },
    "uniq": {
      "type": "Bool",
      "current": true
    },
    "human": {
      "type": "Bool",
      "current": true
    },
    "scope": {
      "current": "home"
    },
    "memo": {
      "current": "all"
    },
    "talk": {
      "current": "open"
    },
    "home": {
      "current": "announce"
    },
    "roletable": {
      "current": "ALL"
    },
    "card_win": {
      "current": "ALL"
    },
    "folder": {
      "current": "all"
    },
    "chr_set": {
      "current": "all"
    },
    "order": {
      "current": "all"
    },
    "game": {
      "current": "all"
    },
    "say_limit": {
      "current": "all"
    },
    "player_length": {
      "current": "all"
    },
    "rating": {
      "current": "all"
    },
    "config": {
      "current": "all"
    },
    "event_type": {
      "current": "all"
    },
    "gift_type": {
      "current": "all"
    },
    "role_type": {
      "current": "all"
    },
    "update_at": {
      "current": "all"
    },
    "update_interval": {
      "current": "all"
    }
  };

  this.RAILS = {
    "maskstates_to_able": {
      "1": "disable_analeptic",
      "2": "disable_poison",
      "3": "disable_role",
      "4": "disable_gift",
      "7": "disable_special",
      "8": "disable_vote",
      "32": "hurt",
      "64": "infected",
      "256": "hide_for_role",
      "512": "hide_for_gift",
      "1024": "hide_for_vote",
      "268435200": null
    },
    "maskstates": {
      "1": "<s>蘇生薬</s>",
      "2": "<s>毒薬</s>",
      "3": "<s>能力</s>",
      "4": "<s>恩恵</s>",
      "7": "<s>全能力</s>",
      "8": "<s>投票</s>",
      "32": "負傷",
      "64": "感染",
      "256": "能力対象外",
      "512": "恩恵対象外",
      "1024": "投票対象外",
      "268435200": null
    },
    "message": {
      "visible": {
        "warning": {
          "all": 2244608
        },
        "appendex": {
          "event_asc": 3145728,
          "event_desc": 1048576
        },
        "home": {
          "announce": 7348224
        },
        "talk": {
          "main": 3289088,
          "grave": 3287040,
          "open": 3291136,
          "clan": 3357184,
          "think": 3324288,
          "all": 3390208
        },
        "memo": {
          "main": 1048672,
          "grave": 1048656,
          "open": 1048688,
          "clan": 1048692,
          "think": 1048691,
          "all": 1048694
        }
      },
      "bit": {
        "EVENT_ASC": 2097152,
        "EVENT_DESC": 1048576,
        "STORY": 4194304,
        "INFO": 229376,
        "ACTION": 32640,
        "TALK": 16256,
        "MEMO": 127
      },
      "mask": {
        "ALL": 8387446,
        "NOT_ANNOUNCE": 4053814,
        "NOT_OPEN": 4047622,
        "ANNOUNCE": 8380480,
        "MAIN": 4083744,
        "GRAVE": 4081680,
        "OPEN": 4085808,
        "CLAN": 4014596,
        "THINK": 3981570,
        "DELETE": 3145857,
        "ZERO": 3145728
      }
    },
    "clearance": ["IR-", "R-", "O-", "Y-", "G-", "B-", "I-", "V-", "UV-"],
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
    "event_state": {
      "grudge": "今夜は２名分の襲撃をします。それが奴等への復讐なのです。",
      "riot": "今夜は２名分の投票をします。この荒波のような流行に乗らなくては！",
      "scapegoat": "今夜の投票相手は決まっています。",
      "eclipse": "今日の議論は、誰が発言しているか不明になります。"
    },
    "log": {
      "colors": {
        "VSAY": "#ca6",
        "VGSAY": "#a8a8e8",
        "GSAY": "#bbd",
        "SAY": "#cb8",
        "MSAY": "#cb8",
        "SPSAY": "#dcb",
        "AIM": "#dcb",
        "WSAY": "#a55",
        "XSAY": "#9a7",
        "BSAY": "#9a7",
        "TSAY": "#a98",
        "MAKER": "#000",
        "ADMIN": "#000",
        "text": "yellow",
        "back": "#222",
        "event": "#224",
        "line": "#44a",
        "focus": "yellow"
      },
      "anchor": {
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

  this.RULE = {
    "nation": {
      "head": "国のルール",
      "list": [
        {
          "head": "ここは長期人狼サーバーだ。短期はできない。",
          "text": "ネット上の人狼ゲームの種類は、<a href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Knowledge)Guidance#l1\">リンク先を参考</a>にしよう。\n人狼議事は長期人狼を遊ぶ場所なので、\n<a title=\"１０分とか、５分とか。……ひどいときは１分だぜ。クール！\">短期人狼</a>\nには対応していない。\nアクセスが集中すると、あの白くて殺風景な、忌々しい霧が発生するかもしれないんだ。２３時～２時(２６時)の範囲は利用が集中しているので、特にあぶない。\n<br>\nこういう遊びかたには、もっとふさわしい\n<a href=\"http://wolfbbs.jp/%BF%CD%CF%B5%A5%AF%A5%ED%A1%BC%A5%F3.html#content_1_18\">別の場所</a>\nがあるから、そちらで思いっきり楽しむといい。"
        }, {
          "head": "情報ページ（ここ）を熟読する。",
          "text": "参加したらもう、知らなかった、忘れてた、はナシだ。そしてそんなふうに言われないよう、解りやすいルールを見やすい場所に記そう。"
        }, {
          "head": "ルールを守り、つねに心構えに気を配る。",
          "text": "もし不明な部分、迷う部分があったら、抱えていることはない。プロローグのうちに積極的に問いかけて明らかにしておこう。\nルール違反で迷惑を被ったなら、遠慮なく非難しよう。\n気付かなかった、はナシだ。"
        }, {
          "head": "進行中は、どんな嘘でもＯＫ。",
          "text": "プロローグ終了からエピローグ開始までが、ゲームの進行中だ。この期間は全員、勝利のためにあらゆる手段を講じている。\nだから、あらゆる発言が嘘かもしれないし、嘘と受け取られる可能性があるんだ。\n<br>\nただしプロローグとエピローグだけは特殊で、ルールそのものを作っていく場であり、すべて明らかになっての反省会でもある。\nひょっとしたらルール違反の指摘もあるかもしれない。だから\n<a title=\"ホントごめん！仕事が終わらなかったんだ！とか、そういうやつ。\">勝つためと思われたくない主張</a>\nを本気でしたいときは、誤解の少ないエピローグまで待つ方が確実だ。\n<br>\nこれはゲームを楽しむためのルールだけれど、村建て人と、管理人だけはそれでは困るんだ。彼等から特別な発言があったら、そこに嘘やハッタリは含まれていない。\n勝敗よりも優先することを発表したり、問いかけたりするから、疑わずに聞いてほしい。"
        }, {
          "head": "ただし、（村建て人）、（管理人）の発言では嘘をつかないこと。",
          "text": ""
        }, {
          "head": "突然死をしない。",
          "text": "丸一日のあいだ発言を一切しないと、その人物は死んでしまう。このことを突然死と呼んでいるんだ。\n<br>\n人狼議事は会話を楽しむゲームだってことを思い出してほしい。これじゃ、なんのために村に参加したのか、わからないよね。だから死んでしまうことにしている。\n<br>\n事情があってなかなか喋れないとき、事情よりもゲームを優先するのはとても難しいことだ。だから、ゲームの時間が残るように、計算高くいろいろ企むといい。\n<br>\n突然死をすると有利になる状況は、よく探すとごろごろしてる。けれど狙わないこと。それはルール違反だ。"
        }
      ]
    },
    "village": {
      "head": "村のルール（編集可能）",
      "list": [
        {
          "head": "多重ログインをしない。",
          "text": "つまり、同じ人が同じ村に、複数のキャラクターで参加してはいけない。それは狡いし、簡単に勝てるチョロい方法なんだ。そんな程度の勝ち方じゃつまらないだろ？"
        }, {
          "head": "システムの出力内容を、そのまま書き写さない。",
          "text": "きみなりの言葉で、伝えるべき内容を主張するんだ。そのほうが面白いし、きみの言葉を人間の綴る発言として読んで貰える。\nコンピューターのアウトプットしたオクテットストリングスなんかではなくてね。\n<br>\nそして読むときにも、機械っぽい正確さに頼らないこと。そんな考え方をしたせいで推理を誤ったって、誰のせいにもできない。"
        }, {
          "head": "エピローグまで秘密を守る。参加中の村の内容は秘密だ。",
          "text": "きみ自身の役職、相方の存在、判定、思考していることなど、村に関わることを村の外で話してはいけない。場外乱闘はせず、\n<a title=\"プロレスと違って、１０秒以内でもダメ。\">リングで戦う</a>\nこと。"
        }, {
          "head": "エピローグまで秘密を守る。希望した能力、画面を見ているきみが何者なのかは秘密だ。",
          "text": "これらの情報は、一方的に有利に働いたり、進行中に思考を変質させたりする。もう知っていることは忘れなくてかまわないが、黙ってること。"
        }, {
          "head": "エピローグまで勝利を目指す。",
          "text": "誰かに急ぎ決着したい事情があろうと、誰かに諦めろと唆されようと、見るに耐えない仲間割れがあろうと、きみ自身に勝ち目がまったく考え出せなかろうと、\nルールを守り、そして、勝利を目指すこと。特殊な勝敗ルールがある村では、その勝利を目指すんだ。"
        }
      ]
    },
    "maker": {
      "head": "村を建てるかたへ",
      "text": "",
      "list": [
        {
          "head": "村のルールは、プロローグ終了までに取り決めよう。",
          "text": "村建てフォームには標準的なルールが最初から記してある。賛同する内容はそのまま残し、不足なら筆を加え、余分と思ったルールは削除して村を建てよう。\n<br>\n一部の項目（国のルール）は編集できないようになってる。それは必須事項で、必ず守らなくてはならないからなんだ。村のルールで国のルールを否定しないこと。\n<br>\n書き忘れはないかな？１日目が始まると参加者に役職がつき、先を予測して行動し始める。\n途中でルールに加筆・修正があると予測が御破算になり、それでも既にしてしまった発言は元に戻らないんだ。"
        }, {
          "head": "プロローグでは、村にふさわしくないと感じた参加者を追い払える。",
          "text": "できるならば、どういった点がふさわしくないか説明し、反省と改善を促そう。もしも気持ちが通じて、まずいところを改めて参加しなおして貰えれば最高だ。\n<br>\nいやな予感がしたのによく考えず、そのまま開始するのはやめておこう。引き返せなくなってから破綻して、当人を含め皆が不幸せになる。"
        }, {
          "head": "必要なら、本来の更新日を一日のばせる。",
          "text": "在席困難なひとにチャンスを与え、全員に考える時間がたっぷり与えることが可能だ。\nこの機能は２度まで使えるけれど、嘘をつかなくていい陣営にとって有利に働くので、慎重に扱うこと。最初に予想していたゲームバランスとは、違ってくるだろうね。\n<br>\nどういった事態になったらこの機能を使うのか、また、機能行使のポリシーを予め表明しておけるかどうか、考えておくといい。"
        }, {
          "head": "ルールは全員が理解してる？そうでないなら、どうしよう？",
          "text": "ルールを守れるのは、解ってる人が集まるからだ。\n複雑なルールを加えていない？\n難解千萬ナル國語表現ニ陥リテ如何（むずかしい言葉をつかってない）？\nルールは見やすく掲示してある？\n疑問にすっきり答えきっている？"
        }, {
          "head": "この村のモラルの程度と方向性は？",
          "text": "「こだわり」アイコンは、もしもあらかじめやりたいことがあれば、それを表現するためにある。\n<br>\nだけどきみの思いはアイコン一つじゃ伝わりきらないかもね。キーボードをもっと使って、言葉でとっくり説明したほうがいいかも！"
        }, {
          "head": "記号など（■、*、[]）の扱い方を取り決める？決めるならどう決める？",
          "text": "ちょっと暗記しておくと便利な記号の使い方があるんだ。詳しい人に聞いて、気に入ったら使ってみるといい。\nただし、取り決めてないなら、黙っていきなり使っても理解して貰えるとは思わないこと。"
        }, {
          "head": "黒幕見物人（場を支配する特権を持つ）のご紹介",
          "text": "黒幕見物人という、強力な役割があるんだ。とても強力な４つの特殊能\\力がある。ルール違反について、罰則を黒幕が執り行うというやり方も考えられる。\nただし、どの程度の罰則を課すのか予め示しておこう。"
        }
      ]
    },
    "player": {
      "head": "参加者の心構え",
      "text": "",
      "list": [
        {
          "head": "これは会話を楽しむゲームだ。",
          "text": "きみの会話内容は評価される。絶賛されることも、酷評されることもあるだろうね。"
        }, {
          "head": "キャラクターを通して発言しよう。",
          "text": "もしも画面を見ているきみ自身が言葉を綴りたくなったなら、ちょっと落ち着いてみよう。ほんとうにその言葉は、キャラクターでは口にできないことかな？\n<br>\nそして、落ち着いて考えてもその言葉が必要だと判断したら、もう躊躇わなくていい。"
        }, {
          "head": "発言や行動に、うまく思いやりをこめられた？",
          "text": "きみ以外の参加者にも、尊重されるべき人格がある。彼等は敬意を受けるべきだ。それは味方に限らず、その村のライバルたちにも等しくね。きみの腕前の見せどころだ。\n<br>\nただ、キャラクターがキャラクターに敬意を払うか、尊重するかはご自由に。"
        }, {
          "head": "発言や行動に、棘や毒がまだ残ってない？",
          "text": "紳士・淑女でいよう。きみがここにいるのは、周囲に刺々しさや毒気をばらまくためではなかったはずだ。"
        }, {
          "head": "言いたいことを言い尽くせた？そうでないなら、なぜ？",
          "text": "更新までの時間や発言は、とても限られている。思いやりが不十分だったり、刺々しさや毒気が残ってしまったとしても、懸命に考えたならやむを得ない。\n自分自身の未熟さを認めて発言ボタンを押そう。"
        }, {
          "head": "きみへの論評に反論する？それとも受け入れる？それはなんのため？",
          "text": "多くの評価がきみに向けられる。どう対応するのかで、きみは味方にも、敵にも、美しくも、情けなくも見えるだろうね。今日のきみは、周囲からどう見えると好都合だろう。"
        }, {
          "head": "その嘘、ほんと？",
          "text": "言葉はどれも嘘かもしれないし、本当かもしれない。あっていい言葉が欠けているかもしれない。どうやって見極めよう？どうして見極めきれないんだろう？"
        }, {
          "head": "参加時間はお好みで。",
          "text": "きみが好む時間に参加したいのと同様に、他の同村者も好む時間に参加したい。さて、どうやって両立させようか？"
        }, {
          "head": "この村がすべてという姿勢を貫こう。",
          "text": "もし浮気がばれてしまうと、悲しいことになる。皆が傷つき、きみは信用を失う。事実がどうであれ、掛け持ちで別村にいた、他の娯楽に現を抜かしていた、などと白状しないこと。\nたとえ厳しい追及にあっても、しらを切るほうがいい。\n<br>\n最初から浮気しない方法は、正直でいられる点でとても強力な防衛手段になる。"
        }, {
          "head": "能力には期待がかかる。受け止めきれるかな？",
          "text": "投票、占い、襲撃、守護、etc...。これらの能力をあてにして、皆が作戦を立てたり決断をしたりする。特に投票や占いでは、はっきりと要望されることも珍しくない。\nそれらの要求に、きみは応えきれるだろうか。また、応えきれないなら、どうしたらいいだろう。"
        }, {
          "head": "役割には期待がかかる。受け止めきれるかな？",
          "text": "まとめ役、役職CO、白黒つかない灰、etc...。こうした役割が決まってくると、どう振る舞うか期待されはじめるんだ。それを把握できているかな。\nわからないなら、どうやって知っていこう。そして、きみは期待に応えきれるだろうか。"
        }, {
          "head": "楽しく参加できた？",
          "text": "楽しく語り、聞き、素敵なひとときを過ごせたろうか。また、同様に楽しみたいと集まっている村の友人達は楽しめているだろうか。\n残念にもそうでないとしたら、どうしたら楽しくなるだろう。"
        }, {
          "head": "今日も健康でいられた？",
          "text": "健康を維持するのはとても大変なことだ。今日のきみはやり遂げただろうか。このゲームを楽しむことが引き金になって、健康を害してしまってはつまらないね。"
        }
      ]
    }
  };

}).call(this);

(function(){
  new Mem.Rule("action").schema(function(){
    var index;
    this.order("index");
    this.scope(function(all){
      return {
        for_form: function(mestype, format){
          return all;
        }
      };
    });
    this['default'](function(){});
    index = 0;
    this.deploy(function(o){
      var ref$;
      if (!o.index) {
        o.index = index += 1;
      }
      o._id = o.index;
      return (ref$ = o.target) != null
        ? ref$
        : o.target = true;
    });
    return this.map_reduce(function(o){});
  });
  Mem.Collection.action.set([
    {
      "index": -5,
      "text": "に話の続きを促した。_REST_"
    }, {
      "index": -4,
      "target": false,
      "text": "ここまで読んだ。"
    }, {
      "index": -3,
      "text": "のセキュリティ・クリアランスを引き上げた。"
    }, {
      "index": -2,
      "text": "のセキュリティ・クリアランスを引き下ろした。"
    }, {
      "index": -1,
      "text": "に別れを告げた。次のクローンはもっとうまくやるだろう。_COUNT_"
    }, {
      "text": "につかいこまれた。"
    }, {
      "text": "にスパム缶を押しつけた。"
    }, {
      "text": "に画期的なミッションを提案した。さあ、きみも参加しよう！"
    }, {
      "text": "にロケットシューズを差し出した。10、9、8、……"
    }, {
      "text": "に「Thiotimoline」と書かれた注射を投与した。"
    }, {
      "text": "にアスベストアーマーを謹んで進呈した。"
    }, {
      "text": "にゴシゴシボットをけしかけた。"
    }, {
      "text": "にあっかんべーをした。"
    }, {
      "text": "にむぎゅうした。"
    }, {
      "text": "にクラクションを鳴らした。"
    }, {
      "text": "にお辞儀をした。"
    }, {
      "text": "にひどくうろたえた。"
    }, {
      "text": "に謹んで賄賂を差し出した。"
    }, {
      "text": "が悪の秘密結社に狙われていると確信した。"
    }, {
      "text": "が悪の秘密結社に唆されていると確信した。"
    }, {
      "text": "を不信の目で見た。"
    }, {
      "text": "をつんつんつついた。"
    }, {
      "text": "を秘密警察(IntSec)に通報しますた。"
    }, {
      "text": "をじっと見つめた。"
    }, {
      "text": "を慰める振りをした。"
    }, {
      "text": "を巻き添えにした。"
    }, {
      "text": "を秘密結社に招待した。"
    }, {
      "text": "を「同志！」と呼んでみた。"
    }, {
      "text": "を空の彼方にぶっ飛ばした。"
    }, {
      "text": "をセラミックハリセンで殴った。"
    }, {
      "text": "を純白(Ultra-Violet)のハリセンで殴った。"
    }, {
      "text": "を自殺的ボランティアに推薦した。"
    }, {
      "text": "を電子レンジで乾かしてさしあげた。"
    }, {
      "text": "をプラズマキャノンの的にしてみた。"
    }, {
      "text": "をトンデモ理論で弁護した。"
    }, {
      "text": "を冷凍庫に放り込んだ。"
    }, {
      "text": "を医療ポッドに捧げた。"
    }, {
      "text": "の装備を取り上げて、じろじろ覗き込んだ。"
    }, {
      "text": "の足下を指さした。たいへん、地面がありませんよ。"
    }, {
      "text": "の頭を撫でた。"
    }, {
      "text": "の肩を叩いた。"
    }, {
      "text": "の行いを、最新の「反逆っぽい行動リスト」から見つけ出した。"
    }, {
      "text": "の靴をほこりひとつないほどに舐め回した。"
    }, {
      "text": "のチョコレートを借用した。"
    }, {
      "text": "の見てない隙に、すべてをやりとげた。"
    }, {
      "text": "と試用したR&Dの新装備に、Ａ評価をつけた。"
    }, {
      "text": "とにやりと微笑みあった。"
    }, {
      "text": "から逃げ出した！しかし、回り込まれてしまった！"
    }
  ]);
}).call(this);

(function() {
  var change_attr, checkbox, event, header, input, input_attr, labeler, radio, select, textarea;

  radio = function(params, attr, arg) {
    var _id, type, uri, val;
    _id = arg._id, type = arg.type;
    val = Mem.unpack[type];
    uri = Mem.pack[type];
    return function(value) {
      var now_val;
      now_val = params[_id];
      attr.value = uri(value);
      if (now_val === val(value)) {
        attr.checked = "checked";
      }
      return m("input", attr);
    };
  };

  checkbox = function(params, attr, arg) {
    var _id;
    _id = arg._id;
    return function() {
      var now_val;
      now_val = params[_id];
      if (now_val) {
        attr.checked = "checked";
      }
      return m("input", attr);
    };
  };

  input = function(params, attr, arg) {
    var _id, attr_value;
    _id = arg._id, attr_value = arg.attr_value;
    return function() {
      var now_val;
      now_val = params[_id];
      attr[attr_value] = now_val;
      return m("input", attr);
    };
  };

  textarea = function(params, attr, arg) {
    var _id;
    _id = arg._id;
    return function() {
      var now_val;
      now_val = params[_id];
      return m("textarea", attr, now_val);
    };
  };

  select = function(params, attr, arg) {
    var _id, init, name, options;
    _id = arg._id, name = arg.name, options = arg.options, init = arg.init;
    return function(data) {
      var key, now_option, now_val, option, selected, value;
      now_val = params[_id];
      now_option = options[now_val];
      selected = now_option ? null : "selected";
      return m('select', attr, !(attr.required && init) ? m('option', {
        selected: selected,
        value: "",
        key: name
      }, "- " + name + " -") : void 0, (function() {
        var results;
        results = [];
        for (value in options) {
          option = options[value];
          selected = now_val === value ? "selected" : null;
          key = value;
          results.push(m('option', {
            selected: selected,
            value: value,
            key: key
          }, data(option)));
        }
        return results;
      })());
    };
  };

  header = function(params, arg) {
    var label_attr, name;
    name = arg.name, label_attr = arg.label_attr;
    return function() {
      return m("label", label_attr, name);
    };
  };

  labeler = function(params, arg) {
    var _id, help_off, help_on, label_attr, options;
    _id = arg._id, label_attr = arg.label_attr, options = arg.options, help_on = arg.help_on, help_off = arg.help_off;
    return function(help) {
      var now_val;
      now_val = params[_id];
      return m("label", label_attr, help && now_val ? options ? help(options[now_val]) : help(now_val) : void 0, help_on || help_off ? now_val ? help_on : help_off : void 0);
    };
  };

  event = function(params, arg) {
    var _id, attr_value, type, val;
    _id = arg._id, type = arg.type, attr_value = arg.attr_value;
    val = Mem.unpack[type];
    return m.withAttr(attr_value, function(new_val) {
      return params[_id] = val(new_val);
    });
  };

  change_attr = function(e) {
    return {
      onchange: e
    };
  };

  input_attr = function(e) {
    return {
      oninput: e
    };
  };

  new Mem.Rule("option").schema(function() {
    this.scope(function(all) {
      all.form = function(params, list, gesture) {
        var attr, hash, i, init, key, len, ref, type;
        attr = gesture.form({});
        hash = {
          attr: attr
        };
        hash.by_cookie = function() {
          var cookie, i, key, len, match, ref, type;
          for (i = 0, len = list.length; i < len; i++) {
            key = list[i];
            ref = all.hash[key], cookie = ref.cookie, type = ref.type;
            if (cookie) {
              match = document.cookie.match(RegExp(key + "=([^;]+)"));
              if ((match != null ? match[1] : void 0) != null) {
                params[key] = Mem.unpack[type](decodeURI(match[1]));
              }
            }
          }
        };
        gesture.disable = function(b) {
          var i, key, len;
          for (i = 0, len = list.length; i < len; i++) {
            key = list[i];
            hash[key].attr.disabled = b;
          }
          return attr.disabled = b;
        };
        for (i = 0, len = list.length; i < len; i++) {
          key = list[i];
          ref = all.hash[key], init = ref.init, type = ref.type;
          hash[key] = all.hash[key].vdom(params);
          params[key] = Mem.unpack[type](init);
        }
        return hash;
      };
      return {
        checkbox: function() {
          return all.where(function(o) {
            return o.attr.type === 'checkbox';
          });
        },
        text: function() {
          return all.where(function(o) {
            return o.attr.type === 'text';
          });
        }
      };
    });
    return this.deploy(function(o) {
      var ref;
      o.option_id = o._id;
      if ((ref = o.attr) != null ? ref.name : void 0) {
        o.attr.key = o._id;
        o.attr.id = o.attr.name;
      }
      o.label_attr = {
        "for": o.attr.name
      };
      if (o.type == null) {
        o.type = "String";
      }
      switch (o.attr.type) {
        case "checkbox":
          o.type = "Bool";
          o.attr_value = "checked";
          return o.vdom = function(params) {
            var attr, field, head, label;
            attr = change_attr(event(params, o));
            attr = _.assign(o.attr, attr);
            head = header(params, o);
            label = labeler(params, o);
            field = checkbox(params, attr, o);
            return {
              attr: attr,
              head: head,
              label: label,
              field: field
            };
          };
        case "radio":
          o.attr_value = "value";
          return o.vdom = function(params) {
            var attr, field;
            attr = change_attr(event(params, o));
            attr = _.assign(o.attr, attr);
            field = radio(params, attr, o);
            return {
              attr: attr,
              field: field
            };
          };
        case "select":
          o.attr_value = "value";
          return o.vdom = function(params) {
            var attr, field, head, label;
            attr = change_attr(event(params, o));
            attr = _.assign(o.attr, attr);
            head = header(params, o);
            label = labeler(params, o);
            field = select(params, attr, o);
            return {
              attr: attr,
              head: head,
              label: label,
              field: field
            };
          };
        case "textarea":
          o.attr_value = "value";
          return o.vdom = function(params) {
            var attr, field, head, label;
            attr = input_attr(event(params, o));
            attr = _.assign(o.attr, attr);
            head = header(params, o);
            label = labeler(params, o);
            field = textarea(params, attr, o);
            return {
              attr: attr,
              head: head,
              label: label,
              field: field
            };
          };
        case "number":
          o.type = "Number";
          o.attr_value = "value";
          return o.vdom = function(params) {
            var attr, field, head, label;
            attr = input_attr(event(params, o));
            attr = _.assign(o.attr, attr);
            head = header(params, o);
            label = labeler(params, o);
            field = input(params, attr, o);
            return {
              attr: attr,
              head: head,
              label: label,
              field: field
            };
          };
        default:
          o.attr_value = "value";
          return o.vdom = function(params) {
            var attr, field, head, label;
            attr = input_attr(event(params, o));
            attr = _.assign(o.attr, attr);
            head = header(params, o);
            label = labeler(params, o);
            field = input(params, attr, o);
            return {
              attr: attr,
              head: head,
              label: label,
              field: field
            };
          };
      }
    });
  });

}).call(this);

(function() {
  new Mem.Rule("say").schema(function() {
    this.scope(function(all) {
      return {
        enable: function() {
          return all.where({
            _id: Mem.conf.folder.PERJURY.config.saycnt
          });
        }
      };
    });
    return this.deploy(function(o) {
      return o.say_id = o._id;
    });
  });

}).call(this);

(function() {
  var config;

  config = function(key) {
    return function() {
      this.scope(function(all) {
        return {
          enable: function() {
            return all.where(function(o) {
              return o.show;
            });
          }
        };
      });
      this.deploy(function(o) {
        return o[key + "_id"] = o._id;
      });
      return this.map_reduce(function(o) {});
    };
  };

  Mem.conf = {};

  new Mem.Rule("folder").schema(config("folder"));

  new Mem.Rule("live").schema(config("live"));

  new Mem.Rule("map_faces_order").schema(config("map_faces_order"));

  new Mem.Rule("rating").schema(config("rating"));

  new Mem.Rule("role_table").schema(config("role_table"));

  new Mem.Rule("rule").schema(config("rule"));

  new Mem.Rule("tag").schema(config("tag"));

  new Mem.Rule("theme").schema(config("theme"));

  new Mem.Rule("trs").schema(config("trs"));

  Mem.Collection.folder.set({
    "PERL_DEFAULT": {
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
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
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
    "UNION": {
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"
        }
      }
    },
    "BRAID": {
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"
        }
      }
    },
    "all": {
      "nation": "- すべて -"
    },
    "TEST": {
      "nation": "人狼議事テスト",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "PERJURY_OLD",
      "nation": "人狼議事RP:Bp",
      "vid_code": "Bp",
      "server": "utage.family.jp",
      "oldlog": "/perjury/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/perjury/sow.cgi?cmd=rss",
      "info_url": "/perjury/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/perjury/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "PRETENSE",
      "nation": "人狼議事RP:Advance",
      "vid_code": "A",
      "server": "utage.family.jp",
      "oldlog": "/pretense/sow.cgi?cmd=oldlog&rowall=on",
      "info_url": "/pretense/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/pretense/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      }
    },
    "RP": {
      "folder": "RP",
      "nation": "人狼議事RP:",
      "vid_code": "",
      "server": "utage.family.jp",
      "oldlog": "/rp/sow.cgi?cmd=oldlog&rowall=on",
      "info_url": "/rp/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/rp/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      }
    },
    "CABALA_OLD": {
      "folder": "CABALA",
      "nation": "人狼議事陰謀:",
      "vid_code": "C",
      "server": "utage.family.jp",
      "oldlog": "/cabala/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/cabala/sow.cgi?cmd=rss",
      "info_url": "/cabala/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/cabala/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://utage.family.jp/cabala",
          "BASEDIR_CGIERR": "http://utage.family.jp//cabala",
          "NAME_HOME": "人狼議事 陰謀の苑",
          "MAX_VILLAGES": 0
        },
        "pl": "/www/giji_log/cabala/config.pl"
      }
    },
    "ALLSTAR_OLD": {
      "folder": "ALLSTAR",
      "nation": "人狼議事大乱闘:A",
      "vid_code": "A",
      "server": "utage.family.jp",
      "oldlog": "/allstar/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/allstar/sow.cgi?cmd=rss",
      "info_url": "/allstar/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/allstar/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "ULTIMATE",
      "nation": "人狼議事大乱闘:",
      "vid_code": "",
      "server": "utage.family.jp",
      "oldlog": "/ultimate/sow.cgi?cmd=oldlog&rowall=on",
      "info_url": "/ultimate/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/ultimate/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      }
    },
    "WOLF": {
      "folder": "WOLF",
      "nation": "人狼議事標準",
      "vid_code": "",
      "server": "utage.family.jp",
      "oldlog": "/wolf/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/wolf/sow.cgi?cmd=rss",
      "info_url": "/wolf/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/wolf/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": false
      }
    },
    "PAN": {
      "folder": "PAN",
      "nation": "似顔絵人狼",
      "server": "soy-bean.sakura.ne.jp",
      "oldlog": "/pan/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/pan/sow.cgi?cmd=rss",
      "info_url": "/pan/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/pan/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": false
      },
      "config": {
        "csid": ["sow", "juna", "name", "bloody", "orange", "15girls", "tmmi", "cat", "bunmei"],
        "erb": "./asset/sow/pan.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "MORPHE",
      "nation": "人狼議事 モルペウス",
      "vid_code": "M",
      "server": "morphe.sakura.ne.jp",
      "oldlog": "/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/sow.cgi?cmd=rss",
      "info_url": "/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://morphe.sakura.ne.jp/morphe",
          "BASEDIR_CGIERR": "http://morphe.sakura.ne.jp/morphe//",
          "NAME_HOME": "人狼議事 夢の形",
          "MAX_VILLAGES": 4
        },
        "pl": "/www/giji_log/morphe/config.pl"
      }
    },
    "SOYBEAN": {
      "folder": "SOYBEAN",
      "nation": "人狼議事鯖の味噌煮",
      "vid_code": "Bs",
      "server": "soy-bean.sakura.ne.jp",
      "oldlog": "/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/sow.cgi?cmd=rss",
      "info_url": "/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "CIEL",
      "nation": "人狼議事RP:Cheat Ciel",
      "vid_code": "Cc",
      "server": "ciel.moo.jp",
      "oldlog": "/cheat/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/cheat/sow.cgi?cmd=rss",
      "info_url": "/cheat/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/cheat/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "BASEDIR_CGIERR": "http://ciel.moo.jp//cheat",
          "URL_SW": "http://ciel.moo.jp/cheat",
          "MAX_VILLAGES": 2,
          "NAME_HOME": "人狼議事 ciel<br>- Role Play Cheat -"
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
      "folder": "PERJURY",
      "nation": "人狼議事RP:Braid Perjury",
      "vid_code": "Bp",
      "server": "perjury.rulez.jp",
      "oldlog": "/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/sow.cgi?cmd=rss",
      "info_url": "/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "TYPE": "BRAID",
          "RULE": "PERJURY",
          "USERID_NPC": "master",
          "USERID_ADMIN": "admin",
          "ENABLED_VMAKE": 1,
          "TIMEOUT_ENTRY": 2,
          "TIMEOUT_SCRAP": 5,
          "TOPPAGE_INFO": "./_info.pl",
          "BASEDIR_CGI": ".",
          "BASEDIR_DAT": "./data",
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://perjury.rulez.jp",
          "BASEDIR_CGIERR": "http://perjury.rulez.jp//",
          "MAX_VILLAGES": 2,
          "NAME_HOME": "人狼議事 perjury rulez<br>- Role Play braid -"
        },
        "path": {
          "DIR_LIB": "./lib",
          "DIR_HTML": "./html",
          "DIR_RS": "./rs",
          "DIR_VIL": "./data/vil",
          "DIR_USER": "../sow/data/user"
        },
        "pl": "/www/giji_log/vage/config.pl"
      }
    },
    "XEBEC": {
      "folder": "XEBEC",
      "nation": "人狼議事RP:Braid XEBEC",
      "vid_code": "Bx",
      "server": "xebec.x0.to",
      "oldlog": "/xebec/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/xebec/sow.cgi?cmd=rss",
      "info_url": "/xebec/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/xebec/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://xebec.x0.to/xebec",
          "BASEDIR_CGIERR": "http://xebec.x0.to//xebec",
          "NAME_HOME": "人狼議事 xebec<br>- Role Play braid -",
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
      "folder": "CRAZY",
      "nation": "人狼議事RP:Braid Crazy",
      "vid_code": "Bc",
      "server": "crazy-crazy.sakura.ne.jp",
      "oldlog": "/crazy/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/crazy/sow.cgi?cmd=rss",
      "info_url": "/crazy/sow.cgi?\\ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/crazy/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "WOLF",
        "role_play": true
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://crazy-crazy.sakura.ne.jp/crazy",
          "BASEDIR_CGIERR": "http://crazy-crazy.sakura.ne.jp//crazy",
          "NAME_HOME": "人狼議事 crazy<br>- Role Play braid -",
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
      "folder": "CABALA",
      "nation": "人狼議事CabalaCafe",
      "vid_code": "C",
      "server": "cabala.halfmoon.jp",
      "oldlog": "/cafe/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/cafe/sow.cgi?cmd=rss",
      "info_url": "/cafe/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/cafe/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
          "URL_SW": "http://cabala.halfmoon.jp/cafe",
          "BASEDIR_CGIERR": "http://cabala.halfmoon.jp//cafe",
          "NAME_HOME": "人狼議事 Cabala Cafe",
          "MAX_VILLAGES": 4
        },
        "pl": "/www/giji_log/cafe/config.pl"
      }
    },
    "ALLSTAR": {
      "folder": "ALLSTAR",
      "nation": "人狼議事大乱闘:AllStar",
      "vid_code": "A",
      "server": "jinro.jksy.org",
      "oldlog": "/~nanakorobi?cmd=oldlog&rowall=on",
      "livelog": "/~nanakorobi?cmd=rss",
      "info_url": "/~nanakorobi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/~nanakorobi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "LOBBY",
      "nation": "人狼議事ロビー",
      "vid_code": "L",
      "server": "crazy-crazy.sakura.ne.jp",
      "oldlog": "/giji_lobby/lobby/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/giji_lobby/lobby/sow.cgi?cmd=rss",
      "info_url": "/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      },
      "config": {
        "csid": ["ririnra", "ririnra_c05", "ririnra_c08", "ririnra_c19", "ririnra_c67", "ririnra_c68", "ririnra_c72", "ririnra_c51", "ririnra_c20", "ririnra_c32", "all", "mad", "mad_mad05", "time", "ger", "animal", "school", "changed", "changed_m05", "SF", "SF_sf10", "wa", "wa_w23"],
        "erb": "./asset/sow/giji.pl.erb",
        "cd_default": "戦",
        "maxsize": {
          "MAXSIZE_ACTION": 60,
          "MAXSIZE_MEMOCNT": 1000,
          "MAXSIZE_MEMOLINE": 25
        },
        "saycnt": ["lobby"],
        "game": ["TABULA", "LIVE_TABULA", "MILLERHOLLOW", "LIVE_MILLERHOLLOW", "TROUBLE", "MISTERY", "SECRET"],
        "trsid": ["sow", "all", "star", "regend", "heavy", "complexx", "tabula", "millerhollow", "ultimate"],
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
          "BASEDIR_DOC": "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com",
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
      "folder": "OFFPARTY",
      "nation": "人狼議事オフ相談所",
      "vid_code": "P",
      "server": "party.ps.land.to",
      "oldlog": "/kitchen/sow.cgi?cmd=oldlog&rowall=on",
      "livelog": "/kitchen/sow.cgi?cmd=rss",
      "info_url": "/kitchen/sow.cgi?ua=mb&vid=%s&cmd=vinfo",
      "epi_url": "/kitchen/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50",
      "story": {
        "evil": "EVIL",
        "role_play": false
      }
    }
  });

  Mem.Collection.live.set({
    "live": {
      "name": "生存者",
      "order": 2
    },
    "executed": {
      "name": "処刑",
      "order": 3
    },
    "victim": {
      "name": "襲撃",
      "caption": "犠牲者",
      "order": 4
    },
    "cursed": {
      "name": "呪詛",
      "caption": "犠牲者",
      "order": 5
    },
    "droop": {
      "name": "衰退",
      "caption": "犠牲者",
      "order": 6
    },
    "suicide": {
      "name": "後追",
      "caption": "犠牲者",
      "order": 7
    },
    "feared": {
      "name": "恐怖",
      "caption": "犠牲者",
      "order": 8
    },
    "mob": {
      "name": "見物人",
      "order": 10
    },
    "suddendead": {
      "name": "突然死",
      "order": 100
    },
    "leave": {
      "name": "―",
      "order": 101
    }
  });

  Mem.Collection.map_faces_order.set({
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
  });

  Mem.Collection.option.set({
    "header_state": {
      "attr": {
        "className": "invisible",
        "type": "radio"
      },
      "init": "finish"
    },
    "vote_sign": {
      "attr": {
        "name": "votetype",
        "type": "checkbox"
      },
      "query": {},
      "name": "記名投票",
      "help_on": "記名で投票　※集計結果に投票者が記されます",
      "help_off": "匿名で投票　※集計結果は人数のみになります"
    },
    "start_auto": {
      "attr": {
        "name": "starttype",
        "type": "checkbox"
      },
      "query": {},
      "name": "自動開始",
      "help_on": "更新時に、最少催行人数が集まっていると開始",
      "help_off": "村立て人が開始ボタンを押すと開始"
    },
    "seq_event": {
      "attr": {
        "name": "seqevent",
        "type": "checkbox"
      },
      "query": {
        "SOW": "seqevent"
      },
      "name": "固定事件簿",
      "help_on": "事件が順序どおりに発生する",
      "help_off": "事件はランダムに選ばれる"
    },
    "show_id": {
      "attr": {
        "name": "showid",
        "type": "checkbox"
      },
      "query": {
        "SOW": "showid"
      },
      "name": "ID公開",
      "help_on": "進行中にユーザーIDを公開する",
      "help_off": "エピローグまで、ユーザーIDを秘密にする"
    },
    "entrust": {
      "attr": {
        "name": "entrust",
        "type": "checkbox"
      },
      "query": {
        "SOW": "entrust"
      },
      "name": "委任投票",
      "init": true,
      "help_on": "委任投票ができる",
      "help_off": "委任投票ができない"
    },
    "not_select_role": {
      "attr": {
        "name": "noselrole",
        "type": "checkbox"
      },
      "query": {
        "SOW": "noselrole"
      },
      "name": "役職希望",
      "init": true,
      "help_on": "役職希望を無視する",
      "help_off": "役職希望を受け付ける"
    },
    "random_target": {
      "attr": {
        "name": "randomtarget",
        "type": "checkbox"
      },
      "query": {
        "SOW": "randomtarget"
      },
      "name": "ランダム",
      "help_on": "投票・能力の対象に「ランダム」が選択できる",
      "help_off": "投票・能力の対象は「ランダム」にできない"
    },
    "undead_talk": {
      "attr": {
        "name": "undead",
        "type": "checkbox"
      },
      "query": {
        "SOW": "undead"
      },
      "name": "幽界トーク",
      "help_on": "狼・妖精と死者との間で、会話ができる",
      "help_off": "狼・妖精と死者は会話を交わせない"
    },
    "aiming_talk": {
      "attr": {
        "name": "aiming",
        "type": "checkbox"
      },
      "query": {
        "SOW": "aiming"
      },
      "name": "内緒話",
      "help_on": "ふたりだけの内緒話をすることができる",
      "help_off": "ふたりだけの内緒話は選べない"
    },
    "vil_name": {
      "attr": {
        "name": "vname",
        "type": "text",
        "size": 20,
        "maxlength": 20,
        "required": "required",
        "pattern": ".{6,20}"
      },
      "query": {
        "SOW": "vname"
      },
      "name": null,
      "help_on": null,
      "help_off": null
    },
    "vil_comment": {
      "attr": {
        "name": "vcomment",
        "type": "textarea",
        "cols": 30,
        "rows": 10,
        "style": "width: 100%"
      },
      "query": {
        "SOW": "vcomment"
      },
      "name": null,
      "help_on": null,
      "help_off": null
    },
    "uid": {
      "attr": {
        "type": "text",
        "name": "uid",
        "size": 10,
        "maxlength": 20
      },
      "query": {},
      "name": "アカウント",
      "cookie": true,
      "help_on": null,
      "help_off": null
    },
    "pwd": {
      "attr": {
        "type": "password",
        "name": "pwd",
        "size": 10,
        "maxlength": 20
      },
      "query": {},
      "name": "パスワード",
      "cookie": true,
      "help_on": null,
      "help_off": null
    },
    "entry_password": {
      "attr": {
        "type": "text",
        "name": "entrypwd",
        "size": 8,
        "maxlength": 8,
        "pattern": "[a-zA-Z0-9]{0,8}"
      },
      "query": {
        "SOW": "entrypwd"
      },
      "name": "参加制限",
      "help_on": "参加者はパスワードを入力する",
      "help_off": "参加制限しない　※パスワードをつけると、鍵付きの村になります。"
    },
    "player_count": {
      "attr": {
        "type": "number",
        "name": "vplcnt",
        "min": 4,
        "max": 20,
        "step": 1,
        "required": "required"
      },
      "query": {
        "SOW": "vplcnt"
      },
      "name": "定員",
      "help_on": "人が定員です。",
      "help_off": "定員　※入力してください。"
    },
    "player_count_start": {
      "attr": {
        "type": "number",
        "name": "vplcntstart",
        "min": 4,
        "max": 20,
        "step": 1,
        "required": "required"
      },
      "query": {
        "SOW": "vplcntstart"
      },
      "name": "最少催行人員",
      "help_on": "人以上で開始します。",
      "help_off": "最少催行人数　※入力してください。"
    },
    "time": {
      "attr": {
        "type": "time",
        "name": "time",
        "step": 1800,
        "required": "required"
      },
      "query": {},
      "init": "22:30",
      "name": "更新時刻",
      "help_on": "に更新します。",
      "help_off": "更新時刻　※入力してください。"
    },
    "interval": {
      "attr": {
        "type": "select",
        "name": "updinterval",
        "required": "required"
      },
      "query": {
        "SOW": "updinterval"
      },
      "init": 1,
      "options": {
        "1": {
          "_id": 1,
          "caption": "24時間"
        },
        "2": {
          "_id": 2,
          "caption": "48時間"
        },
        "3": {
          "_id": 3,
          "caption": "72時間"
        }
      },
      "name": "更新間隔",
      "help_on": "ごとに更新します。",
      "help_off": "※入力してください。"
    },
    "game_rule": {
      "attr": {
        "type": "select",
        "name": "game",
        "required": "required"
      },
      "query": {
        "SOW": "game"
      },
      "name": "ゲームルール",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "rating": {
      "attr": {
        "type": "select",
        "name": "rating",
        "required": "required"
      },
      "query": {
        "SOW": "rating"
      },
      "init": "default",
      "name": "こだわり",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "chr_set": {
      "attr": {
        "type": "select",
        "name": "chr_set",
        "required": "required"
      },
      "query": {},
      "name": "登場人物",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "chr_npc": {
      "attr": {
        "type": "select",
        "name": "csid",
        "required": "required"
      },
      "query": {},
      "name": "登場人物とNPC",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "say_count": {
      "attr": {
        "type": "select",
        "name": "saycnttype",
        "required": "required"
      },
      "query": {
        "SOW": "saycnttype"
      },
      "name": "発言制限",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "role_table": {
      "attr": {
        "type": "select",
        "name": "roletable",
        "required": "required"
      },
      "query": {
        "SOW": "roletable"
      },
      "init": "default",
      "name": "役職配分",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "mob_type": {
      "attr": {
        "type": "select",
        "name": "mob",
        "required": "required"
      },
      "name": "見物スタイル",
      "help_on": "",
      "help_off": "※入力してください。"
    },
    "trs_type": {
      "attr": {
        "type": "select",
        "name": "trsid",
        "required": "required"
      },
      "query": {
        "SOW": "trsid"
      },
      "init": "all",
      "name": "地の文章",
      "help_on": "",
      "help_off": "※入力してください。"
    }
  });

  Mem.Collection.rating.set({
    "0": {
      "caption": "0",
      "alt": ""
    },
    "default": {
      "caption": "とくになし",
      "show": true
    },
    "love": {
      "caption": "[愛] 恋愛を重視",
      "alt": "愛",
      "show": true
    },
    "sexy": {
      "caption": "[性] 性表現あり",
      "alt": "性",
      "show": true
    },
    "sexylove": {
      "caption": "[性愛] 大人の恋愛",
      "alt": "性愛",
      "show": true
    },
    "violence": {
      "caption": "[暴] 暴力、グロ",
      "alt": "暴",
      "show": true
    },
    "sexyviolence": {
      "caption": "[性暴] えろぐろ",
      "alt": "性暴",
      "show": true
    },
    "teller": {
      "caption": "[怖] 恐怖を煽る",
      "alt": "怖",
      "show": true
    },
    "drunk": {
      "caption": "[楽] 享楽に耽る",
      "alt": "楽",
      "show": true
    },
    "gamble": {
      "caption": "[賭] 賭博に耽る",
      "alt": "賭",
      "show": true
    },
    "crime": {
      "caption": "[罪] 犯罪描写あり",
      "alt": "罪",
      "show": true
    },
    "drug": {
      "caption": "[薬] 薬物表現あり",
      "alt": "薬",
      "show": true
    },
    "word": {
      "caption": "[言] 殺伐、暴言あり",
      "alt": "言",
      "show": true
    },
    "fireplace": {
      "caption": "[暢] のんびり雑談",
      "alt": "暢",
      "show": true
    },
    "appare": {
      "caption": "[遖] あっぱれネタ風味",
      "alt": "遖",
      "show": true
    },
    "ukkari": {
      "caption": "[張] うっかりハリセン",
      "alt": "張",
      "show": true
    },
    "child": {
      "caption": "[全] 大人も子供も初心者も、みんな安心",
      "alt": "全",
      "show": true
    },
    "biohazard": {
      "caption": "[危] 無茶ぶり上等",
      "alt": "危",
      "show": true
    },
    "null": {
      "caption": "null",
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
  });

  Mem.Collection.role_table.set({
    "secret": {
      "name": "詳細は黒幕だけが知っています。"
    },
    "ultimate": {
      "name": "アルティメット"
    },
    "lover": {
      "name": "恋愛天使"
    },
    "hamster": {
      "name": "ハムスター"
    },
    "random": {
      "name": "ランダム"
    },
    "custom": {
      "name": "自由設定",
      "show": true
    },
    "default": {
      "name": "標準",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "wolf"], ["villager", "villager", "seer", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "fanatic", "medium", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "stigma"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "stigma", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "wisper", "medium", "villager", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "fm", "fm", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "fm", "fm", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "fm", "fm", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "fm", "fm", "villager", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "decide", "wolf", "guard", "possess", "medium", "villager", "possess", "fm", "fm", "villager", "villager", "villager", "villager", "villager", "villager"]]
    },
    "mistery": {
      "name": "深い霧の夜",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "lonewolf"], ["villager", "villager", "seer", "lonewolf", "alchemist"], ["villager", "villager", "guard", "lonewolf", "alchemist", "possess"], ["villager", "villager", "guard", "lonewolf", "alchemist", "decide", "possess", "fan"], ["villager", "villager", "guard", "wolf", "wolf", "alchemist", "decide", "aura", "doctor"], ["villager", "villager", "guard", "wolf", "wolf", "alchemist", "decide", "aura", "doctor", "villager"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "villager"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "villager"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "villager"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "alchemist"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "curse", "witch"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "curse", "witch", "wolf"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "curse", "witch", "wolf", "girl"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "curse", "witch", "wolf", "girl", "fan"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "curse", "witch", "wolf", "girl", "fan", "guru"], ["villager", "villager", "guard", "wolf", "childwolf", "alchemist", "decide", "aura", "doctor", "villager", "seer", "hunter", "medium", "jammer", "curse", "witch", "wolf", "girl", "fan", "guru", "alchemist"]]
    },
    "test1st": {
      "name": "人狼審問試験壱型",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "wolf"], ["villager", "villager", "seer", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "possess"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "possess", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "villager", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "villager", "wolf", "villager", "stigma"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "villager", "wolf", "villager", "stigma", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "villager", "wolf", "villager", "stigma", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "villager", "wolf", "villager", "villager", "fm", "fm", "possess"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "stigma", "villager", "wolf", "villager", "villager", "fm", "fm", "possess", "villager"]]
    },
    "test2nd": {
      "name": "人狼審問試験弐型",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "wolf"], ["villager", "villager", "seer", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "wolf", "fm", "fm"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "wolf", "fm", "fm", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "fanatic", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager", "villager", "villager"]]
    },
    "wbbs_c": {
      "name": "人狼BBS-C国",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "wolf"], ["villager", "villager", "seer", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "wolf", "fm", "fm"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "wolf", "fm", "fm", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "wisper", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager", "villager", "villager"]]
    },
    "wbbs_f": {
      "name": "人狼BBS-F国",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "wolf"], ["villager", "villager", "seer", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "wolf", "fm", "fm"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "wolf", "fm", "fm", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "villager", "wolf", "fm", "fm", "villager", "villager", "villager", "villager"]]
    },
    "wbbs_g": {
      "name": "人狼BBS-G国",
      "show": true,
      "cards": [null, null, null, null, ["villager", "villager", "seer", "wolf"], ["villager", "villager", "seer", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager", "villager", "villager", "villager", "villager", "villager"], ["villager", "villager", "seer", "wolf", "villager", "villager", "villager", "wolf", "medium", "possess", "guard", "villager", "wolf", "villager", "villager", "villager", "villager", "villager", "villager", "villager"]]
    }
  });

  Mem.Collection.rule.set({
    "TABULA": {
      "show": true,
      "CAPTION": "タブラの人狼",
      "HELP": "<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"
    },
    "MILLERHOLLOW": {
      "show": true,
      "CAPTION": "ミラーズホロウ",
      "HELP": "<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>すべての死者は役職が公開される。\n<li>狼を全滅させると、村勝利。\n<li>「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"
    },
    "LIVE_TABULA": {
      "show": true,
      "CAPTION": "タブラの人狼（死んだら負け）",
      "HELP": "<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"
    },
    "LIVE_MILLERHOLLOW": {
      "show": true,
      "CAPTION": "ミラーズホロウ（死んだら負け）",
      "HELP": "<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"
    },
    "TROUBLE": {
      "show": true,
      "CAPTION": "Trouble☆Aliens",
      "HELP": "<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"
    },
    "MISTERY": {
      "show": true,
      "CAPTION": "深い霧の夜",
      "HELP": "<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>村側は自分の役職を自覚しない。\n<li>村側は、能力の結果不審者を見かけることがある。\n<li>人狼の行動対象に選ばれると、不審者を見かける。\n<li>狼を全滅させると、村勝利。\n<li>役職「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"
    },
    "VOV": {
      "CAPTION": "狂犬病の谷",
      "HELP": "<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"
    },
    "SECRET": {
      "show": true,
      "CAPTION": "陰謀に集う胡蝶",
      "HELP": "<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n<li>いかなる場合も、死んでしまったものは敗北である。\n"
    }
  });

  Mem.Collection.say.set({
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
  });

  Mem.Collection.tag.set({
    "all": {
      "name": "すべて",
      "long": "「人狼議事 ちゃんぷる」のキャラクター",
      "chr_set_ids": ["all"]
    },
    "giji": {
      "name": "人狼議事",
      "long": "「人狼議事」のキャラクター",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "shoji": {
      "name": "てやんでえ",
      "long": "「和の国てやんでえ」のキャラクター",
      "chr_set_ids": ["all", "wa"]
    },
    "travel": {
      "name": "帰還者議事",
      "long": "「帰還者議事」のキャラクター",
      "chr_set_ids": ["all", "time"]
    },
    "stratos": {
      "name": "明後日への道標",
      "long": "「明後日への道標」のキャラクター",
      "chr_set_ids": ["all", "SF"]
    },
    "myth": {
      "name": "はおうのひろば",
      "long": "「はおうのひろば」のキャラクター",
      "chr_set_ids": ["all", "changed"]
    },
    "asia": {
      "name": "大陸議事",
      "long": "「大陸議事」のキャラクター",
      "chr_set_ids": ["all", "ger"]
    },
    "marchen": {
      "name": "狂騒議事",
      "long": "「狂騒議事」のキャラクター",
      "chr_set_ids": ["all", "mad"]
    },
    "kid": {
      "name": "(児童)",
      "long": "児童のキャラクター",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "young": {
      "name": "(若者)",
      "long": "若者のキャラクター",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "middle": {
      "name": "(中年)",
      "long": "中年のキャラクター",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "elder": {
      "name": "(老人)",
      "long": "老人のキャラクター",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "river": {
      "name": "-運河-",
      "long": "往く人来る人休む人",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "road": {
      "name": "-往来-",
      "long": "往く人来る人休む人",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "immoral": {
      "name": "-裏道-",
      "long": "街灯の裏の背徳達",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "guild": {
      "name": "-商工会-",
      "long": "商人と職人の集うギルド",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "elegant": {
      "name": "-舞踏会-",
      "long": "瀟洒な館の舞踏会",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "ecclesia": {
      "name": "-公教会-",
      "long": "信仰と道徳と学識の源泉",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "medical": {
      "name": "-施療院-",
      "long": "病苦毒霊と戦う砦",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "market": {
      "name": "-歌劇酒場-",
      "long": "芸の極みに華が咲く",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "apartment": {
      "name": "-自室の窓-",
      "long": "窓から外を眺めると",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "servant": {
      "name": "-使用人-",
      "long": "良家を支えるスタッフ",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "farm": {
      "name": "-森の農場-",
      "long": "森に接する田畑",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "government": {
      "name": "-統治公共-",
      "long": "所領を治める権能者",
      "chr_set_ids": ["all", "animal", "school", "ririnra"]
    },
    "god": {
      "name": "-かみさま-",
      "long": "かみさま",
      "chr_set_ids": ["all"]
    }
  });

  Mem.Collection.theme.set([
    {
      "_id": "juna",
      "item": "box-msg",
      "title": "審問",
      "width": {
        "458": ["b.jpg", "w.jpg"],
        "580": ["b.jpg", "w.jpg"],
        "770": ["morning.png", "lupino.png"]
      }
    }, {
      "_id": "sow",
      "item": "box-msg",
      "title": "物語",
      "width": {
        "458": ["r.jpg", "c.jpg"],
        "580": ["r.jpg", "c.jpg"],
        "770": ["morning.png", "lupino.png"]
      }
    }, {
      "_id": "night",
      "item": "speech",
      "title": "闇夜",
      "width": {
        "458": ["b.jpg", "w.jpg"],
        "580": ["b.jpg", "w.jpg"],
        "770": ["morning.png", "moon.png"]
      }
    }, {
      "_id": "moon",
      "item": "speech",
      "title": "月夜",
      "width": {
        "458": ["b.jpg", "w.jpg"],
        "580": ["b.jpg", "w.jpg"],
        "770": ["morning.png", "moon.png"]
      }
    }, {
      "_id": "cinema",
      "item": "speech",
      "title": "煉瓦",
      "width": {
        "458": ["b.jpg", "w.jpg"],
        "580": ["b.jpg", "w.jpg"],
        "770": ["morning.png", "lupino.png"]
      }
    }, {
      "_id": "wa",
      "item": "speech",
      "title": "和の国",
      "width": {
        "458": ["b.jpg", "w.jpg"],
        "580": ["b.jpg", "w.jpg"],
        "770": ["morning.png", "moon.png"]
      }
    }, {
      "_id": "star",
      "item": "speech",
      "title": "蒼穹",
      "width": {
        "458": ["r.jpg", "c.jpg"],
        "580": ["r.jpg", "c.jpg"],
        "770": ["morning.png", "lupino.png"]
      }
    }
  ]);

  Mem.Collection.trs.set({
    "all": {
      "show": true,
      "CAPTION": "オール☆スター",
      "HELP": "すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。また、進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。"
    },
    "star": {
      "show": true,
      "CAPTION": "Orbital☆Star",
      "HELP": "すべての役職、恩恵、事件を楽しむことができます。また、進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。<br>宇宙時代に突入した「全部入り」のセットです。村落共同体は渓谷や高原ではなく、小惑星帯や人工コロニー、移民船にあるでしょう。事件が始まるまでは、とても充実した近代的なインフラが整っていたのですが……"
    },
    "regend": {
      "show": true,
      "CAPTION": "議事☆伝承",
      "HELP": "すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。アクション内容は穏当になり、未来的ですばらしいクローンも居ません。"
    },
    "heavy": {
      "show": true,
      "CAPTION": "絶望☆議事",
      "HELP": "すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。たいへん重苦しい設定となっていて、未来的ですばらしいクローンも居ません。"
    },
    "complexx": {
      "show": true,
      "CAPTION": "ParanoiA",
      "HELP": "ようこそ、トラブルシューター。市民達は進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。<br>！注意！　入村直後の市民はクローンではありません。ただちに別れを告げてあげましょう。　！注意！"
    },
    "simple": {
      "CAPTION": "ラッキー☆スター",
      "HELP": "初心者向けの、シンプルな設定です。拡張設定の一部が固定になっています。"
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
      "HELP": "ようこそ、トラブルシューター。市民達は進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。<br>！注意！　入村直後の市民はクローンではありません。ただちに別れを告げてあげましょう。　！注意！"
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
  });

  Mem.conf.folder = Mem.Query.folders.hash;

  Mem.conf.live = Mem.Query.lives.hash;

  Mem.conf.map_faces_order = Mem.Query.map_faces_orders.hash;

  Mem.conf.option = Mem.Query.options.hash;

  Mem.conf.rating = Mem.Query.ratings.hash;

  Mem.conf.role_table = Mem.Query.role_tables.hash;

  Mem.conf.rule = Mem.Query.rules.hash;

  Mem.conf.say = Mem.Query.says.hash;

  Mem.conf.tag = Mem.Query.tags.hash;

  Mem.conf.theme = Mem.Query.themes.hash;

  Mem.conf.trs = Mem.Query.trss.hash;

}).call(this);

(function() {
  var _id, chr_set_id, face, face_id, job, list;

  new Mem.Rule("face").schema(function() {
    var item;
    this.has_many("chr_jobs");
    this.has_many("chr_npcs");
    this.order("order");
    this.scope(function(all) {
      return {
        tag: function(tag_id) {
          switch (tag_id) {
            case "all":
              return all;
            default:
              return all["in"]({
                tags: tag_id
              });
          }
        },
        chr_jobs: function(chr_job_id) {
          return all.where({
            chr_job_id: chr_job_id
          });
        },
        name_head: function() {
          var counts, i, idx, key, name, names, ref, ref1;
          counts = [];
          for (idx = i = ref = "ア".charCodeAt(0), ref1 = "ン".charCodeAt(0); ref <= ref1 ? i <= ref1 : i >= ref1; idx = ref <= ref1 ? ++i : --i) {
            key = String.fromCharCode(idx);
            names = all.where({
              name: RegExp("^" + key)
            }).pluck("name");
            if (counts[name = names.length] == null) {
              counts[name] = [];
            }
            counts[names.length].push("<" + key + ">" + (names.join(" ")));
          }
          return counts;
        }
      };
    });
    item = {
      count: 1
    };
    return this.map_reduce(function(o, emit) {
      var i, len, ref, results, tag;
      emit("all", "all", item);
      ref = o.tags;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        results.push(emit("tag", tag, item));
      }
      return results;
    });
  });

  new Mem.Rule("chr_set").schema(function() {
    this.order("caption");
    this.has_many("chr_jobs");
    return this.has_many("chr_npcs");
  });

  new Mem.Rule("chr_npc").schema(function() {
    this.order("caption");
    this.belongs_to("chr_set", {
      dependent: true
    });
    this.belongs_to("face", {
      dependent: true
    });
    return this.deploy(function(o) {});
  });

  new Mem.Rule("chr_job").schema(function() {
    var order;
    this.order(function(o) {
      return o.face.order;
    });
    this.belongs_to("chr_set", {
      dependent: true
    });
    this.belongs_to("face", {
      dependent: true
    });
    this.deploy(function(o) {
      o.chr_job_id = o._id;
      return o.chr_set_idx = order.indexOf(o.chr_set_id);
    });
    order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school", "all"];
    return this.scope(function(all) {
      return {
        face: function(face_id) {
          return all.where(function(o) {
            return face_id === o.face_id;
          }).sort(false, function(o) {
            return o.chr_set_idx;
          });
        }
      };
    });
  });

  Mem.Collection.face.set([
    {
      "_id": "c49",
      "comment": "test",
      "face_id": "c49",
      "name": "ボリス",
      "order": 1,
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c38",
      "order": 2,
      "face_id": "c38",
      "name": "コリーン",
      "tags": ["giji", "market", "young"]
    }, {
      "_id": "c77",
      "order": 3,
      "face_id": "c77",
      "name": "キャロライナ",
      "tags": ["giji", "servant", "road", "farm", "young"]
    }, {
      "_id": "c35",
      "order": 4,
      "face_id": "c35",
      "name": "ダン",
      "tags": ["giji", "guild", "middle"]
    }, {
      "_id": "c53",
      "order": 5,
      "face_id": "c53",
      "name": "ゼルダ",
      "tags": ["giji", "government", "farm", "elegant", "elder"]
    }, {
      "_id": "c74",
      "order": 6,
      "face_id": "c74",
      "name": "フランシスカ",
      "tags": ["giji", "market", "young"]
    }, {
      "_id": "c50",
      "order": 8,
      "face_id": "c50",
      "name": "ディーン",
      "tags": ["giji", "government", "guild", "young"]
    }, {
      "_id": "c36",
      "order": 8,
      "face_id": "c36",
      "name": "ミッシェル",
      "tags": ["giji", "guild", "servant", "young"]
    }, {
      "_id": "c26",
      "order": 8,
      "face_id": "c26",
      "name": "モニカ",
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c09",
      "order": 9,
      "face_id": "c09",
      "name": "ヒロシ",
      "tags": ["giji", "immoral", "travel", "river", "middle"]
    }, {
      "_id": "c55",
      "order": 10,
      "face_id": "c55",
      "name": "パピヨン",
      "tags": ["giji", "apartment", "elegant", "middle"]
    }, {
      "_id": "c29",
      "order": 11,
      "face_id": "c29",
      "name": "イアン",
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c12",
      "order": 12,
      "face_id": "c12",
      "name": "バーナバス",
      "tags": ["giji", "servant", "road", "middle"]
    }, {
      "_id": "c16",
      "order": 127,
      "face_id": "c16",
      "name": "マリアンヌ",
      "tags": ["giji", "apartment", "market", "medical", "young"]
    }, {
      "_id": "c34",
      "order": 14,
      "face_id": "c34",
      "name": "トニー",
      "tags": ["giji", "road", "servant", "kid"]
    }, {
      "_id": "c44",
      "order": 15,
      "face_id": "c44",
      "name": "ドナルド",
      "tags": ["giji", "immoral", "young"]
    }, {
      "_id": "c11",
      "order": 16,
      "face_id": "c11",
      "name": "カルヴィン",
      "tags": ["giji", "elegant", "apartment", "kid"]
    }, {
      "_id": "c10",
      "order": 17,
      "face_id": "c10",
      "name": "ゾーイ",
      "tags": ["travel", "giji", "apartment", "kid"]
    }, {
      "_id": "c70",
      "order": 18,
      "face_id": "c70",
      "name": "パティ",
      "tags": ["giji", "servant", "apartment", "young"]
    }, {
      "_id": "c56",
      "order": 19,
      "face_id": "c56",
      "name": "ゴドウィン",
      "tags": ["giji", "guild", "market", "middle"]
    }, {
      "_id": "c07",
      "order": 20,
      "face_id": "c07",
      "name": "ティモシー",
      "tags": ["giji", "guild", "elder"]
    }, {
      "_id": "c41",
      "order": 21,
      "face_id": "c41",
      "name": "ヤニク",
      "tags": ["giji", "immoral", "river", "young"]
    }, {
      "_id": "c58",
      "order": 22,
      "face_id": "c58",
      "name": "ブルーノ",
      "tags": ["giji", "ecclesia", "middle", "elder"]
    }, {
      "_id": "c17",
      "order": 23,
      "face_id": "c17",
      "name": "ユリシーズ",
      "tags": ["giji", "market", "middle"]
    }, {
      "_id": "c39",
      "order": 24,
      "face_id": "c39",
      "name": "シビル",
      "tags": ["giji", "servant", "guild", "middle"]
    }, {
      "_id": "c40",
      "order": 25,
      "face_id": "c40",
      "name": "ハワード",
      "tags": ["giji", "servant", "elder"]
    }, {
      "_id": "c65",
      "order": 26,
      "face_id": "c65",
      "name": "ズリエル",
      "tags": ["giji", "immoral", "middle"]
    }, {
      "_id": "c59",
      "order": 27,
      "face_id": "c59",
      "name": "ムパムピス",
      "tags": ["giji", "ecclesia", "young"]
    }, {
      "_id": "c57",
      "order": 28,
      "face_id": "c57",
      "name": "ツェツィーリヤ",
      "tags": ["giji", "ecclesia", "young", "middle"]
    }, {
      "_id": "c04",
      "order": 29,
      "face_id": "c04",
      "name": "ノーリーン",
      "tags": ["giji", "servant", "middle"]
    }, {
      "_id": "c46",
      "order": 30,
      "face_id": "c46",
      "name": "ゲイル",
      "tags": ["giji", "apartment", "medical", "young", "middle"]
    }, {
      "_id": "c14",
      "order": 31,
      "face_id": "c14",
      "name": "レティーシャ",
      "tags": ["giji", "ecclesia", "kid"]
    }, {
      "_id": "c42",
      "order": 33,
      "face_id": "c42",
      "name": "ラルフ",
      "tags": ["giji", "servant", "young"]
    }, {
      "_id": "c37",
      "order": 34,
      "face_id": "c37",
      "name": "セシル",
      "tags": ["giji", "market", "young"]
    }, {
      "_id": "c75",
      "order": 35,
      "face_id": "c75",
      "name": "ビリー",
      "tags": ["giji", "market", "middle"]
    }, {
      "_id": "c32",
      "order": 36,
      "face_id": "c32",
      "name": "オスカー",
      "tags": ["giji", "apartment", "kid"]
    }, {
      "_id": "c33",
      "order": 37,
      "face_id": "c33",
      "name": "ホリー",
      "tags": ["giji", "apartment", "kid"]
    }, {
      "_id": "c02",
      "order": 38,
      "face_id": "c02",
      "name": "アルフレッド",
      "tags": ["giji", "government", "middle"]
    }, {
      "_id": "c66",
      "order": 39,
      "face_id": "c66",
      "name": "クリストファー",
      "tags": ["giji", "servant", "guild", "farm", "middle"]
    }, {
      "_id": "c24",
      "order": 41,
      "face_id": "c24",
      "name": "ナタリア",
      "tags": ["giji", "government", "apartment", "elder"]
    }, {
      "_id": "c79",
      "order": 42,
      "face_id": "c79",
      "name": "マーゴ",
      "tags": ["giji", "government", "apartment", "young"]
    }, {
      "_id": "c61",
      "order": 43,
      "face_id": "c61",
      "name": "ヌマタロウ",
      "tags": ["giji", "river", "farm", "elder"]
    }, {
      "_id": "c23",
      "order": 44,
      "face_id": "c23",
      "name": "チャールズ",
      "tags": ["giji", "ecclesia", "middle"]
    }, {
      "_id": "c28",
      "comment": "",
      "face_id": "c28",
      "name": "ケイト",
      "order": 47,
      "tags": ["giji", "apartment", "young"]
    }, {
      "_id": "c68",
      "order": 48,
      "face_id": "c68",
      "name": "ヨアヒム",
      "tags": ["giji", "market", "immoral", "elegant", "middle", "elder"]
    }, {
      "_id": "c30",
      "order": 49,
      "face_id": "c30",
      "name": "フィリップ",
      "tags": ["giji", "road", "river", "market", "young"]
    }, {
      "_id": "c21",
      "order": 50,
      "face_id": "c21",
      "name": "ニール",
      "tags": ["giji", "farm", "guild", "young", "middle"]
    }, {
      "_id": "c52",
      "order": 52,
      "face_id": "c52",
      "name": "ギリアン",
      "tags": ["giji", "medical", "ecclesia", "young"]
    }, {
      "_id": "c51",
      "order": 53,
      "face_id": "c51",
      "name": "ヨーランダ",
      "tags": ["giji", "medical", "ecclesia", "young"]
    }, {
      "_id": "c01",
      "comment": "",
      "face_id": "c01",
      "name": "メアリー",
      "order": 55,
      "tags": ["giji", "market", "road", "young"]
    }, {
      "_id": "c69",
      "order": 56,
      "face_id": "c69",
      "name": "ギネス",
      "tags": ["giji", "guild", "market", "middle"]
    }, {
      "_id": "c63",
      "order": 57,
      "face_id": "c63",
      "name": "ピッパ",
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c05",
      "order": 59,
      "face_id": "c05",
      "name": "キャサリン",
      "tags": ["giji", "medical", "young"]
    }, {
      "_id": "c22",
      "order": 60,
      "face_id": "c22",
      "name": "ワット",
      "tags": ["giji", "farm", "middle"]
    }, {
      "_id": "c62",
      "order": 61,
      "face_id": "c62",
      "name": "ヴェラ",
      "tags": ["giji", "immoral", "river", "middle"]
    }, {
      "_id": "c13",
      "order": 62,
      "face_id": "c13",
      "name": "ロミオ",
      "tags": ["giji", "medical", "elder"]
    }, {
      "_id": "c18",
      "order": 63,
      "face_id": "c18",
      "name": "エマ",
      "tags": ["giji", "medical", "elder"]
    }, {
      "_id": "c27",
      "order": 65,
      "face_id": "c27",
      "name": "リンダ",
      "tags": ["giji", "farm", "young"]
    }, {
      "_id": "c08",
      "order": 66,
      "face_id": "c08",
      "name": "ベネット",
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c19",
      "order": 67,
      "face_id": "c19",
      "name": "タバサ",
      "tags": ["giji", "immoral", "market", "young"]
    }, {
      "_id": "c71",
      "order": 70,
      "face_id": "c71",
      "name": "ノックス",
      "tags": ["giji", "road", "farm", "young"]
    }, {
      "_id": "c03",
      "order": 71,
      "face_id": "c03",
      "name": "スティーブン",
      "tags": ["giji", "medical", "middle"]
    }, {
      "_id": "c43",
      "order": 72,
      "face_id": "c43",
      "name": "ガストン",
      "tags": ["giji", "farm", "middle"]
    }, {
      "_id": "c15",
      "order": 73,
      "face_id": "c15",
      "name": "ウェーズリー",
      "tags": ["giji", "government", "road", "middle"]
    }, {
      "_id": "c54",
      "order": 75,
      "face_id": "c54",
      "name": "ザック",
      "tags": ["giji", "guild", "medical", "young"]
    }, {
      "_id": "c25",
      "order": 77,
      "face_id": "c25",
      "name": "ルーカス",
      "tags": ["giji", "elegant", "young"]
    }, {
      "_id": "c20",
      "order": 79,
      "face_id": "c20",
      "name": "グロリア",
      "tags": ["giji", "elegant", "young"]
    }, {
      "_id": "c72",
      "order": 81,
      "face_id": "c72",
      "name": "ヴェスパタイン",
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c73",
      "order": 83,
      "face_id": "c73",
      "name": "ローズマリー",
      "tags": ["giji", "immoral", "market", "young"]
    }, {
      "_id": "c47",
      "order": 85,
      "face_id": "c47",
      "name": "ペラジー",
      "tags": ["giji", "ecclesia", "river", "young"]
    }, {
      "_id": "c80",
      "order": 87,
      "face_id": "c80",
      "name": "テッド",
      "tags": ["giji", "road", "apartment", "young"]
    }, {
      "_id": "c96",
      "face_id": "c96",
      "name": "レオナルド",
      "comment": "2011/12/11",
      "order": 89,
      "tags": ["giji", "government", "ecclesia", "middle"]
    }, {
      "_id": "c95",
      "face_id": "c95",
      "name": "モリス",
      "comment": "2011/12/11",
      "order": 91,
      "tags": ["giji", "guild", "road", "young"]
    }, {
      "_id": "c97",
      "face_id": "c97",
      "name": "ジェフ",
      "comment": "2011/12/14 超常現象はあるんだ…",
      "order": 93,
      "tags": ["giji", "government", "river", "young", "middle"]
    }, {
      "_id": "c98",
      "face_id": "c98",
      "name": "オズワルド",
      "comment": "2011/12/29 この髭はぜったいワックス使ってる。",
      "order": 95,
      "tags": ["giji", "immoral", "river", "middle"]
    }, {
      "_id": "c100",
      "face_id": "c100",
      "name": "グレッグ",
      "comment": "2012/12/30 スポーツ系中学生くらいに見える",
      "order": 97,
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c101",
      "face_id": "c101",
      "name": "クラリッサ",
      "comment": "2011/12/30 美人さん♪",
      "order": 99,
      "tags": ["giji", "servant", "apartment", "young"]
    }, {
      "_id": "c90",
      "face_id": "c90",
      "name": "ケヴィン",
      "comment": "2011/12/06",
      "order": 125,
      "tags": ["giji", "government", "river", "farm", "young"]
    }, {
      "_id": "c88",
      "face_id": "c88",
      "name": "ピエール",
      "order": 126,
      "comment": "2011/12/05",
      "tags": ["giji", "servant", "market", "middle"]
    }, {
      "_id": "c89",
      "face_id": "c89",
      "name": "カトリーナ",
      "comment": "2011/12/06",
      "order": 128,
      "tags": ["giji", "apartment", "young"]
    }, {
      "_id": "c84",
      "face_id": "c84",
      "name": "ブレンダ",
      "order": 129,
      "comment": "2011/12/05",
      "tags": ["giji", "apartment", "middle"]
    }, {
      "_id": "c85",
      "face_id": "c85",
      "name": "ハナ",
      "order": 130,
      "comment": "2011/12/05",
      "tags": ["giji", "road", "servant", "kid"]
    }, {
      "_id": "c91",
      "comment": "2011/12/06 姦しい奥様♪",
      "face_id": "c91",
      "name": "ドロシー",
      "order": 143,
      "tags": ["giji", "river", "servant", "middle"]
    }, {
      "_id": "c92",
      "comment": "2011/12/06 姦し娘ーず♪",
      "face_id": "c92",
      "name": "セレスト",
      "order": 144,
      "tags": ["giji", "river", "servant", "young"]
    }, {
      "_id": "c93",
      "comment": "2011/12/06 えー○○が許されるのは小学生までだよねー♪",
      "face_id": "c93",
      "name": "ベッキー",
      "order": 145,
      "tags": ["giji", "river", "servant", "young"]
    }, {
      "_id": "c78",
      "order": 150,
      "face_id": "c78",
      "name": "ネイサン",
      "tags": ["giji", "market", "middle"]
    }, {
      "_id": "c82",
      "order": 148,
      "face_id": "c82",
      "name": "ロビン",
      "tags": ["giji", "servant", "kid"]
    }, {
      "_id": "c94",
      "face_id": "c94",
      "name": "ダーラ",
      "comment": "2011/12/11",
      "order": 165,
      "tags": ["giji", "elegant", "immoral", "market", "middle"]
    }, {
      "_id": "c64",
      "order": 180,
      "face_id": "c64",
      "name": "ヘクター",
      "tags": ["giji", "immoral", "middle"]
    }, {
      "_id": "c81",
      "order": 190,
      "face_id": "c81",
      "name": "サイラス",
      "tags": ["giji", "medical", "guild", "farm", "young"]
    }, {
      "_id": "c67",
      "order": 200,
      "face_id": "c67",
      "name": "ソフィア",
      "tags": ["giji", "guild", "young"]
    }, {
      "_id": "c76",
      "order": 210,
      "face_id": "c76",
      "name": "ジョージ",
      "tags": ["giji", "apartment", "kid"]
    }, {
      "_id": "c60",
      "order": 213,
      "face_id": "c60",
      "name": "ポーチュラカ",
      "tags": ["giji", "elegant", "kid"]
    }, {
      "_id": "c87",
      "face_id": "c87",
      "name": "エリアス",
      "order": 217,
      "comment": "2011/12/05",
      "tags": ["giji", "elegant", "medical", "young"]
    }, {
      "_id": "c45",
      "order": 220,
      "face_id": "c45",
      "name": "プリシラ",
      "tags": ["giji", "immoral", "young"]
    }, {
      "_id": "c48",
      "order": 225,
      "face_id": "c48",
      "name": "ビアンカ",
      "tags": ["giji", "elegant", "middle", "elder"]
    }, {
      "_id": "c86",
      "face_id": "c86",
      "name": "ホレーショー",
      "order": 230,
      "comment": "2011/12/05",
      "tags": ["giji", "immoral", "apartment", "middle"]
    }, {
      "_id": "c83",
      "order": 240,
      "face_id": "c83",
      "name": "アイリス",
      "tags": ["marchen", "giji", "road", "medical", "market", "young"]
    }, {
      "_id": "c31",
      "order": 250,
      "face_id": "c31",
      "name": "ネル",
      "tags": ["giji", "guild", "apartment", "young"]
    }, {
      "_id": "c99",
      "order": 999,
      "face_id": "c99",
      "name": "サイモン",
      "tags": ["giji", "apartment", "young", "middle"]
    }, {
      "order": 10001,
      "face_id": "g01",
      "name": "露蝶",
      "comment": "中国女性名",
      "_id": "g01",
      "tags": ["asia"]
    }, {
      "order": 215,
      "face_id": "g02",
      "name": "志偉",
      "comment": "台湾男性名 越南の名前も探したかったが、見つからぬ…",
      "_id": "g02",
      "tags": ["asia"]
    }, {
      "order": 10003,
      "face_id": "g03",
      "name": "芙蓉",
      "comment": "里帰り",
      "_id": "g03",
      "tags": ["asia"]
    }, {
      "order": 10004,
      "face_id": "gc61",
      "name": "沼太郎",
      "comment": "里帰り",
      "_id": "gc61",
      "tags": ["asia"]
    }, {
      "name": "デメテル",
      "face_id": "mad01",
      "comment": "阿片窟からきました",
      "order": 20001,
      "_id": "mad01",
      "tags": ["marchen"]
    }, {
      "name": "エルゴット",
      "face_id": "mad02",
      "comment": "阿片窟からきました",
      "order": 245,
      "_id": "mad02",
      "tags": ["marchen"]
    }, {
      "name": "シーシャ",
      "face_id": "mad03",
      "comment": "阿片窟からきました",
      "order": 223,
      "_id": "mad03",
      "tags": ["marchen"]
    }, {
      "name": "ドリベル",
      "face_id": "mad04",
      "comment": "阿片窟からきました",
      "order": 20004,
      "_id": "mad04",
      "tags": ["marchen"]
    }, {
      "name": "ヤヘイ",
      "face_id": "mad05",
      "comment": "阿片窟からきました",
      "order": 1010,
      "_id": "mad05",
      "tags": ["marchen"]
    }, {
      "name": "アヤワスカ",
      "face_id": "mad06",
      "comment": "阿片窟からきました",
      "order": 236,
      "_id": "mad06",
      "tags": ["marchen"]
    }, {
      "name": "チアキ",
      "face_id": "t01",
      "comment": "時をかける少女",
      "order": 30001,
      "_id": "t01",
      "tags": ["travel"]
    }, {
      "name": "リッキィ",
      "face_id": "t02",
      "comment": "夏への扉",
      "order": 30002,
      "_id": "t02",
      "tags": ["travel"]
    }, {
      "name": "ミナカタ",
      "face_id": "t03",
      "comment": "ー仁ー",
      "order": 156,
      "_id": "t03",
      "tags": ["travel"]
    }, {
      "name": "カイル",
      "face_id": "t04",
      "comment": "サラ・コナー・クロニクルズ",
      "order": 30004,
      "_id": "t04",
      "tags": ["travel"]
    }, {
      "name": "ジェニファー",
      "face_id": "t05",
      "comment": "バック・トゥ・ザ・フューチャー",
      "order": 30005,
      "_id": "t05",
      "tags": ["travel"]
    }, {
      "_id": "m99",
      "order": 70001,
      "face_id": "m99",
      "name": "パルック",
      "tags": ["myth"]
    }, {
      "_id": "m06",
      "order": 70002,
      "face_id": "m06",
      "name": "リリンラ",
      "tags": ["myth"]
    }, {
      "_id": "m03",
      "order": 70003,
      "face_id": "m03",
      "name": "トノサマ",
      "tags": ["myth"]
    }, {
      "_id": "m05",
      "order": 70004,
      "face_id": "m05",
      "name": "ナナコロ",
      "tags": ["myth"]
    }, {
      "_id": "m15",
      "order": 70005,
      "face_id": "m15",
      "name": "ミソチャ",
      "tags": ["myth"]
    }, {
      "_id": "m07",
      "order": 70006,
      "face_id": "m07",
      "name": "アリス",
      "tags": ["myth"]
    }, {
      "_id": "r30",
      "order": 70006,
      "face_id": "r30",
      "name": "トリ",
      "tags": ["myth"]
    }, {
      "_id": "m01",
      "order": 70007,
      "face_id": "m01",
      "name": "ケムシ",
      "tags": ["myth"]
    }, {
      "_id": "m02",
      "order": 70008,
      "face_id": "m02",
      "name": "ポプラ",
      "tags": ["myth"]
    }, {
      "_id": "m04",
      "order": 70009,
      "face_id": "m04",
      "name": "アオイ",
      "tags": ["myth"]
    }, {
      "_id": "b44",
      "comment": "",
      "face_id": "b44",
      "name": "ドナルド",
      "order": 70010,
      "tags": ["myth"]
    }, {
      "_id": "m08",
      "order": 70011,
      "face_id": "m08",
      "name": "おっぱい",
      "tags": ["myth"]
    }, {
      "_id": "m09",
      "order": 70012,
      "face_id": "m09",
      "name": "カミジャー",
      "tags": ["myth"]
    }, {
      "_id": "r12",
      "order": 70012,
      "face_id": "r12",
      "name": "バーナバス",
      "tags": ["myth"]
    }, {
      "_id": "b49",
      "comment": "",
      "face_id": "b49",
      "name": "ボリス",
      "order": 70012,
      "tags": ["myth"]
    }, {
      "_id": "m10",
      "order": 70013,
      "face_id": "m10",
      "name": "アチャポ",
      "tags": ["myth"]
    }, {
      "_id": "m12",
      "comment": "",
      "face_id": "m12",
      "name": "トルニトス",
      "order": 70014,
      "tags": ["myth"]
    }, {
      "_id": "m11",
      "order": 70015,
      "face_id": "m11",
      "name": "ライトニング",
      "tags": ["myth"]
    }, {
      "_id": "m13",
      "order": 70016,
      "face_id": "m13",
      "name": "ミケ",
      "tags": ["myth"]
    }, {
      "_id": "m14",
      "order": 70017,
      "face_id": "m14",
      "name": "カリュクス",
      "tags": ["myth"]
    }, {
      "_id": "sf01",
      "order": 80000,
      "face_id": "sf01",
      "name": "ラッシード",
      "comment": "りしあさん＆かれやなぎさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf02",
      "order": 80001,
      "face_id": "sf02",
      "name": "エスペラント",
      "comment": "ふらぅさん＆かれやなぎさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf03",
      "order": 80002,
      "face_id": "sf03",
      "name": "ピート",
      "comment": "たるっとさん＆りちゃさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf04",
      "order": 80003,
      "face_id": "sf04",
      "name": "アシモフ",
      "comment": "あすたん＆りりんら",
      "tags": ["stratos"]
    }, {
      "_id": "sf05",
      "order": 80004,
      "face_id": "sf05",
      "name": "モナリザ",
      "comment": "ななころび＆りりんら",
      "tags": ["stratos"]
    }, {
      "_id": "sf06",
      "order": 80005,
      "face_id": "sf06",
      "name": "ワレンチナ",
      "comment": "まりもさん＆あずまさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf07",
      "order": 80007,
      "face_id": "sf07",
      "name": "ヤンファ",
      "comment": "りしあさん＆はむおくん",
      "tags": ["stratos"]
    }, {
      "_id": "sf08",
      "order": 80008,
      "face_id": "sf08",
      "name": "ＰＪ",
      "comment": "りしあさん＆ふらぅさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf09",
      "order": 80009,
      "face_id": "sf09",
      "name": "キリシマ",
      "comment": "ななころび＆ふらぅさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf10",
      "order": 80010,
      "face_id": "sf10",
      "name": "ナユタ",
      "comment": "かれやなぎさん＆かいさん",
      "tags": ["stratos"]
    }, {
      "_id": "sf11",
      "order": 80011,
      "face_id": "sf11",
      "name": "イワノフ",
      "comment": "かれやなぎさん＆りちゃさん",
      "tags": ["stratos"]
    }, {
      "order": 80012,
      "face_id": "sf12",
      "name": "†ルシフェル†",
      "comment": null,
      "_id": "sf12",
      "tags": ["stratos"]
    }, {
      "order": 80013,
      "face_id": "sf13",
      "name": "トルドヴィン",
      "comment": null,
      "_id": "sf13",
      "tags": ["stratos"]
    }, {
      "order": 80014,
      "face_id": "sf18",
      "name": "玖休",
      "comment": null,
      "_id": "sf18",
      "tags": ["stratos"]
    }, {
      "order": 80015,
      "face_id": "sf19",
      "name": "参休",
      "comment": null,
      "_id": "sf19",
      "tags": ["stratos"]
    }, {
      "order": 80016,
      "face_id": "sf14",
      "name": "クリスマス",
      "comment": null,
      "_id": "sf14",
      "tags": ["stratos"]
    }, {
      "order": 80017,
      "face_id": "sf15",
      "name": "ジェームス",
      "comment": null,
      "_id": "sf15",
      "tags": ["stratos"]
    }, {
      "order": 80018,
      "face_id": "sf16",
      "name": "ライジ",
      "comment": null,
      "_id": "sf16",
      "tags": ["stratos"]
    }, {
      "order": 80019,
      "face_id": "sf17",
      "name": "ジャック",
      "comment": null,
      "_id": "sf17",
      "tags": ["stratos"]
    }, {
      "_id": "w05",
      "order": 90001,
      "face_id": "w05",
      "name": "定吉",
      "comment": "ぷえるとりこの旅人　エージ―エー",
      "tags": ["shoji"]
    }, {
      "_id": "w21",
      "order": 90002,
      "face_id": "w21",
      "name": "鉄平",
      "comment": "日本の伝統　熊木彫",
      "tags": ["shoji"]
    }, {
      "_id": "w22",
      "order": 90003,
      "face_id": "w22",
      "name": "竹三",
      "comment": "雪国の風雅　熊木彫",
      "tags": ["shoji"]
    }, {
      "_id": "w36",
      "order": 90004,
      "face_id": "w36",
      "name": "ウト",
      "tags": ["shoji"]
    }, {
      "_id": "w16",
      "order": 90005,
      "face_id": "w16",
      "name": "勢",
      "comment": "ぶたさん印の　あおいジンギスカン",
      "tags": ["shoji"]
    }, {
      "_id": "w18",
      "order": 90006,
      "face_id": "w18",
      "name": "菊",
      "tags": ["shoji"]
    }, {
      "_id": "w26",
      "order": 90007,
      "face_id": "w26",
      "name": "勝丸",
      "tags": ["shoji"]
    }, {
      "_id": "w35",
      "comment": "",
      "face_id": "w35",
      "name": "奈須麿",
      "order": 90008,
      "tags": ["shoji"]
    }, {
      "_id": "w24",
      "order": 90009,
      "face_id": "w24",
      "name": "辰次",
      "comment": "桃源郷ぐた国のめぐみ　ふらう乳業",
      "tags": ["shoji"]
    }, {
      "_id": "w37",
      "order": 90010,
      "face_id": "w37",
      "name": "芙蓉",
      "tags": ["shoji"]
    }, {
      "_id": "w29",
      "order": 90011,
      "face_id": "w29",
      "name": "志乃",
      "tags": ["shoji"]
    }, {
      "_id": "w20",
      "order": 90012,
      "face_id": "w20",
      "name": "藤之助",
      "tags": ["shoji"]
    }, {
      "_id": "w31",
      "order": 90013,
      "face_id": "w31",
      "name": "日向",
      "tags": ["shoji"]
    }, {
      "_id": "w12",
      "order": 90014,
      "face_id": "w12",
      "name": "おみつ",
      "comment": "道を外して60年　GEDOU協会",
      "tags": ["shoji"]
    }, {
      "_id": "w10",
      "order": 90015,
      "face_id": "w10",
      "name": "博史",
      "tags": ["shoji"]
    }, {
      "_id": "w25",
      "order": 90016,
      "face_id": "w25",
      "name": "法泉",
      "tags": ["shoji"]
    }, {
      "_id": "w09",
      "order": 90017,
      "face_id": "w09",
      "name": "チャールズ",
      "comment": "チャールズ派遣ならおまかせ　O-ririn",
      "tags": ["shoji"]
    }, {
      "_id": "w30",
      "order": 90018,
      "face_id": "w30",
      "name": "雪代",
      "tags": ["shoji"]
    }, {
      "_id": "w14",
      "order": 90019,
      "face_id": "w14",
      "name": "華月斎",
      "comment": "めげないゼラチン作り　MEGEゼラチン",
      "tags": ["shoji"]
    }, {
      "_id": "w13",
      "order": 90020,
      "face_id": "w13",
      "name": "たまこ",
      "comment": "世界の道をつなぐ　議事国地図",
      "tags": ["shoji"]
    }, {
      "_id": "w11",
      "order": 90021,
      "face_id": "w11",
      "name": "沼太郎",
      "tags": ["shoji"]
    }, {
      "_id": "w03",
      "order": 90022,
      "face_id": "w03",
      "name": "朔",
      "comment": "新しい議事をつくる　たき学会",
      "tags": ["shoji"]
    }, {
      "_id": "w34",
      "order": 90023,
      "face_id": "w34",
      "name": "余四朗",
      "tags": ["shoji"]
    }, {
      "_id": "w27",
      "order": 90024,
      "face_id": "w27",
      "name": "源蔵",
      "tags": ["shoji"]
    }, {
      "_id": "w28",
      "order": 90025,
      "face_id": "w28",
      "name": "甚六",
      "tags": ["shoji"]
    }, {
      "_id": "w17",
      "order": 90026,
      "face_id": "w17",
      "name": "雷門",
      "comment": "輝く月に未来を託す　暁月商事",
      "tags": ["shoji"]
    }, {
      "_id": "w39",
      "comment": "",
      "face_id": "w39",
      "name": "沙耶",
      "order": 90027,
      "tags": ["shoji"]
    }, {
      "_id": "w08",
      "order": 90028,
      "face_id": "w08",
      "name": "朝顔",
      "tags": ["shoji"]
    }, {
      "_id": "w43",
      "order": 90029,
      "face_id": "w43",
      "name": "春松",
      "tags": ["shoji"]
    }, {
      "_id": "w07",
      "order": 90030,
      "face_id": "w07",
      "name": "夕顔",
      "tags": ["shoji"]
    }, {
      "_id": "w40",
      "order": 90031,
      "face_id": "w40",
      "name": "朧",
      "tags": ["shoji"]
    }, {
      "_id": "w33",
      "comment": "",
      "face_id": "w33",
      "name": "団十郎",
      "order": 90032,
      "tags": ["shoji"]
    }, {
      "_id": "w23",
      "order": 90033,
      "face_id": "w23",
      "name": "仁右衛門",
      "tags": ["shoji"]
    }, {
      "_id": "w04",
      "order": 90034,
      "face_id": "w04",
      "name": "小鈴",
      "comment": "お口の愛人　タルッティ・タルット",
      "tags": ["shoji"]
    }, {
      "_id": "w06",
      "order": 90035,
      "face_id": "w06",
      "name": "ゆり",
      "comment": "道を外して60年　GEDOU協会",
      "tags": ["shoji"]
    }, {
      "_id": "w38",
      "comment": "",
      "face_id": "w38",
      "name": "一平太",
      "order": 90037,
      "tags": ["shoji"]
    }, {
      "_id": "w01",
      "order": 90038,
      "face_id": "w01",
      "name": "鏡花",
      "comment": "輝く月に未来を託す　暁月商事",
      "tags": ["shoji"]
    }, {
      "_id": "w15",
      "order": 90039,
      "face_id": "w15",
      "name": "八重",
      "comment": "桃源郷ぐた国のめぐみ　ふらう乳業",
      "tags": ["shoji"]
    }, {
      "_id": "w32",
      "order": 90040,
      "face_id": "w32",
      "name": "明之進",
      "tags": ["shoji"]
    }, {
      "_id": "w02",
      "order": 90041,
      "face_id": "w02",
      "name": "慶三郎",
      "comment": "カメラのことなら　MISEKI",
      "tags": ["shoji"]
    }, {
      "_id": "w44",
      "face_id": "w44",
      "name": "雪客",
      "comment": "りりんラハウス呑んだくれ大会",
      "order": 90042,
      "tags": ["shoji"]
    }, {
      "_id": "w45",
      "face_id": "w45",
      "name": "亀吉",
      "comment": "りりんラハウス呑んだくれ大会",
      "order": 90043,
      "tags": ["shoji"]
    }, {
      "_id": "w46",
      "face_id": "w46",
      "name": "梅子",
      "order": 90044,
      "comment": "お誕生日記念☆",
      "tags": ["shoji"]
    }, {
      "face_id": "w47",
      "name": "置壱",
      "comment": "日本の美徳強化月間",
      "order": 90045,
      "_id": "w47",
      "tags": ["shoji"]
    }, {
      "face_id": "all",
      "name": "パルック",
      "order": 99999,
      "_id": "all",
      "tags": ["god"]
    }, {
      "_id": "g04",
      "face_id": "g04",
      "name": "攻芸",
      "comment": "台湾男性名",
      "order": 10005,
      "tags": ["asia"]
    }, {
      "_id": "g05",
      "face_id": "g05",
      "name": "麻雀",
      "comment": "中国女性名",
      "order": 170,
      "tags": ["asia"]
    }, {
      "_id": "g06",
      "face_id": "g06",
      "name": "黍炉",
      "comment": "ダリダイ・オッチギン",
      "order": 10007,
      "tags": ["asia"]
    }, {
      "_id": "mad07",
      "face_id": "mad07",
      "name": "ダイミ",
      "comment": "阿片窟からきました",
      "order": 20007,
      "tags": ["marchen"]
    }, {
      "_id": "mad08",
      "face_id": "mad08",
      "name": "エフェドラ",
      "comment": "阿片窟からきました",
      "order": 20008,
      "tags": ["marchen"]
    }, {
      "_id": "t06",
      "face_id": "t06",
      "name": "サミュエル",
      "comment": "トランスフォーマー",
      "order": 30006,
      "tags": ["travel"]
    }, {
      "_id": "t07",
      "face_id": "t07",
      "name": "アカリ",
      "comment": "時をかける少女",
      "order": 30019,
      "tags": ["travel"]
    }, {
      "_id": "t08",
      "face_id": "t08",
      "name": "ミルフィ",
      "comment": "海賊戦隊ゴーカイジャー",
      "order": 30020,
      "tags": ["travel"]
    }, {
      "_id": "t09",
      "face_id": "t09",
      "name": "ゴロウ",
      "comment": "時をかける少女",
      "order": 30009,
      "tags": ["travel"]
    }, {
      "_id": "t10",
      "face_id": "t10",
      "name": "トレイル",
      "comment": "ゼルダの伝説 ムジュラの仮面",
      "order": 30010,
      "tags": ["travel"]
    }, {
      "_id": "t11",
      "face_id": "t11",
      "name": "マドカ",
      "comment": "宇宙戦艦ヤマモト・ヨーコ",
      "order": 30019,
      "tags": ["travel"]
    }, {
      "_id": "t12",
      "face_id": "t12",
      "name": "フランク",
      "comment": "オーロラの彼方へ",
      "order": 30012,
      "tags": ["travel"]
    }, {
      "_id": "t13",
      "face_id": "t13",
      "name": "ジャニス",
      "comment": "フラッシュフォワード",
      "order": 30013,
      "tags": ["travel"]
    }, {
      "_id": "c105",
      "comment": "年末カウントダウン♪",
      "name": "シメオン",
      "face_id": "c105",
      "order": 82,
      "tags": ["giji", "apartment", "ecclesia", "young"]
    }, {
      "_id": "c104",
      "comment": "年末カウントダウン♪",
      "name": "ヒュー",
      "face_id": "c104",
      "order": 89,
      "tags": ["giji", "medical", "young"]
    }, {
      "_id": "c106",
      "comment": "年末カウントダウン♪",
      "face_id": "c106",
      "name": "ワンダ",
      "order": 90,
      "tags": ["giji", "river", "guild", "middle"]
    }, {
      "_id": "c108",
      "face_id": "c108",
      "name": "ブローリン",
      "comment": "年末カウントダウン♪",
      "order": 91,
      "tags": ["giji", "farm", "young", "middle"]
    }, {
      "_id": "c109",
      "face_id": "c109",
      "name": "ラディスラヴァ",
      "comment": "年末カウントダウン♪",
      "order": 185,
      "tags": ["giji", "apartment", "young"]
    }, {
      "_id": "c102",
      "comment": "年末カウントダウン♪",
      "face_id": "c102",
      "name": "ウォーレン",
      "order": 155,
      "tags": ["giji", "market", "elder"]
    }, {
      "_id": "c107",
      "face_id": "c107",
      "name": "イヴォン",
      "comment": "年末カウントダウン♪",
      "order": 205,
      "tags": ["giji", "elegant", "middle", "elder"]
    }, {
      "_id": "c103",
      "comment": "年末カウントダウン♪",
      "name": "ナンシー",
      "face_id": "c103",
      "order": 234,
      "tags": ["giji", "apartment", "young"]
    }, {
      "_id": "t14",
      "face_id": "t14",
      "name": "クシャミ",
      "comment": "吾輩は猫である。",
      "order": 30014,
      "tags": ["travel"]
    }, {
      "_id": "t15",
      "face_id": "t15",
      "name": "ガーディ",
      "comment": "ベイカー街少年探偵団",
      "order": 30015,
      "tags": ["travel"]
    }, {
      "_id": "sf20",
      "face_id": "sf20",
      "name": "ティソ",
      "comment": null,
      "order": 80020,
      "tags": ["stratos"]
    }, {
      "_id": "g07",
      "face_id": "g07",
      "name": "ジリヤ",
      "comment": "ロシア女性名",
      "order": 10008,
      "tags": ["asia"]
    }, {
      "_id": "t16",
      "face_id": "t16",
      "name": "アラン",
      "comment": "映画監督たちの共用偽名",
      "order": 30016,
      "tags": ["travel"]
    }, {
      "_id": "w48",
      "face_id": "w48",
      "name": "直円",
      "comment": "和算復活月間",
      "order": 90048,
      "tags": ["shoji"]
    }, {
      "_id": "w49",
      "face_id": "w49",
      "name": "錠",
      "comment": "ポルトガル人にジオゴっているんだぜ。へー。かっこいー。",
      "order": 90049,
      "tags": ["shoji"]
    }, {
      "_id": "w50",
      "face_id": "w50",
      "name": "丁助",
      "comment": "負けるたびに追い博打",
      "order": 90050,
      "tags": ["shoji"]
    }, {
      "_id": "t17",
      "face_id": "t17",
      "name": "ススム",
      "comment": "おもいっきり探偵団 覇悪怒組",
      "order": 30018,
      "tags": ["travel"]
    }, {
      "_id": "t18",
      "face_id": "t18",
      "name": "マユミ",
      "comment": "まんがはじめて物語（二代目）",
      "order": 30018,
      "tags": ["travel"]
    }, {
      "_id": "c110",
      "face_id": "c110",
      "name": "リー",
      "comment": "",
      "order": 92,
      "tags": ["giji", "immoral", "apartment", "young"]
    }, {
      "_id": "t19",
      "face_id": "t19",
      "name": "ハルカ",
      "comment": "はるかリフレイン",
      "order": 30017,
      "tags": ["travel"]
    }, {
      "_id": "w51",
      "face_id": "w51",
      "name": "鬼丞",
      "comment": "リニューアル記念！",
      "order": 90051,
      "tags": ["shoji"]
    }, {
      "_id": "w52",
      "face_id": "w52",
      "name": "櫻子",
      "comment": "リニューアル記念！",
      "order": 90052,
      "tags": ["shoji"]
    }, {
      "_id": "c111",
      "face_id": "c111",
      "name": "スージー",
      "comment": "リニューアル記念！ 弟がいるという噂が…",
      "order": 160,
      "tags": ["giji", "apartment", "elegant", "immoral", "young"]
    }, {
      "_id": "c113",
      "face_id": "c113",
      "name": "ジェレミー",
      "comment": "リニューアル記念！",
      "order": 228,
      "tags": ["giji", "apartment", "immoral", "young", "middle"]
    }, {
      "_id": "c112",
      "face_id": "c112",
      "name": "ニコラス",
      "comment": "！？",
      "order": 128,
      "tags": ["giji", "elegant", "young"]
    }, {
      "_id": "m16",
      "face_id": "m16",
      "name": "アーサー",
      "comment": "円卓の騎士",
      "order": 70018,
      "tags": ["myth"]
    }, {
      "_id": "t20",
      "face_id": "t20",
      "name": "エリ",
      "comment": "英国情報局秘密組織チェラブ (CHERUB)",
      "order": 30022,
      "tags": ["travel"]
    }, {
      "_id": "g08",
      "face_id": "g08",
      "name": "イワン",
      "comment": "Иван-дурак",
      "order": 10009,
      "tags": ["asia"]
    }, {
      "_id": "c114",
      "face_id": "c114",
      "name": "モンド",
      "comment": "８８件のご応募、ありがとう。そして、ありがとう。",
      "order": 131,
      "tags": ["giji", "government", "immoral", "middle"]
    }, {
      "_id": "m18",
      "face_id": "m18",
      "name": "ミーム",
      "comment": "インターネット・ミームから。 えんいー",
      "order": 70020,
      "tags": ["myth"]
    }, {
      "_id": "m19",
      "face_id": "m19",
      "name": "タルト",
      "comment": "https://twitter.com/7korobi/status/510069062974447617",
      "order": 70021,
      "tags": ["myth"]
    }, {
      "_id": "m20",
      "face_id": "m20",
      "name": "ショコラ",
      "comment": "https://twitter.com/noa_marimo/status/510100541536358400",
      "order": 70022,
      "tags": ["myth"]
    }, {
      "_id": "c115",
      "face_id": "c115",
      "name": "マリオ",
      "comment": "じつは、牧場育ちらしいよ。",
      "order": 132,
      "tags": ["giji", "guild", "road", "kid"]
    }, {
      "_id": "t21",
      "face_id": "t21",
      "name": "トシミ",
      "comment": "代紋TAKE2",
      "order": 30019,
      "tags": ["travel"]
    }, {
      "_id": "t22",
      "face_id": "t22",
      "name": "ケイイチ",
      "comment": "ひぐらしのなく頃に",
      "order": 30021,
      "tags": ["travel"]
    }, {
      "_id": "w53",
      "face_id": "w53",
      "name": "おもん",
      "comment": "三拾糎程の「もふもふねこひよこ」　せんいち",
      "order": 90053,
      "tags": ["shoji"]
    }, {
      "_id": "sf021",
      "face_id": "sf021",
      "name": "アンタレス",
      "comment": "",
      "order": 80022,
      "tags": ["stratos"]
    }, {
      "_id": "sf023",
      "face_id": "sf023",
      "name": "エフ",
      "comment": "",
      "order": 80023,
      "tags": ["stratos"]
    }, {
      "_id": "sf024",
      "face_id": "sf024",
      "name": "アイライト",
      "comment": "",
      "order": 80024,
      "tags": ["stratos"]
    }, {
      "_id": "sf025",
      "face_id": "sf025",
      "name": "アマルテア",
      "comment": "",
      "order": 80006,
      "tags": ["stratos"]
    }, {
      "_id": "sf026",
      "face_id": "sf026",
      "name": "ポーラ",
      "comment": "",
      "order": 80026,
      "tags": ["stratos"]
    }, {
      "_id": "sf022",
      "face_id": "sf022",
      "name": "チェビイ",
      "comment": "",
      "order": 80027,
      "tags": ["stratos"]
    }, {
      "_id": "sf027",
      "face_id": "sf027",
      "name": "モスキート",
      "comment": "",
      "order": 80028,
      "tags": ["stratos"]
    }, {
      "_id": "sf032",
      "face_id": "sf032",
      "name": "ワクラバ",
      "comment": "",
      "order": 80029,
      "tags": ["stratos"]
    }, {
      "_id": "sf028",
      "face_id": "sf028",
      "name": "コータ",
      "comment": "",
      "order": 80030,
      "tags": ["stratos"]
    }, {
      "_id": "sf029",
      "face_id": "sf029",
      "name": "ミツボシ",
      "comment": "",
      "order": 80031,
      "tags": ["stratos"]
    }, {
      "_id": "sf030",
      "face_id": "sf030",
      "name": "クレパスキュール",
      "comment": "",
      "order": 80032,
      "tags": ["stratos"]
    }, {
      "_id": "sf031",
      "face_id": "sf031",
      "name": "シルク",
      "comment": "",
      "order": 80033,
      "tags": ["stratos"]
    }, {
      "_id": "t23",
      "face_id": "t23",
      "name": "ナナオ",
      "comment": "",
      "order": 30023,
      "tags": ["travel"]
    }, {
      "_id": "t24",
      "face_id": "t24",
      "name": "キルロイ",
      "comment": "「キルロイここに現る」",
      "order": 30024,
      "tags": ["travel"]
    }, {
      "_id": "t25",
      "face_id": "t25",
      "name": "ミサキ",
      "comment": "",
      "order": 30025,
      "tags": ["travel"]
    }, {
      "_id": "t26",
      "face_id": "t26",
      "name": "アツタネ",
      "comment": "平田篤胤",
      "order": 30026,
      "tags": ["travel"]
    }, {
      "_id": "t27",
      "face_id": "t27",
      "name": "みょんこ",
      "comment": "",
      "order": 30027,
      "tags": ["travel"]
    }, {
      "_id": "t28",
      "face_id": "t28",
      "name": "リツ",
      "comment": "",
      "order": 30028,
      "tags": ["travel"]
    }, {
      "_id": "t29",
      "face_id": "t29",
      "name": "ヒナコ",
      "comment": "",
      "order": 30020,
      "tags": ["travel"]
    }, {
      "_id": "t30",
      "face_id": "t30",
      "name": "ワタヌキ",
      "comment": "四月朔日",
      "order": 30030,
      "tags": ["travel"]
    }, {
      "_id": "t31",
      "face_id": "t31",
      "name": "ホウイチ",
      "comment": "",
      "order": 158,
      "tags": ["travel"]
    }, {
      "_id": "t32",
      "face_id": "t32",
      "name": "トヨタ",
      "comment": "洋画の日本人名",
      "order": 30032,
      "tags": ["travel"]
    }, {
      "_id": "t33",
      "face_id": "t33",
      "name": "エツコ",
      "comment": "",
      "order": 30033,
      "tags": ["travel"]
    }, {
      "_id": "t34",
      "face_id": "t34",
      "name": "ドン",
      "comment": "",
      "order": 17,
      "tags": ["travel"]
    }, {
      "_id": "c116",
      "face_id": "c116",
      "name": "メルヤ",
      "comment": "",
      "order": 116,
      "tags": ["giji", "medical", "immoral", "young"]
    }, {
      "_id": "c117",
      "face_id": "c117",
      "name": "ルパート",
      "comment": "",
      "order": 135,
      "tags": ["giji", "road", "guild", "elder"]
    }, {
      "_id": "c118",
      "face_id": "c118",
      "name": "ユージン",
      "comment": "",
      "order": 118,
      "tags": ["giji", "river", "young", "middle"]
    }, {
      "_id": "c119",
      "face_id": "c119",
      "name": "オーレリア",
      "comment": "",
      "order": 119,
      "tags": ["giji", "ecclesia", "young"]
    }, {
      "_id": "c120",
      "face_id": "c120",
      "name": "ノア",
      "comment": "",
      "order": 120,
      "tags": ["giji", "servant", "young", "middle"]
    }, {
      "_id": "t35",
      "face_id": "t35",
      "name": "イスルギ",
      "comment": "",
      "order": 30020,
      "tags": ["travel"]
    }, {
      "_id": "c121",
      "face_id": "c121",
      "name": "ブッカ",
      "comment": "ブッカ・ホワイト氏から。",
      "order": 121,
      "tags": ["giji", "farm"]
    }, {
      "_id": "mad09",
      "face_id": "mad09",
      "name": "カナビス",
      "comment": "ウパニシャッドの精神で",
      "order": 20009,
      "tags": ["marchen"]
    }, {
      "_id": "mad10",
      "face_id": "mad10",
      "name": "ルグレ",
      "comment": "後悔あとをたたず",
      "order": 20010,
      "tags": ["marchen"]
    }, {
      "_id": "mad11",
      "face_id": "mad11",
      "name": "オルギア",
      "comment": "ええじゃないかええじゃないかー！",
      "order": 20011,
      "tags": ["marchen"]
    }
  ]);

  Mem.Collection.chr_set.merge([
    {
      "_id": "all",
      "admin": "闇の呟き",
      "maker": "天のお告げ",
      "caption": "人狼議事 ちゃんぷる",
      "chr_set_id": "all"
    }
  ]);

  Mem.Collection.chr_npc.merge([
    {
      "caption": "人狼議事 ちゃんぷる",
      "csid": "all",
      "face_id": "all",
      "say_0": "ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\nいたるところから…そう、地平の果てや、宇宙の彼方からも。\n\n中には、主様を消してくださるような方もいらっしゃるかもしれません。",
      "say_1": "皆さまお集まりありがとうございます。えー、ごほん。\nこの催し物、しっかりと楽しんでくださいませ。\n\n…何があっても、文句は言いませんよう、ご了承くださいませ。",
      "_id": "all_all",
      "chr_set_id": "all"
    }
  ]);

  Mem.Collection.chr_job.merge([
    {
      "face_id": "all",
      "job": "かみさま",
      "_id": "all_all",
      "chr_set_id": "all"
    }
  ]);

  Mem.Collection.chr_set.merge([
    {
      "_id": "animal",
      "admin": "大地の震動",
      "maker": "草原のざわめき",
      "caption": "うきうきサバンナ",
      "chr_set_id": "animal"
    }
  ]);

  Mem.Collection.chr_npc.merge([
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

  Mem.Collection.chr_job.merge([
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

  Mem.Collection.chr_set.merge([
    {
      "_id": "changed",
      "admin": "闇の呟き",
      "maker": "広場のお告げ",
      "caption": "はおうの広場",
      "chr_set_id": "changed"
    }
  ]);

  Mem.Collection.chr_npc.merge([
    {
      "caption": "とのさま広場",
      "csid": "changed",
      "face_id": "m08",
      "say_0": "じんろう？\nそんななまえのこ、いたかしら……",
      "say_1": "さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。",
      "_id": "changed_m08",
      "chr_set_id": "changed"
    }, {
      "_id": "changed_m05",
      "caption": "はおうの広場",
      "csid": "changed_m05",
      "face_id": "m05",
      "say_0": "ママ？ママなの？\n…もう大丈夫なの？ここには人狼なんていないのかい？\n\n…そっかあ…\n\n\n人狼だって？！",
      "say_1": "誰にも、腰抜けなんて…言わせないぞっ",
      "chr_set_id": "changed"
    }
  ]);

  Mem.Collection.chr_job.merge([
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

  Mem.Collection.chr_set.merge([
    {
      "_id": "ger",
      "admin": "闇の呟き",
      "maker": "馬頭琴の調",
      "caption": "エクスパンション・セット「大陸議事」",
      "chr_set_id": "ger"
    }
  ]);

  Mem.Collection.chr_npc.merge([
    {
      "caption": "エクスパンション・セット「大陸議事」",
      "csid": "ger",
      "face_id": "g03",
      "say_0": "まさか……これは……？\n\n真相が分かったわ！\n日が出たらすぐ、麓の皆に知らせないと！",
      "say_1": "飛車が…壊れてる……\n葛橋が…焼けてる……\n\n！　なんだ、猫か……。おどかさないでよ。\nん？",
      "_id": "ger_g03",
      "chr_set_id": "ger"
    }
  ]);

  Mem.Collection.chr_job.merge([
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

  Mem.Collection.chr_set.merge([
    {
      "_id": "mad",
      "admin": "闇の呟き",
      "maker": "天上の調べ",
      "caption": "エクスパンション・セット「狂騒議事」",
      "chr_set_id": "mad"
    }
  ]);

  Mem.Collection.chr_npc.merge([
    {
      "caption": "エクスパンション・セット「狂騒議事」",
      "csid": "mad",
      "face_id": "c83",
      "say_0": "どうせ、殺されるわみんな。…みんな\n\n\n/* 死ねばいいのに */",
      "say_1": "１人になるのゎ私ばっか。どっちの道ぉ選んでも、\n私ゎ十分です。明日も待っててね。お願いだから、\n離れて行かないで？\nいつまでも、\nなんで私ばっか\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>",
      "_id": "mad_c83",
      "chr_set_id": "mad"
    }, {
      "caption": "エクスパンション・セット「狂騒議事」（ヤヘイ）",
      "csid": "mad_mad05",
      "face_id": "mad05",
      "say_0": "…うん。もうな、だいぶまえだ。\n借家住まいでさ、天井板がずれて、開いているから入り込んでみたんだ。\n\n結構広くてさ。奥へ、奥へ、這い進んでたら明かりが切れてさ。\nもう右も左もわからなくってさあ…。\n\n必死に暴れたら、明るいとこに出た。\n知らない街だった。",
      "say_1": "…うん。そうだよ。\nまだ、その街から出られないんだ。おまえだって、そうなんだろう？\n\nあー、あっち。いや、こっちかも？\nそっちの先はまだ手繰ってないかもしれねえよ？\nウケッ、ウケッ、ウケコッ、ウコケ、ウコケ、ウヒャホ、コケコケコケ！",
      "_id": "mad_mad05",
      "chr_set_id": "mad"
    }
  ]);

  Mem.Collection.chr_job.merge([
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
    }, {
      "face_id": "mad09",
      "job": "隣席座り",
      "_id": "mad_mad09",
      "chr_set_id": "mad"
    }, {
      "face_id": "mad10",
      "job": "追憶探り",
      "_id": "mad_mad10",
      "chr_set_id": "mad"
    }, {
      "face_id": "mad11",
      "job": "乱痴気",
      "_id": "mad_mad11",
      "chr_set_id": "mad"
    }
  ]);

  Mem.Collection.chr_set.merge([
    {
      "_id": "ririnra",
      "admin": "闇の呟き",
      "maker": "天のお告げ",
      "caption": "人狼議事",
      "chr_set_id": "ririnra"
    }
  ]);

  Mem.Collection.chr_npc.merge([
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
      "say_0": "壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\n明日は、もう……",
      "say_1": "足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\n\n<b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>",
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
      "say_0": "こんばんわ、こんな遅くにたいへんですね。\n\n………\n行っちゃった。へんなの。",
      "say_1": "まさかあの時、あのひとが……？\n人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！",
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
      "say_1": "……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\n幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。",
      "_id": "ririnra_c51",
      "chr_set_id": "ririnra"
    }, {
      "caption": "人狼議事（グロリア）",
      "csid": "ririnra_c20",
      "face_id": "c20",
      "say_0": "紳士ならびに淑女の皆様、わたくしの館へようこそ。\n世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。",
      "say_1": "ちょっと！そこの貴方、何をしているの！\n聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！",
      "_id": "ririnra_c20",
      "chr_set_id": "ririnra"
    }, {
      "caption": "人狼議事（オスカー）",
      "csid": "ririnra_c32",
      "face_id": "c32",
      "say_0": "…そっちじゃないよ、こっちだよ。\nここ、秘密基地なんだ。雨もへいきだし暖かいよ。",
      "say_1": "ねえ。見て見て。パン持ってきたんだ。\nみんなにはナイショだよ？",
      "_id": "ririnra_c32",
      "chr_set_id": "ririnra"
    }, {
      "caption": "人狼議事",
      "csid": "ririnra",
      "face_id": "c99",
      "say_0": "嗚呼、聞こえ る。やつの足音が聞こえる……。",
      "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
      "_id": "ririnra_c99",
      "chr_set_id": "ririnra"
    }
  ]);

  Mem.Collection.chr_job.merge([
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
    }, {
      "face_id": "c115",
      "job": "廃品回収",
      "_id": "ririnra_c115",
      "chr_set_id": "ririnra"
    }, {
      "face_id": "c116",
      "job": "逃亡者",
      "_id": "ririnra_c116",
      "chr_set_id": "ririnra"
    }, {
      "face_id": "c117",
      "job": "宿屋",
      "_id": "ririnra_c117",
      "chr_set_id": "ririnra"
    }, {
      "face_id": "c118",
      "job": "渡し船",
      "_id": "ririnra_c118",
      "chr_set_id": "ririnra"
    }, {
      "face_id": "c119",
      "job": "信徒",
      "_id": "ririnra_c119",
      "chr_set_id": "ririnra"
    }, {
      "face_id": "c120",
      "job": "庭師",
      "_id": "ririnra_c120",
      "chr_set_id": "ririnra"
    }, {
      "face_id": "c121",
      "job": "農薬売",
      "_id": "ririnra_c121",
      "chr_set_id": "ririnra"
    }
  ]);

  Mem.Collection.chr_set.merge([
    {
      "_id": "school",
      "admin": "校内放送",
      "maker": "校内放送",
      "caption": "私立七転学園",
      "chr_set_id": "school"
    }
  ]);

  Mem.Collection.chr_npc.merge([
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

  Mem.Collection.chr_job.merge([
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

  Mem.Collection.chr_set.merge([
    {
      "_id": "sf",
      "admin": "黒体放射のエヴェレット解釈",
      "maker": "重ね合せ猫のユニタリ変換",
      "caption": "明後日への道標",
      "chr_set_id": "sf"
    }
  ]);

  Mem.Collection.chr_npc.merge([
    {
      "caption": "明後日への道標",
      "csid": "SF",
      "face_id": "sf04",
      "say_0": "とたたたたんっ。\n\n<b>めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\nいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。</b>",
      "say_1": "ちゅー！\n\n　ちゅー！\n\n<b>がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……</b>",
      "_id": "sf_sf04",
      "chr_set_id": "sf"
    }, {
      "caption": "明後日への道標（ナユタ）",
      "csid": "SF_sf10",
      "face_id": "sf10",
      "say_0": "f*ck！またチオチモリンと二酸化炭素分圧だし！\nエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\n\n<b>同日\n整備日誌\n　定期点検。ただちに健康に影響はないが、擦過痕…</b>",
      "say_1": "よーf*ck'nおまえら。\nマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\nマジ怒んねーから手ぇ挙げ\n\n<b>ぷつん</b>\n\nっと。瞬停った…。f*ck。\nちょっと外の様子見てくる。俺のプリン残しといてくれよ。\n ",
      "_id": "sf_sf10",
      "chr_set_id": "sf"
    }
  ]);

  Mem.Collection.chr_job.merge([
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
    }, {
      "face_id": "sf021",
      "job": "星間帆走",
      "_id": "sf_sf021",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf022",
      "job": "鉱滓地区",
      "_id": "sf_sf022",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf023",
      "job": "地下軌道",
      "_id": "sf_sf023",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf024",
      "job": "光彩楽団",
      "_id": "sf_sf024",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf025",
      "job": "救星隊",
      "_id": "sf_sf025",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf026",
      "job": "星先案内",
      "_id": "sf_sf026",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf027",
      "job": "鉱滓皇帝",
      "_id": "sf_sf027",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf028",
      "job": "溶接技師",
      "_id": "sf_sf028",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf029",
      "job": "機巧忍軍",
      "_id": "sf_sf029",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf030",
      "job": "閉鎖管理",
      "_id": "sf_sf030",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf031",
      "job": "意匠造形",
      "_id": "sf_sf031",
      "chr_set_id": "sf"
    }, {
      "face_id": "sf032",
      "job": "鉱滓地区",
      "_id": "sf_sf032",
      "chr_set_id": "sf"
    }
  ]);

  Mem.Collection.chr_set.merge([
    {
      "_id": "time",
      "admin": "第四の壁の深奥",
      "maker": "次元X式コンピューター",
      "caption": "エクスパンション・セット「帰還者議事」",
      "chr_set_id": "time"
    }
  ]);

  Mem.Collection.chr_npc.merge([
    {
      "caption": "エクスパンション・セット「帰還者議事」",
      "csid": "time",
      "face_id": "c10",
      "say_0": "M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。",
      "say_1": "やっぱさ、銃を持った善人がいないとさ。<br><br>ちょっと出かけてくる！プリン食べちゃダメだよ！",
      "_id": "time_c10",
      "chr_set_id": "time"
    }
  ]);

  Mem.Collection.chr_job.merge([
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
    }, {
      "face_id": "t21",
      "job": "九未知会",
      "_id": "time_t21",
      "chr_set_id": "time"
    }, {
      "face_id": "t22",
      "job": "学園特警",
      "_id": "time_t22",
      "chr_set_id": "time"
    }, {
      "face_id": "t23",
      "job": "孤高天使連合",
      "_id": "time_t23",
      "chr_set_id": "time"
    }, {
      "face_id": "t24",
      "job": "トレーサー",
      "_id": "time_t24",
      "chr_set_id": "time"
    }, {
      "face_id": "t25",
      "job": "2.14革命機構",
      "_id": "time_t25",
      "chr_set_id": "time"
    }, {
      "face_id": "t26",
      "job": "法隆寺",
      "_id": "time_t26",
      "chr_set_id": "time"
    }, {
      "face_id": "t27",
      "job": "硯友社",
      "_id": "time_t27",
      "chr_set_id": "time"
    }, {
      "face_id": "t28",
      "job": "樫の樹の子ら",
      "_id": "time_t28",
      "chr_set_id": "time"
    }, {
      "face_id": "t29",
      "job": "透明女子会",
      "_id": "time_t29",
      "chr_set_id": "time"
    }, {
      "face_id": "t30",
      "job": "旅団✡肘笠雨",
      "_id": "time_t30",
      "chr_set_id": "time"
    }, {
      "face_id": "t31",
      "job": "呵呵老会",
      "_id": "time_t31",
      "chr_set_id": "time"
    }, {
      "face_id": "t32",
      "job": "安全調査局",
      "_id": "time_t32",
      "chr_set_id": "time"
    }, {
      "face_id": "t33",
      "job": "亡命同盟",
      "_id": "time_t33",
      "chr_set_id": "time"
    }, {
      "face_id": "t34",
      "job": "大銃協会",
      "_id": "time_t34",
      "chr_set_id": "time"
    }, {
      "face_id": "t35",
      "job": "紅客連盟",
      "_id": "time_t35",
      "chr_set_id": "time"
    }
  ]);

  Mem.Collection.chr_set.merge([
    {
      "_id": "wa",
      "admin": "闇の呟き",
      "maker": "稲荷のお告げ",
      "caption": "和の国てやんでえ",
      "chr_set_id": "wa"
    }
  ]);

  Mem.Collection.chr_npc.merge([
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

  Mem.Collection.chr_job.merge([
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
    }, {
      "face_id": "w53",
      "job": "旅籠",
      "_id": "wa_w53",
      "chr_set_id": "wa"
    }
  ]);

  list = (function() {
    var i, len, ref, ref1, results;
    ref = Mem.Query.faces.list;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      face = ref[i];
      chr_set_id = "all";
      face_id = face._id;
      _id = "all_" + face_id;
      job = (ref1 = Mem.Query.chr_jobs.face(face_id).list.first) != null ? ref1.job : void 0;
      if (job == null) {
        continue;
      }
      results.push({
        chr_set_id: chr_set_id,
        face_id: face_id,
        job: job,
        _id: _id
      });
    }
    return results;
  })();

  Mem.Collection.chr_job.merge(list);

}).call(this);

(function() {
  new Mem.Rule("event").schema(function() {
    var bit, mask, ref, visible;
    this.belongs_to("story", {
      dependent: true
    });
    this.order("updated_at");
    ref = RAILS.message, visible = ref.visible, bit = ref.bit, mask = ref.mask;
    this.scope(function(all) {
      return {};
    });
    this.deploy(function(o) {
      if (o.sow != null) {
        o.winner = Mem.Query.winners.sow(o.sow.winner)._id;
        o.event = Mem.Query.traps.sow(o.sow.event)._id;
      }
      if (o._id == null) {
        o._id = o.story_id + "-" + o.turn;
      }
      o.event_id = o._id;
      return o.view = {
        btn: function() {
          var submit;
          switch (false) {
            case !o.is_full:
              return null;
            case !o.is_loading:
              return m(".SSAY", "読み込み…");
            default:
              submit = function() {
                return doc.load.event(false, o, function() {});
              };
              return m(".SSAY", Btn.call({}, submit), "読み込み");
          }
        }
      };
    });
    return this.map_reduce(function(o, emit) {});
  });

}).call(this);

(function(){
  new Mem.Rule("form").schema(function(){
    this.belongs_to("chr_job");
    this.order(function(o){
      return o.index;
    });
    this.scope(function(all){});
    this['default'](function(){});
    this.deploy(function(o){
      var listup, text, input, role_scan, able_scan, role_names, role_helps, able_helps, i$, ref$, len$, role_id, can_use, able;
      listup = function(state, live, mob){
        var option;
        option = function(cb){
          if (Mem.Query.potofs) {
            return Mem.Query.potofs.where(cb).list.map(function(o){
              return {
                pno: o.pno,
                job: o.chr_job.job,
                name: o.name
              };
            });
          } else {
            return [];
          }
        };
        switch (state) {
        case "dead":
          return option(function(o){
            var ref$;
            return !((ref$ = o.live) === "live" || ref$ === "mob");
          });
        case "gm_live":
          return option(function(o){
            var ref$;
            return (ref$ = o.live) === "live" || ref$ === "mob";
          });
        case "gm_dead":
          return option(function(o){
            return o.live !== "live";
          });
        case "live":
          return option(function(o){
            return o.live === "live";
          });
        case "cast":
          return option(function(o){
            return o.live !== "mob";
          });
        case "mob":
          return option(function(o){
            return o.live === "mob";
          });
        case "all":
          return option(function(){
            return true;
          });
        case "near":
          switch (live) {
          case "mob":
            switch (mob) {
            case "grave":
              return listup("dead");
            case "alive":
              return listup("live");
            case "gamemaster":
              return listup("all");
            default:
              return listup("mob");
            }
            break;
          case "live":
            return listup("live");
          default:
            return listup("dead");
          }
          break;
        default:
          return [];
        }
      };
      text = function(mestype, format, able){
        var form_id, targets;
        form_id = o._id;
        targets = listup("near", o.live, o.mob);
        if (mestype === 'SAY' || mestype === 'GSAY' || mestype === 'VSAY' || mestype === 'TSAY') {
          targets.push({
            job: "―――",
            name: "",
            pno: -1
          });
        }
        if (targets.length) {
          return Mem.Collection.form_text.merge([{
            form_id: form_id,
            mestype: mestype,
            format: format,
            targets: targets,
            able: able
          }]);
        }
      };
      input = function(role, able){
        var target, old, targets, obj;
        target = m.prop(-1);
        old = m.prop(-1);
        targets = listup(able['for'], o.live, o.mob);
        if (able.sw) {
          targets.push({
            name: "",
            pno: o.pno || 1,
            job: able.sw
          });
        }
        if (able.pass) {
          targets.push({
            name: "",
            pno: -1,
            job: able.pass || "（パス）"
          });
        }
        obj = {
          able: able,
          old: old,
          target: target,
          targets: targets
        };
        obj.cmd = able.cmd || role.cmd;
        obj.attr = {
          form: function(){
            return {
              onchange: function(e){
                console.log([e.target]);
                e.target.name;
                return e.target.value;
              },
              onreset: function(e){},
              onsubmit: function(e){
                console.log([e, role, able, o]);
                return false;
              }
            };
          },
          target: function(){
            return {
              value: target(),
              onchange: m.withAttr("value", function(value){
                target(value);
                return validate.input(obj);
              })
            };
          }
        };
        validate.input(obj);
        return obj;
      };
      role_scan = function(role_id, can_use){
        var role, i$, ref$, len$, able_id, able, results$ = [];
        role = Mem.Query.roles.find(role_id);
        role_names.push(role.name);
        role_helps.push(role.HELP);
        if (in$("grave", role.ables)) {
          can_use = !can_use;
        }
        if (can_use) {
          for (i$ = 0, len$ = (ref$ = role.ables).length; i$ < len$; ++i$) {
            able_id = ref$[i$];
            able = Mem.Query.ables.find(able_id);
            results$.push(able_scan(role, able));
          }
          return results$;
        }
      };
      able_scan = function(role, able){
        var mestype, attr;
        able_helps.push(able.HELP);
        if (mestype = able.text) {
          if (mestype === 'SAY' || mestype === 'GSAY' || mestype === 'VSAY') {
            text(mestype, "act", able);
            o.mestype = mestype;
          }
          text(mestype, "memo", able);
          text(mestype, "talk", able);
          o.texts.push(mestype);
        }
        if (able.at != null) {
          if (able.at[o.turn]) {
            attr = {
              able: able,
              input: input(role, able)
            };
            return o.selects.push(attr);
          }
        }
      };
      o.format = "talk";
      o.format_on = function(format){
        var choice_on;
        choice_on = function(){
          return o.format = format;
        };
        return {
          onmouseup: choice_on,
          ontouchend: choice_on
        };
      };
      o.mestype_on = function(mestype){
        var choice_on;
        choice_on = function(){
          return o.mestype = mestype;
        };
        return {
          onmouseup: choice_on,
          ontouchend: choice_on
        };
      };
      role_names = [];
      role_helps = [];
      able_helps = [];
      o.form = {};
      o.texts = [];
      o.selects = [];
      o.ext == null && (o.ext = []);
      for (i$ = 0, len$ = (ref$ = o.ext).length; i$ < len$; ++i$) {
        role_id = ref$[i$];
        role_scan(role_id, true);
      }
      role_scan(o.turn, true);
      if (o.live !== "mob") {
        can_use = "live" === o.live;
        role_scan(o.live, true);
        for (i$ = 0, len$ = (ref$ = o.role).length; i$ < len$; ++i$) {
          role_id = ref$[i$];
          role_scan(role_id, can_use);
        }
      }
      for (i$ = 0, len$ = (ref$ = Mem.Query.ables.by_rolestate(o.rolestate)).length; i$ < len$; ++i$) {
        able = ref$[i$];
        role_names.push(able.name);
        able_scan({}, able);
      }
      o.role_name = role_names.join("、");
      o.role_help = _.uniq(_.compact(role_helps)).join("\n<br>\n");
      return o.able_help = _.uniq(_.compact(able_helps)).join("\n<br>\n");
    });
    return this.map_reduce(function(o){});
  });
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);

(function(){
  new Mem.Rule("form_text").schema(function(){
    var formats;
    formats = {
      talk: "発言",
      memo: "メモ",
      act: "アクション"
    };
    this.belongs_to("form");
    this.order(function(o){
      return o._id;
    });
    this.scope(function(all){
      return {
        formats: function(form_id, mestype){
          return all.where(function(o){
            return o.form_id === form_id && o.mestype === mestype && o.format_name != null;
          });
        },
        mestypes: function(form_id, format){
          return all.where(function(o){
            return o.form_id === form_id && o.format === format;
          });
        }
      };
    });
    this['default'](function(){});
    return this.deploy(function(o){
      var i$, ref$, len$, target, text_on;
      o._id = o.form_id + "-" + o.mestype + "-" + o.format;
      o.format_name = formats[o.format];
      o.mestype_name = Mem.Query.ables.find(o.mestype).name;
      o.target_hash = {};
      o.text = m.prop("");
      o.target_at = function(value){
        return o.target_hash[value];
      };
      for (i$ = 0, len$ = (ref$ = o.targets).length; i$ < len$; ++i$) {
        target = ref$[i$];
        o.target_hash[target.pno] = target;
      }
      o.target = m.prop(o.targets.last.pno);
      switch (o.format) {
      case 'act':
        o.max = {
          unit: 'count',
          line: 1,
          size: 100
        };
        break;
      default:
        o.max = {
          unit: 'point',
          line: 5,
          size: 100
        };
      }
      text_on = m.withAttr("value", function(value){
        o.text(value);
        return validate.talk(o);
      });
      validate.talk(o);
      return o.attr = {
        form: function(){
          return {
            onchange: function(e){
              e.target.name;
              e.target.value;
              return console.log([e, o]);
            },
            onreset: function(e){},
            onsubmit: function(e){
              console.log([e, o]);
              return false;
            }
          };
        },
        action: function(){
          return {
            onchange: m.withAttr("value", function(index){
              var act;
              act = Mem.Query.actions.find(index);
              o.action = act;
              if (act) {
                o.text(act.text);
              }
              return validate.talk(o);
            })
          };
        },
        text: function(){
          return {
            value: o.text(),
            onkeyup: text_on,
            onchange: text_on
          };
        },
        target: function(){
          return {
            value: o.target(),
            onchange: m.withAttr("value", function(value){
              o.target(Mem.unpack.Number(value));
              return validate.talk(o);
            })
          };
        }
      };
    });
  });
}).call(this);

(function(){
  var set_event_without_messages, set_event_messages, catch_gon, out$ = typeof exports != 'undefined' && exports || this;
  set_event_without_messages = function(arg$){
    var _id, story_id, name, created_at, updated_at, messages;
    _id = arg$._id, story_id = arg$.story_id, name = arg$.name, created_at = arg$.created_at, updated_at = arg$.updated_at;
    if (!created_at) {
      return;
    }
    if (!updated_at) {
      return;
    }
    messages = [];
    if ("プロローグ" === name) {
      messages.push({
        story_id: story_id,
        logid: "STORY-TEXT",
        template: "story_text",
        mestype: "STORY",
        anchor: "info",
        show: RAILS.message.bit.STORY,
        name: name,
        updated_at: created_at - 4
      });
      messages.push({
        story_id: story_id,
        logid: "STORY-RULE",
        template: "story_rule",
        mestype: "STORY",
        anchor: "info",
        show: RAILS.message.bit.STORY,
        name: name,
        updated_at: created_at - 3
      });
      messages.push({
        story_id: story_id,
        logid: "STORY-GAME",
        template: "story_game",
        mestype: "STORY",
        anchor: "info",
        show: RAILS.message.bit.STORY,
        name: name,
        updated_at: created_at - 2
      });
    }
    messages.push({
      story_id: story_id,
      logid: "EVENT-ASC",
      template: "event",
      mestype: "EVENT",
      anchor: "info",
      show: RAILS.message.bit.EVENT_ASC,
      name: name,
      updated_at: created_at - 100
    });
    messages.push({
      story_id: story_id,
      logid: "EVENT-DESC",
      template: "event",
      mestype: "EVENT",
      anchor: "info",
      show: RAILS.message.bit.EVENT_DESC,
      name: name,
      updated_at: updated_at - -100
    });
    return Mem.Collection.message.merge(messages, {
      event_id: _id
    });
  };
  set_event_messages = function(arg$){
    var _id, story_id, messages;
    _id = arg$._id, story_id = arg$.story_id, messages = arg$.messages;
    Mem.Collection.message.merge(messages, {
      event_id: _id,
      story_id: story_id
    });
    return console.log(messages.length + " messages cache. (" + _id + ")");
  };
  out$.catch_gon = catch_gon = {
    face: function(){
      var face;
      face = Mem.map_face_detail = gon.face;
      Mem.Collection.map_face_story_log.set(face.story_logs);
      face.name = Mem.Query.faces.find(face.face_id).name;
      face.story_id_of_folders = _.groupBy(face.story_ids, function(arg$){
        var k, count, ref$;
        k = arg$[0], count = arg$[1];
        return (ref$ = k.split("-")) != null ? ref$[0] : void 8;
      });
      return face.role_of_wins = _.groupBy(face.roles, function(arg$){
        var k, count, role, group;
        k = arg$[0], count = arg$[1];
        role = Mem.Query.roles.find(k) || {
          group: "OTHER"
        };
        group = role.group || "MOB";
        return Mem.conf.winner["WIN_" + group].name_group;
      });
    },
    form: function(){
      var i$, ref$, len$, o;
      for (i$ = 0, len$ = (ref$ = gon.form.texts).length; i$ < len$; ++i$) {
        o = ref$[i$];
        if (o.csid_cid) {
          o.chr_job_id = o.csid_cid.replace("/", "_").toLowerCase();
        }
      }
      return Mem.Collection.writer.set(gon.form.texts);
    },
    map_reduce_faces: function(){
      Mem.Collection.chr_set.schema(function(){
        return this.order(function(o){
          return Mem.Query.map_faces.reduce.chr_set[o._id].count;
        });
      });
      return Mem.Collection.map_face.set(gon.map_reduce.faces);
    },
    villages: function(){
      var i$, ref$, len$, event, id, ref1$;
      if ((typeof gon != 'undefined' && gon !== null ? gon.story : void 8) != null) {
        Mem.Collection.story.set([gon.story]);
        console.log("1 story cache.");
      }
      for (i$ = 0, len$ = (ref$ = gon.events).length; i$ < len$; ++i$) {
        event = ref$[i$];
        id = event.story_id + "-" + event.turn;
        event.is_full || (event.is_full = (ref1$ = Mem.Query.events.find(id)) != null ? ref1$.is_full : void 8);
      }
      Mem.Collection.event.merge(gon.events);
      console.log(gon.events.length + " events cache. (" + ((ref$ = gon.story) != null ? ref$._id : void 8) + ")");
      return Mem.Collection.potof.set(gon.potofs, {
        event_id: gon.events.last._id
      });
    },
    messages: function(){
      var interval, turn, i$, ref$, len$, event;
      interval = gon.story.upd.interval * 1000 * 3600 * 24;
      if (gon.event.messages) {
        turn = gon.event.turn;
        set_event_messages(gon.event);
        set_event_without_messages(gon.event);
      }
      for (i$ = 0, len$ = (ref$ = gon.events).length; i$ < len$; ++i$) {
        event = ref$[i$];
        console.log(event._id + ", " + event.name);
        if (event.messages) {
          set_event_messages(event);
        }
        if (turn !== event.turn) {
          set_event_without_messages(event);
        }
      }
      if (!Url.prop.talk_at()) {
        Url.prop.talk_at(doc.messages.talk(Url.prop).list.first._id);
      }
      if (!Url.prop.memo_at()) {
        Url.prop.memo_at(doc.messages.memo(Url.prop).list.first._id);
      }
      if (!Url.prop.home_at()) {
        return Url.prop.home_at(doc.messages.home(Url.prop).list.first._id);
      }
    }
  };
}).call(this);

(function(){
  var slice$ = [].slice;
  new Mem.Rule("item").schema(function(){
    var data;
    data = function(rule, ary){
      var q, scope;
      q = Mem.Query[rule];
      if (ary.length > 0) {
        scope = ary.shift();
        q = q[scope].apply(q, ary);
      }
      return q;
    };
    this.order(function(o){
      return o.index;
    });
    this.scope(function(all){});
    this['default'](function(){
      return {
        list: function(){
          var ref$, rule, ary;
          if (this.query) {
            ref$ = this.query.split(/ +/), rule = ref$[0], ary = slice$.call(ref$, 1);
            return data(rule, ary).list;
          }
        }
      };
    });
    this.deploy(function(o){
      var ref$, type, template, mestype, index, rule, i$, ary, key;
      ref$ = o._id.split('-'), type = ref$[0], template = ref$[1], mestype = ref$[2], index = ref$[3];
      if (o.face_id) {
        o.csid || (o.csid = "all");
      }
      o.type || (o.type = type);
      o.index || (o.index = Number(index) || o.updated_at);
      o.mestype || (o.mestype = mestype);
      o.template || (o.template = template);
      if (o.object) {
        ref$ = o.object.split(/ +/), rule = ref$[0], ary = 1 < (i$ = ref$.length - 1) ? slice$.call(ref$, 1, i$) : (i$ = 1, []), key = ref$[i$];
        return o.log = data(rule, ary)[key];
      }
    });
    this.map_reduce(function(o){});
  });
}).call(this);

(function() {
  new Mem.Rule("map_face").schema(function() {
    var item;
    this.belongs_to("face", {
      dependent: true
    });
    this.scope(function(all) {
      return {
        active: function(order, chr_set, search) {
          order = Mem.conf.map_faces_order[order].order;
          return all["in"]({
            chr_set_ids: chr_set
          }).search(search).sort("desc", function(o) {
            var base;
            return (base = o.win.value)[order] != null ? base[order] : base[order] = 0;
          });
        }
      };
    });
    this.deploy(function(o) {
      var face, list, ref, ref1, search_words, sow_auth_id;
      o._id = o.face_id;
      o.win.value.合計 = o.win.all;
      list = (ref = o.face) != null ? (ref1 = ref.chr_jobs) != null ? ref1.list : void 0 : void 0;
      if (list) {
        search_words = list.map(function(o) {
          return o.job;
        });
        o.chr_set_ids = list.map(function(o) {
          return o.chr_set_id;
        });
      } else {
        search_words = o.chr_set_ids = [];
      }
      face = o.face;
      if (face) {
        search_words.push(face.name);
        for (sow_auth_id in o.sow_auth_id.value) {
          search_words.push(sow_auth_id);
        }
        return o.search_words = search_words.join("\t");
      }
    });
    item = {
      count: 1
    };
    return this.map_reduce(function(o, emit) {
      var i, id, len, ref, results;
      ref = o.chr_set_ids;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        id = ref[i];
        results.push(emit("chr_set", id, item));
      }
      return results;
    });
  });

  new Mem.Rule("map_face_story_log").schema(function() {
    this.order(function(o) {
      return o.date.max;
    });
    return this.deploy(function(o) {
      o._id = o.logid_head;
      return o.folder = o.logid_head.split("-")[0].toUpperCase();
    });
  });

}).call(this);

(function() {
  new Mem.Rule("message").schema(function() {
    var ats, bit, has, ids, mask, ref, timespan, visible;
    this.belongs_to("event", {
      dependent: true
    });
    this.belongs_to("story", {
      dependent: true
    });
    this.belongs_to("face");
    this.order("updated_at");
    timespan = 1000 * 3600;
    ref = RAILS.message, visible = ref.visible, bit = ref.bit, mask = ref.mask;
    ids = {};
    has = {
      face: {},
      vsay: false,
      bug: false
    };
    ats = {};
    this.scope(function(all) {
      return {
        ids: ids,
        has: has,
        anker_id: function(folder, vid, turn, logid) {
          var id;
          id = folder + "-" + vid + "-" + turn + "-" + logid;
          id = all.ids[id] || id;
          if (all.find(id)) {
            return id;
          } else {
            return all.anker_id(folder, vid, turn - 1, logid);
          }
        },
        anchor: function(mode, scroll) {
          var enables, folder, logid, message, ref1, regexp, turn, vid;
          enables = RAILS.message.visible.talk[mode];
          message = all.find(scroll);
          if (message) {
            ref1 = scroll.split("-"), folder = ref1[0], vid = ref1[1], turn = ref1[2], logid = ref1[3];
            regexp = RegExp("<mw " + logid + "," + turn + ",");
            return all.where(function(o) {
              return (o.show & enables) && regexp.test(o.search_words);
            });
          } else {
            return all.where(function(o) {
              return false;
            });
          }
        },
        pins: function(story_id, pins) {
          var enables;
          enables = RAILS.message.visible.appendex.event_desc;
          return all.sort("desc", "updated_at").where(function(o) {
            return (o.show & enables) || pins[o.turn + "-" + o.logid] && (o.story_id === story_id);
          });
        },
        home: function(mode) {
          var enables;
          enables = visible.home[mode];
          return all.where(function(o) {
            return o.show & enables;
          });
        },
        talk: function(mode, open, hides, search) {
          var enables;
          enables = visible.talk[mode];
          if (!open) {
            enables &= mask.NOT_OPEN;
          }
          return all.where(function(o) {
            return (o.show & enables) && !hides[o.face_id];
          }).search(search);
        },
        memo: function(mode, uniq, hides, search) {
          var enables, query;
          enables = visible.memo[mode];
          query = all.sort("desc", "updated_at").where(function(o) {
            return (o.show & enables) && !hides[o.face_id];
          }).search(search);
          if (uniq) {
            query = query.distinct("pen", "max_is");
          }
          return query;
        },
        warning: function(hides) {
          var enables;
          enables = visible.warning.all;
          return all.where(function(o) {
            return (o.show & enables) && !hides[o.face_id];
          });
        }
      };
    });
    this["default"](function() {
      return {
        log: "",
        csid: null,
        face_id: null
      };
    });
    this.deploy(function(o) {
      var anchor_num, anker_id, event, folder, lognumber, logtype, ref1, story, tail, template, turn, vid;
      if (o.sow != null) {
        o.mestype = SOW_RECORD.mestypes[o.sow.mestype];
      }
      logtype = o.logid.slice(0, 2);
      lognumber = o.logid.slice(2);
      switch (o.mestype) {
        case "QUEUE":
          o.mestype = "SAY";
          break;
        case "VSAY":
          story = o.story, event = o.event;
          has.vsay = true;
          if (story && event && "grave" === story.type.mob && !event.name.match(/プロローグ|エピローグ/)) {
            o.mestype = "VGSAY";
          }
      }
      switch (logtype) {
        case "IS":
          o.logid = "II" + lognumber;
          break;
        case "iS":
          o.logid = "iI" + lognumber;
          break;
        case "CS":
          o.logid = "cI" + lognumber;
          break;
        case "AS":
          o.mestype = "ADMIN";
          break;
        case "DS":
          o.mestype = "DELETED";
          break;
        case "TS":
          if (o.to) {
            has.to = true;
          } else {
            o.mestype = "TSAY";
          }
      }
      ref1 = o.event_id.split("-"), folder = ref1[0], vid = ref1[1], turn = ref1[2];
      o.folder || (o.folder = folder);
      o.vid || (o.vid = vid);
      o.turn || (o.turn = turn);
      o._id = o.event_id + "-" + o.logid;
      o.user_id = o.sow_auth_id;
      anchor_num = o.logid.slice(2) - 0 || 0;
      o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || "";
      o.pen = o.mestype + "-" + o.face_id;
      o.potof_id = o.event_id + "-" + o.csid + "-" + o.face_id;
      if (!o.updated_at) {
        o.updated_at = new Date(o.date) - 0;
      }
      if (ats[o.updated_at]) {
        o.updated_at += ats[o.updated_at]++;
      } else {
        ats[o.updated_at] = 1;
      }
      template = o.template;
      switch (o.logid[1]) {
        case "S":
        case "X":
          template = "talk";
          o.show = bit.TALK;
          break;
        case "A":
        case "B":
          template = "action";
          o.anchor = "act";
          o.show = bit.ACTION;
          break;
        case "M":
          template = "memo";
          o.anchor = "memo";
          o.show = bit.MEMO;
          tail = o.logid.slice(1);
          anker_id = o.event_id + "-M" + tail;
          ids[anker_id] = o._id;
          break;
        case "I":
          template = "info";
          o.anchor = "info";
          o.show = bit.INFO;
      }
      o.mask = (function() {
        switch (o.logid[0]) {
          case "-":
          case "W":
          case "P":
          case "X":
            has.clan = true;
            return "CLAN";
          case "T":
          case "i":
            has.think = true;
            return "THINK";
          case "V":
          case "G":
            has.grave = true;
            return "GRAVE";
          case "D":
            o.anchor = "del";
            return "DELETE";
          default:
            return "MAIN";
        }
      })();
      switch (o.mestype) {
        case "MAKER":
        case "ADMIN":
          if (o.show !== bit.ACTION) {
            template = "guide";
          }
          o.mask = "ANNOUNCE";
          break;
        case "CAST":
          template = "potofs";
          break;
        case "STORY":
          o.pen = o.event_id;
          o.mask = "ALL";
          break;
        case "EVENT":
          o.pen = o.event_id;
          o.mask = "ALL";
      }
      o.show &= mask[o.mask];
      o.template = template;
      return o.search_words = o.log;
    });
    return this.map_reduce(function(o, emit) {
      var item, time_id;
      has.face[o.face_id] = true;
      switch (o.template) {
        case "talk":
        case "guide":
          if (o.log) {
            time_id = Mem.pack.Date(o.updated_at / timespan);
            item = {
              count: o.log.length,
              min: o.updated_at,
              max: o.updated_at
            };
            emit("mask", time_id, o.mestype, item);
            emit("mask", time_id, "all", item);
          }
      }
      emit("event", o.event_id, {
        max: o.updated_at
      });
      return emit("pen", o.pen, {
        max: o.updated_at
      });
    });
  });

}).call(this);

(function() {
  var slice = [].slice;

  new Mem.Rule("potof").schema(function() {
    var id_list, urges, win_by_role;
    this.belongs_to("story");
    this.belongs_to("event");
    this.belongs_to("chr_job");
    this.depend_on("message");
    urges = "　①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";
    win_by_role = (function(_this) {
      return function(o, query) {
        var i, ref, ref1, role, win;
        ref = o.role;
        for (i = ref.length - 1; i >= 0; i += -1) {
          role = ref[i];
          win = (ref1 = query.find(role)) != null ? ref1.win : void 0;
          if (win) {
            return win;
          }
        }
        return "NONE";
      };
    })(this);
    id_list = function(query) {
      return query.pluck("face_id").sort();
    };
    this.scope(function(all) {
      return {
        full: function() {
          delete Mem.Query.messages.has.face.undefined;
          delete Mem.Query.messages.has.face["null"];
          delete Mem.Query.messages.has.face.admin;
          delete Mem.Query.messages.has.face.maker;
          return Object.keys(Mem.Query.messages.has.face).sort();
        },
        potofs: function() {
          return _.without.apply(_, [all.full()].concat(slice.call(all.others())));
        },
        not_lives: function(turn) {
          return _.without.apply(_, [all.full()].concat(slice.call(all.lives(turn))));
        },
        not_deads: function(turn) {
          return _.without.apply(_, [all.full()].concat(slice.call(all.deads(turn))));
        },
        lives: function(turn) {
          return id_list(all.where(function(o) {
            return o.hide.dead && turn < o.hide.dead;
          }));
        },
        deads: function(turn) {
          return id_list(all.where(function(o) {
            return o.hide.dead && o.hide.dead <= turn;
          }));
        },
        others: function() {
          return id_list(all.where(function(o) {
            return o.hide.other;
          }));
        },
        view: function(is_desc, order) {
          return all.sort(is_desc, function(o) {
            return o.order[order];
          });
        }
      };
    });
    this.deploy(function(o) {
      var chr_job, event, is_dead_lose, is_lone_lose, job, name, pt, pt_no, ref, ref1, ref2, ref3, role, role_side_order, role_text, roles, said_num, say_type, select, stat_at, stat_order, stat_type, story, text, text_str, urge, win, win_juror, win_love, win_result, win_role, win_side_order, win_zombie, winner, zombie;
      if (o.sow != null) {
        o.role = [Mem.Query.roles.sow_role(o.sow.role)._id, Mem.Query.roles.sow_gift(o.sow.gift)._id];
        o.select = Mem.Query.roles.sow_role(o.sow.selrole)._id;
      }
      if (((ref = o._id) != null ? ref.$oid : void 0) != null) {
        o._id = o._id.$oid;
      }
      if (o.user_id == null) {
        o.user_id = o.sow_auth_id;
      }
      if (o.chr_job_id == null) {
        o.chr_job_id = (o.csid.toLowerCase()) + "_" + o.face_id;
      }
      chr_job = o.chr_job;
      if (chr_job != null) {
        name = (ref1 = chr_job.face) != null ? ref1.name : void 0;
        job = chr_job.job;
      } else {
        job = "***";
      }
      if (name == null) {
        name = o.name;
      }
      o.name = o.zapcount ? "" + RAILS.clearance[o.clearance] + name + "-" + o.zapcount : name;
      o.hide = {};

      /*
      if o.event_id
        if o.event_id.match /-0$/
          o.live = "leave"
      else
        o.live = "leave"
       */
      stat_at = (0 < (ref2 = o.deathday) && ref2 < Infinity) ? o.deathday + "日" : (o.deathday = Infinity, "");
      said_num = o.point.saidcount;
      urge = o.point.actaddpt;
      pt_no = o.say.gsay;
      story = o.story, event = o.event;
      switch (o.live) {
        case "live":
          pt_no = o.say.say;
          o.hide.dead = o.deathday;
          break;
        case "mob":
          if ('juror' === story.type.mob) {
            win_juror = 'HUMAN';
          }
          break;
        case "suddendead":
          win_juror = 'LEAVE';
          o.hide.other = true;
          o.hide.dead = o.deathday;
          break;
        case "leave":
          win_juror = 'LEAVE';
          o.hide.other = true;
          pt = 0;
          urge = 0;
          said_num = 0;
          break;
        default:
          o.hide.dead = o.deathday;
      }
      if (story.is_epilogue) {
        pt = "∞";
      } else {
        say_type = Mem.conf.say[story.type.say];
        pt = (function() {
          switch (say_type.COST_SAY) {
            case "point":
              return pt_no + "pt";
            case "count":
              return pt_no + "回";
            default:
              return "∞";
          }
        })();
      }
      select = GUI.name.config(o.select);
      win_result = "参加";
      zombie = 0x040;
      switch (story.type.game) {
        case "TROUBLE":
          if (0 === (o.rolestate & zombie)) {
            win_zombie = 'WOLF';
          }
          if ("HUMAN" === win) {
            is_dead_lose = 1;
          }
          break;
        case "LIVE_TABULA":
        case "LIVE_MILLERHOLLOW":
        case "SECRET":
          is_dead_lose = 1;
      }
      win_love = (ref3 = RAILS.loves[o.love]) != null ? ref3.win : void 0;
      win_role = win_by_role(o, Mem.Query.roles);
      win = win_juror || win_love || win_zombie || win_role;
      if (win === 'EVIL') {
        win = story.evil;
      }
      switch (win) {
        case "LONEWOLF":
          is_dead_lose = 1;
          break;
        case "HATER":
          if (!_.includes(o.role, "HATEDEVIL")) {
            is_dead_lose = 1;
          }
          break;
        case "LOVER":
          if (!_.includes(o.role, "LOVEANGEL")) {
            is_lone_lose = 1;
          }
      }
      if (story.is_epilogue) {
        switch (o.live) {
          case "suddendead":
          case "leave":
            win_result = "―";
            break;
          default:
            winner = event.winner;
            win_result = "敗北";
            if (winner === "WIN_" + win) {
              win_result = "勝利";
            }
            if (winner !== "WIN_HUMAN" && winner !== "WIN_LOVER" && "EVIL" === win) {
              win_result = "勝利";
            }
            if ("victim" === o.live && "DISH" === win) {
              win_result = "勝利";
            }
            if (is_dead_lose && 'live' !== o.live) {
              win_result = "敗北";
            }
            if (is_lone_lose && _.some(o.bonds, function(o) {
              return o.live !== 'live' && _.some(o.bonds, o.pno);
            })) {
              win_result = "敗北";
            }
            if ("NONE" === win) {
              win_result = "参加";
            }
        }
      }
      stat_type = Mem.conf.live[o.live].name;
      stat_order = Mem.conf.live[o.live].order;
      win_side_order = Mem.conf.winner["WIN_" + win].order;
      role_side_order = Mem.conf.winner["WIN_" + win_role].order;
      roles = (function() {
        var i, len, ref4, results;
        ref4 = o.role;
        results = [];
        for (i = 0, len = ref4.length; i < len; i++) {
          role = ref4[i];
          results.push(GUI.name.config(role));
        }
        return results;
      })();
      role_text = roles.join("、");
      text = Mem.Query.ables.by_rolestate(o.rolestate).pluck("name");
      if ('pixi' === o.sheep) {
        text.push('<span class="icon-music"></span>');
      }
      if ('love' === o.love) {
        text.push('<span class="icon-heart"></span>');
      }
      if ('hate' === o.love) {
        text.push('<span class="icon-scissors"></span>');
      }
      if ('love' === o.pseudolove) {
        text.push('<span class="icon-heart    del"></span>');
      }
      if ('hate' === o.pseudolove) {
        text.push('<span class="icon-scissors del"></span>');
      }
      text_str = text.join();
      o.order = {
        stat_at: [-o.deathday, -stat_order],
        stat_type: [stat_order, -o.deathday],
        said_num: [said_num, pt_no, urge],
        pt: [pt_no, said_num, urge],
        urge: [urge, pt_no, said_num],
        win_result: [win_result, win_side_order, text_str, role_text],
        win_side: [win_side_order, win_result, text_str, role_text],
        role: [role_side_order, role_text, win_side_order, select, text_str],
        select: [select, role_side_order, role_text, win_side_order, text_str],
        text: [text_str, win_side_order, role_side_order, role_text, select]
      };
      o.view = {
        portrate: GUI.portrate(o.face_id),
        job: job,
        user_id: m("kbd", o.user_id),
        stat_at: stat_at,
        stat_type: stat_type,
        said_num: said_num ? said_num + "回" : "",
        pt: pt,
        urge: urges[urge] || "∞",
        win: win,
        win_result: win_result,
        win_side: Mem.conf.winner["WIN_" + win].name,
        role: role_text,
        select: select ? m("kbd", select) : "",
        text: text_str
      };
      return o.form = {
        _id: o.pno
      };
    });
    return this.map_reduce(function(o, emit) {});
  });

}).call(this);

(function(){
  var mask, ref$, id, o;
  new Mem.Rule("role").schema(function(){
    var role_index, gift_index, order_index;
    role_index = SOW_RECORD.roles;
    gift_index = SOW_RECORD.gifts;
    order_index = role_index.concat(gift_index);
    this.order("order");
    this.scope(function(all){
      return {
        is: function(side){
          return all.where(function(o){
            return o.side === side && -1 < o.order;
          });
        },
        group: function(group){
          return all.where(function(o){
            return o.cmd && o.group === group && -1 < o.order;
          });
        },
        hide: function(){
          return all.where(function(o){
            return !o.cmd || o.order < 0;
          });
        },
        mob: function(){
          return all.where(function(o){
            return o.group === "MOB";
          });
        },
        sow_role: function(idx){
          return all.where(function(o){
            return o.role_idx === idx;
          }).list.first;
        },
        sow_gift: function(idx){
          return all.where(function(o){
            return o.gift_idx === idx;
          }).list.first;
        },
        gift_sides: function(ids){
          return all.where(function(o){
            return o.group !== "OTHER";
          }).finds(ids);
        },
        gift_appends: function(ids){
          return all.where(function(o){
            var ref$;
            return (ref$ = o._id) === "decide" || ref$ === "seeronce";
          }).finds(ids);
        },
        gift_items: function(ids){
          return all.where(function(o){
            var ref$;
            return (ref$ = o._id) === "glass" || ref$ === "shield";
          }).finds(ids);
        },
        gift_without_items: function(ids){
          return all.where(function(o){
            var ref$;
            return (ref$ = !o._id) === "glass" || ref$ === "shield";
          }).finds(ids);
        },
        players: function(ids){
          return all.where(function(o){
            return "role" === o.cmd && "robber" !== o._id;
          }).finds(ids);
        },
        robbers: function(ids){
          return all.where(function(o){
            return "robber" === o._id;
          }).finds(ids);
        },
        villagers: function(ids){
          return all.where(function(o){
            return "villager" === o._id;
          }).finds(ids);
        },
        humans: function(ids){
          return all.where(function(o){
            return "HUMAN" === o.group;
          }).finds(ids);
        },
        wolfs: function(ids){
          return all.where(function(o){
            return "WOLF" === o.group;
          }).finds(ids);
        },
        minus2: function(ids){
          return all.where(function(o){
            var ref$;
            return (ref$ = o._id) === "hatedevil" || ref$ === "loveangel";
          }).finds(ids);
        },
        minus1: function(ids){
          return all.where(function(o){
            var ref$;
            return (ref$ = o._id) === "bitch" || ref$ === "fink" || ref$ === "fairy" || ref$ === "ogre";
          }).finds(ids);
        }
      };
    });
    this['default'](function(){});
    this.deploy(function(o){
      o.ables || (o.ables = []);
      o.HELP || (o.HELP = "");
      o.role_idx = role_index.indexOf(o._id);
      o.gift_idx = gift_index.indexOf(o._id);
      o.order = order_index.indexOf(o._id);
      if (o.group != null && o.group !== "OTHER") {
        o.side = o.group.toLowerCase();
      }
      if ("gift" === o.cmd) {
        o.side = "gift";
      }
      if (o.group === "MOB") {
        o.side = "mob";
        o.order = 0;
      }
      if (!o.side) {
        return o.side = "other";
      }
    });
    return this.map_reduce(function(o){});
  });
  new Mem.Rule("trap").schema(function(){
    var id_index;
    id_index = SOW_RECORD.events;
    this.order("order");
    this.scope(function(all){
      return {
        show: function(){
          return all.where(function(o){
            return o.cmd === "trap";
          });
        },
        hide: function(){
          return all.where(function(o){
            return !o.cmd || o.order < 0;
          });
        },
        sow: function(idx){
          return all.where(function(o){
            return o.order === idx;
          }).list.first;
        }
      };
    });
    this['default'](function(){});
    this.deploy(function(o){
      return o.order = id_index.indexOf(o._id);
    });
    return this.map_reduce(function(o){});
  });
  new Mem.Rule("able").schema(function(){
    this.scope(function(all){
      return {
        by_rolestate: function(bits){
          var masks, res$, i$, ref$, len$, mask;
          res$ = [];
          for (i$ = 0, len$ = (ref$ = all.masks).length; i$ < len$; ++i$) {
            mask = ref$[i$];
            if (0 === bits & mask) {
              bits |= mask;
              res$.push(mask);
            }
          }
          masks = res$;
          return all.where({
            mask: masks
          });
        }
      };
    });
    this['default'](function(){});
    this.deploy(function(o){
      return o.at = (function(){
        switch (o.at) {
        case "main":
          return {
            main: true
          };
        case "start":
          return {
            start: true
          };
        case "progress":
          return {
            start: true,
            main: true
          };
        case "prologue":
          return {
            prologue: true
          };
        case "around":
          return {
            prologue: true,
            epilogue: true
          };
        case "all":
          return {
            start: true,
            main: true,
            prologue: true,
            epilogue: true
          };
        default:
          return {};
        }
      }());
    });
    return this.map_reduce(function(o){});
  });
  Mem.Collection.able.set({
    "editvilform": {
      "btn": "村を編集する",
      "change": "村の編集フォームを確認、修正します。",
      "at": "around",
      "cmd": "editvilform",
      "HELP": ""
    },
    "muster": {
      "btn": "点呼！",
      "change": "全員を未発言状態にします。未発言者は１日そのまま発言がないと、自動退出します。",
      "at": "prologue",
      "cmd": "muster",
      "HELP": ""
    },
    "update": {
      "btn": "更新！",
      "change": "ただちに更新し、次の日を迎えます。お覚悟はよろしいですか？",
      "at": "all",
      "cmd": "update",
      "HELP": ""
    },
    "scrapvil": {
      "btn": "廃村！",
      "change": "ただちに村を廃村にします。廃村になった村はエピローグになります。",
      "at": "all",
      "cmd": "scrapvil",
      "HELP": ""
    },
    "exit": {
      "btn": "退出…",
      "change": "村を立ち去ります。",
      "at": "prologue",
      "cmd": "exit",
      "HELP": ""
    },
    "commit": {
      "sw": "時間を進める",
      "pass": "（時間を進めない）",
      "change": "時間を進めるかどうか、選択してください。",
      "at": "progress",
      "cmd": "commit",
      "HELP": "全員が「時間を進める」を選ぶと前倒しで更新されます。\n<br>\n最低一発言して確定しないと、時間を進める事ができません。"
    },
    "night": {
      "sw": "夜遊びする",
      "pass": "（夜遊びしない）",
      "change": "夜遊びをして、深夜の囁きを聞いてしまうかどうか、選択してください。",
      "at": "main",
      "HELP": "あなたは二日目以降、夜に出歩くことができます。\n人狼の囁き、民の念話、共鳴者の共鳴を誰のものとも判別せず聞いちゃうので、朝になって昨日を振り返ると思い出せることでしょう。\n顔や名前はわかりませんが。\n<br>\nただしこのとき、もしあなたが人狼の、誰かひとりにでも襲撃される矛先に含まれていると、恐怖のあまり、実際に襲われる犠牲者とは別に死んでしまいます。\nこの死亡を護衛する方法はありません。また、息を引き取るあなたを尻目に、狼達は別の人物を襲撃するでしょう。"
    },
    "dish": {
      "sw": "跳ねる",
      "pass": "（跳ねない）",
      "change": "跳ねるアピールをするかどうか、選択してください。",
      "at": "progress",
      "HELP": "美味しく食べて貰うことを悦びとし、活き活きと跳ねることができます。わたしをたべて、わたしをたべて、とアピールしましょう。"
    },
    "cling": {
      "sw": "飲薬する",
      "pass": "（飲薬しない）",
      "change": "あなたが殺害されたとしたら、犯人を道連れにするかどうか、選択してください。",
      "at": "main",
      "HELP": "薬を服用した夜、もし処刑以外の要因で命を落とした場合、その犯人を道連れにします。人狼の襲撃の場合、襲撃実行者が対象となります。"
    },
    "guru": {
      "targets": "誘う",
      "pass": "（パス）",
      "change": "誘い込む犠牲者を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "毎晩ふたりずつ、好きな人物をひそかに誘い込むことができます。自分自身を誘うことはできません。\n<br>\n誘い込まれた当人たちは夜な夜な踊り明かし、そのことを覚えています。しかし、彼らの能力や所属陣営などに変化はありません。"
    },
    "bitch": {
      "targets": "遊ぶ",
      "change": "絆を結ぶ相手と、弄ぶ遊び相手を選択してください。",
      "for": "live",
      "at": "start",
      "HELP": "一日目、一人目に選択した人物を本命の恋人として“運命の絆”を結びつけ、二人目は絆を結ぶふりをして手玉にとります。\n“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。もう一人はどうでもよいのですが、そう思わせないこまめなケアが大切です。"
    },
    "bonds": {
      "targets": "結ぶ",
      "change": "絆で結ぶ二人を選択してください。",
      "for": "live",
      "at": "start",
      "HELP": "一日目、好きな二人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ二人は、片方が死亡すると後を追って死亡します。"
    },
    "bond": {
      "target": "結ぶ",
      "change": "あなたとの絆を結ぶ相手を選択してください。",
      "for": "live",
      "at": "start",
      "HELP": "一日目、あなたから好きな人に“運命の絆”を結びつける事ができます。“運命の絆”を結んだ相手が死亡すると、あなたは後を追って死亡します。"
    },
    "guard": {
      "target": "守る",
      "pass": "（パス）",
      "change": "守護する対象を選択してください。",
      "for": "live",
      "at": "main",
      "HELP": "一人を狼の襲撃、もしくは付け狙う賞金稼の手から守ることが出来ます。\n<br>\n自分自身を守ることは出来ません。"
    },
    "see": {
      "target": "占う",
      "pass": "（パス）",
      "change": "正体を知りたい相手を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "ひとりを占い対象に指定します。"
    },
    "sneak": {
      "target": "狙う",
      "pass": "（パス）",
      "change": "付け狙う相手を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"
    },
    "hunt": {
      "target": "襲う",
      "pass": "（パス）",
      "change": "殺害する相手を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "人狼全員で多数決をし、一人だけ殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"
    },
    "kill": {
      "target": "襲う",
      "pass": "（パス）",
      "change": "殺害する相手を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "殺害します。\nただし、対象が護衛されているか、光の輪を渡されているか、妖精、もしくは一匹狼であれば、効力は発揮しません。\nまた、対象が半狼であれば彼は人狼になり、人犬、もしくは無傷の長老の場合は、即死はしませんが傷を負わせることができます。"
    },
    "cure": {
      "target": "診察",
      "pass": "（パス）",
      "change": "診察する相手を選択してください。",
      "for": "live",
      "at": "main",
      "HELP": "ひとりを診察し、人狼の牙に感染しているかを確認します。その場合は治療します。治療した人は生存者として数えますが、能力は取り戻しません。"
    },
    "tangle": {
      "target": "憑依",
      "pass": "（パス）",
      "change": "付け狙う相手を選択してください。",
      "for": "dead",
      "at": "progress",
      "HELP": "死者の埋葬地をうろつきまわっています。\n指定した故人の役職と勝利条件を写しとり、対象を蘇生させます。\nこのため、あなたは死亡しなくては、勝利がありません。"
    },
    "analeptic": {
      "target": "投薬",
      "pass": "（パス）",
      "change": "薬を投与する相手を選択してください。",
      "for": "dead",
      "require": "role1",
      "at": "progress",
      "HELP": "死者に投薬して蘇生させます。\n蘇生は一度だけおこなうことができ、それっきり薬は失われます。"
    },
    "poison": {
      "target": "投薬",
      "pass": "（パス）",
      "change": "薬を投与する相手を選択してください。",
      "for": "live",
      "require": "role2",
      "at": "progress",
      "HELP": "生きている者に投薬して毒殺します。\n毒殺は一度ずつだけおこなうことができ、それっきり薬は失われます。"
    },
    "scapegoat": {
      "target": "疑う",
      "pass": "（パス）",
      "change": "あなたが最後になったとしたら、指差す相手を選択してください。",
      "for": "live",
      "at": "main",
      "HELP": "もし投票数が同数になり処刑する相手が定まらないと、混乱した村人達に処刑されてしまいます。\nあなたが最後に指差した人は、後悔する村人達に翌日、処刑されるでしょう。皆、そうするより他にないのです。"
    },
    "hike": {
      "target": "外出する",
      "pass": "（パス）",
      "change": "会いに行く相手を選択してください。",
      "for": "cast",
      "at": "progress",
      "HELP": "特殊な能力があるかどうか自覚していません。夜は積極的に外出して、様子をさぐりましょう。"
    },
    "vote": {
      "target": "投票",
      "pass": "（委任する）",
      "change": "処刑する相手を選択してください。",
      "for": "live",
      "at": "main",
      "cmd": "vote",
      "HELP": "全員で多数決をし、一人だけ処刑します。"
    },
    "vote_role": {
      "target": "投票",
      "pass": "（パス）",
      "change": "処刑する相手を選択してください。",
      "for": "live",
      "at": "main",
      "HELP": ""
    },
    "entrust": {
      "target": "委任",
      "pass": "（投票する）",
      "change": "処刑を棄権し、一票を委ねる相手を選択してください。",
      "for": "live",
      "at": "main",
      "cmd": "vote",
      "HELP": "投票は棄権し、他人の投票と同じとすることができます。"
    },
    "jammer": {
      "target": "邪魔",
      "pass": "（パス）",
      "change": "占いから保護する相手を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "毎夜、一人をあらゆる占いから包み隠すことができます。\n<br>\n自分自身を隠すことはできません。"
    },
    "snatch": {
      "target": "換わる",
      "pass": "（パス）",
      "change": "顔と名前を簒奪する相手を選択してください。",
      "for": "live",
      "at": "progress",
      "HELP": "好きな人物の顔と名前を奪い、自身のそれと入れ替えることができます。この能力は非常に露顕しやすいので、行使には注意が必要です。\n<br>\nもしも夜の間に屍体になった人を対象に選んだなら、旧いあなたは命を落とし、あなたとなったその屍体は息を吹き返すでしょう。\nまた、結ばれた絆や、笛吹きに誘われたことは姿とともにあり、姿を移し替えたときに引き継ぐことがあります。\n一度移し替えた姿は、永遠にあなたのものです。二度と元には戻りません。"
    },
    "gm_droop": {
      "target": "すぐに墓下へ",
      "pass": "―――",
      "change": "参加者として死なせる相手を選択してください。",
      "for": "gm_live",
      "at": "all",
      "cmd": "gamemaster",
      "HELP": ""
    },
    "gm_live": {
      "target": "すぐに表舞台へ",
      "pass": "―――",
      "change": "参加者として蘇生させる相手を選択してください。",
      "for": "gm_dead",
      "at": "all",
      "cmd": "gamemaster",
      "HELP": ""
    },
    "gm_disable_vote": {
      "target": "投票から保護する",
      "pass": "―――",
      "change": "投票対象に選ぶことを認めない相手を選択してください。",
      "for": "live",
      "at": "all",
      "cmd": "gamemaster",
      "HELP": ""
    },
    "gm_enable_vote": {
      "target": "投票を認可する",
      "pass": "―――",
      "change": "投票対象に選ぶこと許可する相手を選択してください。",
      "for": "live",
      "at": "all",
      "cmd": "gamemaster",
      "HELP": ""
    },
    "maker": {
      "target": "村を任せる",
      "pass": "―――",
      "change": "村の管理を任せる相手を選択してください。",
      "for": "all",
      "at": "all",
      "cmd": "maker",
      "HELP": ""
    },
    "kick": {
      "target": "退去！",
      "pass": "―――",
      "change": "退去いただこう、かな…、と思った相手を選択してください。",
      "for": "all",
      "at": "prologue",
      "cmd": "kick",
      "HELP": ""
    },
    "blind": {
      "HELP": "（サーバーは、この役職を保有していることを本人に通知しません。）"
    },
    "wolf": {
      "HELP": "あなたは人狼と判定されます。"
    },
    "pixi": {
      "HELP": "占いの対象となると死亡します。勝利判定では人間にも人狼にも数えられません。"
    },
    "human": {
      "HELP": "勝利判定では人間として数えられます。"
    },
    "evil": {
      "HELP": "人間でありながら、人外に協力する裏切り者です。場合によっては敢えて死ぬ必要があります。"
    },
    "circular": {
      "HELP": "この贈り物は、次に渡す相手を選び渡すことになっています。\n<br>\n将来もしふたたびあなたの手に渡ったら、贈り物は消え去ってしまいます。"
    },
    "friend": {
      "HELP": "仲間に向けては能力を使いません。"
    },
    "once": {
      "HELP": "能力を持ちますが、その能力はたった一度しか使うことができません。"
    },
    "hate": {
      "HELP": "絆の運命は悲しい殺し合いを強いるでしょう。彼らは本来の勝利条件ではなく、ただ一人生き残ることが勝利条件となります。"
    },
    "love": {
      "HELP": "絆の運命は彼らを、愛で固く結ぶでしょう。彼らは本来の勝利条件ではなく、共存が勝利条件となります。"
    },
    "droop": {
      "HELP": "あなたは、生きた人狼の人数の二日後に、命を落とします。"
    },
    "curse": {
      "HELP": "あなたを占ってしまった占い師は死亡します。"
    },
    "aura": {
      "HELP": "あなたはオーラを持ちます。"
    },
    "rob": {
      "HELP": "誰もならなかった残り役職をすべて知ります。\n次の夜、その中から運命の導くままひとつの役職を選び、仮面の役職に成り代わるでしょう。\n運命は、あなたになにを課すでしょうか？"
    },
    "grave": {
      "HELP": "命を落とすと、能力を発揮することができます。"
    },
    "armor": {
      "HELP": "狼の襲撃や賞金稼の手により殺されることはありません。"
    },
    "medium": {
      "HELP": "処刑や突然死で死んだ全員を対象にします。\n無惨な死体について判断することは出来ません。"
    },
    "spy_role": {
      "HELP": "その人が持つ役職がわかります。恩恵は、役職とは別個のものです。このため半端者、悪鬼、妖精の子を直接見分けることはできません。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"
    },
    "spy_win": {
      "HELP": "その人が持つ陣営（勝利条件）がわかります。多くは役職を思わせるものです。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"
    },
    "spy_aura": {
      "HELP": "その人が能力を持つか判別出来ます。あなたにとって、村人、人狼、白狼は能力のオーラを持ちませんが、そうでない人物は能力のオーラを纏っていると感じられます。"
    },
    "spy_wolf": {
      "HELP": "その人が人間か人狼か判別できます。ただし狼血族は人狼と誤認し、白狼は人間と誤認してしまいます。\nまた、妖精を占うと呪殺します。ただし、呪人、呪狼を占ってしまうと、呪殺されてしまいます。\n邪魔之民に包み隠された相手を占うと、占いを実施しなかったことになり、結果を得たり、呪殺したりといった効能が得られません。"
    },
    "stigma": {
      "HELP": "独特の印を持つため、あなたの正体は比較的信用されやすいでしょう。"
    },
    "fm": {
      "HELP": "結社員・共鳴者が誰なのか知っています。"
    },
    "fanatic": {
      "HELP": "人狼にはあなたの正体はわかりませんが、あなたは人狼が誰か知っています。また、新たに人狼となったものを知ることもできます。\n<br>\nですが、あなたは狼血族や擬狼妖精も人狼であると誤認してしまいますし、一匹狼の正体を知ることはできません。"
    },
    "tafness": {
      "HELP": "あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると傷を負うものの、一日だけ生き長らえます。"
    },
    "hurt": {
      "name": "負傷",
      "HELP": ""
    },
    "sheep": {
      "HELP": "踊り狂ったおぼろげな記憶がある。"
    },
    "infected": {
      "name": "感染",
      "HELP": ""
    },
    "hide_for_vote": {
      "name": "投票対象外",
      "hide": ["vote"],
      "HELP": ""
    },
    "hide_for_role": {
      "name": "能力対象外",
      "hide": ["role"],
      "HELP": ""
    },
    "hide_for_gift": {
      "name": "恩恵対象外",
      "hide": ["gift"],
      "HELP": ""
    },
    "disable_vote": {
      "name": "<s>投票</s>",
      "disable": ["vote"],
      "HELP": ""
    },
    "disable_special": {
      "name": "<s>全能力</s>",
      "disable": ["gift", "role"],
      "HELP": "あなたはもう特殊能力を使うことができません。"
    },
    "disable_gift": {
      "name": "<s>恩恵</s>",
      "disable": ["gift"],
      "HELP": "あなたはもう恩恵能力を使うことができません。"
    },
    "disable_role": {
      "name": "<s>能力</s>",
      "disable": ["role"],
      "HELP": "あなたはもう役職能力を使うことができません。"
    },
    "disable_poison": {
      "name": "<s>毒薬</s>",
      "disable": ["poison"],
      "HELP": "あなたはもう毒薬を使うことができません。"
    },
    "disable_analeptic": {
      "name": "<s>蘇生薬</s>",
      "disable": ["analeptic"],
      "HELP": "あなたはもう蘇生薬を使うことができません。"
    },
    "twolife": {
      "HELP": "あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされても、一度だけは命が助かります。"
    },
    "august": {
      "HELP": "あなたが処刑されることに決まると一度だけは、その処刑はとりやめになります。"
    },
    "revenge": {
      "HELP": "どんな理由であれ、あなたが命を落とすと、その夜のうちに能力を発揮します。"
    },
    "seal": {
      "HELP": "ひとりの犯人が特定できるのであれば、犯人はいっさいの能力を行使できなくなります。"
    },
    "grudge": {
      "HELP": "あなたが命を落とした翌日、人狼は二つの襲撃をおこない、二人を一度に殺害します。"
    },
    "riot": {
      "HELP": "あなたが死亡した翌日は、村人達が暴力的に二つの投票をおこない、二人を一度に処刑します。"
    },
    "wolfify": {
      "HELP": "あなたは狼の襲撃を受ける、もしくは賞金稼に道連れにされると、あなたは人狼になります。"
    },
    "chkGSAY": {
      "HELP": "顔や名前はわかりませんが、あなたの耳には死者の声が届いちゃうことでしょう。"
    },
    "ENTRY": {
      "name": "導入",
      "text": "ENTRY",
      "cmd": "entry",
      "HELP": "キャラクターを選択し、エントリーしましょう。"
    },
    "MAKER": {
      "name": "村立て話",
      "text": "MAKER",
      "cmd": "write",
      "HELP": "あなたは村立て人です。"
    },
    "ADMIN": {
      "name": "管理者話",
      "text": "ADMIN",
      "cmd": "write",
      "HELP": "あなたは管理人です。"
    },
    "SPSAY": {
      "name": "共鳴",
      "text": "SPSAY",
      "cmd": "write",
      "HELP": "あなたは、共鳴者同士にしか聞こえない会話が可能です。"
    },
    "WSAY": {
      "name": "囁き",
      "text": "WSAY",
      "cmd": "write",
      "HELP": "あなたは、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話が可能です。"
    },
    "XSAY": {
      "name": "念話",
      "text": "XSAY",
      "cmd": "write",
      "HELP": "あなたは、念波星でしか聞こえない会話が可能です。"
    },
    "GSAY": {
      "name": "会話",
      "text": "GSAY",
      "cmd": "write",
      "HELP": "あなたは、死者にしか聞こえない会話が可能です。"
    },
    "MSAY": {
      "name": "口借り",
      "text": "MSAY",
      "cmd": "write",
      "HELP": "あなたは<b>_NPC_</b>の口を借り、好きな言葉を伝えることができます。"
    },
    "AIM": {
      "name": "内緒話",
      "text": "AIM",
      "for": "near",
      "cmd": "write",
      "HELP": null
    },
    "TSAY": {
      "name": "独り言",
      "text": "TSAY",
      "cmd": "write",
      "HELP": null
    },
    "SAY": {
      "name": "会話",
      "text": "SAY",
      "cmd": "write",
      "HELP": null
    },
    "VSAY": {
      "name": "会話",
      "text": "VSAY",
      "cmd": "write",
      "HELP": null
    },
    "VGSAY": {
      "name": "会話",
      "text": "VGSAY",
      "cmd": "write",
      "HELP": null
    }
  });
  for (mask in ref$ = RAILS.maskstates_to_able) {
    id = ref$[mask];
    if (o = Mem.Query.ables.find(id)) {
      o.mask = mask;
    }
  }
  Mem.Query.ables.masks = _.sortBy(Object.keys(RAILS.maskstates_to_able), function(i){
    return -i;
  });
  Mem.Collection.trap.set({
    "blank": {
      "name": "普通の日",
      "HELP": ""
    },
    "nothing": {
      "name": "普通の日",
      "cmd": "trap",
      "HELP": "今日は、特別なことのない一日のようだ。さあ普段通り、誰かを処刑台にかけよう。"
    },
    "aprilfool": {
      "name": "四月馬鹿",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_APRIL_FOOL\" TARGET=\"_blank\">四月馬鹿</A></b>\n<br>\n大変、大変、大変なことになった。きみの役職は変化しているかもしれない。もしも誰かと絆を結んでいるなら、急に相手が憎くなってしまい、絆の相手だけにしか投票できない。\nそして悟ってしまった。今夜だけは、相方の後を追うことはないと……。\n<br>\n<table class=\"table\">\n<tr>\n<th colspan=3>役職の変貌\n<th rowspan=4>※一日で元に戻る\n<tr>\n<td>賢者\n<td>←→\n<td>魔女\n<tr>\n<td>守護者\n<td>←→\n<td>長老\n<tr>\n<td>賞金稼\n<td>←→\n<td>少女\n</table>"
    },
    "turnfink": {
      "name": "二重スパイ",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FINK\" TARGET=\"_blank\">二重スパイ</A></b>\n<br>\nなんということだろう！一人が村側を裏切り、狼に与する半端者になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"
    },
    "turnfairy": {
      "name": "妖精の輪",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_TURN_FAIRY\" TARGET=\"_blank\">妖精の輪</A></b>\n<br>\nなんということだろう！一人が森に立ち入り、妖精の養子になってしまった。明日以降も、彼は村人を裏切り続けるだろう……。\n<br>\n決定者や光の輪の持ち主なら、このときにその力を手放してしまう。"
    },
    "eclipse": {
      "name": "日蝕",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_ECLIPSE\" TARGET=\"_blank\">日蝕</A></b>\n<br>\n暗い日蝕が村中を覆い、お互い顔も名前も解らない。この闇夜は丸一日続くだろう。他人になりすまし、議論を混乱させることもできてしまうかもしれない。"
    },
    "cointoss": {
      "name": "Sir Cointoss",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_COINTOSS\" TARGET=\"_blank\">Sir Cointoss</A></b>\n<br>\nお控えなさい。お控えなさい。コイントス卿はこの村の投票結果に意見があるようでございます。\n卿の御意向によっては、投票結果に基づいた処刑を取り止めにすることもあります。\n五分五分くらいかな。"
    },
    "force": {
      "name": "影響力",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FORCE\" TARGET=\"_blank\">影響力</A></b>\n<br>\n今日の投票箱は無色透明だ。だれかが投票した瞬間にその内容はハッキリと見えるから、投票をセットするときは気を付けて！"
    },
    "miracle": {
      "name": "奇跡",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_MIRACLE\" TARGET=\"_blank\">奇跡</A></b>\n<br>\n帰ってきた！黄泉の国から、今日の襲撃で死んだ犠牲者がかえってきた！能力を失ったかもしれないけれど、それは些細なことだよ！ね！\n<br>\n人狼、一匹狼、賞金稼ぎなどに襲われた死者は生き返る。ただし、その能力は失われる。"
    },
    "prophecy": {
      "name": "聖者のお告げ",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_PROPHECY\" TARGET=\"_blank\">聖者のお告げ</A></b>\n<br>\n聖者は民の夢枕に告げられました。今の任より、<b>決定者</b>にふさわしい人物がいると。\n旧き任務は解かれ、あたらしい<b>決定者</b>は皆に喝采で迎え入れられるだろう。"
    },
    "clamor": {
      "name": "不満",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_CLAMOR\" TARGET=\"_blank\">不満</A></b>\n<br>\n村には不満が鬱屈している。今夜の投票でまた人間を処刑してしまったら……悪夢が始まる。\nはじけた不満に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"
    },
    "fire": {
      "name": "熱意",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_FIRE\" TARGET=\"_blank\">熱意</A></b>\n<br>\n村には期待に満ちた熱意が渦巻いている。今夜の投票がひとならぬものを処刑できたなら……悪夢が始まるのだ。\nはじけた熱意に背中を押され、話し合いもなしに、さらに一人の首を必要とするだろう。"
    },
    "nightmare": {
      "name": "悪夢",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_NIGHTMARE\" TARGET=\"_blank\">悪夢</A></b>\n<br>\n恐ろしい一日が始まる。今日は投票だけができる。発言も、能力も使えない。そして、突然死は発生しない。\n<br>\nさあ投票して、こんな日が早く過ぎ去ってしまうよう、ひとり祈りを捧げよう。"
    },
    "ghost": {
      "name": "亡霊",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_GHOST\" TARGET=\"_blank\">亡霊</A></b>\n<br>\n今夜、人狼に殺された人は人狼になる。また、襲撃を実行した人狼は命を落としてしまうだろう。人狼となった者は報復行動を行わない。ただし、命拾いをしたならば人狼にはならない。\n<br>\n一匹狼は亡霊を作らない。"
    },
    "escape": {
      "name": "逃亡",
      "cmd": null,
      "HELP": "<b>逃亡</b>\n<br>\nせめて一人だけでも、なんとかして逃がそう。今夜の投票で逃亡者を一人決め、夜中の処刑のかわりに密かに逃がすのだ。\n<br>\nしかし逃亡者は一日のあいだ逃亡生活を続け、ついに村へと帰還してしまう。帰還者の票は通常の三倍尊重されるだろう。\n実装がめんどうだから、このまま未定義にしておこうかな。"
    },
    "seance": {
      "name": "降霊会",
      "cmd": "trap",
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Event)EVENTID_SEANSE\" TARGET=\"_blank\">降霊会</A></b>\n<br>\nこっくりさん、こっくりさん……<br>秘密の儀式で、墓場の霊魂がかえってきた。今日に限り、生者も姿の見えぬ死者も屋根を共にし、議論するだろう。"
    }
  });
  Mem.Collection.role.set({
    "entry": {
      "name": "エントリー",
      "win": null,
      "group": "TURN",
      "ables": ["ENTRY"],
      "HELP": ""
    },
    "start": {
      "name": "初日",
      "win": null,
      "group": "TURN",
      "ables": [],
      "HELP": ""
    },
    "main": {
      "name": "二日目以降",
      "win": null,
      "group": "TURN",
      "ables": [],
      "HELP": ""
    },
    "prologue": {
      "name": "プロローグ",
      "win": "NONE",
      "group": "TURN",
      "ables": ["exit"],
      "HELP": ""
    },
    "epilogue": {
      "name": "エピローグ",
      "win": null,
      "group": "TURN",
      "ables": [],
      "HELP": ""
    },
    "live": {
      "name": "生存者",
      "win": null,
      "group": "LIVE",
      "ables": ["SAY", "TSAY", "AIM", "commit"],
      "HELP": ""
    },
    "executed": {
      "name": "処刑",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "victim": {
      "name": "襲撃",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "cursed": {
      "name": "呪詛",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "droop": {
      "name": "衰退",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "suicide": {
      "name": "後追",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "feared": {
      "name": "恐怖",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "suddendead": {
      "name": "突然死",
      "win": null,
      "group": "LIVE",
      "ables": ["GSAY", "TSAY"],
      "HELP": ""
    },
    "leave": {
      "name": "―",
      "win": null,
      "group": null,
      "ables": [],
      "HELP": ""
    },
    "none": {
      "name": "",
      "win": null,
      "group": null,
      "ables": [],
      "HELP": ""
    },
    "bind": {
      "name": "―",
      "win": null,
      "group": null,
      "ables": [],
      "HELP": ""
    },
    "hide": {
      "name": "？？？",
      "win": null,
      "group": null,
      "ables": ["hike", "vote", "entrust"],
      "HELP": "あなたは正体不明です。"
    },
    "mob": {
      "name": "見物人",
      "win": "MOB",
      "group": null,
      "HELP": "見物人全般のための仮想役職です。"
    },
    "visiter": {
      "name": "客席",
      "win": "MOB",
      "group": "MOB",
      "ables": ["VSAY", "TSAY"],
      "HELP": "進行中会話は客席同士のみ"
    },
    "grave": {
      "name": "裏方",
      "win": "MOB",
      "group": "MOB",
      "ables": ["VSAY", "TSAY"],
      "HELP": "進行中会話は墓下と"
    },
    "alive": {
      "name": "舞台",
      "win": "MOB",
      "group": "MOB",
      "ables": ["VSAY", "TSAY"],
      "HELP": "進行中会話は地上、墓下、両方と"
    },
    "juror": {
      "name": "陪審",
      "win": "HUMAN",
      "group": "MOB",
      "ables": ["VSAY", "TSAY", "vote", "entrust"],
      "HELP": "進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"
    },
    "gamemaster": {
      "name": "黒幕",
      "win": "MOB",
      "group": "MOB",
      "ables": ["gm_droop", "gm_live", "gm_disable_vote", "gm_enable_vote", "VSAY", "TSAY"],
      "HELP": "進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"
    },
    "master": {
      "name": "村立て人",
      "win": null,
      "group": "SPECIAL",
      "ables": ["maker", "kick", "muster", "editvilform", "update", "MAKER"]
    },
    "admin": {
      "name": "管理人",
      "win": null,
      "group": "SPECIAL",
      "ables": ["maker", "kick", "muster", "editvilform", "update", "scrapvil", "ADMIN"]
    },
    "lost": {
      "name": "喪失",
      "win": null,
      "group": "OTHER",
      "ables": [],
      "cmd": "gift",
      "HELP": "あなたは贈り物を<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_LOST\" TARGET=\"_blank\">喪失</A>しました。\n<br>\nもう二度と手にすることはないでしょう。もしまたあなたの手に贈り物があっても、消え去ってしまいます。そして、あなたがそれに気付くことはないでしょう。"
    },
    "shield": {
      "name": "光の輪",
      "win": null,
      "group": "OTHER",
      "ables": ["circular", "guard"],
      "cmd": "gift",
      "HELP": "あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SHIELD\" TARGET=\"_blank\">光の輪</A>が取り巻きます。\n<br>\nあなたはもし昨夜、襲撃されていたとしても守られました。\n<br>\n光の輪はひとりを一度しか守りません。"
    },
    "glass": {
      "name": "魔鏡",
      "win": null,
      "group": "OTHER",
      "ables": ["circular", "see"],
      "cmd": "gift",
      "HELP": "あなたを<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_GLASS\" TARGET=\"_blank\">魔鏡</A>が照らします。\n<br>\nあなたは、魔鏡を渡す相手を占います。\n魔鏡はひとりを一度しか照らしません。"
    },
    "ogre": {
      "name": "悪鬼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["wolf", "hunt", "friend", "WSAY"],
      "cmd": "gift",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_OGRE\" TARGET=\"_blank\">悪鬼</A>です。\n<br>\n表向きは他の役目を帯びていますが、あなたは人を襲う悪い鬼なのです。"
    },
    "fairy": {
      "name": "妖精の子",
      "win": "PIXI",
      "group": "PIXI",
      "ables": ["pixi"],
      "cmd": "gift",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FAIRY\" TARGET=\"_blank\">妖精から生まれた子</A>です。\n<br>\n表向きは他の役目を帯びていますが、あなたは人ならぬ存在なのです。\n占い師、霊能者にどう判別されるかは、もともとの役職によります。"
    },
    "fink": {
      "name": "半端者",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["evil"],
      "cmd": "gift",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_FINK\" TARGET=\"_blank\">半端者</A>です。\n<br>\n表向きは他の役目を帯びていますが、あなたは人ともつかぬ、人狼ともつかぬ、半端な正体を隠しています。"
    },
    "decide": {
      "name": "決定者",
      "win": null,
      "group": "OTHER",
      "able": "投票",
      "ables": ["vote_role"],
      "cmd": "gift",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DECIDE\" TARGET=\"_blank\">決定者</A>です。\n<br>\nあなたは追加票を投じる権利を持ちつづけます。行使することで、健在を示すこともできるでしょう。"
    },
    "seeronce": {
      "name": "夢占師",
      "win": null,
      "group": "OTHER",
      "able": "占う",
      "ables": ["once", "see", "spy_wolf"],
      "cmd": "gift",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_SEERONCE\" TARGET=\"_blank\">夢占師</A>です。"
    },
    "dipsy": {
      "name": "酔払い",
      "win": null,
      "group": "OTHER",
      "ables": null,
      "cmd": "gift",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Gift)GIFTID_DIPSY\" TARGET=\"_blank\">酔払い</A>です。\n<br>\nあなたが人外もしくは村人に相対するものであれば、自分の役割を見失うことはありません。\n<br>\nまた、光の輪や魔鏡といった贈り物を受け取った場合、酔いが醒めることでしょう。"
    },
    "lover": {
      "name": "弟子",
      "win": null,
      "group": "OTHER",
      "able": "入門",
      "ables": ["aura", "bond", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVER\" TARGET=\"_blank\">弟子</A>です。\n<br>\n好きな人物を師匠として選び、弟子入りします。次の朝、あなたは頭角をあらわし、絆の師匠と同じ役職になっています。"
    },
    "robber": {
      "name": "盗賊",
      "win": null,
      "group": "OTHER",
      "ables": ["aura", "rob", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ROBBER\" TARGET=\"_blank\">盗賊</A>です。\n<br>"
    },
    "tangle": {
      "name": "怨念",
      "win": null,
      "group": "OTHER",
      "ables": ["aura", "revenge", "tangle", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TANGLE\" TARGET=\"_blank\">怨念</A>です。"
    },
    "villager": {
      "name": "村人",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。\n<br>\n特殊な能力はもっていません。"
    },
    "stigma": {
      "name": "聖痕者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "stigma", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_STIGMA\" TARGET=\"_blank\">_ROLESUBID_聖痕者</A>です。"
    },
    "fm": {
      "name": "結社員",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "fm", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FM\" TARGET=\"_blank\">結社員</A>です。\n<br>\n独自の人脈を持つ秘密結社の一員です。"
    },
    "sympathy": {
      "name": "共鳴者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "fm", "human", "vote", "entrust", "SPSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SYMPATHY\" TARGET=\"_blank\">共鳴者</A>です。"
    },
    "seer": {
      "name": "占い師",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "see", "spy_wolf", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEER\" TARGET=\"_blank\">占い師</A>です。"
    },
    "seerwin": {
      "name": "信仰占師",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "see", "spy_win", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERWIN\" TARGET=\"_blank\">信仰占師</A>です。"
    },
    "aura": {
      "name": "気占師",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "see", "spy_aura", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"
    },
    "oura": {
      "name": "気占師",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "see", "spy_aura", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_AURA\" TARGET=\"_blank\">気（オーラ）占い師</A>です。"
    },
    "seerrole": {
      "name": "賢者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "see", "spy_role", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEERROLE\" TARGET=\"_blank\">賢者</A>です。"
    },
    "guard": {
      "name": "守護者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "guard", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GUARD\" TARGET=\"_blank\">守護者</A>です。"
    },
    "medium": {
      "name": "霊能者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "medium", "spy_wolf", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUM\" TARGET=\"_blank\">霊能者</A>です。"
    },
    "mediumwin": {
      "name": "信仰霊能者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "medium", "spy_win", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMWIN\" TARGET=\"_blank\">信仰霊能者</A>です。"
    },
    "mediumrole": {
      "name": "導師",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "medium", "spy_role", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MEDIUMROLE\" TARGET=\"_blank\">導師</A>です。"
    },
    "necromancer": {
      "name": "降霊者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "chkGSAY", "medium", "spy_wolf", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_NECROMANCER\" TARGET=\"_blank\">降霊者</A>です。"
    },
    "follow": {
      "name": "追従者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "human", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FOLLOW\" TARGET=\"_blank\">追従者</A>です。\n<br>\nだれかを信じ、委ねましょう。"
    },
    "fan": {
      "name": "煽動者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "revenge", "riot", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FAN\" TARGET=\"_blank\">煽動者</A>です。"
    },
    "hunter": {
      "name": "賞金稼",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "revenge", "sneak", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HUNTER\" TARGET=\"_blank\">賞金稼</A>です。\n<br>\n毎夜、一人を付け狙います。"
    },
    "weredog": {
      "name": "人犬",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "tafness", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WEREDOG\" TARGET=\"_blank\">人犬</A>です。"
    },
    "prince": {
      "name": "王子様",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "august", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PRINCE\" TARGET=\"_blank\">王子様</A>です。"
    },
    "rightwolf": {
      "name": "狼血族",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "blind", "wolf", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_VILLAGER\" TARGET=\"_blank\">村人</A>です。\n<br>\n特殊な能力はもっていません。\n\n狼血族のあなたは、占い師、霊能者に人狼と判定されます。ですが、あなたは村人で、勝利条件も変わりません。\n勝利を目指して頑張りましょう。占われると、正体を自覚し表示が増えます。"
    },
    "doctor": {
      "name": "医師",
      "win": "HUMAN",
      "group": "HUMAN",
      "able": "診察",
      "ables": ["aura", "cure", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DOCTOR\" TARGET=\"_blank\">医師</A>です。"
    },
    "curse": {
      "name": "呪人",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "curse", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSE\" TARGET=\"_blank\">呪人</A>です。"
    },
    "dying": {
      "name": "預言者",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "droop", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYING\" TARGET=\"_blank\">預言者</A>です。"
    },
    "invalid": {
      "name": "病人",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "revenge", "seal", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INVALID\" TARGET=\"_blank\">病人</A>です。\n<br>\nあなたが命を落としたとき、犯人は病気に感染します。"
    },
    "alchemist": {
      "name": "錬金術師",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "once", "revenge", "cling", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ALCHEMIST\" TARGET=\"_blank\">錬金術師</A>です。\nあなたは一度だけ、薬を飲むことが出来ます。"
    },
    "witch": {
      "name": "魔女",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "analeptic", "poison", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WITCH\" TARGET=\"_blank\">魔女</A>です。\n<br>\nあなたは二日目に、毒薬と蘇生薬をひとつずつ完成させます。"
    },
    "girl": {
      "name": "少女",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "night", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GIRL\" TARGET=\"_blank\">少女</A>です。"
    },
    "scapegoat": {
      "name": "生贄",
      "win": "HUMAN",
      "group": "HUMAN",
      "able": "疑う",
      "ables": ["aura", "scapegoat", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SCAPEGOAT\" TARGET=\"_blank\">生贄</A>です。"
    },
    "elder": {
      "name": "長老",
      "win": "HUMAN",
      "group": "HUMAN",
      "ables": ["aura", "revenge", "seal", "twolife", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ELDER\" TARGET=\"_blank\">長老</A>です。\n<br>\nもしも命を落としたら、あなたの恨みは犯人を襲います。"
    },
    "jammer": {
      "name": "邪魔之民",
      "win": "EVIL",
      "group": "EVIL",
      "able": "隠す",
      "ables": ["aura", "jammer", "human", "evil", "vote", "entrust", "XSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_JAMMER\" TARGET=\"_blank\">邪魔之民</A>です。"
    },
    "snatch": {
      "name": "宿借之民",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "snatch", "human", "evil", "vote", "entrust", "XSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SNATCH\" TARGET=\"_blank\">宿借之民</A>です。"
    },
    "bat": {
      "name": "念波之民",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "human", "evil", "vote", "entrust", "XSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">念波之民</A>です。"
    },
    "possess": {
      "name": "狂人",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_POSSESS\" TARGET=\"_blank\">狂人</A>です。"
    },
    "fanatic": {
      "name": "狂信者",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "fanatic", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_FANATIC\" TARGET=\"_blank\">狂信者</A>です。"
    },
    "muppeting": {
      "name": "人形使い",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "human", "evil", "vote", "entrust", "MSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MUPPETER\" TARGET=\"_blank\">人形使い</A>です。"
    },
    "wisper": {
      "name": "囁き狂人",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "human", "evil", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。\n<br>\n少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"
    },
    "cpossess": {
      "name": "囁き狂人",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "human", "evil", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WISPER\" TARGET=\"_blank\">囁き狂人</A>です。\n<br>\n少人数になると勝敗が確定する状況もあります、ですがこの場合も自動で終了することはありません。"
    },
    "semiwolf": {
      "name": "半狼",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "wolfify", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SEMIWOLF\" TARGET=\"_blank\">半狼</A>です。"
    },
    "dyingpossess": {
      "name": "---",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": ""
    },
    "oracle": {
      "name": "魔神官",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "medium", "spy_role", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_ORACLE\" TARGET=\"_blank\">魔神官</A>です。"
    },
    "sorcerer": {
      "name": "魔術師",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "see", "spy_role", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SORCERER\" TARGET=\"_blank\">魔術師</A>です。"
    },
    "walpurgis": {
      "name": "魔法少年",
      "win": "EVIL",
      "group": "EVIL",
      "ables": ["aura", "grave", "analeptic", "poison", "human", "evil", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WALPURGIS\" TARGET=\"_blank\">魔法少年</A>です。\n<br>\nやがて命を落とすと魔女になると宿命付けられています。"
    },
    "headless": {
      "name": "首無騎士",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "hunt", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HEADLESS\" TARGET=\"_blank\">首のない騎士</A>です。\n<br>\nあなたは人狼仲間を斬り捨てることも厭いません。"
    },
    "wolf": {
      "name": "人狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "hunt", "friend", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WOLF\" TARGET=\"_blank\">人狼</A>です。"
    },
    "aurawolf": {
      "name": "---",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "hunt", "friend", "spy_aura", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": ""
    },
    "intwolf": {
      "name": "智狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "hunt", "friend", "spy_role", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_INTWOLF\" TARGET=\"_blank\">智狼</A>です。特殊な能力を持つ人狼です。"
    },
    "cwolf": {
      "name": "呪狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "curse", "hunt", "friend", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。\n<br>"
    },
    "cursewolf": {
      "name": "呪狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "curse", "hunt", "friend", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CURSEWOLF\" TARGET=\"_blank\">呪狼</A>です。特殊な能力を持つ人狼です。\n<br>"
    },
    "whitewolf": {
      "name": "白狼",
      "win": "WOLF",
      "group": "WOLF",
      "able": "襲う",
      "ables": ["hunt", "friend", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_WHITEWOLF\" TARGET=\"_blank\">白狼</A>です。特殊な能力を持つ人狼です。\n<br>\nあなたを占った占い師は、あなたを人間とみなします。あなたは能力者特有のオーラを発しません。"
    },
    "childwolf": {
      "name": "仔狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "revenge", "grudge", "hunt", "friend", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_CHILDWOLF\" TARGET=\"_blank\">仔狼</A>です。特殊な能力を持つ人狼です。"
    },
    "dyingwolf": {
      "name": "衰狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "droop", "hunt", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGWOLF\" TARGET=\"_blank\">衰狼</A>です。特殊な能力を持つ人狼です。"
    },
    "silentwolf": {
      "name": "黙狼",
      "win": "WOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "hunt", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_SILENTWOLF\" TARGET=\"_blank\">黙狼</A>です。\n<br>\n人狼の襲撃対象となることはありませんが、人狼（と囁き狂人、擬狼妖精）同士にしか聞こえない会話は、あなたには聞こえません。"
    },
    "hamster": {
      "name": "栗鼠妖精",
      "win": "PIXI",
      "group": "PIXI",
      "ables": ["aura", "pixi", "armor", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PIXI\" TARGET=\"_blank\">栗鼠妖精</A>です。"
    },
    "werebat": {
      "name": "蝙蝠妖精",
      "win": "PIXI",
      "group": "PIXI",
      "ables": ["aura", "pixi", "armor", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BAT\" TARGET=\"_blank\">蝙蝠妖精</A>です。\n<br>\nあなたは他の妖精が誰であるか知っていますし、新たに生まれた妖精を知ることもできます。ただし、姿を換えてしまった宿借妖精の行方はわかりません。\n<br>\nまた、蝙蝠妖精同士にしか聞こえない会話が可能です。"
    },
    "mimicry": {
      "name": "擬狼妖精",
      "win": "PIXI",
      "group": "PIXI",
      "ables": ["aura", "pixi", "armor", "vote", "entrust", "WSAY"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MIMICRY\" TARGET=\"_blank\">擬狼妖精</A>です。"
    },
    "dyingpixi": {
      "name": "風花妖精",
      "win": "PIXI",
      "group": "PIXI",
      "ables": ["aura", "pixi", "armor", "droop", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DYINGPIXI\" TARGET=\"_blank\">風花妖精</A>です。"
    },
    "trickster": {
      "name": "悪戯妖精",
      "win": "PIXI",
      "group": "PIXI",
      "ables": ["aura", "pixi", "armor", "bonds", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_TRICKSTER\" TARGET=\"_blank\">悪戯妖精</A>です。\n<br>\n結ばれた人たちにとっては、単なるはた迷惑な悪戯にすぎません。"
    },
    "hatedevil": {
      "name": "邪気悪魔",
      "win": "HATER",
      "group": "OTHER",
      "ables": ["aura", "bonds", "hate", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_HATEDEVIL\" TARGET=\"_blank\">邪気悪魔</A>です。\n<br>\n結びつけた二人のうち、どちらか片方だけが生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"
    },
    "loveangel": {
      "name": "恋愛天使",
      "win": "LOVER",
      "group": "OTHER",
      "ables": ["aura", "bonds", "love", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LOVEANGEL\" TARGET=\"_blank\">恋愛天使</A>です。\n<br>\n結びつけた二人が生き延びれば、あなたの勝利となります。あなたにその絆が結ばれていない限り、あなた自身の死は勝敗には直接関係しません。"
    },
    "passion": {
      "name": "片思い",
      "win": "LOVER",
      "group": "OTHER",
      "ables": ["aura", "bond", "love", "human", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_PASSION\" TARGET=\"_blank\">片想い</A>です。\n<br>\n選んだ人が生き延び、あなたが生き延びれば、あなたの勝利となります。"
    },
    "lonewolf": {
      "name": "一匹狼",
      "win": "LONEWOLF",
      "group": "WOLF",
      "ables": ["aura", "wolf", "armor", "kill", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_LONEWOLF\" TARGET=\"_blank\">一匹狼</A>です。\n<br>\n襲撃先はあなた以外であれば誰でもかまいません。"
    },
    "guru": {
      "name": "笛吹き",
      "win": "GURU",
      "group": "OTHER",
      "ables": ["aura", "human", "guru", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_GURU\" TARGET=\"_blank\">笛吹き</A>です。"
    },
    "dish": {
      "name": "鱗魚人",
      "win": "DISH",
      "group": "OTHER",
      "ables": ["aura", "human", "dish", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_DISH\" TARGET=\"_blank\">鱗魚人</A>です。新鮮なふぃーっしゅ。です。"
    },
    "bitch": {
      "name": "遊び人",
      "win": "LOVER",
      "group": "OTHER",
      "ables": ["aura", "human", "bitch", "vote", "entrust"],
      "cmd": "role",
      "HELP": "あなたは<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_BITCH\" TARGET=\"_blank\">遊び人</A>です。\n本命とあなたが生き延びれば、あなたの勝利です。"
    }
  });
}).call(this);

(function() {
  new Mem.Rule("story").schema(function() {
    var all_traps, caption;
    this.scope(function(all) {
      return {
        menu: function(folder, game, rating, event_type, role_type, say_limit, player_length, update_at, update_interval, search) {
          return all.sort("desc", "order").search(search).where(function(o) {
            var tf;
            tf = true;
            if (folder !== "all") {
              tf && (tf = o.folder === folder);
            }
            if (rating !== "all") {
              tf && (tf = o.rating === rating);
            }
            if (game !== "all") {
              tf && (tf = o.type.game === game);
            }
            if (say_limit !== "all") {
              tf && (tf = o.view.say_limit === say_limit);
            }
            if (update_at !== "all") {
              tf && (tf = o.view.update_at === update_at);
            }
            if (player_length !== "all") {
              tf && (tf = o.view.player_length === Number(player_length));
            }
            if (update_interval !== "all") {
              tf && (tf = o.view.update_interval === update_interval);
            }
            if (role_type !== "all") {
              tf && (tf = _.find(o.view.role_types, function(v) {
                return v === role_type;
              }));
            }
            if (event_type !== "all") {
              tf && (tf = _.find(o.view.event_types, function(v) {
                return v === event_type;
              }));
            }
            return tf;
          });
        },
        playing: function() {
          return all.where({
            mode: "playing"
          });
        },
        prologue: function() {
          return all.where({
            mode: "prologue"
          });
        },
        oldlog: function() {
          return all.where({
            mode: "oldlog"
          });
        },
        dispose: function() {
          return all.where({
            mode: "dispose"
          });
        }
      };
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
    all_traps = Mem.Query.traps.ids;
    this.deploy(function(o) {
      var base, base1, mob, ref, ref1, ref2;
      o.order = o.folder + GUI.field(o.vid, 4);
      if (!o.rating) {
        o.rating = "default";
      }
      o.user_id = o.sow_auth_id;
      o.card.role = _.difference(o.card.config, all_traps);
      if ((base = o.type).game == null) {
        base.game = "TABULA";
      }
      if ((base1 = o.type).mob == null) {
        base1.mob = "visiter";
      }
      if (mob = Mem.Query.roles.find(o.type.mob)) {
        Mem.Query.roles.find("mob").name = mob.name;
      }
      o.evil || (o.evil = Mem.conf.folder[o.folder].story.evil);
      o.view = {
        rating: m("img", {
          src: GUI.img_head + ("/icon/cd_" + o.rating + ".png")
        }),
        update_at: Timer.hhmm(o.upd.hour, o.upd.minute),
        update_interval: (o.upd.interval * 24) + "時間",
        player_length: o.vpl.last,
        role_types: GUI.names.config(o.card.role, function(size, arg) {
          var name;
          name = arg.name;
          return name;
        }),
        event_types: GUI.names.config(o.card.event, function(size, arg) {
          var name;
          name = arg.name;
          return name;
        }),
        role_cards: GUI.names.config(o.card.role, function(size, arg) {
          var name, win;
          name = arg.name, win = arg.win;
          if (size > 1) {
            return m(".emboss.WIN_" + win, name + "x" + size);
          } else {
            return m(".emboss.WIN_" + win, "" + name);
          }
        }),
        trap_cards: GUI.names.config(o.card.event, function(size, arg) {
          var name, win;
          name = arg.name, win = arg.win;
          if (size > 1) {
            return m(".emboss.WIN_" + win, name + "x" + size);
          } else {
            return m(".emboss.WIN_" + win, "" + name);
          }
        }),
        say_limit: ((ref = Mem.conf.say[o.type.say]) != null ? ref.CAPTION : void 0) || "――",
        say_limit_help: ((ref1 = Mem.conf.say[o.type.say]) != null ? ref1.HELP : void 0) || "――",
        game_rule: ((ref2 = Mem.conf.rule[o.type.game]) != null ? ref2.CAPTION : void 0) || "タブラの人狼"
      };
      return o.search_words = o.name;
    });
    return this.map_reduce(function(o, emit) {
      var event_type, i, item, j, len, len1, ref, ref1, results, role_type;
      item = {
        count: 1
      };
      emit("all", "all", item);
      emit("folder", o.folder, item);
      emit("game", o.type.game, item);
      emit("rating", o.rating, item);
      emit("say_limit", o.view.say_limit, item);
      emit("update_at", o.view.update_at, item);
      emit("update_interval", o.view.update_interval, item);
      emit("player_length", o.view.player_length, item);
      ref = o.view.role_types;
      for (i = 0, len = ref.length; i < len; i++) {
        role_type = ref[i];
        emit("role_type", role_type, item);
      }
      ref1 = o.view.event_types;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        event_type = ref1[j];
        results.push(emit("event_type", event_type, item));
      }
      return results;
    });
  });

}).call(this);

(function(){
  var Validator, point, text, summary, required, secret, no_player, action, cards, input, sow_auth, sow_auth_validator, input_validator, cards_validator, announce, character, relative, combat, validate, slice$ = [].slice, out$ = typeof exports != 'undefined' && exports || this;
  Validator = (function(){
    Validator.displayName = 'Validator';
    var prototype = Validator.prototype, constructor = Validator;
    function Validator(checks){
      this.checks = checks;
    }
    prototype.validate = function(o){
      var helper, i$, ref$, len$, check;
      o.errors = [];
      o.infos = [];
      helper = {
        error: function(text){
          return o.errors.push(text);
        },
        info: function(text){
          return o.infos.push(text);
        },
        valid: function(){
          return !o.errors.length;
        }
      };
      for (i$ = 0, len$ = (ref$ = this.checks).length; i$ < len$; ++i$) {
        check = ref$[i$];
        check.call(o, helper);
      }
      return o.valid = helper.valid();
    };
    prototype.and = function(checks){
      return new Validator(this.checks.concat(checks));
    };
    return Validator;
  }());
  point = function(size){
    var pt;
    pt = 20;
    if (50 < size) {
      pt += (size - 50) / 14;
    }
    return Math.floor(pt);
  };
  text = function(){
    var text;
    text = this.text();
    this.size = text.sjis_length;
    this.point = point(this.size);
    return this.lines = text.split("\n").length;
  };
  summary = function(arg$){
    var valid, mark;
    valid = arg$.valid;
    if ('point' === this.max.unit) {
      mark = this.point + "pt ";
    } else {
      mark = "";
    }
    if (!valid()) {
      mark = "⊘";
    }
    return this.summary = [m("span.emboss", mark), " " + this.size, m("sub", "/" + this.max.size + "字"), " " + this.lines, m("sub", "/" + this.max.line + "行")];
  };
  required = function(arg$){
    var error, text;
    error = arg$.error;
    text = this.text();
    if (text) {
      if (!(3 < this.size && text.match(/\S/))) {
        error("入力しましょう。");
      }
      if (this.max.size < this.size) {
        error(this.max.size + "字以下にしましょう。");
      }
      if (this.max.line < this.lines) {
        return error(this.max.line + "行以下にしましょう。");
      }
    } else {
      return error("入力しましょう。");
    }
  };
  secret = function(arg$){
    var error, text;
    error = arg$.error;
    text = this.text();
    if (text.match(/>>[\=\*\!]\d+/g)) {
      return error("あぶない！秘密会話へのアンカーがあります！");
    }
  };
  no_player = function(arg$){
    var info, text;
    info = arg$.info;
    text = this.text();
    if (text.match(/\/\*|\*\//g)) {
      return info("/*中の人の発言があります。*/");
    }
  };
  action = function(arg$){
    var error, tap_target;
    error = arg$.error;
    tap_target = -1 === this.target();
    if (this.action) {
      if (this.action.target) {
        if (tap_target) {
          return error("対象を選びましょう。");
        }
      } else {
        if (!tap_target) {
          return error("対象を「――」にしましょう。");
        }
      }
    }
  };
  cards = function(arg$){
    var error, info, ref$, role, gift, extra, mob_type, game_rule, start_auto, player_count, player_count_start, full, minus, player;
    error = arg$.error, info = arg$.info;
    ref$ = this.params, role = ref$.role, gift = ref$.gift, extra = ref$.extra, mob_type = ref$.mob_type, game_rule = ref$.game_rule, start_auto = ref$.start_auto, player_count = ref$.player_count, player_count_start = ref$.player_count_start;
    full = slice$.call(role).concat(slice$.call(gift));
    minus = 0;
    minus += 2 * Mem.Query.roles.minus2(role).length;
    minus += 1 * Mem.Query.roles.minus1(full).length;
    player = Mem.Query.roles.players(role).length;
    this.size = {
      drop: player - player_count,
      wolf: Mem.Query.roles.wolfs(full).length,
      minus: minus,
      extra: extra.length,
      human: Mem.Query.roles.humans(role).length - minus,
      player: player,
      robber: Mem.Query.roles.robbers(role).length,
      villager: Mem.Query.roles.villagers(role).length,
      gift_sides: Mem.Query.roles.gift_sides(gift).length,
      gift_items: Mem.Query.roles.gift_items(gift).length,
      gift_appends: Mem.Query.roles.gift_appends(gift).length
    };
    switch (mob_type) {
    case "juror":
      if (!(this.size.extra || in$("decide", gift))) {
        error("投票する人物が必要です。見物人（陪審）または、決定者を割り当てましょう。");
      }
      break;
    case "gamemaster":
      if (!this.size.extra) {
        info("見物人（黒幕）を割り当てましょう。");
      }
    }
    switch (game_rule) {
    case "TABULA":
    case "LIVE_TABULA":
    case "TROUBLE":
      if (!(0 < (ref$ = this.size.wolf) && ref$ < this.size.human)) {
        error("人間(" + this.size.human + "人)は人狼(" + this.size.wolf + "人)より多く必要です。");
      }
      break;
    case "MILLERHOLLOW":
    case "LIVE_MILLERHOLLOW":
    case "MISTERY":
      if (!(1 < this.size.villager)) {
        error("村人(" + this.size.villager + "人)が足りません。");
      }
      if (!(0 < this.size.wolf)) {
        error("人狼(" + this.size.wolf + "人)が足りません。");
      }
    }
    if (start_auto) {
      if (!(player_count_start <= player_count)) {
        error("ゲームが開始できません。");
      }
      if (!(3 < player_count_start)) {
        error("最少催行人数が少なすぎます。");
      }
    }
    if (game_rule === "LIVE_TABULA" || game_rule === "LIVE_MILLERHOLLOW") {
      if (in$("dish", role)) {
        error("鱗魚人が勝利できません。");
      }
    }
    if (this.size.robber) {
      if (this.size.player < player_count) {
        error("役職(" + this.size.player + "人)が足りません。盗賊(" + this.size.robber + "人)には余り札が必要です。");
      }
      if (this.size.wolf <= this.size.robber) {
        error("人狼(" + this.size.wolf + "人)が足りません。盗賊(" + this.size.robber + "人)より多くないと、人狼がいない村になる可能性があります。");
      }
    } else {
      if (this.size.drop < 0) {
        error("役職(" + this.size.player + "人)が足りません。定員以上にしましょう。");
      }
    }
    if (0 < this.size.drop) {
      info("役職配布時、余り札（" + this.size.drop + "枚）は捨て去ります。");
    }
    if (this.size.gift_sides + this.size.gift_appends && this.size.gift_items) {
      error("光の輪や魔鏡と、能力や勝利条件を付与する恩恵は共存できません。");
    }
    if (this.size.gift_sides && this.size.gift_appends) {
      error("能力を加える恩恵と、勝利条件が変わる恩恵は共存できません。");
    }
    if (!in$("villager", role)) {
      return error("NPCのために、村人をひとつ入れてください。");
    }
  };
  input = function(arg$){
    var info;
    info = arg$.info;
    if (this.old() !== this.target()) {
      return info(this.able.change);
    }
  };
  sow_auth = function(arg$){
    var error, info, ref$, uid, pwd, uid_size, pwd_size;
    error = arg$.error, info = arg$.info;
    ref$ = this.params, uid = ref$.uid, pwd = ref$.pwd;
    if (this.is_login) {
      return info("OK.");
    } else {
      uid_size = (uid != null ? uid.length : void 8) || 0;
      pwd_size = (pwd != null ? pwd.length : void 8) || 0;
      if ((1 < uid_size && uid_size < 21) && (2 < pwd_size && pwd_size < 21)) {
        if (uid === pwd) {
          return error("パスワードとIDが同じです。");
        }
      } else {
        return error("IDとパスワードを入力してください。( 3〜20 byte)");
      }
    }
  };
  sow_auth_validator = new Validator([sow_auth]);
  input_validator = new Validator([input]);
  cards_validator = new Validator([cards]);
  announce = {
    memo: new Validator([text, required, summary]),
    talk: new Validator([text, required, summary]),
    act: new Validator([text, required, action, summary])
  };
  character = {
    memo: new Validator([text, required, summary]),
    talk: new Validator([text, required, no_player, summary]),
    act: new Validator([text, required, no_player, action, summary])
  };
  relative = {
    memo: new Validator([text, required, summary]),
    talk: new Validator([text, required, no_player, summary]),
    act: new Validator([text, required, no_player, action, summary])
  };
  combat = {
    memo: new Validator([text, required, secret, summary]),
    talk: new Validator([text, required, secret, no_player, summary]),
    act: new Validator([text, required, secret, no_player, action, summary])
  };
  out$.validate = validate = {
    sow_auth: function(target){
      return sow_auth_validator.validate(target);
    },
    cards: function(target){
      return cards_validator.validate(target);
    },
    input: function(target){
      return input_validator.validate(target);
    },
    talk: function(target){
      var format, mestype, o;
      format = target.format, mestype = target.mestype;
      o = (function(){
        switch (mestype) {
        case 'MAKER':
        case 'ADMIN':
        case 'TSAY':
          return announce;
        case 'VSAY':
        case 'GSAY':
        case 'VGSAY':
          return character;
        case 'SPSAY':
        case 'WSAY':
        case 'XSAY':
        case 'AIM':
          return relative;
        default:
          return combat;
        }
      }());
      return o[format].validate(target);
    }
  };
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);

(function(){
  new Mem.Rule("winner").schema(function(){
    var id_index;
    id_index = SOW_RECORD.winners;
    this.scope(function(all){
      return {
        shows: function(){
          return all.where(function(o){
            return o.name !== '―';
          });
        },
        sow: function(idx){
          return all.where(function(o){
            return o.order === idx;
          }).list.first;
        }
      };
    });
    this['default'](function(){});
    this.deploy(function(o){
      var ref$;
      o.order = id_index.indexOf(o._id);
      return (ref$ = o.name_human) != null
        ? ref$
        : o.name_human = o.name;
    });
    return this.map_reduce(function(o){});
  });
  Mem.Collection.winner.set({
    "WIN_HUMAN": {
      "name": "村人陣営",
      "name_group": "村人陣営",
      "order": 1,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HUMAN\" TARGET=\"_blank\">村人陣営</A></b>\n<br>\n人間(妖精や人外の者を除く)の数が人狼以下になるまでに人狼と妖精が全滅すれば勝利です。\n<br>\nただし、狼を全滅させた時点で妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"
    },
    "WIN_EVIL": {
      "name": "裏切りの陣営",
      "name_group": "敵側の人間",
      "name_human": "敵側の人間",
      "order": 2,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_EVIL\" TARGET=\"_blank\">裏切りの陣営</A></b>\n<br>\n村人・恋人が敗北すれば勝利者の一員に加わります。\n<br>\nあなたは破滅を望んでいるのです。人狼や妖精やそれ以外の勝利、または、誰もいなくなることを目指しましょう。"
    },
    "WIN_WOLF": {
      "name": "人狼陣営",
      "name_group": "人狼陣営",
      "name_human": "人狼陣営の人間",
      "order": 3,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_WOLF\" TARGET=\"_blank\">人狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を人狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させれば勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"
    },
    "WIN_LONEWOLF": {
      "name": "一匹狼",
      "name_group": "その他",
      "order": 4,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LONEWOLF\" TARGET=\"_blank\">一匹狼陣営</A></b>\n<br>\nルール「タブラの人狼」「死んだら負け」「Trouble☆Aliens」では人間(妖精や人外の者を除く)の数を一匹狼と同数以下まで減らせば、ルール「ミラーズホロウ」「深い霧の夜」では役職「村人」を全滅させ、かつ、人狼陣営の狼が生きていなければ勝利です。\n<br>\nただし、最後まで妖精、もしくは恋人が生き残っていると敗北になり、他にも勝利を掻っ攫うもの達が存在します。"
    },
    "WIN_PIXI": {
      "name": "妖精",
      "name_group": "妖精",
      "order": 5,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_PIXI\" TARGET=\"_blank\">妖精陣営</A></b>\n<br>\n人狼が全滅するか、人間(妖精や人外の者を除く)の数が人狼と同数以下まで減るまで「生き残れば」勝利です。\n<br>\nただし、恋人が生き残っていると敗北になり、他にも横から勝利を掻っ攫うもの達が存在します。"
    },
    "WIN_OTHER": {
      "name": "その他",
      "name_group": "その他",
      "order": 6
    },
    "WIN_GURU": {
      "name": "笛吹き",
      "name_group": "その他",
      "order": 7,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_GURU\" TARGET=\"_blank\">笛吹き</A></b>\n<br>\n笛吹き以外の生存者が勧誘された者だけになれば勝利となります。笛吹き自身は、最終的に生き残っていなくとも構いません。\n<br>\nただし、横から勝利を掻っ攫うもの達が存在します。"
    },
    "WIN_LOVER": {
      "name": "恋人陣営",
      "name_group": "その他",
      "order": 8,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_LOVER\" TARGET=\"_blank\">恋人陣営</A></b>\n<br>\n恋人達だけが生き残る、もしくはいずこかの陣営が勝利を手にしたとき、絆の恋人達が生存していれば勝利です。\n<br>\nただし、ひとりだけ蘇生したなどの不幸で、恋を成就できない恋人は、勝利しません。"
    },
    "WIN_HATER": {
      "name": "邪気陣営",
      "name_group": "その他",
      "order": 9,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_HATER\" TARGET=\"_blank\">邪気陣営</A></b>\n<br>\nいずこかの陣営が勝利を手にしたとき、運命に決着をつけていれば勝利します。決着とは、絆の天敵をすべて倒し、一人だけが生き残っていることです。\n殺し合いの絆を断ち切りましょう。絆の相手が死んでも、後を追うことはありません。\n<br>\n絆の天敵とは、たとえあなた自身には関係のなくとも、あらゆる絆を結んでいるもの全てを指します。"
    },
    "WIN_DISH": {
      "name": "据え膳",
      "name_group": "その他",
      "order": 10,
      "HELP": "<b><A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Text)WIN_DISH\" TARGET=\"_blank\">据え膳</A></b>\n<br>\nすべてに決着がついたとき、あなたが狼の襲撃、もしくは賞金稼の道連れにより死亡していれば、勝利者の一員に加わります。"
    },
    "WIN_NONE": {
      "name": "―",
      "name_group": "その他",
      "order": 98,
      "HELP": ""
    },
    "WIN_MOB": {
      "name": "見物人",
      "name_group": "その他",
      "order": 99,
      "HELP": "あなたは<b>_ROLE_の<A href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Role)ROLEID_MOB\" TARGET=\"_blank\">見物人</A></b>です。いかなる陣営の人数にも含まれません。"
    },
    "WIN_LEAVE": {
      "name": "―",
      "name_group": "その他",
      "order": 100,
      "HELP": "あなたは村を去りました。勝利したり、敗北したりといったことは、もうありません。"
    }
  });
  Mem.conf.winner = Mem.Query.winners.hash;
}).call(this);

(function() {
  var field;

  field = Mem.Query.options.hash;

  field.role_table.options = Mem.Query.role_tables.enable().hash;

  field.game_rule.options = Mem.Query.rules.enable().hash;

  field.say_count.options = Mem.Query.says.enable().hash;

  field.mob_type.options = Mem.Query.roles.mob().hash;

  field.chr_npc.group_by = function(o) {
    return o.chr_npcs().hash;
  };

  field.chr_npc.options = Mem.Query.chr_npcs.hash;

  field.chr_set.options = field.chr_npc.groups = Mem.Query.chr_sets.hash;

  field.rating.options = Mem.Query.ratings.enable().hash;

  field.trs_type.options = Mem.Query.trss.enable().hash;

}).call(this);

