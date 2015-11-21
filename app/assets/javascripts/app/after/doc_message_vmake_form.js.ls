vmake_form =
  controller: (v)->
    v.is_check = m.prop false
    v.mosaic =
      type: "checkbox"
      onchange: m.withAttr "checked", v.is_check
    v

  view: (v)->
    line =
      type: "text"
      name: "vname"

    box =
      name: "vcomment"
      cols: 30
      rows: 10

    input = (key, label1, label2)->
      m "label[for=#{key}]",
        if v[key]
          label1
        else
          label2
      m "input", f[key]

    f =
      entrypwd:
        type: "text"
        name: "entrypwd"
        size: 8
        maxlength: 8

      entrust:
        type: "checkbox"
        name: "entrust"

      noselrole:
        type: "checkbox"
        name: "noselrole"


    vtext = "（村のルールは、自由に編集できるよ！）
    ■村のルール
    1.多重ログインをしない。
    2.システムの出力内容を、そのまま書き写さない。
    3.エピローグまで秘密を守る。参加中の村の内容は秘密だ。
    4.エピローグまで秘密を守る。希望した能力、画面を見ているきみが何者なのかは秘密だ。
    5.エピローグまで勝利を目指す。
    "
    ntext = "
    ■国のルール
    1.ここは長期人狼サーバーだ。短期はできない。
    2.情報ページ（ここ）を熟読する。
    3.ルールを守り、つねに心構えに気を配る。
    4.進行中は、どんな嘘でもＯＫ。
    5.ただし、（村建て人）、（管理人）の発言では嘘をつかないこと。
    6.突然死をしない。
    "

    m ".#{v.mestype}.vmake", {key: v._id},
      m "fieldset",
        m "legend", "村の名前と説明"
        m "input", line
        m "textarea", box, vtext
      m "fieldset",
        m "p", ntext
      m "p.tips",
        "以上の項目が、"
        m 'a[href="./sow.cgi?cmd=rule"]', "人狼議事のルール"
        "なんだ。編集していい部分は、自由に変更してかまわない。"
      m "fieldset",
        m "legend", "参加制限"
        m "dl",
          input "entrypwd", "参加制限なし", "参加にパスワード必須"

      m "fieldset",
        m "legend", "拡張設定"
        m "dl",
          input "entrust", "委任投票ができる", "委任投票できない"
          input "noselrole", "役職希望を無視する", "役職希望に応じる"


