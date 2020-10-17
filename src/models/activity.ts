import { Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { QUERY } from 'memory-orm/lib/type'

import { Book } from './book'
import { Potof } from './potof'

export class Marker extends Model {
  book_id!: string
  mark_at: string | number | undefined
  get anker() {
    return '-' + (this.id as string).split('-').slice(2, 5).join('-')
  }
}

export class Icon extends Model {
  book!: Book
  potof!: Potof
  mdi!: string
}

export type Markers = [
  Marker,
  {},
  {
    own(uid: string): QUERY<Markers>
  }
]
new Rule<Markers>('marker', {
  model: Marker,
  schema() {
    this.order('mark_at', { sort: ['max', 'desc'] })
    this.order('list', { sort: ['write_at', 'desc'] })
  },
  scope(all) {
    return {
      own(uid: string) {
        return all.where({ uid })
      },
    }
  },
  deploy({ o, reduce }) {
    reduce(['mark_at', o.book_id], { max: o.mark_at })
  },
})

export type Icons = [
  Icon,
  {},
  {
    own(uid: string): QUERY<Icons>
  }
]
new Rule<Icons>('icon', {
  model: Icon,
  schema() {
    this.belongs_to('book')
    this.belongs_to('potof')
  },
  scope(all) {
    return {
      own(_id: string) {
        return all.where({ _id })
      },
    }
  },
})
