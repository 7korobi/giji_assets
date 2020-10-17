import { Rule } from 'memory-orm'
import { List, Model } from 'memory-orm/lib/base'
import { DIC, QUERY } from 'memory-orm/lib/type'

import { ChrJobs, ChrNpcs, Tags } from './chr'

const katakanas = (() => {
  const result = []
  let start = 'ア'.charCodeAt(0)
  let end = 'ン'.charCodeAt(0)
  let idx = start
  for (; idx <= end; idx++) {
    result.push(String.fromCharCode(idx))
  }
  return result
})()

export class Face extends Model {
  chr_jobs!: QUERY<ChrJobs>
  chr_npcs!: QUERY<ChrNpcs>
  tags!: QUERY<Tags>

  tag_ids!: string[]
  yml_idx!: number

  name!: string
  order!: string
  comment!: string

  aggregate!: {
    roles: string[]
    lives: string[]
    sow_auths: string[]
    mestypes: string[]
    folders: string[]
    log: {
      story_ids: string[]
      date_max: number
      date_min: number
    }
    fav: {
      _id: {
        sow_auth_id: string | null
      }
      count: number
    }
  }
  q!: {
    head: string
    name: string
  }

  get summary_url() {
    return `/summary/faces/show?id=${this._id}`
  }
  get roles() {
    return this.aggregate.roles
  }
  get lives() {
    return this.aggregate.lives
  }
  get sow_auths() {
    return this.aggregate.sow_auths
  }
  get mestypes() {
    return this.aggregate.mestypes
  }
  get folders() {
    return this.aggregate.folders
  }
  get story_length() {
    return this.aggregate.log.story_ids.length
  }
  get sow_auth_id() {
    return this.aggregate.fav._id.sow_auth_id
  }
  get fav_count() {
    return this.aggregate.fav.count
  }
  get date_max() {
    return new Date(this.aggregate.log.date_max).getTime()
  }
  get date_min() {
    return new Date(this.aggregate.log.date_min).getTime()
  }
  get date_range() {
    return this.date_max - this.date_min
  }

  get jobs() {
    return this.chr_jobs.pluck('job').uniq
  }
}

export class FaceList extends List<Faces> {
  to_json() {
    return JSON.stringify(
      this.map((o) => {
        return {
          _id: o.id,
          name: o.name,
          comment: o.comment,
          order: o.order,
          tag_ids: o.tag_ids,
        }
      })
    )
  }
}
export type Faces = [
  Face,
  {
    name_head: string[][]
    tag: {
      [tag: string]: {
        hash: DIC<Face>
        count: number
      }
    }
  },
  {
    tag(tag_id: string): QUERY<Faces>
    name_head(tag_id: string): string[][]
  }
]

new Rule<Faces>('face', {
  model: Face,
  schema() {
    this.habtm('tags')
    this.has_many('chr_jobs')
    this.has_many('chr_npcs')

    const map = { count: 1 }
    this.order('list', { sort: ['order'] })
    this.order('name_head', {
      sort: ['id'],
      index: 'set.length',
      cover: katakanas,
    })
  },
  scope(all) {
    return {
      tag(tag_id) {
        return all.partition(`tag.${tag_id}.set`)
      },

      name_head(tag_id) {
        return all.tag(tag_id).reduce.name_head
      },
    }
  },

  deploy({ o, reduce }) {
    let name = o.name.slice(0)
    if (['†'].includes(o.name[0])) {
      name = o.name.slice(1)
    }
    if (['D.'].includes(o.name.slice(0, 2))) {
      name = o.name.slice(2)
    }
    if (['Dr.'].includes(o.name.slice(0, 3))) {
      name = o.name.slice(3)
    }
    name = name.replace(/[\u3041-\u3096]/g, (hira) =>
      String.fromCharCode(hira.charCodeAt(0) + 0x60)
    )
    const head = name[0]
    o.q = { head, name }
    o.tag_ids.unshift('all')

    const it = {
      set: o.id,
      count: 1,
    }
    reduce([], it)
    reduce(['tag', 'all'], it)

    o.tag_ids.map((tag_id) => reduce(['tag', tag_id], it))
    reduce(['name_head', o.q.head], { set: o.name })
  },
})
