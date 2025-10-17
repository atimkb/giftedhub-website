'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Gift, 
  Package, 
  Plus, 
  Minus, 
  Check, 
  Star, 
  Heart, 
  Leaf, 
  Briefcase, 
  Coffee, 
  Home, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  PenTool, 
  ShoppingCart,
  Palette,
  Box,
  Users,
  Building2,
  Calendar,
  Clock,
  Truck,
  Shield,
  RotateCcw,
  X,
  Eye,
  Filter,
  Search,
  Tag,
  Award,
  Crown,
  Diamond,
  Gem,
  Flower,
  BookOpen,
  Music,
  Gamepad,
  Camera,
  Headphones,
  Wine,
  Cake,
  HeartHandshake,
  Smartphone,
  Zap,
  Battery,
  MapPin,
  Lightbulb,
  Flame
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

// Enhanced interfaces
interface CustomBoxItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  description: string
  image: string
  icon: React.ReactNode
  selected: boolean
  tags: string[]
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isPopular?: boolean
  weight: number
  dimensions: string
  materials?: string[]
}

interface BoxSizeOption {
  id: string
  name: string
  dimensions: string
  capacity: string
  basePrice: number
  description: string
  icon: React.ReactNode
  color: string
  maxItems: number
}

interface BoxThemeOption {
  id: string
  name: string
  description: string
  colorScheme: string[]
  price: number
  icon: React.ReactNode
  preview: string
  occasions: string[]
}

interface WrappingPaperOption {
  id: string
  name: string
  price: number
  description: string
  color: string
  image: string
  isPremium: boolean
  materials: string
}

interface LetterStyleOption {
  id: string
  name: string
  price: number
  description: string
  style: string
  preview: string
  turnaroundTime: string
}

interface AddOnOption {
  id: string
  name: string
  price: number
  description: string
  category: string
  icon: React.ReactNode
  isPopular: boolean
}

interface BudgetOption {
  id: string
  name: string
  minPrice: number
  maxPrice: number
  description: string
  color: string
  recommendedItems: number
}

interface CorporateOption {
  id: string
  name: string
  price: number
  description: string
  includes: string[]
  minQuantity: number
}

// Enhanced data
const boxSizeOptions: BoxSizeOption[] = [
  {
    id: 'small',
    name: 'Compact Box',
    dimensions: '20x15x10 cm',
    capacity: '3-4 items',
    basePrice: 199,
    description: 'Perfect for intimate gifts and small items',
    icon: <Box className="w-5 h-5" />,
    color: 'from-blue-400 to-blue-600',
    maxItems: 4
  },
  {
    id: 'medium',
    name: 'Standard Box',
    dimensions: '25x20x15 cm',
    capacity: '5-7 items',
    basePrice: 299,
    description: 'Most popular size for balanced gifts',
    icon: <Package className="w-5 h-5" />,
    color: 'from-purple-400 to-purple-600',
    maxItems: 7
  },
  {
    id: 'large',
    name: 'Premium Box',
    dimensions: '30x25x20 cm',
    capacity: '8-12 items',
    basePrice: 499,
    description: 'Luxury size for elaborate gifts',
    icon: <Crown className="w-5 h-5" />,
    color: 'from-yellow-400 to-orange-600',
    maxItems: 12
  },
  {
    id: 'extra-large',
    name: 'Grand Box',
    dimensions: '35x30x25 cm',
    capacity: '12-15 items',
    basePrice: 699,
    description: 'Ultimate luxury for special occasions',
    icon: <Diamond className="w-5 h-5" />,
    color: 'from-red-400 to-pink-600',
    maxItems: 15
  }
]

const boxThemeOptions: BoxThemeOption[] = [
  {
    id: 'elegant',
    name: 'Elegant Classic',
    description: 'Timeless sophistication with neutral tones',
    colorScheme: ['#8B4513', '#D2691E', '#F5DEB3'],
    price: 0,
    icon: <Crown className="w-5 h-5" />,
    preview: '/api/placeholder/200/150',
    occasions: ['Wedding', 'Anniversary', 'Formal']
  },
  {
    id: 'romantic',
    name: 'Romantic Rose',
    description: 'Soft pinks and reds for love expressions',
    colorScheme: ['#FF69B4', '#FFB6C1', '#FFF0F5'],
    price: 99,
    icon: <Heart className="w-5 h-5" />,
    preview: '/api/placeholder/200/150',
    occasions: ['Valentine\'s', 'Anniversary', 'Proposal']
  },
  {
    id: 'festive',
    name: 'Festive Celebration',
    description: 'Vibrant colors for joyous occasions',
    colorScheme: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    price: 149,
    icon: <Gift className="w-5 h-5" />,
    preview: '/api/placeholder/200/150',
    occasions: ['Birthday', 'Festival', 'Celebration']
  },
  {
    id: 'eco-nature',
    name: 'Eco Nature',
    description: 'Earth tones for environmentally conscious',
    colorScheme: ['#8FBC8F', '#98D8C8', '#F7DC6F'],
    price: 79,
    icon: <Leaf className="w-5 h-5" />,
    preview: '/api/placeholder/200/150',
    occasions: ['Earth Day', 'Eco-Friendly', 'Nature Lover']
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Opulent gold accents for premium gifts',
    colorScheme: ['#FFD700', '#FFA500', '#FF8C00'],
    price: 199,
    icon: <Gem className="w-5 h-5" />,
    preview: '/api/placeholder/200/150',
    occasions: ['Luxury', 'Premium', 'Special']
  }
]

