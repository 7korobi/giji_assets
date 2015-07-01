GUI.if_exist "#css_changer", (dom)->
  m.mount dom,
    controller: ->
    view: ->
      m ".guide",
        m "a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "
        if false #sow.auth.is_login
          m "a.btn.edge[href=#{gon.url}?ua=mb&cmd=vindex&uid=#{sow.auth.uid()}&pwd=#{sow.auth.pwd()}]", "携帯"
        else
          m "a.btn.edge[href=#{gon.url}?ua=mb]", "携帯"
        Btns.radio {}, Url.prop.theme,
          cinema: "煉瓦"
          star:   "蒼穹"
          night:  "闇夜"
          moon:   "月夜"
          wa:     "和の国"
        m "hr.black"

if gon?.sow_auth?
  GUI.if_exist "#sow_auth", (dom)->
    catch_gon.sow_auth()
    m.mount dom,
      controller: ->
      view: ->
        menu.icon.icon "pin",
          open: ->
          close: ->
          view: ->
            if sow.auth.is_login
              [ unless sow.auth.is_loading
                  m "span.TSAY", Btn.call({}, doc.sow_auth_logout), "#{sow.auth.uid()} がログアウト" 
                m "hr.black"
              ]
            else
              [ m "label",
                  m ".mark", "user id : "
                  m "input", Txt.input sow.auth.uid
                m "label",
                  m ".mark", "password : "
                  m "input[type=password]", Txt.input sow.auth.pwd
                unless sow.auth.is_loading
                  m "span.TSAY", Btn.call({}, doc.sow_auth_login), "ログイン" 
                m "hr.black"
              ]

if gon?.items?
  Cache.rule.item.set gon.items
  items_module = (type)->
    GUI.if_exist "#" + type, (dom)-> 
      query = Cache.items.where({type})
      m.mount dom,
        controller: ->
        view: ->
          query.list().map (v)->
            GUI.message[v.template](v)

  items_module "oldlog"
  items_module "guide"
  items_module "rule"
  items_module "setting"
  items_module "browsers"
