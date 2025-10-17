'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/product-card'
import { curatedBoxes } from '@/data/products'
import { Gift, Star, Heart, Users, Briefcase, Baby, Sparkles, Award } from 'lucide-react'

interface BoxCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  boxIds: string[]
}

const boxCategories: BoxCategory[] = [
  {
    id: 'self-care',
    name: 'Self-Care & Wellness',
    description: 'Pampering gifts for relaxation and rejuvenation',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-400 to-purple-500',
    boxIds: ['cb1']
  },
  {
    id: 'professional',
    name: 'Professional & Office',
    description: 'Perfect gifts for colleagues and professionals',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-blue-400 to-indigo-500',
    boxIds: ['cb2', 'cb9']
  },
  {
    id: 'celebration',
    name: 'Celebration & Festive',
    description: 'Joyful gifts for parties and special occasions',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-500',
    boxIds: ['cb3', 'cb6', 'cb7', 'cb8']
  },
  {
    id: 'romantic',
    name: 'Romantic & Relationships',
    description: 'Express love with thoughtful romantic gifts',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-red-400 to-pink-500',
    boxIds: ['cb4']
  },
  {
    id: 'family',
    name: 'Family & Baby',
    description: 'Heartwarming gifts for families and new parents',
    icon: <Users className="w-6 h-6" />,
    color: 'from-green-400 to-teal-500',
    boxIds: ['cb5']
  }
]

export default function CuratedBoxesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredBoxes = selectedCategory === 'all' 
    ? curatedBoxes
    : curatedBoxes.filter(box => {
        const category = boxCategories.find(cat => cat.id === selectedCategory)
        return category?.boxIds.includes(box.id)
      })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Curated Gift Boxes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our expertly crafted gift boxes, each thoughtfully designed for specific occasions and recipients. 
              Perfect ready-made solutions when you want to give something extraordinary without the hassle of selection.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              All Boxes
            </Button>
            {boxCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Box */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
            </div>
            <p className="text-gray-600">Our bestselling curated gift box loved by thousands</p>
          </div>
          
          <div className="max-w-md mx-auto">
            {curatedBoxes.find(box => box.badge === 'Best Seller') && (
              <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Gift className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-yellow-100 text-yellow-800">Best Seller</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {curatedBoxes.find(box => box.badge === 'Best Seller')?.rating}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {curatedBoxes.find(box => box.badge === 'Best Seller')?.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {curatedBoxes.find(box => box.badge === 'Best Seller')?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">
                          ₹{curatedBoxes.find(box => box.badge === 'Best Seller')?.price}
                        </span>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-12">
          {boxCategories.map((category) => {
            const categoryBoxes = filteredBoxes.filter(box => category.boxIds.includes(box.id))
            
            if (categoryBoxes.length === 0) return null

            return (
              <section key={category.id}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryBoxes.map((box) => (
                    <Card key={box.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          <Gift className="w-16 h-16 text-gray-400" />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">{box.name}</h3>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{box.rating}</span>
                                  <span className="text-sm text-gray-500">({box.reviews})</span>
                                </div>
                                {box.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {box.badge}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm">{box.description}</p>

                          <div className="flex flex-wrap gap-1">
                            {box.tags?.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <span className="text-2xl font-bold text-purple-600">₹{box.price}</span>
                              {box.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">₹{box.originalPrice}</span>
                              )}
                            </div>
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Box Benefits */}
        <section className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Curated Boxes?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our expertly curated gift boxes save you time while ensuring you give the perfect gift every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expertly Curated</h3>
                <p className="text-gray-600 text-sm">
                  Each box is carefully designed by our gift experts for maximum impact and delight.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ready to Gift</h3>
                <p className="text-gray-600 text-sm">
                  Beautifully packaged and ready to present, saving you time and effort.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Thoughtful Themes</h3>
                <p className="text-gray-600 text-sm">
                  Each box tells a story and creates memorable experiences for the recipient.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}