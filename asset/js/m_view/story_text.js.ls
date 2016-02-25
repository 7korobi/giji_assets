

doc.view.story_text = ({_id, story})->
    nindex = 0

    m ".MAKER.guide", {key: "STORY-TEXT"},
      m "p.name", m "b", story.name
      doc.ext.talk_text _id, "head", story.comment

      m "p", "■国のルール"
      RULE.nation.list.map (o)-> m "p", "#{++nindex}.#{o.head}"

      m ".emboss",
        "以上の項目が、人狼議事の"
        m 'a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"]', "ルール"
        "と"
        m 'a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"]', "心構え"
        "なんだ。"

      m "span.mes_date.pull-right",
        "managed by "
        m ".emboss", story.user_id
      m "hr.black"
