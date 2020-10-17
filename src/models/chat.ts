import { Rule } from 'memory-orm'
import { Model, List } from 'memory-orm/lib/base'
import { DIC, QUERY } from 'memory-orm/lib/type'

import { SHOWS, STYLES } from '../lib/dic'
import { Part } from './part'
import { Phase } from './phase'
import { Potof } from './potof'

export class Chat extends Model {
  potof!: Potof
  phase!: Phase
  part!: Part

  potof_id!: string
  phase_id!: string
  part_id!: string
  book_id!: string

  mention_ids!: string[]
  idx!: string

  write_at!: number

  show!: SHOWS
  style!: STYLES
  log!: string
  q!: {
    group: string
    search_words: string
  }

  make_ankers(...ids: string[]) {
    const { book_id } = this
    ids.push(this.id)
    ids = Array.from(new Set(ids))
    return [book_id, ids.map((id) => id.slice(book_id.length))]
  }

  anker(part_id: string) {
    const { mark, is_guide } = this.phase ?? {}
    switch (false) {
      case false !== is_guide:
        return ''
      case mark == null:
        if (part_id === this.part_id) {
          return `${mark}${this.idx}`
        } else {
          return `${mark}${this.part.idx}:${this.idx}`
        }
      default:
        if (part_id === this.part_id) {
          return this.id.slice(this.part_id.length)
        } else {
          return this.id.slice(this.book_id.length)
        }
    }
  }
}

const anker = {
  belongs_to: 'chats',
  sort: ['count', 'desc'] as ['count', 'desc'],
}

type ChatCount = {
  count: number
}
type ChatMax = {
  max: number
  max_is: Chat
}
type ChatGroup = {
  hash: DIC<Chat>
  min: number
  max: number
  min_is: Chat
  max_is: Chat
}
type ChatReport = {
  count: number
  all: number
  avg: number
  range: number
  density: number
  min: number
  max: number
  min_is: Chat
  max_is: Chat
}

export type Chats = [
  Chat,
  {
    list: List<Chats>
    last: List<Chats>
    mention: ChatCount[]
    mention_to: ChatCount[]

    index: {
      [phase_id: string]: {
        max: number
        max_is: Chat
      }
    }

    say: ChatReport

    potof: {
      [phase_id: string]: {
        [potof_id: string]: ChatReport
      }
    }
    side: {
      [phase_id: string]: {
        [potof_id: string]: ChatMax
      }
    }

    part_id: {
      wiki: ChatGroup
    }
    group: {
      [part_id: string]: {
        [group: string]: ChatGroup
      }
    }
    handle: {
      [part_id: string]: {
        [handle: string]: ChatGroup
      }
    }
  } & {
    [part_id: string]: {
      memo: ChatGroup
      full: ChatGroup
      normal: ChatGroup
      solo: ChatGroup
      extra: ChatGroup
      rest: ChatGroup
    }
  } & ChatGroup,
  {
    ankers(book_id: string, a: string[]): QUERY<Chats>
    now(
      hides: string[],
      words: string,
      page_by: number,
      mode: string,
      part_id: string
    ): QUERY<Chats>
    sow_cite(a: string): Chat | null
  }
]
new Rule<Chats>('chat', {
  model: Chat,
  schema() {
    this.path('folder', 'book', 'part', 'phase')
    this.belongs_to('section')
    this.belongs_to('potof')

    this.order('last', {
      pluck: 'max_is',
      sort: [
        ['max_is.phase.id', 'max_is.write_at'],
        ['desc', 'desc'],
      ],
      page: true,
    })

    this.order('list', {
      sort: ['write_at', 'asc'],
      page: true,
    })
  },
  scope(all) {
    return {
      ankers(book_id, a) {
        const ids = a.map((idx) => book_id + idx)
        return all.where({ _id: ids }).sort('write_at', 'desc')
      },

      sow_cite(a) {
        const b = a.split('-')
        if ('TS' === b[3]) {
          b[3] = 'AIM'
        }
        const c = a.split('-')
        if (c[2]) {
          ;(c[2] as any)--
        }
        return all.find(a, b.join('-'), c.join('-'))
      },

      now(hides, words, page_by, mode, part_id) {
        return all
          .partition(`${part_id}.${mode}.set`)
          .where((o) => hides.includes(o.potof_id))
          .search(words)
          .page(page_by)
      },
    }
  },
  deploy({ o, reduce, order }) {
    if (o.mention_ids == null) {
      o.mention_ids = []
    }
    o.q = {
      group: [o.potof_id, o.phase_id].join('+'),
      search_words: o.log,
    }

    const { part_id } = o
    const it = {
      set: o.id,
      max: o.write_at + 1,
      min: o.write_at,
    }

    reduce([], it)
    reduce([part_id, 'wiki'], it)

    if (!o.phase) {
      return
    }
    const { group, handle } = o.phase
    reduce(['group', part_id, group], it)
    reduce(['handle', part_id, handle], it)

    if ('M'.includes(group)) {
      reduce([part_id, 'memo'], it)
    }

    if ('SAI'.includes(group)) {
      reduce([part_id, 'full'], it)

      if (['SSAY', 'VSSAY', 'TITLE', 'MAKER', 'ADMIN', 'public'].includes(handle)) {
        reduce([part_id, 'normal'], it)
      }

      if (['TSAY', 'private'].includes(handle)) {
        reduce([part_id, 'solo'], it)
      }

      if (
        !['SSAY', 'VSSAY', 'TITLE', 'MAKER', 'ADMIN', 'dark', 'GSAY', 'TSAY', 'public'].includes(
          handle
        )
      ) {
        reduce([part_id, 'extra'], it)
      }

      if (['GSAY'].includes(handle)) {
        reduce([part_id, 'rest'], it)
      }
    }
    reduce(['index', o.phase_id], { max: parseInt(o.idx) })
    reduce(['last', o.q.group], { max: o.write_at })

    if (o.log != null ? o.log.length : undefined) {
      reduce('say', {
        max: o.write_at + 1,
        min: o.write_at,
        count: 1,
        all: o.log.length,
      })

      if (o.phase_id.match(/-[SGV]S?$/)) {
        const all = o.phase_id.split('-')
        all[2] = 'top'
        const all_phase_id = all.join('-')
        reduce(['potof', all_phase_id, o.potof_id], {
          count: 1,
          all: o.log.length,
          max: o.write_at + 1,
          min: o.write_at,
        })
        reduce(['potof', o.phase_id, o.potof_id], {
          count: 1,
          all: o.log.length,
          max: o.write_at + 1,
          min: o.write_at,
        })
      }
    }

    if (o.phase_id.match(/-.M?$/)) {
      reduce(['side', o.phase_id, o.potof_id], { max: o.write_at + 1 })
    }

    for (let mention_id of o.mention_ids) {
      reduce(['mention', mention_id], { count: 1 })
      reduce(['mention_to', mention_id, o.id], { count: 1 })
    }
    order('mention', anker)
    o.mention_ids.map((mention_id: string) => order(['mention_to', mention_id], anker))
  },
})
