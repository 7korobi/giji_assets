import { Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'
import { DIC, NAVI, QUERY } from 'memory-orm/lib/type'

export class WorkLocation extends Model {
  zipcode!: string
  on!: string
  get id_ary() {
    return (this.id as string).split('-')
  }
  get prefecture() {
    return this.id_ary[0]
  }
}

export class WorkCountry extends Model {
  q!: { search_words: string }
  country!: string[]
}

export class WorkName extends Model {
  spell!: string
  key!: string
  spot!: string
  mark!: string
  name!: string
  work_country_id!: string
  q!: { search_words: string }
}

export type WorkLocations = [
  WorkLocation,
  {
    id_tree: {
      navi: NAVI
    }
  },
  {
    zip(): QUERY<WorkLocations>
    geo(): QUERY<WorkLocations>
    no_zip(): QUERY<WorkLocations>
    no_geo(): QUERY<WorkLocations>
  }
]
new Rule<WorkLocations>('work_location', {
  model: WorkLocation,
  schema() {
    this.order('list', {
      sort: [
        ['id_ary.length', 'name.length', 'name'],
        ['desc', 'desc', 'asc'],
      ],
    })
    this.path('*')
  },
  scope(all) {
    return {
      zip() {
        return all.where((o) => o.zipcode)
      },
      geo() {
        return all.where((o) => o.on)
      },
      no_zip() {
        return all.where((o) => !o.zipcode)
      },
      no_geo() {
        return all.where((o) => !o.on)
      },
    }
  },
  deploy({ o, reduce }) {
    reduce('id_tree', { navi: o.id_ary })
  },
})

export type WorkCountrys = [
  WorkCountry,
  {
    list: WorkCountry[]
  },
  {}
]
new Rule<WorkCountrys>('work_country', {
  model: WorkCountry,
  schema() {
    this.has_many('work_names')
    this.order('list', { sort: ['country.length', 'desc'] })
  },
  deploy({ o }) {
    o.q = {
      search_words: o.country.join(' '),
    }
  },
})

export type WorkNames = [
  WorkName,
  {
    spot_size: (WorkName & {
      count: number
    })[]
    code: {
      [key: string]: {
        hash: DIC<WorkName>
      }
    }
    spot: {
      [key: string]: {
        list: WorkName[]
        hash: DIC<WorkName>
      }
    }
  },
  {
    by_page(spot_id: string, search: string): QUERY<WorkNames>
  }
]
let idx = 0
new Rule<WorkNames>('work_name', {
  model: WorkName,
  schema() {
    this.order('spot_size', { sort: ['count', 'desc'] })

    this.belongs_to('work_country')
  },

  scope(all) {
    return {
      by_page(spot_id: string, search: string) {
        const q = spot_id !== 'all' ? all.partition(`code.${spot_id}.set`) : all
        return q.search(search)
      },
    }
  },

  deploy({ o, reduce, order }) {
    const ascii = o.spell ? o.spell.normalize('NFKD').replace(/[\u0300-\u036F]/g, '') : ''
    o._id = `${o.key}-${++idx}`
    o.spot = o.mark || o.key
    o.work_country_id = o.key
    o.q = {
      search_words: [`<${o.name}>`, `<${ascii}>`].join(' '),
    }

    reduce(['code', o.key], { set: o.id })
    reduce(['spot', o.spot], {
      set: o.id,
      list: true,
    })
    reduce(['spot_size', o.spot], { count: 1 })

    order(['spot', o.spot, 'list'], {
      sort: [
        ['side', 'name'],
        ['asc', 'asc'],
      ],
    })
  },
})
