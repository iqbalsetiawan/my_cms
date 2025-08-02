import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'

import type { Property } from '@/payload-types'

import { PropertyHero } from '@/components/PropertyHero'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const properties = await payload.find({
    collection: 'properties',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    where: {
      isPublished: {
        equals: true,
      },
    },
    select: {
      slug: true,
    },
  })

  const params = properties.docs.map(({ slug }) => ({
    slug,
  }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Property({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/properties/' + slug
  const property = await queryPropertyBySlug({ slug })

  if (!property) return notFound()

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      <PayloadRedirects url={url} />
      <PropertyHero property={property} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const property = await queryPropertyBySlug({ slug })

  // Handle description field which can be string or rich text object
  const getDescriptionText = (description: any): string => {
    if (typeof description === 'string') {
      return description
    }
    // For rich text fields, provide a fallback
    return 'Property details and information'
  }

  const descriptionText = property?.description ? getDescriptionText(property.description) : 'Property details and information'

  return {
    title: property?.title ? `${property.title} | Real Estate` : 'Property | Real Estate',
    description: descriptionText,
    openGraph: {
      title: property?.title ? `${property.title} | Real Estate` : 'Property | Real Estate',
      description: descriptionText,
      url: `/properties/${slug}`,
      type: 'website',
    },
  }
}

const queryPropertyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'properties',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})