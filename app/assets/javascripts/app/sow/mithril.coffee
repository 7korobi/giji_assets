GUI.if_exist "#css_changer", (dom)->
  m.module dom,
    controller: ->
    view: ->
      m ".guide",
        m "a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "
        if sow.auth.is_login
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
  GUI.if_exist "#buttons", (dom)->
    catch_gon.sow_auth()
    menu.icon.icon "pin",
      open: ->
      close: ->
      view: ->
        [ m "label",
            m "span.mark.pull-left", "user id : "
            m "input.mini", Txt.input sow.auth.uid
          m "label",
            m "span.mark.pull-left", "password : "
            m "input.mini[type=password]", Txt.input sow.auth.pwd
          m "hr.black"
        ]

if gon?.items?
  Cache.rule.item.set gon.items
  items_module = (type)->
    GUI.if_exist "#" + type, (dom)-> 
      query = Cache.items.where({type})
      m.module dom,
        controller: ->
        view: ->
          query.list().map (v)->
            GUI.message[v.template](v)

  items_module "oldlog"
  items_module "guide"
  items_module "rule"
  items_module "setting"
  items_module "browsers"
