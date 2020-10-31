import { Query } from 'memory-orm'

import React from 'react'
import { __BROWSER__ } from 'react-petit-hooks/lib/device'

import { BtnsSow } from './btns-sow'
import { Chats } from './chat-sow'
import { Export } from './export'

import { url } from '../../vendor/giji/config/json/live.json'

export function Welcome() {
  const style = {
    backgroundImage: `url(${url.assets}/images/bg/fhd-giji.png)`,
    backgroundPosition: `left 50% top ${-top / 3}px`,
  }
  // outframe  outframe_navimode
  // contentframe  contentframe_navileft

  const folder =
    Query.folders.where((o) => o.match(location.href)).list.head || Query.folders.find('DAIS')

  const isTop = !!document.title.match(/トップページ/)
  const isOldLog = !!document.title.match(/終了済みの村の一覧/)
  const isFull = isTop || isOldLog

  const chats = (
    Query.phases.where({ folder_id: folder.id }).list.head || Query.phases.find('BRAID-top-0-0')
  ).chats.list

  let toppage = location.href.replace(location.search, '').replace(location.hash, '')
  if (folder.isOldLog) {
    toppage += '?cmd=oldlog'
  }

  return (
    <div>
      <div id="welcome" style={style}>
        {isFull && <Export />}
        <h1 className="title-bar">
          <a dangerouslySetInnerHTML={{ __html: folder?.title }} href={toppage}></a>
        </h1>
        <BtnsSow />

        <div className="filmline"></div>
        <div className="outframe" style={{ height: 0 }}>
          <div className="contentframe">
            <img
              src="http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/bg/film-end.png"
              className="filmend"
            />
          </div>
        </div>
      </div>
      {isTop && (
        <div className="outframe">
          <div className="contentframe">
            <div className="inframe">
              <Chats list={chats} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
