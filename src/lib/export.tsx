import '../../vendor/giji/app/models/_define'
import { State, Query } from 'memory-orm'

import React, { useState } from 'react'
import { useBits } from 'react-petit-hooks/lib/element'
import { usePoll } from 'react-petit-hooks/lib/poll'

import { FOLDER_IDS, ShowBits } from '../../vendor/giji/app/lib/dic'

import { StoryApi } from './fetch'
import { Btn } from './btn'

function store(meta: any) {
  State.store(meta)
}

export function Export() {
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
        <Sow folder_id="CRAZY" />
        <Sow folder_id="PERJURY" />
        <Sow folder_id="XEBEC" />
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
    </div>
  )

  type SowProp = {
    folder_id: FOLDER_IDS
    children?: string
  }
  function Sow({ folder_id, children = folder_id.toLowerCase() }: SowProp) {
    let className = ''
    const counts = [count('prologue'), count('progress')]

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
            <a href={href} className={className}>
              {children}
              {counts}
            </a>
          </p>
        )
      default:
        return <></>
    }
    function count(mode_id: 'prologue' | 'progress') {
      const { mode } = Query.sow_villages.reduce
      const data = mode && mode[mode_id] && mode[mode_id][folder_id]

      if (data) {
        const { count } = data
        if (count) {
          if (mode_id === 'prologue') className = 'MOB'
          if (mode_id === 'progress') className = 'EVIL'

          return <sup>{count}</sup>
        }
      }
      return <></>
    }
  }
}
