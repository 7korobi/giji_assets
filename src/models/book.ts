import { Query, Rule, Set, State } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { HASH, QUERY } from 'memory-orm/lib/type'

import format from 'date-fns/format'
import locale from 'date-fns/locale/ja'

import { Chats } from './chat'
import { Parts } from './part'
import { Folder } from './folder'
import { Potofs } from './potof'
import { FOLDER_IDS, LOCALES } from '../lib/dic'

const { game } = require('../config/live.yml')

export class Book extends Model {
  winner!: Winner
  folder!: Folder

  winner_id!: string
  folder_id!: string
  idx!: string

  chats!: QUERY<Chats>
  parts!: QUERY<Parts>
  potofs!: QUERY<Potofs>

  write_at!: number
  label!: string
  mode!: string

  is_epilogue!: boolean
  is_finish!: boolean

  aggregate!: {
    face_ids: string[]
  }
  q!: {
    yeary: string
    monthry: string
    in_month: string
    search_words: string
  }

  head() {
    return `${this.idx}: ${this.label}`
  }
}

export class Winner extends Model {
  order!: number
  group!: string
  label!: string
  label_human?: string
  help?: string
}

export class Option extends Model {}

export class Say extends Model {
  label!: string
  help!: string
  recovery?: '24h'
  disabled?: boolean
  for!: string[]
  max!: {
    size: number
    word: number
    line: number
  }
  all?: {
    SSAY?: number
    TSAY?: number
    VSAY?: number
    PSAY?: number
    WSAY?: number
    XSAY?: number
    GSAY?: number
    VGSAY?: number
  }
  count?: {
    SSAY?: number
    TSAY?: number
    VSAY?: number
    PSAY?: number
    WSAY?: number
    XSAY?: number
    GSAY?: number
    VGSAY?: number
  }
}

export class Game extends Model {}

export class Locale extends Model {
  sow_locale_id!: LOCALES
  label!: string
  help?: string
  intro?: string[]
}

export class Mark extends Model {
  label?: string
  path!: string
  enable?: boolean
}

export type Books = [
  Book,
  {
    idx: {
      max: number
      max_is: Book
    }
  } & HASH<FOLDER_IDS | 'all', HASH<string, Book>>,
  {
    in_folder(folder_id: string): QUERY<Books>
  }
]
new Rule<Books>('book', {
  model: Book,
  schema() {
    this.path('folder')
    this.has_many('parts')
    this.has_many('phases')
    this.has_many('chats')
    this.has_many('potofs')

    this.habtm('options')
    this.habtm('roles')
    this.habtm('marks')
    this.habtm('tags')

    this.belongs_to('winner')
    this.belongs_to('say')
    this.belongs_to('locale')

    this.order('list', { sort: ['write_at', 'desc'] })
  },
  scope(all) {
    return {
      in_folder(folder_id: string) {
        return all
          .partition(`${folder_id}.set`)
          .where({ folder_id })
          .page(25)
          .order([], {
            sort: ['write_at', 'desc'],
            page: true,
          })
      },
    }
  },
  deploy({ o, reduce }) {
    const in_month = format(o.write_at, 'MM月', { locale })
    const yeary = format(o.write_at, 'yyyy年', { locale })
    const monthry = yeary + in_month
    o.q = {
      yeary,
      monthry,
      in_month,
      search_words: o.label,
    }

    if (o.is_epilogue && o.is_finish) {
      o.mode = 'oldlog'
    } else {
      if (o.parts.list[0]) {
        o.mode = 'progress'
      } else {
        o.mode = 'prologue'
      }
    }

    o.aggregate = { face_ids: [] }

    reduce('idx', { max: parseInt(o.idx) })
    const it = { set: o.id }
    reduce([], it)
    reduce('all', it)
    reduce(o.folder_id, it)
  },
})

export type Winners = [Winner, {}, {}]
new Rule<Winners>('winner', { model: Winner, schema() {} })

export type Options = [Option, {}, {}]
new Rule<Options>('option', { model: Option, schema() {} })

export type Says = [
  Say,
  {},
  {
    active: QUERY<Says>
  }
]
new Rule<Says>('say', {
  model: Say,
  schema() {},
  scope(all) {
    return {
      active: all.in({ for: game.folder_id as string }),
    }
  },
  deploy({ o }) {
    o.for || (o.for = [])
  },
})

export type Games = [Game, {}, {}]
new Rule<Games>('game', { model: Game, schema() {} })

export type Locales = [Locale, {}, {}]
new Rule<Locales>('locale', { model: Locale, schema() {} })

export type Marks = [Mark, {}, {}]
new Rule<Marks>('mark', { model: Mark, schema() {} })

State.transaction(function (m) {
  Set.locale.set(require('../yaml/set_locale.yml'))
  Set.option.set(require('../yaml/set_option.yml'))
  Set.winner.set(require('../yaml/set_winner.yml'))
  Set.say.set(require('../yaml/set_says.yml'))
  Set.mark.set(require('../yaml/set_mark.yml'))
  Set.game.set(require('../yaml/sow_game.yml'))
}, Query.static.meta)
