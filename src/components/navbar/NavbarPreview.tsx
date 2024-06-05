'use client'

import { useQuery, useSettings } from '@/sanity/loader/useQuery'

import { homePageQuery } from '@/sanity/lib/queries'
import { HomePagePayload } from '@/types'
import NavbarLayout from './NavbarLayout'

type Props = {
  initial: Parameters<typeof useSettings>[0]
}

export default function NavbarPreview(props: Props) {
  const { data } = useSettings(props.initial)

  const { data: home } = useQuery<HomePagePayload>(homePageQuery, {})

  return <NavbarLayout settings={data!} home={home} />
}
