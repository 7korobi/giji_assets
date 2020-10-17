import { Set, Rule, Query } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { HASH, LIST, QUERY } from 'memory-orm/lib/type'

import { CLANS, GROUPS, WINS } from '../lib/dic'
import { Book } from './book'
import { Folder } from './folder'
import { Part } from './part'
import { Phase } from './phase'
import { Potof } from './potof'

export class Card extends Model {
  folder!: Folder
  book!: Book
  potof!: Potof

  role!: Role
  part!: Part
  phase!: Phase

  folder_id!: string
  book_id!: string
  potof_id!: string

  role_id!: string
  part_id!: string
  phase_id!: string

  idx!: string
  date?: number

  get stat() {
    return Query.stats.find(`${this.potof_id}-${this.idx}`)
  }
}

export class Stat extends Model {
  folder!: Folder
  book!: Book
  potof!: Potof

  able!: Able

  folder_id!: string
  book_id!: string
  potof_id!: string

  able_id!: string

  idx!: string

  label!: string

  get card() {
    return Query.cards.find(`${this.potof_id}-${this.idx}`)
  }
}

export class Role extends Model {
  ables!: QUERY<Ables>

  able_ids!: string[]

  cmd?: 'role'
  able?: string

  win!: WINS
  group!: GROUPS
  label!: string
  help?: string
}

export class Able extends Model {
  group!: 'GM' | 'POTOF' | 'STATUS'
  at?: string
  cmd?: string
  btn?: string
  change?: string
  help?: string
  sw?: string
  pass?: string
  for?: string
  targets?: string
  target?: string
  require?: string
  label?: string

  disable?: string[]
  hide?: string[]
  text?: ('act' | 'memo' | 'talk')[]
}

export type Cards = [
  Card,
  {},
  {
    for_part(part_id: string): QUERY<Cards>
    for_phase(phase_id: string): QUERY<Cards>
  }
]
new Rule<Cards>('card', {
  model: Card,
  schema() {
    this.path('folder', 'book', 'potof')
    this.belongs_to('role')

    this.order('list', { sort: ['write_at', 'desc'] })
  },
  scope(all) {
    return {
      for_part(part_id: string) {
        return all.where({ part_id })
      },
      for_phase(phase_id: string) {
        return all.where({ phase_id })
      },
    }
  },
})

export type Stats = [Stat, {}, {}]
new Rule<Stats>('stat', {
  model: Stat,
  schema() {
    this.path('folder', 'book', 'potof')
    this.belongs_to('able', { key: 'idx' })
  },
})

export type Roles = [
  Role,
  {
    summary: LIST<Roles>
    group: HASH<
      string,
      {
        list: LIST<Roles>
        count: number
      }
    >
    clan: HASH<
      CLANS,
      {
        count: number
      } & HASH<
        WINS,
        {
          count: number
        }
      >
    >
    win: HASH<
      WINS,
      {
        count: number
      }
    >
  },
  {}
]
new Rule<Roles>('role', {
  model: Role,
  schema() {
    this.habtm('ables')
    this.order('summary', { sort: ['count', 'desc'], belongs_to: 'roles' })
  },
  deploy({ o, reduce }) {
    reduce(['summary', o.id], { count: 1 })
    reduce(['group', o.group], {
      count: 1,
      list: true,
    })
    const clan = (() => {
      switch (o.group) {
        case undefined:
        case null:
        case '':
        case 'SPECIAL':
        case 'TURN':
          return null
        case 'EVENT':
        case 'GIFT':
        case 'LIVE':
          return o.group
        default:
          return 'MAIN'
      }
    })()
    if (clan) {
      reduce(['clan', clan], { count: 1 })
      if (o.win) {
        reduce(['clan', clan, o.win], { count: 1 })
      }
    }
    if (o.win) {
      reduce(['win', o.win], { count: 1 })
    }
  },
})

export type Ables = [
  Able,
  {
    group: HASH<
      string,
      {
        list: LIST<Ables>
      }
    >
  },
  {}
]
new Rule<Ables>('able', {
  model: Able,
  schema() {
    this.habtm('roles', { reverse: true })
  },
  deploy({ o, reduce }) {
    reduce(['group', o.group!], { list: true })
  },
})

Set.role.set(require('../yaml/set_roles.yml'))
Set.able.set(require('../yaml/set_ables.yml'))
