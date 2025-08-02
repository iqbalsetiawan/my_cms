import type { Metadata } from 'next/types'

import { PropertyArchive } from '@/components/PropertyArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const properties = await payload.find({
    collection: 'properties',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      isPublished: {
        equals: true,
      },
    },
    select: {
      title: true,
      slug: true,
      location: true,
      price: true,
      image: true,
      description: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Properties</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="properties"
          currentPage={properties.page}
          limit={12}
          totalDocs={properties.totalDocs}
        />
      </div>

      <PropertyArchive properties={properties.docs} />

      <div className="container">
        {properties.totalPages > 1 && properties.page && (
          <Pagination page={properties.page} totalPages={properties.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Properties - Real Estate Listings`,
  }
}