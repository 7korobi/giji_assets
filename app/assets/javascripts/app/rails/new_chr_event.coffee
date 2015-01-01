if gon?.new_chr_faces? && gon?.new_chr_jobs?
  Cache.faces._hash.t12.item.order = 100000

  Cache.rule.face.merge    gon.new_chr_faces
  Cache.rule.chr_job.merge gon.new_chr_jobs
  chrs = Cache.chr_jobs.where(chr_set_id:"sf").sort(false, (o)-> o.face.order ).list()

  links =
    "アルミニウム赤泥流出事故": "http://ja.wikipedia.org/wiki/ハンガリーアルミニウム赤泥流出事故"
    "未来ロードマップ": "http://forevision.jp/wiki/?未来ロードマップ"
    "蒼井印の創作忍者bot": "https://twitter.com/Aonnj_bot"
    "宇宙人": "http://ja.wikipedia.org/wiki/宇宙人"
    "創世記": "http://ja.wikipedia.org/wiki/創世記"
    "ケイ素生物": "http://ja.wikipedia.org/wiki/ケイ素生物"
    "赤ちゃん命名辞典": "http://www.baby-name.jp"
    "架空の人名": "http://ja.wikipedia.org/wiki/Category:架空の人物"
  setTimeout ->
    Cache.chr_jobs._hash.all_t12.item.chr_set_id = "sf"
    Cache.chr_jobs._hash.all_c71.item.chr_set_id = "sf"
    Cache.faces._hash.sf15.item.order  = 21 - 0.1
    Cache.faces._hash.sf10.item.order  = 21 + 0.1
    Cache.faces._hash.sf028.item.order = 22 - 0.1
    Cache.faces._hash.sf027.item.order = 22 + 0.1
    Cache.faces._hash.sf032.item.order = 22 + 0.2
    Cache.faces._hash.sf16.item.order  = 22 + 0.3
    Cache.faces._hash.t12.item.order   = 23 - 0.1
    Cache.faces._hash.sf06.item.order  = 25 - 0.1
    Cache.faces._hash.c71.item.order   = 26 - 0.1
    Cache.faces._hash.sf04.item.order  = 29 - 0.1
    Cache.faces._hash.sf05.item.order  = 29 + 0.1
    Cache.faces._hash.sf20.item.order  = 30 - 0.1
    Cache.faces._hash.sf07.item.order  = 30 + 0.1
    Cache.faces._hash.sf024.item.order = 31 - 0.2
    Cache.faces._hash.sf08.item.order  = 31 - 0.1
    Cache.rule.chr_job.reject []

    chrs = Cache.chr_jobs.where(chr_set_id:"sf").sort(false, (o)-> o.face.order ).list()
    m.redraw()
  , 10000
  GUI.if_exist "#map_faces", (dom)->
    m.module dom,
      controller: ->
      view: ->  
        [ 
          m "h6", "参考文献"
          m ".paragraph",
            for title, link of links
              m "a.btn.btn-default.mark", {href: link, target: "_blank"}, title 
          m "hr.black" 
          m ".mark", "明後日の道標 〜 新人さん歓迎パーティー"
          m "h6", "１０秒経つと、親近感のある人たちが新人さんのまわりに集まります。"
          m "h6", "いま記述のある新人さんの肩書、名前は仮のものです。"
          m "h6", ""
          for o in chrs
            attr = GUI.attrs ->
              elem = null
              @over -> GUI.Animate.jelly.up elem
              @out ->  GUI.Animate.jelly.down elem
              @config (_elem)-> elem = _elem

            blank_attr = 
              if /sf\d\d\d/.test(o.face_id)
                {style: 'background-color: #126; min-height: 100px;'}
              else
                {style: 'min-height: 100px;'}

            m ".chrbox", {key: o._id},
              GUI.portrate o.face_id, attr
              m ".chrblank", blank_attr,
                m "div", m.trust o.job
                m "div", m.trust o.face.name
          m "hr.black"
        ]
