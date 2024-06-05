import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { getSection } from '@/sanity/lib/utils'
import { loadHomePage } from '@/sanity/loader/loadQuery'
import { CtaSection, SectionsList } from '@/types'
import { CallToActionSectionLayout } from './call-to-action-section-layout'

const CallToActionSectionPreview = dynamic(() => import('./call-to-action-section-preview'))

export async function CallToActionSection() {
  const home = await loadHomePage()

  const cta = getSection<CtaSection>(home?.data.sections ?? [], SectionsList.CTA_SECTION)

  if (draftMode().isEnabled) {
    return <CallToActionSectionPreview initial={home} />
  }

  return <CallToActionSectionLayout data={cta} />
}
