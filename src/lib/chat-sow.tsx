import React from 'react'
import { useRelativeTick } from 'react-petit-hooks/lib/timer'
import { Chat } from '../../vendor/giji/app/models/chat'

import format from 'date-fns/format'
import locale from 'date-fns/locale/ja'

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

export function Chats({ list }: { list: Chat[] }) {
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
