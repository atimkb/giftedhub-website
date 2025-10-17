'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { subscriptionBoxes } from '@/data/products'
import { Gift, Calendar, Star, Book, Coffee, Heart, Users, Leaf, Sparkles, Check } from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  frequency: string
  description: string
  features: string[]
  discount: number
  icon: React.ReactNode
  color: string
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    frequency: 'Monthly',
    description: 'Perfect for trying out different themes',
    features: ['Free shipping', 'Cancel anytime', 'Exclusive items', 'Early access'],
    discount: 5,
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    frequency: 'Every 3 Months',
    description: 'Great balance of variety and value',
    features: ['Free shipping', '10% savings', 'Exclusive items', 'Early access', 'Gift with 3rd box'],
    discount: 10,
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'annual',
    name: 'Annual Plan',
    frequency: 'Yearly',
    description: 'Best value for dedicated subscribers',
    features: ['Free shipping', '20% savings', 'Exclusive items', 'Early access', 'Welcome gift', 'Priority support'],
    discount: 20,
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-green-400 to-blue-500'
  }
]

const boxCategories = [
  {
    id: 'lifestyle',
    name: 'Lifestyle & Hobbies',
    description: 'Boxes for personal interests and daily life',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-400 to-purple-500',
    boxIds: ['sb1', 'sb2', 'sb7']
  },
  {
    id: 'wellness',
    name: 'Wellness & Self-Care',
    description: 'Nurture your mind and body',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-green-400 to-teal-500',
    boxIds: ['sb4']
  },
  {
    id: 'gourmet',
    name: 'Food & Gourmet',
    description: 'Culinary delights delivered to your door',
    icon: <Coffee className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-500',
    boxIds: ['sb3']
  },
  {
    id: 'corporate',
    name: 'Corporate & Business',
    description: 'Perfect for employee engagement and gifting',
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-400 to-indigo-500',
    boxIds: ['sb5']
  },
  {
    id: 'family',
    name: 'Family & Kids',
    description: 'Fun and educational boxes for all ages',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-500',
    boxIds: ['sb6']
  }
]

export default function SubscriptionBoxesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly')

  const filteredBoxes = selectedCategory === 'all' 
    ? subscriptionBoxes
    : subscriptionBoxes.filter(box => {
        const category = boxCategories.find(cat => cat.id === selectedCategory)
        return category?.boxIds.includes(box.id)
      })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Subscription Boxes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the joy of regular surprises with our curated subscription boxes. 
              Monthly or quarterly deliveries that bring excitement to your doorstep and create lasting memories.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subscription Plans */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Flexible subscription options to suit your lifestyle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'border-2 border-green-500 ring-2 ring-green-100' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-600">{plan.frequency}</p>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-green-600">Save {plan.discount}%</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 text-center mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      selectedPlan === plan.id 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
            </div>
            <p className="text-gray-600">Our most loved subscription box</p>
          </div>
          
          <div className="max-w-md mx-auto">
            {subscriptionBoxes.find(box => box.badge === 'Best Seller') && (
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
                            {subscriptionBoxes.find(box => box.badge === 'Best Seller')?.rating}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {subscriptionBoxes.find(box => box.badge === 'Best Seller')?.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {subscriptionBoxes.find(box => box.badge === 'Best Seller')?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            ₹{subscriptionBoxes.find(box => box.badge === 'Best Seller')?.price}/month
                          </span>
                          {subscriptionBoxes.find(box => box.badge === 'Best Seller')?.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{subscriptionBoxes.find(box => box.badge === 'Best Seller')?.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size="sm">Subscribe</Button>
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
                              <span className="text-2xl font-bold text-green-600">
                                ₹{box.price}
                                <span className="text-sm font-normal text-gray-500">/month</span>
                              </span>
                              {box.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">₹{box.originalPrice}</span>
                              )}
                            </div>
                            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                              Subscribe
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

        {/* Subscription Benefits */}
        <section className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Subscribe With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy subscribers who discover new favorites every month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Curated Surprises</h3>
                <p className="text-gray-600 text-sm">
                  Expertly selected items tailored to your interests every month.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm">
                  Pause, skip, or cancel anytime with no hassle.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Exclusive Access</h3>
                <p className="text-gray-600 text-sm">
                  Get early access to new products and subscriber-only deals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">
                  Join a community of like-minded enthusiasts and share experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}