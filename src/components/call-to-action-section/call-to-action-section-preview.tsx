'use client'

import { useQuery } from '@/sanity/loader/useQuery'

import { homePageQuery } from '@/sanity/lib/queries'
import { getSection } from '@/sanity/lib/utils'
import { CtaSection, HomePagePayload, SectionsList } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { CallToActionSectionLayout } from './call-to-action-section-layout'

type Props = {
  initial: QueryResponseInitial<HomePagePayload>
}

export default function CallToActionSectionPreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(homePageQuery, {}, {
    initial: props.initial,
  })

  const cta = getSection<CtaSection>(home?.sections ?? [], SectionsList.CTA_SECTION)

  return <CallToActionSectionLayout data={cta} />
}
