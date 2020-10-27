import { Query, State } from 'memory-orm'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useBits } from 'react-petit-hooks/lib/element'
import { usePoll } from 'react-petit-hooks/lib/poll'
import { useRelativeTick } from 'react-petit-hooks/lib/timer'
import {
  Tempo,
  to_msec,
  to_relative_time_distance,
  to_tempo_bare,
} from 'react-petit-hooks/lib/time'
import { __BROWSER__ } from 'react-petit-hooks/lib/device'

import format from 'date-fns/format'
import locale from 'date-fns/locale/ja'

import { PlanApi, StoryApi } from './fetch'
import { Chat } from '../../vendor/giji/app/models/chat'
import { ShowBits } from '../../vendor/giji/app/lib/dic'
const { url } = require('../../vendor/giji/config/yaml/live.yml')

type BtnProps<T> = {
  state: [T, (val: T) => void]
  as: T
  children: ReactNode
}

function store(meta: any) {
  State.store(meta)
}

function Time({ since }: { since: number }) {
  const [text, timer] = useRelativeTick(since, {
    limit: '1y',
    format: (since: number) => format(since, 'yyyy/MM/dd(EE)頃', { locale }),
  })
  return <time>{text}</time>
}

const chat = {
  report(o: Chat) {
    return <></>
  },
  talk(o: Chat) {
    const { face_id, job } = o.potof
    const img_url = `http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/${face_id}.jpg`
    return (
      <table className="mes_nom">
        <tbody>
          <tr className="say">
            <td className="img">
              <img src={img_url} width="90" height="130" alt="" />
            </td>
            <td className="field">
              <div className="msg">
                <h3 className="mesname">{job}</h3>
                <p className="mes_text" dangerouslySetInnerHTML={{ __html: o.log }} />
                <p className="mes_date">
                  <Time since={o.write_at} />
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  },

  post(o: Chat) {
    return (
      <div className="mes_nom">
        <div className="action">
          <p dangerouslySetInnerHTML={{ __html: o.log }} />
          <p className="mes_date">
            <Time since={o.write_at} />
          </p>
          <hr className="invisible_hr" />
        </div>
      </div>
    )
  },
}

function Chats({ list }: { list: Chat[] }) {
  return (
    <>
      {list.map((o) => {
        const Tag = chat[o.show]
        const key = o.id
        const { potof, log, write_at } = o
        return <Tag {...({ key, potof, log, write_at } as any)} />
      })}
    </>
  )
}

function Btn<T>({ state, as, children }: BtnProps<T>) {
  const mode = state[0] === as ? 'active' : ''
  return (
    <a className={`btn ${mode}`} onClick={onClick}>
      {children}
    </a>
  )

  function onClick() {
    state[1](as)
  }
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

const [defaultCSS, defaultTheme, defaultSize] =
  location.search.match(/css=(ririnra|cinema|night|star|wa)(480|800|)/) || []

function BtnsSow() {
  const stateTheme = useState<'ririnra' | 'cinema' | 'night' | 'star' | 'wa'>(
    (defaultTheme || 'cinema') as any
  )
  const stateSize = useState<'' | '480' | '800'>(
    (defaultSize || (defaultTheme === 'ririnra' ? '' : '800')) as any
  )
  const theme = stateTheme[0]
  let size = stateSize[0]

  useEffect(onStyle, [theme, size])
  return (
    <div className="btns">
      <span className="width">
        <Btn state={stateSize} as="480">
          480
        </Btn>
        <Btn state={stateSize} as="800">
          800
        </Btn>
      </span>
      <span className="theme">
        <Btn state={stateTheme} as="ririnra">
          漆黒
        </Btn>
        <Btn state={stateTheme} as="cinema">
          煉瓦
        </Btn>
        <Btn state={stateTheme} as="night">
          闇夜
        </Btn>
        <Btn state={stateTheme} as="star">
          蒼穹
        </Btn>
        <Btn state={stateTheme} as="wa">
          和の国
        </Btn>
      </span>
      <span className="theme">
        <a href="sow.cgi?ua=mb">携帯</a>
      </span>
    </div>
  )

  function onStyle() {
    if ('ririnra' === theme) {
      size = ''
    } else {
      if (!size) size = '800'
    }
    const cssParam = `css=${theme}${size}`
    if (!location.search.includes(cssParam)) {
      location.search = cssParam
    }
  }
}

export function Welcome() {
  const style = {
    backgroundImage: `url(${url.assets}/images/bg/fhd-giji.png)`,
    backgroundPosition: `left 50% top ${-top / 3}px`,
  }
  // outframe  outframe_navimode
  // contentframe  contentframe_navileft

  const folder = Query.folders.where({ hostname: location.hostname }).list.head
  const chats = (
    Query.phases.where({ folder_id: folder.id }).list.head || Query.phases.find('BRAID-top-0-0')
  ).chats.list

  return (
    <div>
      <div id="welcome" style={style}>
        <Export />
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
