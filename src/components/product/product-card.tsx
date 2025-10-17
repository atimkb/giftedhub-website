'use client'

import { Gift, Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types/product'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { getProductImages } from '@/data/images'
import { FALLBACK_IMAGES } from '@/constants/images'
import { formatPrice, calculateDiscount, isInStock } from '@/utils/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdding, setIsAdding] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const productImages = getProductImages(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking add to cart
    e.stopPropagation()
    
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: productImages.main,
      category: product.category
    })
    
    toast.success(`${product.name} added to cart!`)
    
    setTimeout(() => setIsAdding(false), 1000)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const getDisplayImage = () => {
    if (imageError) {
      return FALLBACK_IMAGES.main
    }
    return productImages.main
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="relative">
          {/* Product image */}
          <div className="aspect-square relative overflow-hidden bg-gray-100">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <Gift className="w-16 h-16 text-orange-500 opacity-50" />
              </div>
            ) : (
              <img 
                src={getDisplayImage()}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
              />
            )}
          </div>

          {/* Badge */}
          {product.badge && (
            <Badge className="absolute top-3 left-3 z-20 bg-orange-500 hover:bg-orange-600">
              {product.badge}
            </Badge>
          )}

          {/* Add to cart overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
            <Button 
              onClick={handleAddToCart}
              disabled={isAdding || !isInStock(product)}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAdding ? 'Added!' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Category */}
            <p className="text-sm text-gray-500">{product.category}</p>
            
            {/* Product name */}
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating and reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-700 ml-1">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="text-xs">
                  {calculateDiscount(product.originalPrice, product.price)}% OFF
                </Badge>
              )}
            </div>

            {/* Stock status */}
            {!isInStock(product) && (
              <Badge variant="destructive" className="w-full justify-center">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}