import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { getSection } from '@/sanity/lib/utils'
import { loadHomePage } from '@/sanity/loader/loadQuery'
import { CtaSection, SectionsList } from '@/types'
import { CallToActionSectionLayout } from './call-to-action-section-layout'

const CallToActionSectionPreview = dynamic(() => import('./call-to-action-section-preview'))

type Props = {
  _key: string
}

export async function CallToActionSection({ _key: key }: Props) {
  const home = await loadHomePage()

  const cta = getSection<CtaSection>(home?.data.sections ?? [], SectionsList.CTA_SECTION, key)

  if (draftMode().isEnabled) {
    return <CallToActionSectionPreview initial={home} _key={key} />
  }

  return <CallToActionSectionLayout data={cta} />
}
