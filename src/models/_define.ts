import { Query, Metadata } from 'memory-orm'
import { QUERY_WITH_SCOPE, SET } from 'memory-orm/lib/type'

import { Randoms } from './random'
import { Tags, ChrNpcs, ChrSets, ChrJobs } from './chr'
import { SowTurns, SowRoleTables, SowVillagePlans } from './sow'
import { SowVillages } from './sow_village'
import { Markers, Icons } from './activity'
import { WorkLocations, WorkCountrys, WorkNames } from './workflow'
import { Potofs } from './potof'
import { Ables, Cards, Roles, Stats } from './card'
import { Folders } from './folder'
import { Locales, Options, Winners, Says, Marks, Games, Books } from './book'
import { Parts } from './part'
import { Phases } from './phase'
import { Sections } from './section'
import { Chats } from './chat'
import { Sheets } from './sheet'
import { Faces } from './face'

declare module 'memory-orm' {
  const Set: {
    tag: SET<Tags>
    icon: SET<Icons>
    marker: SET<Markers>

    locale: SET<Locales>
    option: SET<Options>
    winner: SET<Winners>
    say: SET<Says>
    mark: SET<Marks>
    game: SET<Games>
    random: SET<Randoms>

    able: SET<Ables>
    role: SET<Roles>
    stat: SET<Stats>
    card: SET<Cards>
    folder: SET<Folders>
    face: SET<Faces>

    sheet: SET<Sheets>
    section: SET<Sections>

    book: SET<Books>
    phase: SET<Phases>
    potof: SET<Potofs>
    parts: SET<Parts>
    chat: SET<Chats>

    chr_job: SET<ChrJobs>
    chr_set: SET<ChrSets>
    chr_npc: SET<ChrNpcs>

    sow_turn: SET<SowTurns>
    sow_village: SET<SowVillages>
    sow_village_plan: SET<SowVillagePlans>
    sow_roletable: SET<SowRoleTables>

    work_name: SET<WorkNames>
    work_location: SET<WorkLocations>
    work_country: SET<WorkCountrys>
  }
  const Query: {
    tags: QUERY_WITH_SCOPE<Tags>
    icons: QUERY_WITH_SCOPE<Icons>
    markers: QUERY_WITH_SCOPE<Markers>

    locales: QUERY_WITH_SCOPE<Locales>
    options: QUERY_WITH_SCOPE<Options>
    winners: QUERY_WITH_SCOPE<Winners>
    says: QUERY_WITH_SCOPE<Says>
    marks: QUERY_WITH_SCOPE<Marks>
    games: QUERY_WITH_SCOPE<Games>
    randoms: QUERY_WITH_SCOPE<Randoms>

    ables: QUERY_WITH_SCOPE<Ables>
    roles: QUERY_WITH_SCOPE<Roles>
    stats: QUERY_WITH_SCOPE<Stats>
    cards: QUERY_WITH_SCOPE<Cards>
    folders: QUERY_WITH_SCOPE<Folders>
    faces: QUERY_WITH_SCOPE<Faces>

    sheets: QUERY_WITH_SCOPE<Sheets>
    sections: QUERY_WITH_SCOPE<Sections>

    books: QUERY_WITH_SCOPE<Books>
    phases: QUERY_WITH_SCOPE<Phases>
    potofs: QUERY_WITH_SCOPE<Potofs>
    parts: QUERY_WITH_SCOPE<Parts>
    chats: QUERY_WITH_SCOPE<Chats>

    chr_jobs: QUERY_WITH_SCOPE<ChrJobs>
    chr_sets: QUERY_WITH_SCOPE<ChrSets>
    chr_npcs: QUERY_WITH_SCOPE<ChrNpcs>

    sow_turns: QUERY_WITH_SCOPE<SowTurns>
    sow_villages: QUERY_WITH_SCOPE<SowVillages>
    sow_village_plans: QUERY_WITH_SCOPE<SowVillagePlans>
    sow_roletables: QUERY_WITH_SCOPE<SowRoleTables>
    work_names: QUERY_WITH_SCOPE<WorkNames>
    work_locations: QUERY_WITH_SCOPE<WorkLocations>
    work_countrys: QUERY_WITH_SCOPE<WorkCountrys>
    static: {
      meta: Metadata
    }
  }
}

Query.static = {
  meta: {} as Metadata,
}
