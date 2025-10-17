import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section Skeleton */}
          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="lg:w-20 space-y-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20" />
                ))}
              </div>
              <div className="flex-1">
                <Skeleton className="aspect-square w-full max-h-[600px]" />
              </div>
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="w-20 h-20 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}