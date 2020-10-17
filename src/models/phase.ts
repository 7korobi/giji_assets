import { Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { DIC } from 'memory-orm/lib/type'

import { GROUPS, HANDLES } from '../lib/dic'
import { Book, Mark } from './book'
import { Folder } from './folder'
import { Part } from './part'

export class Phase extends Model {
  folder!: Folder
  book!: Book
  part!: Part
  mark!: Mark

  write_at!: number

  is_guide!: boolean
  is_update?: boolean

  name!: string
  group!: GROUPS
  handle!: HANDLES
}
export type Phases = [
  Phase,
  {
    group: { id: GROUPS; count: number }[]
    handle: { id: HANDLES; count: number }[]
  },
  {}
]

new Rule<Phases>('phase', {
  model: Phase,
  schema() {
    this.order('list', { sort: ['write_at'] })
    this.order('group', { sort: ['count', 'desc'] })
    this.order('handle', { sort: ['count', 'desc'] })

    this.path('folder', 'book', 'part')
    this.has_many('chats')
  },
  deploy({ o, reduce }) {
    reduce(['group', o.group], { count: 1 })
    reduce(['handle', o.handle], { count: 1 })
  },
})
