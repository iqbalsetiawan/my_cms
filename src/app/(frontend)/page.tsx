import type { Metadata } from 'next/types'
import { PropertyArchive } from '@/components/PropertyArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const properties = await payload.find({
    collection: 'properties',
    depth: 1,
    limit: 6,
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
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1>Welcome to Our Real Estate Platform</h1>
          <p className="text-xl text-muted-foreground">Discover your dream property from our curated collection</p>
        </div>
      </div>

      <div className="container mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured Properties</h2>
          <Link href="/properties" className="text-primary hover:underline">
            View All Properties →
          </Link>
        </div>
      </div>

      <PropertyArchive properties={properties.docs} />

      <div className="container mt-12 text-center">
        <Link 
          href="/properties" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-colors"
        >
          Browse All Properties
        </Link>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Real Estate Platform - Find Your Dream Property',
    description: 'Browse our collection of premium properties and find your perfect home.',
  }
}
