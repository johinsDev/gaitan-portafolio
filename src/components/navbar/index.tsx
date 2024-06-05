import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'

import NavbarLayout from './NavbarLayout'
const NavbarPreview = dynamic(() => import('./NavbarPreview'))

export async function Navbar() {
  const [settings, home] = await Promise.all([loadSettings(), loadHomePage()])

  if (draftMode().isEnabled) {
    return <NavbarPreview initial={settings} />
  }

  return <NavbarLayout settings={settings.data} home={home.data} />
}