const customBoxItems: CustomBoxItem[] = [
  // Personalized Items
  {
    id: 'p1',
    name: 'Personalized Photo Mug',
    price: 349,
    originalPrice: 499,
    category: 'Personalized',
    subcategory: 'Drinkware',
    description: 'Custom ceramic mug with your favorite photo printed in high quality',
    image: '/api/placeholder/150/150',
    icon: <Coffee className="w-5 h-5" />,
    selected: false,
    tags: ['Personalized', 'Practical', 'Daily Use'],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isNew: true,
    weight: 0.4,
    dimensions: '10x8x8 cm',
    materials: ['Ceramic', 'Food-safe ink']
  },
  {
    id: 'p2',
    name: 'Name-Engraved Pen',
    price: 599,
    originalPrice: 799,
    category: 'Personalized',
    subcategory: 'Stationery',
    description: 'Premium metal pen with custom name engraving and gift box',
    image: '/api/placeholder/150/150',
    icon: <Briefcase className="w-5 h-5" />,
    selected: false,
    tags: ['Professional', 'Luxury', 'Gift'],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isPopular: true,
    weight: 0.1,
    dimensions: '14x1x1 cm',
    materials: ['Metal', 'Engraved']
  },
  {
    id: 'p3',
    name: 'Custom Leather Diary',
    price: 449,
    originalPrice: 599,
    category: 'Personalized',
    subcategory: 'Stationery',
    description: 'Genuine leather diary with personalized embossing and premium paper',
    image: '/api/placeholder/150/150',
    icon: <BookOpen className="w-5 h-5" />,
    selected: false,
    tags: ['Luxury', 'Professional', 'Handmade'],
    rating: 4.7,
    reviews: 189,
    inStock: true,
    weight: 0.3,
    dimensions: '15x10x2 cm',
    materials: ['Genuine Leather', 'Premium Paper']
  },
  {
    id: 'p4',
    name: 'Custom T-Shirt',
    price: 699,
    category: 'Personalized',
    subcategory: 'Apparel',
    description: 'Premium cotton t-shirt with custom design or photo print',
    image: '/api/placeholder/150/150',
    icon: <Package className="w-5 h-5" />,
    selected: false,
    tags: ['Casual', 'Comfortable', 'Trendy'],
    rating: 4.6,
    reviews: 267,
    inStock: true,
    isNew: true,
    weight: 0.2,
    dimensions: 'Various sizes',
    materials: ['100% Cotton', 'Digital Print']
  },
  {
    id: 'p5',
    name: 'Personalized Phone Case',
    price: 399,
    originalPrice: 499,
    category: 'Personalized',
    subcategory: 'Tech',
    description: 'Custom phone case with photos, text, or unique designs',
    image: '/api/placeholder/150/150',
    icon: <Smartphone className="w-5 h-5" />,
    selected: false,
    tags: ['Tech', 'Protection', 'Personal'],
    rating: 4.5,
    reviews: 312,
    inStock: true,
    isPopular: true,
    weight: 0.05,
    dimensions: 'Phone specific',
    materials: ['Polycarbonate', 'Printed']
  },
  {
    id: 'p6',
    name: 'Name Jewelry',
    price: 1299,
    originalPrice: 1599,
    category: 'Personalized',
    subcategory: 'Jewelry',
    description: 'Elegant name necklace in sterling silver with gift packaging',
    image: '/api/placeholder/150/150',
    icon: <Heart className="w-5 h-5" />,
    selected: false,
    tags: ['Luxury', 'Jewelry', 'Sentimental'],
    rating: 4.9,
    reviews: 98,
    inStock: true,
    weight: 0.02,
    dimensions: '16x2x0.1 cm',
    materials: ['Sterling Silver', 'Chain']
  },
  {
    id: 'p7',
    name: 'Personalized Passport Cover',
    price: 299,
    originalPrice: 399,
    category: 'Personalized',
    subcategory: 'Travel',
    description: 'Leather passport cover with name embossing and RFID protection',
    image: '/api/placeholder/150/150',
    icon: <Package className="w-5 h-5" />,
    selected: false,
    tags: ['Travel', 'Practical', 'Luxury'],
    rating: 4.4,
    reviews: 145,
    inStock: true,
    weight: 0.1,
    dimensions: '14x10x1 cm',
    materials: ['Genuine Leather', 'RFID Blocking']
  },

  // Eco-Friendly Items
  {
    id: 'e1',
    name: 'Bamboo Water Bottle',
    price: 499,
    originalPrice: 699,
    category: 'Eco-Friendly',
    subcategory: 'Drinkware',
    description: 'Sustainable bamboo water bottle with stainless steel interior',
    image: '/api/placeholder/150/150',
    icon: <Leaf className="w-5 h-5" />,
    selected: false,
    tags: ['Eco-Friendly', 'Sustainable', 'Health'],
    rating: 4.7,
    reviews: 178,
    inStock: true,
    isPopular: true,
    weight: 0.3,
    dimensions: '22x7x7 cm',
    materials: ['Bamboo', 'Stainless Steel']
  },
  {
    id: 'e2',
    name: 'Jute Tote Bag',
    price: 349,
    category: 'Eco-Friendly',
    subcategory: 'Bags',
    description: 'Stylish reusable jute shopping bag with cotton handles',
    image: '/api/placeholder/150/150',
    icon: <Leaf className="w-5 h-5" />,
    selected: false,
    tags: ['Eco-Friendly', 'Reusable', 'Fashion'],
    rating: 4.6,
    reviews: 223,
    inStock: true,
    weight: 0.2,
    dimensions: '35x30x10 cm',
    materials: ['Jute', 'Cotton']
  },
  {
    id: 'e3',
    name: 'Seed Cards',
    price: 149,
    originalPrice: 199,
    category: 'Eco-Friendly',
    subcategory: 'Stationery',
    description: 'Plantable seed paper greeting cards that grow into flowers',
    image: '/api/placeholder/150/150',
    icon: <Leaf className="w-5 h-5" />,
    selected: false,
    tags: ['Eco-Friendly', 'Plantable', 'Unique'],
    rating: 4.8,
    reviews: 134,
    inStock: true,
    isNew: true,
    weight: 0.05,
    dimensions: '15x10x0.1 cm',
    materials: ['Seed Paper', 'Natural Dyes']
  },
  {
    id: 'e4',
    name: 'Recycled Notebook',
    price: 199,
    originalPrice: 299,
    category: 'Eco-Friendly',
    subcategory: 'Stationery',
    description: 'Notebook made from 100% recycled paper with eco-friendly cover',
    image: '/api/placeholder/150/150',
    icon: <Leaf className="w-5 h-5" />,
    selected: false,
    tags: ['Eco-Friendly', 'Recycled', 'Practical'],
    rating: 4.5,
    reviews: 167,
    inStock: true,
    weight: 0.25,
    dimensions: '18x12x1.5 cm',
    materials: ['Recycled Paper', 'Cardboard']
  },
  {
    id: 'e5',
    name: 'Bamboo Cutlery Set',
    price: 299,
    originalPrice: 399,
    category: 'Eco-Friendly',
    subcategory: 'Kitchen',
    description: 'Reusable bamboo cutlery set with carrying case',
    image: '/api/placeholder/150/150',
    icon: <Leaf className="w-5 h-5" />,
    selected: false,
    tags: ['Eco-Friendly', 'Reusable', 'Travel'],
    rating: 4.7,
    reviews: 201,
    inStock: true,
    isPopular: true,
    weight: 0.15,
    dimensions: '20x5x3 cm',
    materials: ['Bamboo', 'Cotton Case']
  },

  // Tech & Gadgets
  {
    id: 't1',
    name: 'Wireless Charger',
    price: 899,
    originalPrice: 1299,
    category: 'Tech & Gadgets',
    subcategory: 'Charging',
    description: 'Fast wireless charger for all devices with LED indicator',
    image: '/api/placeholder/150/150',
    icon: <Zap className="w-5 h-5" />,
    selected: false,
    tags: ['Tech', 'Wireless', 'Fast Charging'],
    rating: 4.6,
    reviews: 289,
    inStock: true,
    isPopular: true,
    weight: 0.2,
    dimensions: '10x10x1 cm',
    materials: ['Plastic', 'Electronics']
  },
  {
    id: 't2',
    name: 'Power Bank',
    price: 1299,
    originalPrice: 1599,
    category: 'Tech & Gadgets',
    subcategory: 'Power',
    description: '20000mAh power bank with fast charging and multiple ports',
    image: '/api/placeholder/150/150',
    icon: <Battery className="w-5 h-5" />,
    selected: false,
    tags: ['Tech', 'Portable', 'High Capacity'],
    rating: 4.7,
    reviews: 345,
    inStock: true,
    weight: 0.35,
    dimensions: '15x7x2 cm',
    materials: ['Plastic', 'Lithium Battery']
  },
  {
    id: 't3',
    name: 'Bluetooth Tracker',
    price: 799,
    originalPrice: 999,
    category: 'Tech & Gadgets',
    subcategory: 'Tracking',
    description: 'Smart tracker for lost items with app integration',
    image: '/api/placeholder/150/150',
    icon: <MapPin className="w-5 h-5" />,
    selected: false,
    tags: ['Tech', 'Smart', 'Tracking'],
    rating: 4.5,
    reviews: 198,
    inStock: true,
    isNew: true,
    weight: 0.01,
    dimensions: '4x4x0.5 cm',
    materials: ['Plastic', 'Bluetooth']
  },
  {
    id: 't4',
    name: 'Premium Headphones',
    price: 2499,
    originalPrice: 2999,
    category: 'Tech & Gadgets',
    subcategory: 'Audio',
    description: 'Wireless noise-canceling headphones with premium sound',
    image: '/api/placeholder/150/150',
    icon: <Headphones className="w-5 h-5" />,
    selected: false,
    tags: ['Audio', 'Wireless', 'Premium'],
    rating: 4.8,
    reviews: 267,
    inStock: true,
    weight: 0.25,
    dimensions: '18x15x8 cm',
    materials: ['Plastic', 'Metal', 'Leather']
  },

  // Home & Living
  {
    id: 'h1',
    name: 'Luxury Scented Candles',
    price: 399,
    originalPrice: 599,
    category: 'Home & Living',
    subcategory: 'Fragrance',
    description: 'Set of 3 luxury scented candles in various fragrances',
    image: '/api/placeholder/150/150',
    icon: <Flame className="w-5 h-5" />,
    selected: false,
    tags: ['Home', 'Fragrance', 'Luxury'],
    rating: 4.7,
    reviews: 234,
    inStock: true,
    isPopular: true,
    weight: 0.6,
    dimensions: '8x8x10 cm',
    materials: ['Soy Wax', 'Essential Oils']
  },
  {
    id: 'h2',
    name: 'Designer Photo Frame',
    price: 299,
    originalPrice: 399,
    category: 'Home & Living',
    subcategory: 'Decor',
    description: 'Elegant wooden photo frame with stand and wall mount',
    image: '/api/placeholder/150/150',
    icon: <ImageIcon className="w-5 h-5" />,
    selected: false,
    tags: ['Home', 'Decor', 'Memories'],
    rating: 4.5,
    reviews: 156,
    inStock: true,
    weight: 0.3,
    dimensions: '20x25x2 cm',
    materials: ['Wood', 'Glass']
  },
  {
    id: 'h3',
    name: 'Smart Lamp',
    price: 799,
    originalPrice: 999,
    category: 'Home & Living',
    subcategory: 'Lighting',
    description: 'LED smart lamp with app control and color changing',
    image: '/api/placeholder/150/150',
    icon: <Lightbulb className="w-5 h-5" />,
    selected: false,
    tags: ['Smart', 'Lighting', 'Modern'],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    isNew: true,
    weight: 0.5,
    dimensions: '15x15x25 cm',
    materials: ['Plastic', 'LED', 'Electronics']
  },
  {
    id: 'h4',
    name: 'Indoor Plant Kit',
    price: 449,
    originalPrice: 599,
    category: 'Home & Living',
    subcategory: 'Plants',
    description: 'Low-maintenance indoor plant with ceramic pot and care guide',
    image: '/api/placeholder/150/150',
    icon: <Leaf className="w-5 h-5" />,
    selected: false,
    tags: ['Plants', 'Eco-Friendly', 'Decor'],
    rating: 4.8,
    reviews: 278,
    inStock: true,
    weight: 1.2,
    dimensions: '15x15x20 cm',
    materials: ['Ceramic', 'Plant', 'Soil']
  },

  // Gourmet & Food
  {
    id: 'g1',
    name: 'Artisanal Chocolates',
    price: 499,
    originalPrice: 699,
    category: 'Gourmet & Food',
    subcategory: 'Sweets',
    description: 'Handcrafted premium chocolates in assorted flavors',
    image: '/api/placeholder/150/150',
    icon: <Cake className="w-5 h-5" />,
    selected: false,
    tags: ['Gourmet', 'Handmade', 'Luxury'],
    rating: 4.9,
    reviews: 312,
    inStock: true,
    isPopular: true,
    weight: 0.3,
    dimensions: '20x15x3 cm',
    materials: ['Chocolate', 'Natural Ingredients']
  },
  {
    id: 'g2',
    name: 'Exotic Tea Collection',
    price: 399,
    originalPrice: 499,
    category: 'Gourmet & Food',
    subcategory: 'Beverages',
    description: 'Collection of exotic tea blends from around the world',
    image: '/api/placeholder/150/150',
    icon: <Coffee className="w-5 h-5" />,
    selected: false,
    tags: ['Gourmet', 'Tea', 'International'],
    rating: 4.7,
    reviews: 234,
    inStock: true,
    weight: 0.2,
    dimensions: '15x10x5 cm',
    materials: ['Tea Leaves', 'Packaging']
  },
  {
    id: 'g3',
    name: 'Premium Coffee Sampler',
    price: 599,
    originalPrice: 799,
    category: 'Gourmet & Food',
    subcategory: 'Beverages',
    description: 'Premium coffee bean sampler pack from different regions',
    image: '/api/placeholder/150/150',
    icon: <Coffee className="w-5 h-5" />,
    selected: false,
    tags: ['Gourmet', 'Coffee', 'Premium'],
    rating: 4.8,
    reviews: 189,
    inStock: true,
    weight: 0.4,
    dimensions: '20x15x4 cm',
    materials: ['Coffee Beans', 'Packaging']
  },
  {
    id: 'g4',
    name: 'Gourmet Snack Box',
    price: 299,
    originalPrice: 399,
    category: 'Gourmet & Food',
    subcategory: 'Snacks',
    description: 'Assorted nuts and granola in premium glass jars',
    image: '/api/placeholder/150/150',
    icon: <Package className="w-5 h-5" />,
    selected: false,
    tags: ['Gourmet', 'Healthy', 'Snacks'],
    rating: 4.6,
    reviews: 167,
    inStock: true,
    weight: 0.5,
    dimensions: '18x12x8 cm',
    materials: ['Glass', 'Nuts', 'Granola']
  },

  // Experience & Activities
  {
    id: 'x1',
    name: 'Luxury Spa Voucher',
    price: 2499,
    originalPrice: 2999,
    category: 'Experience & Activities',
    subcategory: 'Wellness',
    description: 'Luxury spa treatment voucher for premium wellness center',
    image: '/api/placeholder/150/150',
    icon: <Sparkles className="w-5 h-5" />,
    selected: false,
    tags: ['Experience', 'Luxury', 'Wellness'],
    rating: 4.9,
    reviews: 145,
    inStock: true,
    isPopular: true,
    weight: 0.01,
    dimensions: 'Digital',
    materials: ['Voucher', 'Premium Packaging']
  },
  {
    id: 'x2',
    name: 'Pottery Workshop',
    price: 1999,
    originalPrice: 2499,
    category: 'Experience & Activities',
    subcategory: 'Creative',
    description: 'Hands-on pottery workshop with all materials included',
    image: '/api/placeholder/150/150',
    icon: <Palette className="w-5 h-5" />,
    selected: false,
    tags: ['Experience', 'Creative', 'Hands-on'],
    rating: 4.8,
    reviews: 123,
    inStock: true,
    weight: 0.01,
    dimensions: 'Voucher',
    materials: ['Workshop', 'Materials']
  },
  {
    id: 'x3',
    name: 'Premium Painting Kit',
    price: 899,
    originalPrice: 1199,
    category: 'Experience & Activities',
    subcategory: 'Creative',
    description: 'Complete painting kit with premium supplies and tutorial',
    image: '/api/placeholder/150/150',
    icon: <Palette className="w-5 h-5" />,
    selected: false,
    tags: ['Creative', 'Art', 'Complete Kit'],
    rating: 4.7,
    reviews: 198,
    inStock: true,
    isNew: true,
    weight: 1.5,
    dimensions: '30x20x5 cm',
    materials: ['Canvas', 'Paints', 'Brushes']
  },
  {
    id: 'x4',
    name: 'Wine Tasting Experience',
    price: 1499,
    originalPrice: 1899,
    category: 'Experience & Activities',
    subcategory: 'Food & Drink',
    description: 'Premium wine tasting experience for two people',
    image: '/api/placeholder/150/150',
    icon: <Wine className="w-5 h-5" />,
    selected: false,
    tags: ['Experience', 'Wine', 'Social'],
    rating: 4.8,
    reviews: 167,
    inStock: true,
    weight: 0.01,
    dimensions: 'Voucher',
    materials: ['Voucher', 'Premium Packaging']
  }
]

