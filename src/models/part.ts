import { Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { DIC, QUERY } from 'memory-orm/lib/type'

import { Book } from './book'
import { Cards, Stats } from './card'
import { Chats } from './chat'
import { Folder } from './folder'
import { Phases } from './phase'
import { Sections } from './section'

export class Part extends Model {
  folder!: Folder
  book!: Book

  sections!: QUERY<Sections>
  phases!: QUERY<Phases>
  cards!: QUERY<Cards>
  stats!: QUERY<Stats>
  chats!: QUERY<Chats>
}

export type Parts = [Part, {}, {}]
new Rule<Parts>('part', {
  model: Part,
  schema() {
    this.order('list', { sort: ['chats.list.0.0.write_at', 'asc'] })

    this.path('folder', 'book')
    this.has_many('sections')
    this.has_many('phases')
    this.has_many('cards')
    this.has_many('stats')
    this.has_many('chats')
  },
})
