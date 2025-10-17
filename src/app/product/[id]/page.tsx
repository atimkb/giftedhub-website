'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCartStore } from '@/store/cart'
import { individualProducts, curatedBoxes, subscriptionBoxes } from '@/data/products'
import { getProductImages } from '@/data/images'
import { ProductCard } from '@/components/product/product-card'
import { formatPrice, calculateDiscount, getRelatedProducts } from '@/utils/product'
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Gift, 
  Truck, 
  Shield, 
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)
  
  // Search for product in all arrays
  const allProducts = [...individualProducts, ...curatedBoxes, ...subscriptionBoxes]
  const product = allProducts.find(p => p.id === id)
  const relatedProducts = getRelatedProducts(product!, allProducts, 4)
  
  // Helper function to get category slug
  const getCategorySlug = (category: string) => {
    switch (category) {
      case 'Individual Products':
        return 'individual-products'
      case 'Curated Gift Boxes':
        return 'curated-boxes'
      case 'Subscription Boxes':
        return 'subscription-boxes'
      default:
        return category.toLowerCase().replace(/\s+/g, '-')
    }
  }

  // Get product images from centralized system
  const images = getProductImages(id)
  const productImages = [images.main, ...images.thumbnails]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Add the product with the specified quantity
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category
    }, quantity)
    
    toast.success(`${product.name} (${quantity}x) added to cart!`)
    setIsAdding(false)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-500">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/categories" className="text-gray-600 hover:text-orange-500">Categories</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/categories/${getCategorySlug(product.category)}`} className="text-gray-600 hover:text-orange-500">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - Amazon Style */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thumbnail Strip */}
            <div className="flex lg:flex-col gap-2 order-2 lg:order-1 lg:w-20">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                  }}
                  className={`relative flex-shrink-0 border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-orange-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ width: '80px', height: '80px' }}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = images.main
                    }}
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 border-2 border-orange-500 pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Main Image Area */}
            <div className="flex-1 order-1 lg:order-2">
              <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm z-10">
                  {selectedImage + 1} / {productImages.length}
                </div>

                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => prev === 0 ? productImages.length - 1 : prev - 1)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all z-10"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => prev === productImages.length - 1 ? 0 : prev + 1)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all z-10"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Main Image */}
                <div className="relative">
                  <img 
                    src={productImages[selectedImage]} 
                    alt={product.name}
                    className="w-full h-auto max-h-[600px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src = images.main
                    }}
                  />
                </div>

                {/* Image Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                    title="Share image"
                  >
                    <Share2 className="w-4 h-4 text-gray-700" />
                  </button>
                  <button 
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                    title="View full size"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Thumbnail Strip */}
              <div className="flex gap-2 mt-4 overflow-x-auto lg:hidden">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-orange-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ width: '60px', height: '60px' }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = images.main
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badge */}
            {product.badge && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                {product.badge}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Category */}
            <p className="text-gray-600">
              Category: {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="destructive">
                    Save {calculateDiscount(product.originalPrice, product.price)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={isAdding || !product.inStock}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
              
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="w-5 h-5 mr-2" />
                Add to Wishlist
              </Button>
              
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <Badge variant="destructive" className="w-full justify-center py-2">
                Out of Stock
              </Badge>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Truck className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <RotateCcw className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Why Choose This Product?</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Carefully selected for quality and uniqueness</li>
                        <li>• Perfect for gifting on special occasions</li>
                        <li>• Backed by our satisfaction guarantee</li>
                        <li>• Eco-friendly packaging where applicable</li>
                      </ul>
                    </div>
                    {product.tags && product.tags.includes('Personalized') && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Personalization Options</h4>
                        <p className="text-sm text-blue-700">
                          This product can be customized with names, photos, or special messages. 
                          Add a personal touch to make your gift truly unique and memorable.
                        </p>
                      </div>
                    )}
                    {product.tags && product.tags.includes('Eco-Friendly') && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Eco-Friendly Choice</h4>
                        <p className="text-sm text-green-700">
                          Made from sustainable materials with minimal environmental impact. 
                          Choose this product to support a greener future.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Product ID</span>
                      <span className="font-medium">{product.id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Price</span>
                      <span className="font-medium">₹{product.price.toLocaleString()}</span>
                    </div>
                    {product.originalPrice && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Original Price</span>
                        <span className="font-medium">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Customer Rating</span>
                      <span className="font-medium">{product.rating}/5.0</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Total Reviews</span>
                      <span className="font-medium">{product.reviews}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Availability</span>
                      <span className="font-medium">
                        {product.inStock ? (
                          <span className="text-green-600">In Stock</span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    {product.tags && product.tags.length > 0 && (
                      <div className="md:col-span-2 py-2 border-b">
                        <span className="text-gray-600 block mb-2">Tags</span>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="md:col-span-2 py-2">
                      <span className="text-gray-600 block mb-2">Product Features</span>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• High-quality materials and craftsmanship</li>
                        <li>• Carefully inspected before shipping</li>
                        <li>• Gift wrapping available</li>
                        <li>• 30-day return policy</li>
                        <li>• 24/7 customer support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <Button variant="outline" size="sm">
                      Write a Review
                    </Button>
                  </div>
                  
                  {/* Review Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
                        <div className="text-sm text-gray-600">out of 5</div>
                        <div className="flex mt-1">
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
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => {
                            const percentage = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1
                            return (
                              <div key={stars} className="flex items-center text-sm">
                                <span className="w-12">{stars} star</span>
                                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-yellow-400 h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="w-12 text-right">{percentage}%</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{product.reviews}</div>
                        <div className="text-sm text-gray-600">reviews</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-semibold">A</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium">Amazing Product!</span>
                            </div>
                            <div className="text-sm text-gray-500">Anonymous • 2 days ago</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">This product exceeded my expectations. The quality is outstanding and it made for a perfect gift!</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <button className="hover:text-orange-500">Helpful (12)</button>
                        <button className="hover:text-orange-500">Report</button>
                      </div>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">R</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium">Great Value</span>
                            </div>
                            <div className="text-sm text-gray-500">Rahul • 1 week ago</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">Really happy with this purchase. Good quality for the price and fast delivery. Would definitely recommend.</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <button className="hover:text-orange-500">Helpful (8)</button>
                        <button className="hover:text-orange-500">Report</button>
                      </div>
                    </div>
                    
                    <div className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">P</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium">Perfect Gift</span>
                            </div>
                            <div className="text-sm text-gray-500">Priya • 2 weeks ago</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">Bought this as a gift for my friend's birthday and they loved it! The packaging was beautiful and the product quality is excellent.</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <button className="hover:text-orange-500">Helpful (15)</button>
                        <button className="hover:text-orange-500">Report</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Load More Reviews */}
                  <div className="text-center mt-6">
                    <Button variant="outline">
                      Load More Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}