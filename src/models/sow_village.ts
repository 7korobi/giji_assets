import { Query, Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { HASH, QUERY, QUERY_ARGS } from 'memory-orm/lib/type'

import format from 'date-fns/format'
import locale from 'date-fns/locale/ja'

import {
  BOOK_OPTIONS,
  FOLDER_IDS,
  GAMES,
  MONTHS,
  ROLETABLES,
  VILLAGE_MODES,
  VOTETYPES,
} from '../lib/dic'
import { Game, Marks, Options, Say } from './book'
import { Role } from './card'
import { Folder } from './folder'
import { SowTurns } from './sow'

const { url } = require('../config/live.yml')

export class SowVillage extends Model {
  say!: Say
  mob!: Role
  game!: Game
  folder!: Folder

  turns!: QUERY<SowTurns>
  marks!: QUERY<Marks>
  option_datas!: QUERY<Options>

  is_epilogue!: boolean
  is_finish!: boolean
  is_full_commit!: boolean

  write_at!: number
  vid!: number

  sign!: string
  rating!: string
  name!: string
  href!: string
  mode!: string

  sow_auth_id!: string

  vpl!: [number, number]

  card!: {
    option: BOOK_OPTIONS[]
    event: string[]
    discard: string[]
    config: string[]
  }
  options!: BOOK_OPTIONS[]

  upd!: {
    interval: number
    hour: number | string
    minute: number | string
  }
  aggregate!: { face_ids: never[] }
  timer!: {
    updateddt: Date | string
    scraplimitdt: Date | string
    nextchargedt: Date | string
    nextcommitdt: Date | string
    nextupdatedt: Date | string
  }
  type!: {
    say: string
    vote: VOTETYPES
    mob: string
    game: GAMES
    roletable: ROLETABLES
  }
  q!: {
    yeary: string
    monthry: string
    in_month: string
    sow_auth_id: string
    folder_id: string
    size: number
    say: string
    mob: string
    game: string
    upd_at: string
    upd_range: string
    rating: string
    search_words: string
  }

  get query() {
    return Query.sow_villages.where({ id: this.id })
  }
  get roles() {
    return this.query.reduce != null ? this.query.reduce : []
  }

  get event_length() {
    return this.query.reduce.event?.length ?? 0
  }
}

const cmd = { count: 1 }
export type SowVillages = [
  SowVillage,
  HASH<VILLAGE_MODES, HASH<'all' | FOLDER_IDS, SowVillage[]>> & {
    mode: {
      [mode in VILLAGE_MODES]: {
        count: number
      }
    }
    in_month: {
      [in_month in MONTHS]: {
        count: number
      }
    }
    yeary: {
      id: string
      count: number
    }[]
    monthry: {
      id: string
      count: number
    }[]
    folder_id: {
      id: string
      count: number
    }[]
    upd_range: {
      id: string
      count: number
    }[]
    upd_at: {
      id: string
      count: number
    }[]
    sow_auth_id: {
      id: string
      count: number
    }[]
    rating: {
      id: string
      count: number
    }[]
    size: {
      id: string
      count: number
    }[]
    say: {
      id: string
      count: number
    }[]
    game: {
      id: string
      count: number
    }[]
    mob: {
      id: string
      count: number
    }[]
    option: {
      id: string
      count: number
    }[]
    event: {
      id: string
      count: number
    }[]
    discard: {
      id: string
      count: number
    }[]
    config: {
      id: string
      count: number
    }[]
  },
  {
    prologue: QUERY<SowVillages>
    progress: QUERY<SowVillages>
    mode(mode: string): QUERY<SowVillages>
    summary(
      mode: string,
      folder_ids: string[],
      query_in: QUERY_ARGS,
      query_where: QUERY_ARGS,
      search_word: string
    ): QUERY<SowVillages>
    all_contents(
      mode: string,
      folder_ids: string[],
      query_in: QUERY_ARGS,
      query_where: QUERY_ARGS,
      search_word: string,
      order: string,
      asc: 'asc' | 'desc'
    ): QUERY<SowVillages>
  }
]

new Rule<SowVillages>('sow_village', {
  model: SowVillage,
  schema() {
    this.order('list', { sort: ['write_at', 'desc'], diff: ['write_at'] })
    this.order('yeary', { sort: ['id', 'desc'] })
    this.order('in_month', { sort: ['id', 'asc'] })
    this.order('upd_at', { sort: ['id', 'asc'] })
    this.order('folder_id', { sort: ['count', 'desc'] })
    this.order('upd_range', { sort: ['count', 'desc'] })
    this.order('sow_auth_id', { sort: ['count', 'desc'] })
    this.order('rating', { sort: ['count', 'desc'] })
    this.order('size', { sort: ['count', 'desc'] })
    this.order('say', { sort: ['count', 'desc'], belongs_to: 'says' })
    this.order('game', { sort: ['count', 'desc'], belongs_to: 'games' })
    this.order('mob', { sort: ['count', 'desc'], belongs_to: 'roles' })
    this.order('option', { sort: ['count', 'desc'], belongs_to: 'options' })
    this.order('event', { sort: ['count', 'desc'], belongs_to: 'roles' })
    this.order('discard', { sort: ['count', 'desc'], belongs_to: 'roles' })
    this.order('config', { sort: ['count', 'desc'], belongs_to: 'roles' })

    this.has_many('turns', { target: 'sow_turns', key: 'story_id' })

    this.habtm('marks')
    this.habtm('option_datas', { target: 'options', key: 'options' })

    this.belongs_to('say', { target: 'says', key: 'q.say' })
    this.belongs_to('mob', { target: 'roles', key: 'q.mob' })
    this.belongs_to('game', { target: 'games', key: 'q.game' })
  },
  scope(all) {
    return {
      prologue: all.partition('prologue.all.set').sort('timer.nextcommitdt', 'desc'),
      progress: all.partition('progress.all.set').sort('timer.nextcommitdt', 'desc'),

      mode(mode) {
        return all.partition(`${mode}.all.set`)
      },

      summary(mode, folder_ids, query_in, query_where, search_word) {
        if (!folder_ids.length) {
          folder_ids = ['all']
        }
        const parts = folder_ids.map((folder_id) => `${mode}.${folder_id}.set`)
        return all
          .partition(...parts)
          .in(query_in)
          .where(query_where)
          .search(search_word)
      },

      all_contents(mode, folder_ids, query_in, query_where, search_word, order, asc) {
        return all
          .summary(mode, folder_ids, query_in, query_where, search_word)
          .page(25)
          .order([], {
            sort: [order, asc],
            page: true,
          })
      },
    }
  },

  deploy({ o, reduce }) {
    let { interval, hour, minute } = o.upd
    if (Number(hour) < 10) {
      hour = `0${hour}`
    }
    if (Number(minute) < 10) {
      minute = `0${minute}`
    }
    o.timer.nextchargedt = new Date(o.timer.nextchargedt)
    o.timer.nextcommitdt = new Date(o.timer.nextcommitdt)
    o.timer.nextupdatedt = new Date(o.timer.nextupdatedt)
    o.timer.scraplimitdt = new Date(o.timer.scraplimitdt)
    o.timer.updateddt = new Date(o.timer.updateddt)
    const updated_at = new Date(o.timer.updateddt)

    o.write_at = updated_at.getTime()

    const in_month = format(updated_at, 'MM月', { locale })
    const yeary = format(updated_at, 'yyyy年', { locale })
    const monthry = yeary + in_month
    o.q = {
      yeary,
      monthry,
      in_month,
      sow_auth_id: o.sign,
      folder_id: ((o.folder as any) as string).toUpperCase(),
      size: o.vpl[0],
      say: o.type.say,
      mob: o.type.mob,
      game: o.type.game,
      upd_at: `${hour}:${minute}`,
      upd_range: `${interval * 24}h`,
      rating: o.rating,
      search_words: o.name,
    }

    if ([null, 0, '0', 'null', 'view'].includes(o.rating)) {
      o.q.rating = 'default'
    }
    if (['R15', 'r15', 'r18'].includes(o.rating)) {
      o.q.rating = 'alert'
    }
    if (['gro'].includes(o.rating)) {
      o.q.rating = 'violence'
    }

    const table = Query.sow_roletables.find(o.type.roletable)?.role_ids_list
    const list = table && table[o.q.size]

    if (list?.length && !o.card.config.length) {
      o.card.config = list
    }
    o.card.option = o.options

    o.folder = Query.folders.find(o.q.folder_id)!
    if (o.is_epilogue && o.is_finish) {
      o.href = `${url.store}/stories/${o._id}`
      o.mode = 'oldlog'
    } else {
      if (o.turns.list[0]) {
        o.mode = 'progress'
      } else {
        o.mode = 'prologue'
      }
    }

    o.aggregate = { face_ids: [] }

    const { id } = o
    const it = { set: id }
    reduce([], it)
    reduce([o.mode, 'all'], it)
    reduce([o.mode, o.q.folder_id], it)

    let card_id
    reduce(['mode', o.mode, o.q.folder_id], cmd)
    reduce(['in_month', o.q.in_month], cmd)
    reduce(['yeary', o.q.yeary], cmd)
    reduce(['monthry', o.q.monthry], cmd)
    reduce(['folder_id', o.q.folder_id], cmd)
    reduce(['upd_range', o.q.upd_range], cmd)
    reduce(['upd_at', o.q.upd_at], cmd)
    reduce(['sow_auth_id', o.q.sow_auth_id], cmd)
    reduce(['rating', o.q.rating], cmd)
    reduce(['size', o.q.size], cmd)
    reduce(['say', o.q.say], cmd)
    reduce(['game', o.q.game], cmd)
    reduce(['mob', o.q.mob], cmd)
    for (let opt_id of o.card.option) {
      reduce(['option', opt_id], cmd)
    }
    for (card_id of o.card.event) {
      reduce(['event', card_id], cmd)
    }
    for (card_id of o.card.discard) {
      reduce(['discard', card_id], cmd)
    }
    for (card_id of o.card.config) {
      reduce(['config', card_id], cmd)
    }
  },
})
