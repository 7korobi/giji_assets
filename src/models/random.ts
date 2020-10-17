import _ from 'lodash'
import { Set, Rule, Query, State } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { QUERY } from 'memory-orm/lib/type'

import { RANKS, SUITES, RANDOM_TYPES } from '../lib/dic'

export class Random extends Model {
  texts!: [string] | [string, string]
  types!: readonly RANDOM_TYPES[]

  ratio!: number
  order!: number
  year?: number
  number?: number

  label!: string
  name?: string
  hebrew?: string
  roman?: string
  symbol?: string
  suite?: SUITES
  rank?: RANKS

  to_s(side: number) {
    if (side == null) {
      side = _.random(0, 1)
    }
    switch (this.types[0]) {
      case 'tarot':
        return `${['正', '逆'][side]} ${this.roman}.${this.label}`

      case 'zodiac':
        return `${this.symbol} ${this.roman}.${this.label}`

      case 'planet':
      case 'weather':
      case 'chess':
        return `${this.symbol} ${this.label}`

      default:
        return `${this.label}`
    }
  }
}

export type Randoms = [
  Random,
  {
    label: Random[][]
    ratio: {
      count: number
      all: number
    }
    type: (Random & {
      count: number
    })[]
  },
  {
    deck(type: string): QUERY<Randoms>
    choice(type: string): Random
  }
]

new Rule<Randoms>('random', {
  model: Random,

  scope(all) {
    return {
      deck(type) {
        return all.partition(`type.from.${type}.set`)
      },
    }
  },

  scope_without_cache(all) {
    return {
      choice(type) {
        const { list, reduce } = all.deck(type)
        let at = Math.random() * reduce.ratio.all
        for (let o of list) {
          at -= o.ratio
          if (at < 0) {
            return o
          }
        }
        return list.tail
      },
    }
  },

  schema() {
    this.order('list', { sort: ['ratio', 'desc'] })
    this.order('type', { sort: ['count', 'asc'] })
    this.order('label', { sort: ['list.length', 'desc'] })
  },

  deploy({ o, reduce }) {
    const t0 = o.to_s(0)
    const t1 = o.to_s(1)
    o.texts = t0 !== t1 ? [t0, t1] : [t0]

    reduce([], {
      set: o.id,
    })

    for (let type of o.types!) {
      reduce(['type', type], {
        set: o.id,
        count: 1,
      })
    }

    reduce(['label', o.name || o.label], { list: true })

    reduce('ratio', {
      count: 1,
      all: o.ratio,
    })
  },
})

const romans = 'I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX XXI'.split(
  ' '
)

State.transaction(
  function () {
    let _id, label, number, order, rank, suite, types
    const object = require('../yaml/random.yml')
    for (let type in object) {
      const o = object[type]
      order = 0
      for (let key in o) {
        const oo = o[key]
        order++
        if (!oo.types) {
          oo.types = []
        }
        oo.types.push(type)
        if (oo.ratio == null) {
          oo.ratio = 1
        }
        if (oo.label == null) {
          oo.label = key
        }
        if (oo.name == null) {
          oo.name = key
        }
        oo._id = (oo.name || oo.label || key).replace(/ /g, '')
        oo.order = order
        if (['zodiac', 'tarot'].includes(type)) {
          oo.roman = romans[order]
        }
        Set.random.add(oo)
      }
    }

    const ratio = 1
    types = ['eto'] as const
    const now_year = new Date().getFullYear()
    for (let idx = 0; idx < 60; idx++) {
      const eto10 = '甲乙丙丁戊己庚辛壬癸'[idx % 10]
      const eto12 = '子丑寅卯辰巳午未申酉戌亥'[idx % 12]
      const a = Query.randoms.where({ label: eto10 }).list[0]
      const b = Query.randoms.where({ label: eto12 }).list[0]
      const name = `${a.name!.replace(/と$/, 'との')}${b.name!}`
      const year = idx + 1984
      order = idx + 1

      _id = label = `${eto10}${eto12}`
      Set.random.add({ _id, order, types, ratio, label, name, year })
    }

    types = ['trump'] as const
    for (let idx1 = 0; idx1 < SUITES.length; idx1++) {
      suite = SUITES[idx1]
      for (let idx2 = 0; idx2 < RANKS.length; idx2++) {
        rank = RANKS[idx2]
        label = `${suite}${rank}`
        const suite_code = idx1 + 1
        number = idx2 + 1
        order = 100 * suite_code + number
        _id = `${order}`
        Set.random.add({ _id, order, types, ratio, number, suite, rank, label })
      }
    }

    Set.random.add({
      _id: `501`,
      order: 501,
      types: ['trump'],
      ratio: 1,
      number: 0,
      suite: '',
      rank: '',
      label: 'JOKER',
    })

    Set.random.add({
      _id: `502`,
      order: 502,
      types: ['trump'],
      ratio: 1,
      number: 0,
      suite: '',
      rank: '',
      label: 'joker',
    })
  },

  Query.static.meta
)
