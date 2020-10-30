import { Query, State } from 'memory-orm'
import React, { ReactNode, useState } from 'react'
import { useBits } from 'react-petit-hooks/lib/element'
import { usePoll } from 'react-petit-hooks/lib/poll'
import { __BROWSER__ } from 'react-petit-hooks/lib/device'

import { PlanApi, StoryApi } from './fetch'
import { ShowBits } from '../../vendor/giji/app/lib/dic'
import { BtnsSow } from './btns-sow'
import { Chats } from './chat-sow'
import { Btn } from './btn'
const { url } = require('../../vendor/giji/config/yaml/live.yml')

function store(meta: any) {
  State.store(meta)
}


function Export() {
  usePoll(StoryApi, store, {}, '6h', '1.0.0')

  const [shows, setShows, ChkShow] = useBits(ShowBits, 0)

  const stateWelcome = useState('progress')
  return (
    <div id="export" className="form">
      <div className="welcome-btns cap">ロビー</div>
      <div className="welcome-btns cap">夢の形、陰謀</div>
      <div className="welcome-btns cap">ＲＰ</div>
      <div className="welcome-links form tap">
        <Sow folder_id="LOBBY" />
        <Sow folder_id="OFFPARTY" />
      </div>
      <div className="welcome-links form">
        <Sow folder_id="WOLF" />
        <Sow folder_id="ULTIMATE" />
        <Sow folder_id="ALLSTAR" />
        <Sow folder_id="MORPHE" />
        <Sow folder_id="CABALA">cafe</Sow>
      </div>
      <div className="welcome-links form">
        <Sow folder_id="RP">role-play</Sow>
        <Sow folder_id="PRETENSE">RP-advance</Sow>
        <Sow folder_id="PERJURY" />
        <Sow folder_id="XEBEC" />
        <Sow folder_id="CRAZY" />
        <Sow folder_id="CIEL" />
        <Sow folder_id="DAIS" />
      </div>
      <div className="welcome-btns col4">
        <Btn state={stateWelcome} as="finish">
          {' '}
          終了した村
        </Btn>
        <Btn state={stateWelcome} as="progress">
          進行中の村
        </Btn>
      </div>
      <div className="welcome-btns col4 shoe">
        <a href="https://giji.f5.si/">総合トップ</a>
      </div>
      <div className="welcome-btns col4 shoe">
        <ChkShow as={(x) => x ^ ShowBits.posi.link}>link</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.potof}>potof</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.pin}>pin</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.toc}>toc</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.current}>current</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.search}>search</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.magnify}>magnify</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.side}>side</ChkShow>
        <ChkShow as={(x) => x ^ ShowBits.posi.mention}>mention</ChkShow>
      </div>
    </div>
  )

  type SowProp = {
    folder_id: string
    children?: string
  }
  function Sow({ folder_id, children = folder_id.toLowerCase() }: SowProp) {
    switch (stateWelcome[0]) {
      case 'finish':
        return (
          <p>
            <a href={`https://giji.f5.si/sow/village?folder_id=${folder_id}`}>{children}</a>
          </p>
        )
      case 'progress':
        const { href, max_vils } = Query.folders.find(folder_id)!
        const vils = max_vils ? `${max_vils}村:` : ``
        return (
          <p>
            {vils}
            <a href={href}>{children}</a>
          </p>
        )
      default:
        return <></>
    }
  }
}

const [defaultVid, vid] = location.search.match(/vid=(\d+)/) || []

export function Welcome() {
  const style = {
    backgroundImage: `url(${url.assets}/images/bg/fhd-giji.png)`,
    backgroundPosition: `left 50% top ${-top / 3}px`,
  }
  // outframe  outframe_navimode
  // contentframe  contentframe_navileft

  const folder = Query.folders.where({ hostname: location.hostname }).list.head || Query.folders.find("DAIS")
  const chats = (
    Query.phases.where({ folder_id: folder.id }).list.head || Query.phases.find('BRAID-top-0-0')
  ).chats.list

  return (
    <div>
      <div id="welcome" style={style}>
        { !vid && <Export />}
        <h1 className="title-bar">{folder?.title}</h1>
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
      <div className="outframe">
        <div className="contentframe">
          <div className="inframe">
            <Chats list={chats} />
          </div>
        </div>
      </div>
    </div>
  )
}
