import { Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'

const format = {
  head: new Intl.DateTimeFormat('ja-JP', {
    weekday: 'short',
    hour: '2-digit',
  }),
  tail: new Intl.DateTimeFormat('ja-JP', { hour: '2-digit' }),
}

export class Section extends Model {
  begin_at!: number
  write_at!: number

  get label() {
    const begin = format.head.format(this.begin_at)
    let write = format.head.format(this.write_at)
    if (begin === write) {
      return begin
    } else {
      write = format.tail.format(this.write_at)
      return begin.replace('時', '-' + write)
    }
  }
}
export type Sections = [Section, {}, {}]

new Rule<Sections>('section', {
  model: Section,
  schema() {
    this.order('list', { sort: ['write_at', 'desc'] })
    this.path('folder', 'book', 'part')
    this.has_many('chats')
  },
  deploy({ o }) {
    if (!o.label) {
      ;(o as any).label = o.idx!
    }
  },
})
