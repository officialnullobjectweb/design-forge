'use client'

import { useState } from 'react'
import { brandIcons, getResourceIconUrl } from '@/lib/resource-icons'

const hashColor = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hues = [220, 250, 190, 330, 30, 170, 290, 10, 80, 200]
  const hue = hues[Math.abs(hash) % hues.length]
  return { bg: `hsl(${hue}, 55%, 92%)`, text: `hsl(${hue}, 55%, 35%)` }
}

const getInitials = (name: string) => {
  const parts = name.split(/[\s-]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  const words = name.split(/(?=[A-Z])/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const sizeConfig = {
  xs: { box: 'h-6 w-6', img: 'h-3.5 w-3.5', text: 'text-[8px]', rounded: 'rounded-lg' },
  sm: { box: 'h-7 w-7', img: 'h-4 w-4', text: 'text-[9px]', rounded: 'rounded-lg' },
  md: { box: 'h-9 w-9', img: 'h-5 w-5', text: 'text-[10px]', rounded: 'rounded-xl' },
  lg: { box: 'h-10 w-10', img: 'h-6 w-6', text: 'text-xs', rounded: 'rounded-xl' },
}

export default function SiteIcon({
  resourceId,
  name = '',
  url,
  imgSrc,
  size = 'sm',
  fallback = 'initials',
}: {
  resourceId?: string
  name?: string
  url?: string
  imgSrc?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  fallback?: 'initials' | 'hidden'
}) {
  const [level, setLevel] = useState(0)
  const brand = resourceId ? brandIcons[resourceId] : null

  const sources = [
    imgSrc || null,
    brand ? `https://cdn.simpleicons.org/${brand.slug}/${brand.color}` : null,
    url ? getResourceIconUrl(url, name) : null,
  ].filter(Boolean) as string[]

  const src = level < sources.length ? sources[level] : null
  const s = sizeConfig[size]

  if (fallback === 'hidden' && !src) return null

  if (!src) {
    const colors = hashColor(name)
    return (
      <div
        className={`flex ${s.box} shrink-0 items-center justify-center ${s.rounded}`}
        style={{ background: colors.bg }}
      >
        <span className={`font-bold ${s.text}`} style={{ color: colors.text }}>
          {getInitials(name)}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex ${s.box} shrink-0 items-center justify-center ${s.rounded} bg-zinc-50 ring-1 ring-zinc-200/50 overflow-hidden`}>
      <img
        src={src}
        alt={name}
        className={`${s.img} object-contain`}
        loading="lazy"
        onError={() => setLevel(p => p + 1)}
      />
    </div>
  )
}
