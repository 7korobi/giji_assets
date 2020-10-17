import { Rule } from 'memory-orm'
import { Model } from 'memory-orm/lib/base'

export class Sheet extends Model {}
export type Sheets = [Sheet, {}, {}]
new Rule<Sheets>('sheet', {
  model: Sheet,
  schema() {
    this.order('list', { sort: ['write_at', 'desc'] })
  },
  scope(all) {
    return {}
  },
})