/*
    <dl class="dl-horizontal">
    <dt><label for="showid">ID公開</label>
    <dd><input id="showid" name="showid" type="checkbox" ng-checked="story_has_option('show-id')">
      プレイヤーIDを公開する
    <dt><label for="randomtarget">ランダム</label>
    <dd><input id="randomtarget" name="randomtarget" type="checkbox" ng-checked="story_has_option('random-target')">
      投票・能力の対象に「ランダム」を含める
    <dt><label for="undead">幽界トーク</label>
    <dd><input id="undead" name="undead" type="checkbox" ng-checked="story_has_option('undead-talk')">
      狼・妖精と死者との間で、会話ができる
    <dt><label for="aiming">内緒話</label>
    <dd><input id="aiming" name="aiming" type="checkbox" ng-checked="story_has_option('aiming-talk')">
      ふたりだけの内緒話をすることができる
    <dt><label for="game">ゲームルール</label>
    <dd><select id="game" name="game" class="form-control" ng-model="story.type.game">
    <option value="TABULA">タブラの人狼</option>
    <option value="LIVE_TABULA">タブラの人狼（死んだら負け）</option>
    <option value="MILLERHOLLOW">ミラーズホロウ</option>
    <option value="LIVE_MILLERHOLLOW">ミラーズホロウ（死んだら負け）</option>
    <option value="TROUBLE">Trouble☆Aliens</option>
    <option value="MISTERY">深い霧の夜</option>
    <option value="SECRET">陰謀に集う胡蝶</option>
    </select>
    <dt><label for="rating">
    こだわり
    <img name=cd_img src="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_{{story.rating}}.png">
    </label>
    <dd><select id="rating" name="rating" class="form-control" ng-model="story.rating">
    <option value="default">とくになし</option>
    <option value="love">[愛] 恋愛を重視</option>
    <option value="sexy">[性] 性表現あり</option>
    <option value="sexylove">[性愛] 大人の恋愛</option>
    <option value="violence">[暴] 暴力、グロ</option>
    <option value="sexyviolence">[性暴] えろぐろ</option>
    <option value="teller">[怖] 恐怖を煽る</option>
    <option value="drunk">[楽] 享楽に耽る</option>
    <option value="gamble">[賭] 賭博に耽る</option>
    <option value="crime">[罪] 犯罪描写あり</option>
    <option value="drug">[薬] 薬物表現あり</option>
    <option value="word">[言] 殺伐、暴言あり</option>
    <option value="fireplace">[暢] のんびり雑談</option>
    <option value="appare">[遖] あっぱれネタ風味</option>
    <option value="ukkari">[張] うっかりハリセン</option>
    <option value="child">[全] 大人も子供も初心者も、みんな安心</option>
    <option value="biohazard">[危] 無茶ぶり上等</option>
    <option value=""></option>
    <option value="0"></option>
    <option value="r15"></option>
    <option value="r18"></option>
    <option value="gro"></option>
    <option value="view"></option>
    </select>
    <dt><label for="csid">登場人物</label>
    <dd><select id="csid" name="csid" class="form-control" ng-model="story.csid">
          <option value="ririnra"> 人狼議事</option>
          <option value="ririnra_c05"> 人狼議事（キャサリン）</option>
          <option value="ririnra_c08"> 人狼議事（ベネット）</option>
          <option value="ririnra_c19"> 人狼議事（タバサ）</option>
          <option value="ririnra_c67"> 人狼議事（ソフィア）</option>
          <option value="ririnra_c68"> 人狼議事（ヨアヒム）</option>
          <option value="ririnra_c72"> 人狼議事（ヴェスパタイン）</option>
          <option value="ririnra_c51"> 人狼議事（ヨーランダ）</option>
          <option value="ririnra_c20"> 人狼議事（グロリア）</option>
          <option value="ririnra_c32"> 人狼議事（オスカー）</option>
          <option value="all"> 人狼議事 ちゃんぷる</option>
          <option value="mad"> エクスパンション・セット「狂騒議事」</option>
          <option value="mad_mad05"> エクスパンション・セット「狂騒議事」（ヤヘイ）</option>
          <option value="time"> エクスパンション・セット「帰還者議事」</option>
          <option value="ger"> エクスパンション・セット「大陸議事」</option>
          <option value="animal"> うきうきサバンナ</option>
          <option value="school"> 私立七転学園</option>
          <option value="changed"> とのさま広場</option>
          <option value="changed_m05"> はおうの広場</option>
          <option value="SF"> 明後日への道標</option>
          <option value="SF_sf10"> 明後日への道標（ナユタ）</option>
          <option value="wa"> 和の国てやんでえ</option>
          <option value="wa_w23"> 和の国てやんでえ（仁右衛門）</option>
    </select>
    <dt><label for="saycnttype">発言制限</label>
    <dd><select id="saycnttype" name="saycnttype" class="form-control" ng-model="story.type.say">
          <option value="weak">むりせず</option>
          <option value="juna">しんもん</option>
          <option value="vulcan">いっぱい</option>
          <option value="infinity">むげん</option>
    </select>
    <dt><label for="starttype">開始方法</label>
    <dd><select id="starttype" name="starttype" class="form-control" ng-model="story.type.start">
          <option value="manual">手動開始（開始ボタンを押したら開始）</option>
          <option value="wbbs">人狼BBS型（更新時間が来たら開始）</option>
    </select>
    <dt><label for="mob">見物人</label>
    <dd>
    <div class="form-inline"><div class="form-group">
    <select id="mob" name="mob" class="form-control input-medium" ng-model="story.type.mob">
    <option value="alive">舞台（進行中会話は地上、墓下、両方と）</option>
    <option value="grave">裏方（進行中会話は墓下と）</option>
    <option value="visiter">客席（進行中会話は客席同士のみ）</option>
    <option value="juror">陪審（進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。）</option>
    <option value="gamemaster">黒幕（進行中会話は地上、墓下、両方と。場を支配する特権をもつ。）</option>
    </select>
    <span>に</span>
    </div>
    <div class="form-group"><div class="input-group input-small">
    <input id="cntmob" type="number" name="cntmob" class="form-control" size="3" value="0">
    <span class="input-group-addon">人</span>
    </div></div>
    </div>
    </fieldset>

    <div class="exevmake">
    <input type="hidden" name="cmd" value="makevil">
    <input class="form-control" type="submit" value="村の作成" disabled>
    </div>
    </div>
    </form>
*/

doc.message.vmake_form = (v)->
  m "div", m.component vmake_form, v
