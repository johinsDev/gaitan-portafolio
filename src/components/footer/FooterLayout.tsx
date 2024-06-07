import type { PortableTextBlock } from 'next-sanity'

import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'
import Link from 'next/link'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props

  const footer = data?.footer || ([] as PortableTextBlock[])

  const menuItems = data?.menuItems || []

  return (
    <footer className="flex items-center justify-between bg-primary bottom-0 w-full py-12 text-primary-foreground text-center md:py-20">
      <div className="main_container flex flex-col md:flex-row justify-between w-full mx-auto items-start gap-8">
        <div className="flex items-start gap-8 flex-col md:flex-row">
          <Link href="/">
            <p className="font-bold text-xl xl:text-3xl">
              {data?.title ?? "Juan Felipe Gaitán"}.
            </p>
          </Link>

          <ul className="flex items-center flex-col justify-center gap-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.slug || '/'}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {footer && (
          <CustomPortableText
            paragraphClasses="text-md md:text-xl"
            value={footer as any}
          />
        )}
      </div>
    </footer>
  )
}