const wrappingPaperOptions: WrappingPaperOption[] = [
  {
    id: 'classic',
    name: 'Classic Gift Wrap',
    price: 0,
    description: 'Traditional gift wrapping paper',
    color: 'from-red-400 to-red-600',
    image: '/api/placeholder/100/100',
    isPremium: false,
    materials: 'Standard paper'
  },
  {
    id: 'premium',
    name: 'Premium Metallic',
    price: 49,
    description: 'Shiny metallic finish',
    color: 'from-yellow-400 to-yellow-600',
    image: '/api/placeholder/100/100',
    isPremium: true,
    materials: 'Metallic foil paper'
  },
  {
    id: 'eco-friendly',
    name: 'Eco-Friendly Kraft',
    price: 29,
    description: 'Recyclable brown paper with twine',
    color: 'from-amber-600 to-amber-800',
    image: '/api/placeholder/100/100',
    isPremium: false,
    materials: 'Recycled kraft paper'
  },
  {
    id: 'luxury',
    name: 'Luxury Satin',
    price: 99,
    description: 'Premium satin ribbon wrapping',
    color: 'from-purple-400 to-purple-600',
    image: '/api/placeholder/100/100',
    isPremium: true,
    materials: 'Satin fabric, premium paper'
  },
  {
    id: 'floral',
    name: 'Floral Pattern',
    price: 39,
    description: 'Beautiful floral design',
    color: 'from-pink-400 to-pink-600',
    image: '/api/placeholder/100/100',
    isPremium: false,
    materials: 'Printed premium paper'
  },
  {
    id: 'handmade',
    name: 'Handmade Paper',
    price: 79,
    description: 'Artisanal handmade paper with flower petals',
    color: 'from-green-400 to-teal-600',
    image: '/api/placeholder/100/100',
    isPremium: true,
    materials: 'Handmade paper, natural petals'
  }
]

