import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/product/product-card'
import { categories, featuredProducts } from '@/data/products'
import { Gift, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated categories to find the perfect gift for every occasion
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={category.slug === 'custom-boxes' ? '/custom-box' : `/categories/${category.slug}`}
              >
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-3xl`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center text-orange-500 group-hover:text-orange-600">
                      <span className="text-sm font-medium">Shop Now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular gifts loved by thousands of customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}