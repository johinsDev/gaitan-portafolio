'use client'

import { useQuery } from '@/sanity/loader/useQuery'

import { homePageQuery } from '@/sanity/lib/queries'
import { getSection } from '@/sanity/lib/utils'
import { FeatureSection, HomePagePayload, SectionsList } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { FeatureSectionLayout } from './feature-layout'

type Props = {
  initial: QueryResponseInitial<HomePagePayload>
  _key: string
}

export default function FeaturePreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(homePageQuery, {}, {
    initial: props.initial,
  })

  const feature = getSection<FeatureSection>(home?.sections ?? [], SectionsList.FEATURE_SECTION, props._key)

  return <FeatureSectionLayout data={feature} />
}
