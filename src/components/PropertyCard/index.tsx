'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Property } from '@/payload-types'

import { Media } from '@/components/Media'

export type PropertyCardData = Pick<Property, 'slug' | 'title' | 'location' | 'price' | 'image' | 'description'>

export const PropertyCard: React.FC<{
  className?: string
  property?: PropertyCardData
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, property, title: titleFromProps } = props

  const { slug, title, location, price, image, description } = property || {}

  const titleToUse = titleFromProps || title
  const href = `/properties/${slug}`

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer transition-all duration-200 hover:shadow-lg',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[4/3]">
        {!image && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        {image && typeof image !== 'string' && (
          <Media resource={image} size="33vw" className="object-cover w-full h-full" />
        )}
      </div>
      <div className="p-4">
        {titleToUse && (
          <div className="prose mb-2">
            <h3 className="text-lg font-semibold mb-1">
              <Link className="not-prose hover:text-primary transition-colors" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {location && (
          <div className="text-sm text-muted-foreground mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        )}
        {price && (
          <div className="text-xl font-bold text-primary mb-2">
            {formatPrice(price)}
          </div>
        )}
        {description && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {typeof description === 'string' ? description : 'Property description available'}
          </div>
        )}
      </div>
    </article>
  )
}