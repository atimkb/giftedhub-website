export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
  inStock: boolean
  tags?: string[]
  featured?: boolean
  badge?: string
}

export interface CartItem extends Omit<Product, 'description' | 'rating' | 'reviews' | 'inStock' | 'tags' | 'featured' | 'badge'> {
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
}

export interface FeaturedSection {
  title: string
  subtitle: string
  products: Product[]
}