const letterStyleOptions: LetterStyleOption[] = [
  {
    id: 'elegant',
    name: 'Elegant Cursive',
    price: 49,
    description: 'Classic cursive handwriting',
    style: 'font-cursive',
    preview: '/api/placeholder/100/60',
    turnaroundTime: '1-2 days'
  },
  {
    id: 'modern',
    name: 'Modern Print',
    price: 39,
    description: 'Clean, contemporary style',
    style: 'font-sans',
    preview: '/api/placeholder/100/60',
    turnaroundTime: 'Same day'
  },
  {
    id: 'calligraphy',
    name: 'Artistic Calligraphy',
    price: 79,
    description: 'Beautiful artistic lettering',
    style: 'font-serif',
    preview: '/api/placeholder/100/60',
    turnaroundTime: '2-3 days'
  },
  {
    id: 'playful',
    name: 'Playful Script',
    price: 59,
    description: 'Fun and casual handwriting',
    style: 'font-handwriting',
    preview: '/api/placeholder/100/60',
    turnaroundTime: '1-2 days'
  },
  {
    id: 'vintage',
    name: 'Vintage Typewriter',
    price: 69,
    description: 'Retro typewriter font style',
    style: 'font-mono',
    preview: '/api/placeholder/100/60',
    turnaroundTime: '1 day'
  }
]

const addOnOptions: AddOnOption[] = [
  {
    id: 'gift-tag',
    name: 'Personalized Gift Tag',
    price: 29,
    description: 'Custom gift tag with recipient name',
    category: 'Personalization',
    icon: <Tag className="w-5 h-5" />,
    isPopular: true
  },
  {
    id: 'confetti',
    name: 'Premium Confetti',
    price: 39,
    description: 'Biodegradable confetti mix',
    category: 'Decorations',
    icon: <Sparkles className="w-5 h-5" />,
    isPopular: false
  },
  {
    id: 'ribbon',
    name: 'Luxury Ribbon',
    price: 49,
    description: 'Premium satin ribbon bow',
    category: 'Decorations',
    icon: <Award className="w-5 h-5" />,
    isPopular: true
  },
  {
    id: 'card',
    name: 'Greeting Card',
    price: 59,
    description: 'Premium greeting card with envelope',
    category: 'Stationery',
    icon: <BookOpen className="w-5 h-5" />,
    isPopular: false
  },
  {
    id: 'flower',
    name: 'Dried Flowers',
    price: 79,
    description: 'Natural dried flower arrangement',
    category: 'Natural',
    icon: <Flower className="w-5 h-5" />,
    isPopular: true
  },
  {
    id: 'crystals',
    name: 'Healing Crystals',
    price: 99,
    description: 'Set of healing crystals with meaning card',
    category: 'Spiritual',
    icon: <Gem className="w-5 h-5" />,
    isPopular: false
  }
]

