'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { categories, individualProducts, curatedBoxes, subscriptionBoxes } from '@/data/products'
import { Search, Filter, ArrowLeft, Star, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')

  const category = categories.find(cat => cat.slug === slug)
  
  // Get all products based on category
  const getAllProducts = () => {
    switch (slug) {
      case 'individual-products':
        return individualProducts
      case 'curated-boxes':
        return curatedBoxes
      case 'subscription-boxes':
        return subscriptionBoxes
      case 'custom-boxes':
        // For custom boxes, we'll show individual products that can be customized
        return individualProducts.filter(product => 
          product.tags?.includes('Personalized') || product.category === 'Individual Products'
        )
      default:
        return []
    }
  }

  const allCategoryProducts = getAllProducts()
  
  const filteredProducts = useMemo(() => {
    let products = [...allCategoryProducts]

    // Filter by search term
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      products = products.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max
        }
        return product.price >= min
      })
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        // Keep original order for featured
        break
    }

    return products
  }, [searchTerm, sortBy, priceRange, allCategoryProducts])

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/categories">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/categories" className="flex items-center text-gray-600 hover:text-orange-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>
          </div>
          
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-3xl`}>
              {category.icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                  <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
                  <SelectItem value="5000">Above ₹5,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProducts.length} Products Found
            </h2>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm('')
                setSortBy('featured')
                setPriceRange('all')
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}