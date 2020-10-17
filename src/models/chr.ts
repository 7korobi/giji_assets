import { Set, Query, Rule, State } from 'memory-orm'
import { List, Model } from 'memory-orm/lib/base'
import { DIC, DATA, DATUM, QUERY } from 'memory-orm/lib/type'

import { CHR_SET_IDS } from '../lib/dic'

import './face'
import { Face, Faces } from './face'

export class Tag extends Model {
  chr_set!: ChrSet
  faces!: QUERY<Faces>

  chr_set_id!: string

  disabled!: boolean
  order!: number
  head!: string
  face_sort!: [string, 'asc' | 'desc']
  chr_job(face_id: string) {
    return Query.chr_jobs.find(`${this.chr_set_id}_${face_id}`)
  }
}

export class ChrJob extends Model {
  face!: Face

  face_id!: string
  chr_set_id!: string
  chr_set_idx!: number
  job!: string
  q!: { search_words: any }

  get chr_npc() {
    return Query.chr_npcs.find(this.id)
  }
}

export class ChrSet extends Model {}

export class ChrNpc extends Model {
  chr_job!: ChrJob
  face!: Face

  chr_job_id!: string
  chr_set_id!: string
  chr_set_idx!: number
  face_id!: string
  intro!: [string, string] | [string, string, string]

  say_0!: string
  say_1!: string
  say_2!: string

  head() {
    return `${this.chr_job.job} ${this.face.name}`
  }
}

export type Tags = [
  Tag,
  {
    list: List<Tags>
    group: {
      hash: DIC<Tag>
      list: List<Tags>
    }[][]
  },
  {}
]
new Rule<Tags>('tag', {
  model: Tag,
  schema() {
    this.order('list', { sort: ['order'] })
    this.order('group', { sort: ['list.0.order'] })
    this.belongs_to('chr_set')
    this.habtm('faces', { reverse: true })
    this.tree()
  },
  scope(all) {
    return {
      enable() {
        return all.where((o) => !o.disabled)
      },
    }
  },
  deploy({ o, reduce, order }) {
    const group = Math.floor(o.order / 1000)
    reduce(['group', o.head, group], {
      set: o.id,
      list: true,
    })
    order(['group', o.head, group, 'list'], { sort: ['order'] })
  },
})

export type ChrSets = [ChrSet, {}, {}]
new Rule<ChrSets>('chr_set', {
  model: ChrSet,
  schema() {
    this.has_many('chr_jobs')
    this.has_many('chr_npcs')
    this.order('list', { sort: ['label', 'asc'] })
  },
})

export type ChrNpcs = [ChrNpc, {}, {}]
new Rule<ChrNpcs>('chr_npc', {
  model: ChrNpc,
  schema() {
    this.belongs_to('chr_set')
    this.belongs_to('chr_job')
    this.belongs_to('face')
    this.order('list', { sort: ['label', 'asc'] })
  },
  deploy({ o }) {
    o.chr_job_id = `${o.chr_set_id}_${o.face_id}`
    if (o._id == null) {
      o._id = o.chr_job_id
    }
    o.chr_set_idx = CHR_SET_IDS.indexOf(o.chr_set_id)
    o.intro = [o.say_0, o.say_1]
    if (o.say_2) {
      o.intro.push(o.say_2)
    }
  },
})

export type ChrJobs = [ChrJob, {}, {}]
new Rule<ChrJobs>('chr_job', {
  model: ChrJob,
  schema() {
    this.belongs_to('chr_set')
    this.belongs_to('face')
  },
  deploy({ o }) {
    o._id = `${o.chr_set_id}_${o.face_id}`
    o.chr_set_idx = CHR_SET_IDS.indexOf(o.chr_set_id)
    o.q = {
      search_words: o.face
        ? ['animal', 'school'].includes(o.chr_set_id)
          ? o.face.name
          : `${o.job} ${o.face.name}`
        : '',
    }
  },
  scope(all) {
    return {
      tag(tag_id: string) {
        const { chr_set_id, face_sort } = Query.tags.find(tag_id)!
        if ('all' === tag_id) {
          return all.where({ chr_set_id }).sort(...face_sort)
        } else {
          return all
            .where({ chr_set_id })
            .in({ 'face.tag_ids': tag_id })
            .sort(...face_sort)
        }
      },
    }
  },
})

State.transaction(
  function () {
    let faces: DATUM<Face>[], o
    Set.tag.set(require('../yaml/chr_tag.yml'))

    faces = require('../yaml/chr_face.yml')
    Set.face.set(faces)
    for (let idx = 0; idx < faces.length; idx++) {
      o = faces[idx]
      o.yml_idx = idx
      o.aggregate = {
        sow_auths: [],
        mestypes: [],
        folders: [],
        roles: [],
        lives: [],
        log: {
          date_min: 0xfffffffffffff,
          date_max: -0xfffffffffffff,
          story_ids: [],
        },
        fav: {
          _id: {
            sow_auth_id: null,
          },
          count: 0,
        },
      }
    }

    for (let key of CHR_SET_IDS) {
      o = require(`../yaml/cs_${key}.yml`)

      Set.chr_set.append(o.chr_set)
      const { id } = o.chr_set
      const cs_key = { chr_set_id: id }

      Set.chr_npc.merge(o.chr_npc, cs_key)
      Set.chr_job.merge(o.chr_job, cs_key)
    }

    const list: DATA<ChrJob> = []
    for (let face of faces) {
      const chr_set_id = 'all'
      const face_id = face._id as string
      const job = face.chr_jobs!.list.sort('chr_set_idx')[0]?.job
      if (job == null) {
        continue
      }
      list.push({ chr_set_id, face_id, job })
    }

    Set.chr_job.merge(list)

    Query.chr_jobs
      .where((o) => 'ririnra' === o.chr_set_id && (o.face != null ? o.face.q : undefined))
      .pluck('face')
      .forEach(function (o) {
        with_tag(o, /[ア-コヴ]/, 'G_a_k')
        with_tag(o, /[サ-ト]/, 'G_s_t')
        with_tag(o, /[ナ-ホ]/, 'G_n_h')
        with_tag(o, /[マ-ンヵ-ヺ]/, 'G_m_w')
      })

    Query.chr_jobs
      .where((o) => 'time' === o.chr_set_id && (o.face != null ? o.face.q : undefined))
      .pluck('face')
      .forEach(function (o) {
        with_tag(o, /[ア-コヴ]/, 'T_a_k')
        with_tag(o, /[サ-ノ]/, 'T_s_n')
        with_tag(o, /[ハ-ンヵ-ヺ]/, 'T_h_w')
      })

    function with_tag(o: Face, r: RegExp, id: string) {
      if (o.q.head.match(r) && !o.tag_ids.includes(id)) {
        o.tag_ids.push(id)
      }
    }
  },

  Query.static.meta
)
