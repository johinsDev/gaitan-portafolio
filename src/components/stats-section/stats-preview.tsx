'use client'

import { useQuery } from '@/sanity/loader/useQuery'

import { homePageQuery } from '@/sanity/lib/queries'
import { getSection } from '@/sanity/lib/utils'
import { HomePagePayload, SectionsList, StatsSection } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { StatsLAyout } from './stats-layout'

type Props = {
  initial: QueryResponseInitial<HomePagePayload>
  _key: string
}

export default function StatsPreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(homePageQuery, {}, {
    initial: props.initial,
  })

  const stats = getSection<StatsSection>(home?.sections ?? [], SectionsList.STATS_SECTION, props._key)

  return <StatsLAyout data={stats} />
}