const budgetOptions: BudgetOption[] = [
  {
    id: 'budget',
    name: 'Budget Friendly',
    minPrice: 500,
    maxPrice: 1500,
    description: 'Perfect for thoughtful gifts on a budget',
    color: 'from-green-400 to-blue-500',
    recommendedItems: 4
  },
  {
    id: 'standard',
    name: 'Standard Choice',
    minPrice: 1500,
    maxPrice: 3000,
    description: 'Great balance of quality and value',
    color: 'from-blue-400 to-purple-500',
    recommendedItems: 6
  },
  {
    id: 'premium',
    name: 'Premium Luxury',
    minPrice: 3000,
    maxPrice: 6000,
    description: 'Premium items for special occasions',
    color: 'from-purple-400 to-pink-500',
    recommendedItems: 8
  },
  {
    id: 'luxury',
    name: 'Ultimate Luxury',
    minPrice: 6000,
    maxPrice: 15000,
    description: 'Ultimate luxury experience',
    color: 'from-yellow-400 to-orange-600',
    recommendedItems: 10
  },
  {
    id: 'eco',
    name: 'Eco Conscious',
    minPrice: 1000,
    maxPrice: 4000,
    description: 'Sustainable and eco-friendly items only',
    color: 'from-green-400 to-teal-500',
    recommendedItems: 5
  }
]

const corporateOptions: CorporateOption[] = [
  {
    id: 'basic',
    name: 'Basic Corporate',
    price: 0,
    description: 'Simple corporate branding options',
    includes: ['Company logo', 'Custom message', 'Bulk packaging'],
    minQuantity: 10
  },
  {
    id: 'premium',
    name: 'Premium Corporate',
    price: 499,
    description: 'Enhanced corporate gifting experience',
    includes: ['Premium branding', 'Custom packaging', 'Dedicated support', 'Bulk discounts'],
    minQuantity: 25
  },
  {
    id: 'luxury',
    name: 'Luxury Corporate',
    price: 999,
    description: 'Ultimate corporate gifting solution',
    includes: ['Luxury branding', 'Custom design', 'Priority shipping', 'Account manager', 'Gift tracking'],
    minQuantity: 50
  }
]

