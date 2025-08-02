import { cn } from '@/utilities/ui'
import React from 'react'

import { PropertyCard, PropertyCardData } from '@/components/PropertyCard'

export type Props = {
  properties: PropertyCardData[]
}

export const PropertyArchive: React.FC<Props> = (props) => {
  const { properties } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6 lg:gap-y-8 lg:gap-x-8">
          {properties?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <PropertyCard className="h-full" property={result} />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}