import { Query, Set, State } from 'memory-orm'
import { DATUM } from 'memory-orm/lib/type'

import { SowTurn, SowVillagePlan } from '../../../giji/app/models/sow'
import { SowVillage } from '../../../giji/app/models/sow_village'

export async function PlanApi() {
  const res = await fetch('https://giji-api.duckdns.org/api/plan/progress')
  const { plans }: { plans: DATUM<SowVillagePlan>[] } = await res.json()
  return State.transaction(() => {
    Set.sow_village_plan.reset(plans)
  }, {} as any)
}

export async function StoryApi() {
  const res = await fetch('https://giji-api.duckdns.org/api/story/progress')
  const {
    stories,
    events,
  }: { stories: DATUM<SowVillage>[]; events: DATUM<SowTurn>[] } = await res.json()
  stories.forEach((o) => {
    const sign = o.sow_auth_id!.replace(/\./g, '&#2e')
    Object.assign(o, {
      label: o.name,
      sign: sign,
      mark_ids: (() => {
        switch (o.rating) {
          case 'default':
            return []
          case 'child':
            return ['age_A']
          case 'fireplace':
            return ['cat']
          case 'sexylove':
            return ['sexy', 'love']
          case 'sexyviolence':
            return ['sexy', 'violence']
          default:
            return [o.rating]
        }
      })(),
    })
  })
  return State.transaction(() => {
    Set.sow_village.reject(Query.sow_villages.prologue.list)
    Set.sow_village.reject(Query.sow_villages.progress.list)
    Set.sow_turn.merge(events)
    Set.sow_village.merge(stories)
  }, {} as any)
}