export default function CustomBoxPage() {
  // State management
  const [items, setItems] = useState<CustomBoxItem[]>(customBoxItems)
  const [selectedBoxSize, setSelectedBoxSize] = useState<string>('medium')
  const [selectedTheme, setSelectedTheme] = useState<string>('elegant')
  const [selectedBudget, setSelectedBudget] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [personalization, setPersonalization] = useState({
    name: '',
    message: '',
    packaging: 'standard',
    handwrittenNote: false,
    wrappingPaper: 'classic',
    letterStyle: 'elegant',
    addPhoto: false,
    photoMessage: '',
    occasion: '',
    recipientType: 'general'
  })
  const [corporateSettings, setCorporateSettings] = useState({
    isCorporate: false,
    companyName: '',
    logoText: '',
    employeeFocus: false,
    corporateTier: 'basic',
    quantity: 10
  })
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })
  const [deliveryOptions, setDeliveryOptions] = useState({
    deliveryDate: '',
    deliveryTime: 'standard',
    giftMessage: '',
    isGift: false,
    senderName: ''
  })
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [activeTab, setActiveTab] = useState('items')

  // Toggle item selection
  const toggleItem = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, selected: !item.selected }
        : item
    ))
  }

  // Toggle add-on selection
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  // Get selected items
  const getSelectedItems = () => items.filter(item => item.selected)

  // Calculate total price
  const getTotalPrice = () => {
    const itemsTotal = getSelectedItems().reduce((sum, item) => sum + item.price, 0)
    
    const boxSize = boxSizeOptions.find(b => b.id === selectedBoxSize)
    const boxPrice = boxSize?.basePrice || 299
    
    const theme = boxThemeOptions.find(t => t.id === selectedTheme)
    const themePrice = theme?.price || 0
    
    let packagingPrice = 0
    if (personalization.packaging === 'premium') packagingPrice = 99
    if (personalization.packaging === 'luxury') packagingPrice = 199
    
    const wrappingPaper = wrappingPaperOptions.find(w => w.id === personalization.wrappingPaper)
    const wrappingPrice = wrappingPaper?.price || 0
    
    const letterStyle = letterStyleOptions.find(l => l.id === personalization.letterStyle)
    const letterPrice = personalization.handwrittenNote ? (letterStyle?.price || 49) : 0
    
    const addOnsPrice = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOnOptions.find(a => a.id === addOnId)
      return sum + (addOn?.price || 0)
    }, 0)
    
    const corporatePrice = corporateSettings.isCorporate ? 
      (corporateOptions.find(c => c.id === corporateSettings.corporateTier)?.price || 0) : 0
    
    return itemsTotal + boxPrice + themePrice + packagingPrice + wrappingPrice + letterPrice + addOnsPrice + corporatePrice
  }

  // Get item count
  const getItemCount = () => getSelectedItems().length

  // Filter items based on category, search, and budget
  const filteredItems = items.filter(item => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
    
    // Search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    // Budget filter
    if (selectedBudget) {
      const budget = budgetOptions.find(b => b.id === selectedBudget)
      if (!budget) return true
      
      if (budget.id === 'eco') {
        return item.category === 'Eco-Friendly'
      }
      
      const currentTotal = getTotalPrice()
      return currentTotal <= budget.maxPrice
    }
    
    return true
  })

  // Check if more items can be added
  const canAddMore = () => {
    const boxSize = boxSizeOptions.find(b => b.id === selectedBoxSize)
    const maxItems = boxSize?.maxItems || 7
    
    if (selectedBudget) {
      const budget = budgetOptions.find(b => b.id === selectedBudget)
      if (!budget) return getItemCount() < maxItems
      
      const currentTotal = getTotalPrice()
      return getItemCount() < maxItems && currentTotal <= budget.maxPrice
    }
    
    return getItemCount() < maxItems
  }

  // Get budget status
  const getBudgetStatus = () => {
    if (!selectedBudget) return null
    const budget = budgetOptions.find(b => b.id === selectedBudget)
    if (!budget) return null
    
    const total = getTotalPrice()
    const count = getItemCount()
    const boxSize = boxSizeOptions.find(b => b.id === selectedBoxSize)
    const maxItems = boxSize?.maxItems || 7
    
    if (budget.id === 'eco') {
      return {
        valid: count >= 3 && count <= maxItems && total <= budget.maxPrice,
        message: count >= 3 && count <= maxItems && total <= budget.maxPrice 
          ? 'Perfect! Your eco box is ready.'
          : `Select 3-${maxItems} eco-friendly items (max ₹${budget.maxPrice})`
      }
    }
    
    return {
      valid: count >= 3 && count <= maxItems && total >= budget.minPrice && total <= budget.maxPrice,
      message: count >= 3 && count <= maxItems && total >= budget.minPrice && total <= budget.maxPrice
        ? 'Perfect! Your custom box is ready.'
        : `Select 3-${maxItems} items between ₹${budget.minPrice} - ₹${budget.maxPrice}`
    }
  }

  // Get completion progress
  const getCompletionProgress = () => {
    const selectedItems = getSelectedItems()
    const hasBoxSize = selectedBoxSize !== ''
    const hasTheme = selectedTheme !== ''
    const hasPersonalization = personalization.name || personalization.message
    const hasAddOns = selectedAddOns.length > 0
    
    let progress = 0
    if (selectedItems.length >= 3) progress += 40
    if (hasBoxSize) progress += 20
    if (hasTheme) progress += 15
    if (hasPersonalization) progress += 15
    if (hasAddOns) progress += 10
    
    return Math.min(progress, 100)
  }

  // Handle order submission
  const handleSubmitOrder = async () => {
    const budgetStatus = getBudgetStatus()
    if (budgetStatus && !budgetStatus.valid) {
      toast.error('Please complete your custom box selection according to the budget requirements')
      return
    }

    if (getSelectedItems().length < 3) {
      toast.error('Please select at least 3 items for your custom box')
      return
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      toast.error('Please fill in all required customer information')
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        items: getSelectedItems(),
        boxSize: selectedBoxSize,
        theme: selectedTheme,
        personalization,
        corporateOptions,
        deliveryOptions,
        addOns: selectedAddOns,
        totalPrice: getTotalPrice(),
        customerInfo
      }

      const response = await fetch('/api/custom-box', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (result.success) {
        setOrderSuccess(true)
        setOrderId(result.orderId)
        toast.success('Order placed successfully!')
        
        // Reset form
        setItems(items.map(item => ({ ...item, selected: false })))
        setSelectedBoxSize('medium')
        setSelectedTheme('elegant')
        setSelectedBudget('')
        setSelectedAddOns([])
        setPersonalization({
          name: '',
          message: '',
          packaging: 'standard',
          handwrittenNote: false,
          wrappingPaper: 'classic',
          letterStyle: 'elegant',
          addPhoto: false,
          photoMessage: '',
          occasion: '',
          recipientType: 'general'
        })
        setCorporateSettings({
          isCorporate: false,
          companyName: '',
          logoText: '',
          employeeFocus: false,
          corporateTier: 'basic',
          quantity: 10
        })
        setCustomerInfo({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: ''
        })
        setDeliveryOptions({
          deliveryDate: '',
          deliveryTime: 'standard',
          giftMessage: '',
          isGift: false,
          senderName: ''
        })
      } else {
        toast.error(result.error || 'Failed to create order')
      }
    } catch (error) {
      console.error('Order submission error:', error)
      toast.error('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.category))]

  // Budget status
  const budgetStatus = getBudgetStatus()
  const completionProgress = getCompletionProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Gift className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Build Your Perfect Gift Box
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create unforgettable gifts with our custom box builder. Choose from premium items, 
              add personal touches, and make every occasion special.
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Box Completion</span>
                <span>{completionProgress}%</span>
              </div>
              <Progress value={completionProgress} className="h-3" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Box Size and Theme Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Choose Your Box Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="size" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="size">Box Size</TabsTrigger>
                    <TabsTrigger value="theme">Theme</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="size" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {boxSizeOptions.map((box) => (
                        <div
                          key={box.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedBoxSize === box.id
                              ? 'border-orange-500 bg-orange-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                          }`}
                          onClick={() => setSelectedBoxSize(box.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${box.color} flex items-center justify-center`}>
                              {box.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{box.name}</h3>
                              <p className="text-sm text-gray-600">{box.dimensions}</p>
                              <p className="text-sm text-gray-500">{box.capacity}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-orange-600">
                              +₹{box.basePrice}
                            </span>
                            <span className="text-xs text-gray-500">
                              Max {box.maxItems} items
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="theme" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {boxThemeOptions.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedTheme === theme.id
                              ? 'border-orange-500 bg-orange-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                          }`}
                          onClick={() => setSelectedTheme(theme.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
                              {theme.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                              <p className="text-sm text-gray-600">{theme.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {theme.occasions.slice(0, 2).map((occasion) => (
                                  <Badge key={occasion} variant="outline" className="text-xs">
                                    {occasion}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          {theme.price > 0 && (
                            <div className="mt-3">
                              <span className="text-sm font-medium text-orange-600">
                                +₹{theme.price}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Budget Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Choose Your Budget (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgetOptions.map((budget) => (
                    <div
                      key={budget.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBudget === budget.id
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedBudget(budget.id)}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${budget.color} mb-2`}></div>
                      <h3 className="font-semibold text-gray-900">{budget.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{budget.description}</p>
                      <p className="text-sm font-medium text-orange-600">
                        {budget.minPrice === 0 ? `Up to ₹${budget.maxPrice}` : `₹${budget.minPrice} - ₹${budget.maxPrice}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: {budget.recommendedItems} items
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Your Items ({getItemCount()}/{boxSizeOptions.find(b => b.id === selectedBoxSize)?.maxItems || 7})</CardTitle>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.filter(cat => cat !== 'all').map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categories.filter(cat => cat !== 'all').map((category) => {
                    const categoryItems = filteredItems.filter(item => item.category === category)
                    if (categoryItems.length === 0) return null

                    return (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          {category === 'Personalized' && <Star className="w-5 h-5 text-purple-500" />}
                          {category === 'Eco-Friendly' && <Leaf className="w-5 h-5 text-green-500" />}
                          {category === 'Tech & Gadgets' && <Zap className="w-5 h-5 text-blue-500" />}
                          {category === 'Home & Living' && <Home className="w-5 h-5 text-orange-500" />}
                          {category === 'Gourmet & Food' && <Coffee className="w-5 h-5 text-amber-500" />}
                          {category === 'Experience & Activities' && <Sparkles className="w-5 h-5 text-pink-500" />}
                          {category}
                          <Badge variant="outline" className="text-xs">
                            {categoryItems.length} items
                          </Badge>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoryItems.map((item) => (
                            <div
                              key={item.id}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                item.selected
                                  ? 'border-orange-500 bg-orange-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                              } ${!canAddMore() && !item.selected ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => canAddMore() || item.selected ? toggleItem(item.id) : null}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                                  {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                                    </div>
                                    {item.selected && (
                                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    )}
                                  </div>
                                  
                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {item.tags.slice(0, 2).map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {item.isNew && (
                                      <Badge className="text-xs bg-green-500">
                                        New
                                      </Badge>
                                    )}
                                    {item.isPopular && (
                                      <Badge className="text-xs bg-orange-500">
                                        Popular
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  {/* Price and Rating */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-orange-600">₹{item.price.toLocaleString()}</span>
                                      {item.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                          ₹{item.originalPrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-xs text-gray-600">{item.rating}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Stock status */}
                                  {!item.inStock && (
                                    <Badge variant="destructive" className="text-xs mt-2">
                                      Out of Stock
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Premium Add-ons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addOnOptions.map((addOn) => (
                    <div
                      key={addOn.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddOns.includes(addOn.id)
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                          {addOn.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{addOn.name}</h4>
                            {selectedAddOns.includes(addOn.id) && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{addOn.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-orange-600">+₹{addOn.price}</span>
                            {addOn.isPopular && (
                              <Badge className="text-xs bg-orange-500">Popular</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Customization */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Your Custom Box
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    ₹{getTotalPrice().toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getItemCount()} items selected
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {boxSizeOptions.find(b => b.id === selectedBoxSize)?.name}
                  </div>
                </div>

                {budgetStatus && (
                  <div className={`p-3 rounded-lg text-center text-sm ${
                    budgetStatus.valid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {budgetStatus.message}
                  </div>
                )}

                {getSelectedItems().length > 0 && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <div className="font-medium text-sm text-gray-700 border-b pb-1">Selected Items:</div>
                    {getSelectedItems().map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate flex-1 mr-2">{item.name}</span>
                        <span className="font-medium text-orange-600">₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                    
                    {/* Box and Theme */}
                    <div className="font-medium text-sm text-gray-700 border-b pb-1 mt-3">Box & Theme:</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {boxSizeOptions.find(b => b.id === selectedBoxSize)?.name}
                      </span>
                      <span className="font-medium text-orange-600">
                        ₹{boxSizeOptions.find(b => b.id === selectedBoxSize)?.basePrice}
                      </span>
                    </div>
                    {selectedTheme !== 'elegant' && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">
                          {boxThemeOptions.find(t => t.id === selectedTheme)?.name}
                        </span>
                        <span className="font-medium text-orange-600">
                          ₹{boxThemeOptions.find(t => t.id === selectedTheme)?.price}
                        </span>
                      </div>
                    )}
                    
                    {/* Add-ons */}
                    {selectedAddOns.length > 0 && (
                      <>
                        <div className="font-medium text-sm text-gray-700 border-b pb-1 mt-3">Add-ons:</div>
                        {selectedAddOns.map((addOnId) => {
                          const addOn = addOnOptions.find(a => a.id === addOnId)
                          return (
                            <div key={addOnId} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{addOn?.name}</span>
                              <span className="font-medium text-orange-600">₹{addOn?.price}</span>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                )}

                <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      disabled={getSelectedItems().length < 3}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Complete Your Custom Box Order</DialogTitle>
                    </DialogHeader>
                    
                    {orderSuccess ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Successful!</h3>
                        <p className="text-gray-600 mb-4">
                          Your custom box order has been placed successfully.
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                          Order ID: <span className="font-mono font-medium">{orderId}</span>
                        </p>
                        <Button 
                          onClick={() => {
                            setIsCheckoutDialogOpen(false)
                            setOrderSuccess(false)
                          }}
                          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                        >
                          Create Another Box
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <Tabs defaultValue="summary" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="summary">Summary</TabsTrigger>
                            <TabsTrigger value="personalization">Personalize</TabsTrigger>
                            <TabsTrigger value="delivery">Delivery</TabsTrigger>
                            <TabsTrigger value="payment">Payment</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="summary" className="mt-6">
                            <div className="space-y-6">
                              {/* Order Summary */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <div className="text-2xl font-bold text-orange-600 mb-2">
                                    ₹{getTotalPrice().toLocaleString()}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-4">
                                    {getItemCount()} items selected
                                  </div>
                                  
                                  <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {getSelectedItems().map((item) => (
                                      <div key={item.id} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700">{item.name}</span>
                                        <span className="font-medium">₹{item.price.toLocaleString()}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="personalization" className="mt-6">
                            <div className="space-y-6">
                              <h3 className="text-lg font-semibold">Personalization Options</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <Label htmlFor="recipient-name">Recipient Name</Label>
                                  <Input
                                    id="recipient-name"
                                    placeholder="Enter recipient name..."
                                    value={personalization.name}
                                    onChange={(e) => setPersonalization({...personalization, name: e.target.value})}
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="occasion">Occasion</Label>
                                  <Select value={personalization.occasion} onValueChange={(value) => setPersonalization({...personalization, occasion: value})}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select occasion" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="birthday">Birthday</SelectItem>
                                      <SelectItem value="anniversary">Anniversary</SelectItem>
                                      <SelectItem value="wedding">Wedding</SelectItem>
                                      <SelectItem value="valentine">Valentine's Day</SelectItem>
                                      <SelectItem value="christmas">Christmas</SelectItem>
                                      <SelectItem value="new-year">New Year</SelectItem>
                                      <SelectItem value="graduation">Graduation</SelectItem>
                                      <SelectItem value="corporate">Corporate</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="gift-message">Gift Message</Label>
                                <Textarea
                                  id="gift-message"
                                  placeholder="Your personal message..."
                                  rows={3}
                                  value={personalization.message}
                                  onChange={(e) => setPersonalization({...personalization, message: e.target.value})}
                                />
                              </div>
                              
                              <div>
                                <Label>Gift Box Packaging</Label>
                                <Select value={personalization.packaging} onValueChange={(value) => setPersonalization({...personalization, packaging: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="standard">Standard Box (₹0)</SelectItem>
                                    <SelectItem value="premium">Premium Gift Box (₹99)</SelectItem>
                                    <SelectItem value="luxury">Luxury Packaging (₹199)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label>Wrapping Paper Style</Label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  {wrappingPaperOptions.map((paper) => (
                                    <div
                                      key={paper.id}
                                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        personalization.wrappingPaper === paper.id
                                          ? 'border-orange-500 bg-orange-50'
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                      onClick={() => setPersonalization({...personalization, wrappingPaper: paper.id})}
                                    >
                                      <div className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${paper.color}`}></div>
                                      <div className="text-sm font-medium">{paper.name}</div>
                                      <div className="text-xs text-gray-600">{paper.description}</div>
                                      <div className="text-xs font-medium text-orange-600">
                                        {paper.price === 0 ? 'Free' : `+₹${paper.price}`}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="handwritten"
                                  checked={personalization.handwrittenNote}
                                  onCheckedChange={(checked) => setPersonalization({...personalization, handwrittenNote: checked as boolean})}
                                />
                                <Label htmlFor="handwritten">Add handwritten letter</Label>
                              </div>
                              
                              {personalization.handwrittenNote && (
                                <div>
                                  <Label>Handwriting Style</Label>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {letterStyleOptions.map((style) => (
                                      <div
                                        key={style.id}
                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                          personalization.letterStyle === style.id
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setPersonalization({...personalization, letterStyle: style.id})}
                                      >
                                        <div className="text-sm font-medium">{style.name}</div>
                                        <div className="text-xs text-gray-600">{style.description}</div>
                                        <div className="text-xs font-medium text-orange-600">+₹{style.price}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="delivery" className="mt-6">
                            <div className="space-y-6">
                              <h3 className="text-lg font-semibold">Delivery Information</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="customer-name">Full Name *</Label>
                                  <Input
                                    id="customer-name"
                                    placeholder="Enter your full name"
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="customer-email">Email Address *</Label>
                                  <Input
                                    id="customer-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={customerInfo.email}
                                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Label htmlFor="customer-phone">Phone Number</Label>
                                  <Input
                                    id="customer-phone"
                                    placeholder="Enter phone number"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="customer-city">City *</Label>
                                  <Input
                                    id="customer-city"
                                    placeholder="Enter city"
                                    value={customerInfo.city}
                                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="customer-pincode">PIN Code *</Label>
                                  <Input
                                    id="customer-pincode"
                                    placeholder="Enter PIN code"
                                    value={customerInfo.pincode}
                                    onChange={(e) => setCustomerInfo({...customerInfo, pincode: e.target.value})}
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="customer-address">Delivery Address *</Label>
                                <Textarea
                                  id="customer-address"
                                  placeholder="Enter your complete delivery address"
                                  rows={3}
                                  value={customerInfo.address}
                                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                                  required
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="delivery-date">Preferred Delivery Date</Label>
                                  <Input
                                    id="delivery-date"
                                    type="date"
                                    value={deliveryOptions.deliveryDate}
                                    onChange={(e) => setDeliveryOptions({...deliveryOptions, deliveryDate: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="delivery-time">Delivery Time</Label>
                                  <Select value={deliveryOptions.deliveryTime} onValueChange={(value) => setDeliveryOptions({...deliveryOptions, deliveryTime: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                                      <SelectItem value="express">Express (1-2 days)</SelectItem>
                                      <SelectItem value="same-day">Same Day (extra charges)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="is-gift"
                                  checked={deliveryOptions.isGift}
                                  onCheckedChange={(checked) => setDeliveryOptions({...deliveryOptions, isGift: checked as boolean})}
                                />
                                <Label htmlFor="is-gift">This is a gift</Label>
                              </div>
                              
                              {deliveryOptions.isGift && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="sender-name">Your Name</Label>
                                    <Input
                                      id="sender-name"
                                      placeholder="Your name"
                                      value={deliveryOptions.senderName}
                                      onChange={(e) => setDeliveryOptions({...deliveryOptions, senderName: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="gift-message">Gift Message</Label>
                                    <Textarea
                                      id="gift-message"
                                      placeholder="Gift message for recipient"
                                      rows={2}
                                      value={deliveryOptions.giftMessage}
                                      onChange={(e) => setDeliveryOptions({...deliveryOptions, giftMessage: e.target.value})}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="payment" className="mt-6">
                            <div className="space-y-6">
                              <h3 className="text-lg font-semibold">Order Confirmation</h3>
                              
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Final Order Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Items ({getItemCount()}):</span>
                                    <span>₹{getSelectedItems().reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Box ({boxSizeOptions.find(b => b.id === selectedBoxSize)?.name}):</span>
                                    <span>₹{boxSizeOptions.find(b => b.id === selectedBoxSize)?.basePrice}</span>
                                  </div>
                                  {selectedTheme !== 'elegant' && (
                                    <div className="flex justify-between">
                                      <span>Theme ({boxThemeOptions.find(t => t.id === selectedTheme)?.name}):</span>
                                      <span>₹{boxThemeOptions.find(t => t.id === selectedTheme)?.price}</span>
                                    </div>
                                  )}
                                  {selectedAddOns.length > 0 && (
                                    <div className="flex justify-between">
                                      <span>Add-ons:</span>
                                      <span>₹{selectedAddOns.reduce((sum, addOnId) => {
                                        const addOn = addOnOptions.find(a => a.id === addOnId)
                                        return sum + (addOn?.price || 0)
                                      }, 0)}</span>
                                    </div>
                                  )}
                                  <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-semibold text-lg">
                                      <span>Total:</span>
                                      <span className="text-orange-600">₹{getTotalPrice().toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <h4 className="font-semibold">Customer Information</h4>
                                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                                  <div><strong>Name:</strong> {customerInfo.name}</div>
                                  <div><strong>Email:</strong> {customerInfo.email}</div>
                                  <div><strong>Phone:</strong> {customerInfo.phone}</div>
                                  <div><strong>Address:</strong> {customerInfo.address}</div>
                                  <div><strong>City:</strong> {customerInfo.city}</div>
                                  <div><strong>PIN Code:</strong> {customerInfo.pincode}</div>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setIsCheckoutDialogOpen(false)}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={handleSubmitOrder}
                                  disabled={isSubmitting || !customerInfo.name || !customerInfo.email || !customerInfo.address}
                                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                                >
                                  {isSubmitting ? 'Processing...' : 'Place Order'}
                                </Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Quick Personalization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="w-5 h-5" />
                  Quick Personalization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quick-name">Recipient Name</Label>
                  <Input
                    id="quick-name"
                    placeholder="For personalization..."
                    value={personalization.name}
                    onChange={(e) => setPersonalization({...personalization, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="quick-message">Quick Message</Label>
                  <Textarea
                    id="quick-message"
                    placeholder="Your message..."
                    rows={2}
                    value={personalization.message}
                    onChange={(e) => setPersonalization({...personalization, message: e.target.value})}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="quick-handwritten"
                    checked={personalization.handwrittenNote}
                    onCheckedChange={(checked) => setPersonalization({...personalization, handwrittenNote: checked as boolean})}
                  />
                  <Label htmlFor="quick-handwritten">Handwritten letter (+₹49)</Label>
                </div>
              </CardContent>
            </Card>

            {/* Corporate Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Corporate Gifting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="corporate"
                    checked={corporateSettings.isCorporate}
                    onCheckedChange={(checked) => setCorporateSettings({...corporateSettings, isCorporate: checked as boolean})}
                  />
                  <Label htmlFor="corporate">This is a corporate gift</Label>
                </div>

                {corporateSettings.isCorporate && (
                  <>
                    <div>
                      <Label>Corporate Tier</Label>
                      <div className="space-y-2 mt-2">
                        {corporateOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              corporateSettings.corporateTier === option.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setCorporateSettings({...corporateSettings, corporateTier: option.id})}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{option.name}</h4>
                                <p className="text-sm text-gray-600">{option.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Min quantity: {option.minQuantity}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-orange-600">
                                  {option.price === 0 ? 'Free' : `+₹${option.price}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        placeholder="Enter company name..."
                        value={corporateSettings.companyName}
                        onChange={(e) => setCorporateSettings({...corporateSettings, companyName: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logo-text">Logo/Brand Text</Label>
                      <Input
                        id="logo-text"
                        placeholder="Enter text for branding..."
                        value={corporateSettings.logoText}
                        onChange={(e) => setCorporateSettings({...corporateSettings, logoText: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min={corporateOptions.find(c => c.id === corporateSettings.corporateTier)?.minQuantity || 10}
                        value={corporateSettings.quantity}
                        onChange={(e) => setCorporateSettings({...corporateSettings, quantity: parseInt(e.target.value) || 10})}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="employee-focus"
                        checked={corporateSettings.employeeFocus}
                        onCheckedChange={(checked) => setCorporateSettings({...corporateSettings, employeeFocus: checked as boolean})}
                      />
                      <Label htmlFor="employee-focus">Employee-focused packaging</Label>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Our Custom Boxes?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On orders above ₹999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quality Guarantee</h4>
                      <p className="text-sm text-gray-600">Premium items guaranteed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Easy Returns</h4>
                      <p className="text-sm text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Fast Delivery</h4>
                      <p className="text-sm text-gray-600">Express delivery available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}