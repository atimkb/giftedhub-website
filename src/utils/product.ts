import { Product } from '@/types/product'

/**
 * Format price with Indian Rupee symbol and proper formatting
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

/**
 * Format rating with proper decimal places
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.inStock !== false
}

/**
 * Get product badge priority for display
 */
export function getBadgePriority(badge?: string): number {
  const priorityMap: Record<string, number> = {
    'Best Seller': 1,
    'Luxury': 2,
    'Eco-Friendly': 3,
    'New': 4,
    'Limited Edition': 5
  }
  return badge ? priorityMap[badge] || 99 : 99
}

/**
 * Sort products by badge priority
 */
export function sortByBadgePriority(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const aPriority = getBadgePriority(a.badge)
    const bPriority = getBadgePriority(b.badge)
    return aPriority - bPriority
  })
}

/**
 * Filter products by tags
 */
export function filterByTags(products: Product[], tags: string[]): Product[] {
  if (tags.length === 0) return products
  return products.filter(product => 
    product.tags?.some(tag => tags.includes(tag))
  )
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(
  products: Product[], 
  minPrice: number = 0, 
  maxPrice?: number
): Product[] {
  return products.filter(product => {
    if (maxPrice) {
      return product.price >= minPrice && product.price <= maxPrice
    }
    return product.price >= minPrice
  })
}

/**
 * Search products by name or description
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products
  const searchTerm = query.toLowerCase().trim()
  
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * Get related products based on category and tags
 */
export function getRelatedProducts(
  product: Product, 
  allProducts: Product[], 
  limit: number = 4
): Product[] {
  return allProducts
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || 
       p.tags?.some(tag => product.tags?.includes(tag)))
    )
    .slice(0, limit)
}