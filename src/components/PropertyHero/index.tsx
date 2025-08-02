import React from 'react'
import { Media } from '@/components/Media'
import type { Property } from '@/payload-types'

export const PropertyHero: React.FC<{
  property: Property
}> = ({ property }) => {
  const { title, location, price, image, description } = property

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        {image && typeof image !== 'string' ? (
          <Media
            resource={image}
            size="100vw"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-lg">No image available</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {title}
              </h1>
              {location && (
                <div className="flex items-center text-white/90 text-lg mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </div>
              )}
              {price && (
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {formatPrice(price)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>Property Description</h2>
                {description ? (
                  <p className="text-lg leading-relaxed">
                    {typeof description === 'string' ? description : 'Property description available'}
                  </p>
                ) : (
                  <p className="text-muted-foreground">No description available for this property.</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="space-y-4">
                  {price && (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-semibold text-lg">{formatPrice(price)}</span>
                    </div>
                  )}
                  {location && (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{location}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}