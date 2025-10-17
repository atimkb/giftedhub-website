'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductCard } from '@/components/product/product-card'
import { individualProducts } from '@/data/products'
import { Gift, Star, Heart, Coffee, Home, Briefcase, Leaf, Sparkles, Search, Filter } from 'lucide-react'

type ProductCategory = 'Personalized' | 'Eco-Friendly' | 'Desk & Lifestyle' | 'Home & Décor' | 'Gourmet' | 'Experience'

const categoryIcons = {
  'Personalized': <Star className="w-5 h-5 text-purple-500" />,
  'Eco-Friendly': <Leaf className="w-5 h-5 text-green-500" />,
  'Desk & Lifestyle': <Briefcase className="w-5 h-5 text-blue-500" />,
  'Home & Décor': <Home className="w-5 h-5 text-orange-500" />,
  'Gourmet': <Coffee className="w-5 h-5 text-amber-500" />,
  'Experience': <Sparkles className="w-5 h-5 text-pink-500" />
}

const categoryColors = {
  'Personalized': 'from-purple-400 to-pink-500',
  'Eco-Friendly': 'from-green-400 to-teal-500',
  'Desk & Lifestyle': 'from-blue-400 to-indigo-500',
  'Home & Décor': 'from-orange-400 to-red-500',
  'Gourmet': 'from-amber-400 to-orange-500',
  'Experience': 'from-pink-400 to-purple-500'
}

export default function IndividualProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'name'>('name')

  const filteredProducts = individualProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           product.tags?.some(tag => tag === selectedCategory)
    
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const categories: ProductCategory[] = ['Personalized', 'Eco-Friendly', 'Desk & Lifestyle', 'Home & Décor', 'Gourmet', 'Experience']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Individual Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our curated collection of single-item gifts perfect for any occasion. 
              From personalized treasures to eco-friendly essentials, find the perfect gift that speaks from the heart.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {categoryIcons[category]}
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {individualProducts.length} products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryProducts = sortedProducts.filter(product => 
              product.tags?.some(tag => tag === category)
            )

            if (categoryProducts.length === 0) return null

            return (
              <section key={category}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {categoryIcons[category]}
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryColors[category]}`}></div>
                  </div>
                  <p className="text-gray-600">
                    {category === 'Personalized' && 'Custom-made gifts with personal touch and meaning'}
                    {category === 'Eco-Friendly' && 'Sustainable and environmentally conscious products'}
                    {category === 'Desk & Lifestyle' && 'Essential items for work and everyday life'}
                    {category === 'Home & Décor' && 'Beautiful items to enhance your living space'}
                    {category === 'Gourmet' && 'Delicious treats and culinary delights'}
                    {category === 'Experience' && 'Unforgettable experiences and activities'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}