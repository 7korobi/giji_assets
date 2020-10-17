import { Query, Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { DEFAULT_RULE_TYPE, DIC, QUERY } from 'memory-orm/lib/type'

import { ChrJob } from './chr'
import { Face } from './face'
import { Icons } from './activity'
import { Book } from './book'
import { Ables, Cards, Role, Roles, Stats } from './card'

export class Potof extends Model {
  book!: Book
  face!: Face
  role!: Role

  icons!: QUERY<Icons>
  cards!: QUERY<Cards>
  roles!: QUERY<Roles>
  ables!: QUERY<Ables>
  stats!: QUERY<Stats>

  write_at!: number

  face_id!: string
  role_id!: string
  role_ids!: string[]
  able_ids!: string[]

  name!: string
  job!: string
  sign!: string
  csid!: string
  history!: string[]

  get role_labels() {
    return (() => {
      const result = []
      for (let o of this.roles.list) {
        if ('LIVE' !== o.group) {
          const stat = this.stats.find(`${this._id}-${o._id}`)
          const head = stat?.label ?? ''
          result.push(`${head}${o.label}`)
        }
      }
      return result
    })()
  }
  get win() {
    if (['suddendead', 'leave'].includes(this.live?.id as string)) {
      return ''
    }
    if (!this) {
      return ''
    }
    if (this.book != null ? this.book.winner_id : undefined) {
      if (this.book.winner_id === this.winner_id) {
        return '勝利'
      } else {
        return '敗北'
      }
    } else {
      return '参加'
    }
  }
  get live() {
    return this.cards.find(`${this._id}-live`)
  }
  get request() {
    return this.cards.find(`${this._id}-request`)
  }
  get commit() {
    return this.stats.find(`${this._id}-commit`)
  }
  get give() {
    return this.stats.find(`${this._id}-give`)
  }
  get winner_id() {
    const left = this.find(this.cards, ['bond', 'gift', 'role', 'live'], (o) => o.role.win)
    return left ?? 'NONE'
  }
  get head() {
    let name
    if (this.face != null) {
      ;({ name } = this.face)
    }
    return [this.job, this.name || name].join(' ')
  }
  get icon_mdi() {
    const icon = this.icons.list[0]
    return icon?.mdi
  }

  side(part_id: string) {
    for (let idx of ['SM', 'S', 'GM', 'G', 'VM', 'V']) {
      const { side } = this.book.chats.reduce
      const chats = side && side[`${part_id}-${idx}`]
      const o = chats[this.id]
      if (o) {
        return o
      }
    }
    return { max_is: {} }
  }
  say(part_id: string) {
    for (let idx of ['SS', 'S', 'GS', 'G', 'VS', 'V']) {
      const { potof } = this.book.chats.reduce
      const chatReports = potof && potof[`${part_id}-${idx}`]
      const o = chatReports[this.id]
      if (o) {
        return o
      }
    }
    return {
      count: 0,
      all: 0,
      avg: 0,
      range: 0,
      density: 0,
      min: 0,
      min_is: undefined,
      max: 0,
      max_is: undefined,
    }
  }

  say_handle(part_id: string) {
    const { max_is } = this.say(part_id)
    return max_is?.phase?.handle || 'TSAY'
  }

  find<T extends DEFAULT_RULE_TYPE, U>(
    q: QUERY<T>,
    keys: string[],
    cb: (o: T[0]) => U
  ): U | undefined {
    for (let key of keys) {
      let o = q.find(`${this._id}-${key}`)
      if (!o) continue
      const val = cb(o)
      if (!val) continue
      return val
    }
    return undefined
  }
}
export type Potofs = [
  Potof,
  {},
  {
    by_face(book_id: string, face_id: string): QUERY<Potofs>
    cast(book_id: string): QUERY<Potofs>
    catalog(book_id: string, part_id: string, sort: string, order: 'asc' | 'desc'): QUERY<Potofs>
  }
]
new Rule<Potofs>('potof', {
  model: Potof,
  schema() {
    this.order('list', { sort: ['write_at', 'desc'] })

    this.path('folder', 'book')
    this.belongs_to('chr_npc')
    this.belongs_to('part')
    this.belongs_to('face')
    this.belongs_to('winner')
    this.has_many('cards')
    this.has_many('stats')
    this.has_many('chats')
    this.has_many('icons')
    this.habtm('roles')
    this.habtm('ables')
  },
  scope(all) {
    return {
      by_face(book_id, face_id) {
        return all.where({ face_id, book_id })
      },

      cast(book_id) {
        const sort = (o: Potof) => o.say(`${book_id}-top`).all
        return Query.books
          .find(book_id)!
          .potofs.where((o) => 'leave' !== o.live!.id)
          .sort(sort, 'desc')
      },

      catalog(book_id, part_id, sort, order) {
        const [a1, a2] = sort.split('.') as [
          string,
          'count' | 'avg' | 'all' | 'density' | 'min' | 'range' | 'max'
        ]
        if ('say' === a1) {
          const sortF = (o: Potof) => o.say(part_id)[a2]
          return Query.books.find(book_id)!.potofs.sort(sortF, order)
        } else {
          return Query.books.find(book_id)!.potofs.sort(sort, order)
        }
      },

      sow_id(book_id: string, face_id: string, sign: string, is_merge: boolean) {
        let o
        const { list } = all.by_face(book_id, face_id)
        for (o of list) {
          if (o.sign === sign) {
            return o.id
          }
        }
        if (is_merge) {
          for (o of list) {
            if (o.cards.list.length) {
              return o.id
            }
          }
        }
        return null
      },
    }
  },
  deploy({ o }) {
    const role_id_set: DIC<boolean> = {}
    const able_id_set: DIC<boolean> = {}
    for (let card of o.cards.list) {
      if (card.role) {
        role_id_set[card.role_id] = true
        if ('request' === card.idx) {
          delete role_id_set[card.role_id]
        }

        for (let { id } of card.role.ables.list) {
          able_id_set[id] = true
        }
      }
    }
    o.role_ids = Object.keys(role_id_set)
    o.able_ids = Object.keys(able_id_set)

    if (o.live && !o.live.date) {
      o.live.date = Infinity
    }
  },
})
