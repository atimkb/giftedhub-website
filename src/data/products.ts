import { Product, Category } from '@/types/product'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Individual Products',
    slug: 'individual-products',
    description: 'Quick, single-item gifts for every occasion',
    icon: '🎁',
    color: 'from-orange-400 to-pink-500'
  },
  {
    id: '2',
    name: 'Curated Gift Boxes',
    slug: 'curated-boxes',
    description: 'Ready-made hampers for special occasions',
    icon: '📦',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: '3',
    name: 'Custom Boxes',
    slug: 'custom-boxes',
    description: 'Build your own perfect gift combination',
    icon: '🛠️',
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: '4',
    name: 'Subscription Boxes',
    slug: 'subscription-boxes',
    description: 'Monthly surprises delivered to your door',
    icon: '📅',
    color: 'from-green-400 to-blue-500'
  }
]

// Individual Products
export const individualProducts: Product[] = [
  // Personalized Items
  {
    id: 'ip1',
    name: 'Personalized Photo Mug',
    price: 349,
    originalPrice: 449,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Custom ceramic mug with your favorite photo printed on it.',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    tags: ['Personalized', 'Best Seller', 'Everyday'],
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'ip2',
    name: 'Name-Engraved Pen',
    price: 599,
    originalPrice: 799,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Premium ballpoint pen with custom name engraving.',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    tags: ['Personalized', 'Luxury', 'Gift for Him'],
    featured: true
  },
  {
    id: 'ip3',
    name: 'Custom Diary',
    price: 449,
    originalPrice: 599,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Leather-bound diary with personalized name embossing.',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    tags: ['Personalized', 'Stationery', 'Professional'],
    featured: true
  },
  {
    id: 'ip4',
    name: 'Custom T-Shirt',
    price: 699,
    originalPrice: 899,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Premium cotton t-shirt with custom design or text.',
    rating: 4.5,
    reviews: 267,
    inStock: true,
    tags: ['Personalized', 'Fashion', 'Casual'],
    featured: true
  },
  {
    id: 'ip5',
    name: 'Personalized Phone Case',
    price: 399,
    originalPrice: 499,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Custom phone case with photos or personal text.',
    rating: 4.4,
    reviews: 345,
    inStock: true,
    tags: ['Personalized', 'Tech', 'Everyday'],
    featured: true
  },
  {
    id: 'ip6',
    name: 'Name Jewelry',
    price: 1299,
    originalPrice: 1599,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Elegant name necklace in sterling silver.',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    tags: ['Personalized', 'Jewelry', 'Luxury'],
    featured: true,
    badge: 'Luxury'
  },
  {
    id: 'ip7',
    name: 'Personalized Passport Cover',
    price: 299,
    originalPrice: 399,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Leather passport cover with name embossing.',
    rating: 4.6,
    reviews: 123,
    inStock: true,
    tags: ['Personalized', 'Travel', 'Leather'],
    featured: true
  },

  // Eco-Friendly Items
  {
    id: 'ie1',
    name: 'Bamboo Water Bottle',
    price: 499,
    originalPrice: 699,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Sustainable bamboo water bottle with leak-proof cap.',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    tags: ['Eco-Friendly', 'Sustainable', 'Everyday'],
    featured: true,
    badge: 'Eco-Friendly'
  },
  {
    id: 'ie2',
    name: 'Jute Tote Bag',
    price: 349,
    originalPrice: 449,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Stylish and durable jute tote bag for shopping.',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    tags: ['Eco-Friendly', 'Fashion', 'Sustainable'],
    featured: true
  },
  {
    id: 'ie3',
    name: 'Seed Cards',
    price: 149,
    originalPrice: 199,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Plantable seed paper greeting cards that grow into plants.',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ['Eco-Friendly', 'Stationery', 'Unique'],
    featured: true
  },
  {
    id: 'ie4',
    name: 'Recycled Notebook',
    price: 199,
    originalPrice: 299,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Notebook made from 100% recycled paper.',
    rating: 4.4,
    reviews: 189,
    inStock: true,
    tags: ['Eco-Friendly', 'Stationery', 'Sustainable'],
    featured: true
  },
  {
    id: 'ie5',
    name: 'Bamboo Cutlery Set',
    price: 299,
    originalPrice: 399,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Complete bamboo cutlery set with carrying case.',
    rating: 4.5,
    reviews: 267,
    inStock: true,
    tags: ['Eco-Friendly', 'Travel', 'Sustainable'],
    featured: true
  },

  // Desk & Lifestyle
  {
    id: 'id1',
    name: 'Premium Planner',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: '2025 leather-bound planner with monthly and weekly views.',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    tags: ['Desk & Lifestyle', 'Professional', 'Organization'],
    featured: true
  },
  {
    id: 'id2',
    name: 'Wireless Charger',
    price: 899,
    originalPrice: 1199,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Fast wireless charger compatible with all devices.',
    rating: 4.6,
    reviews: 345,
    inStock: true,
    tags: ['Desk & Lifestyle', 'Tech', 'Essential'],
    featured: true
  },
  {
    id: 'id3',
    name: 'Power Bank',
    price: 1299,
    originalPrice: 1599,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: '20000mAh power bank with fast charging capability.',
    rating: 4.7,
    reviews: 456,
    inStock: true,
    tags: ['Desk & Lifestyle', 'Tech', 'Travel'],
    featured: true
  },
  {
    id: 'id4',
    name: 'Bluetooth Tracker',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Smart Bluetooth tracker to find lost items.',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    tags: ['Desk & Lifestyle', 'Tech', 'Gadget'],
    featured: true
  },
  {
    id: 'id5',
    name: 'Premium Wallet',
    price: 1499,
    originalPrice: 1899,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Genuine leather wallet with RFID protection.',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    tags: ['Desk & Lifestyle', 'Luxury', 'Essential'],
    featured: true,
    badge: 'Luxury'
  },
  {
    id: 'id6',
    name: 'Designer Keychain',
    price: 299,
    originalPrice: 399,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Stylish keychain with premium finish.',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    tags: ['Desk & Lifestyle', 'Accessory', 'Everyday'],
    featured: true
  },

  // Home & Décor
  {
    id: 'ih1',
    name: 'Scented Candles',
    price: 399,
    originalPrice: 499,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Luxury scented candles in various fragrances.',
    rating: 4.7,
    reviews: 567,
    inStock: true,
    tags: ['Home & Décor', 'Aromatherapy', 'Relaxation'],
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'ih2',
    name: 'Photo Frame',
    price: 299,
    originalPrice: 399,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Elegant wooden photo frame for cherished memories.',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    tags: ['Home & Décor', 'Memories', 'Classic'],
    featured: true
  },
  {
    id: 'ih3',
    name: 'Lamp Shade',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Designer lamp shade to brighten any room.',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    tags: ['Home & Décor', 'Lighting', 'Modern'],
    featured: true
  },
  {
    id: 'ih4',
    name: 'Indoor Plant in Pot',
    price: 449,
    originalPrice: 599,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Low-maintenance indoor plant with decorative ceramic pot.',
    rating: 4.7,
    reviews: 345,
    inStock: true,
    tags: ['Home & Décor', 'Nature', 'Living'],
    featured: true
  },
  {
    id: 'ih5',
    name: 'Hand-painted Coasters',
    price: 349,
    originalPrice: 449,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Set of 4 hand-painted ceramic coasters.',
    rating: 4.8,
    reviews: 267,
    inStock: true,
    tags: ['Home & Décor', 'Handmade', 'Artisan'],
    featured: true
  },
  {
    id: 'ih6',
    name: 'Cushion Covers',
    price: 599,
    originalPrice: 799,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Set of 2 premium cushion covers with modern designs.',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    tags: ['Home & Décor', 'Comfort', 'Style'],
    featured: true
  },

  // Gourmet Treats
  {
    id: 'ig1',
    name: 'Artisanal Chocolates',
    price: 499,
    originalPrice: 649,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Handcrafted premium chocolates in assorted flavors.',
    rating: 4.9,
    reviews: 789,
    inStock: true,
    tags: ['Gourmet', 'Chocolate', 'Luxury'],
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'ig2',
    name: 'Exotic Teas',
    price: 399,
    originalPrice: 499,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Collection of exotic tea blends from around the world.',
    rating: 4.7,
    reviews: 456,
    inStock: true,
    tags: ['Gourmet', 'Tea', 'Wellness'],
    featured: true
  },
  {
    id: 'ig3',
    name: 'Coffee Samplers',
    price: 599,
    originalPrice: 799,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Premium coffee bean sampler pack from different regions.',
    rating: 4.8,
    reviews: 678,
    inStock: true,
    tags: ['Gourmet', 'Coffee', 'Premium'],
    featured: true
  },
  {
    id: 'ig4',
    name: 'Snack Jars',
    price: 299,
    originalPrice: 399,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Assorted nuts and granola in premium glass jars.',
    rating: 4.6,
    reviews: 345,
    inStock: true,
    tags: ['Gourmet', 'Snacks', 'Healthy'],
    featured: true
  },
  {
    id: 'ig5',
    name: 'Premium Cookies',
    price: 349,
    originalPrice: 449,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Handmade premium cookies with gourmet ingredients.',
    rating: 4.7,
    reviews: 567,
    inStock: true,
    tags: ['Gourmet', 'Baked', 'Sweet'],
    featured: true
  },

  // Experience Gifts
  {
    id: 'ix1',
    name: 'Spa Voucher',
    price: 2499,
    originalPrice: 2999,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Luxury spa treatment voucher for complete relaxation.',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    tags: ['Experience', 'Wellness', 'Luxury'],
    featured: true,
    badge: 'Luxury'
  },
  {
    id: 'ix2',
    name: 'Pottery Workshop',
    price: 1999,
    originalPrice: 2499,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Hands-on pottery workshop with expert guidance.',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    tags: ['Experience', 'Creative', 'Workshop'],
    featured: true
  },
  {
    id: 'ix3',
    name: 'Painting Kit',
    price: 899,
    originalPrice: 1199,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Complete painting kit with canvas, paints, and brushes.',
    rating: 4.6,
    reviews: 345,
    inStock: true,
    tags: ['Experience', 'Creative', 'DIY'],
    featured: true
  },
  {
    id: 'ix4',
    name: 'DIY Craft Kit',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Complete DIY craft kit with instructions and materials.',
    rating: 4.7,
    reviews: 456,
    inStock: true,
    tags: ['Experience', 'Creative', 'DIY'],
    featured: true
  },
  {
    id: 'ix5',
    name: 'Yoga Session',
    price: 1499,
    originalPrice: 1899,
    image: '/api/placeholder/300/300',
    category: 'Individual Products',
    description: 'Professional yoga session with certified instructor.',
    rating: 4.8,
    reviews: 267,
    inStock: true,
    tags: ['Experience', 'Wellness', 'Fitness'],
    featured: true
  }
]

// Curated Gift Boxes
export const curatedBoxes: Product[] = [
  {
    id: 'cb1',
    name: 'Self-Care Sanctuary',
    price: 2499,
    originalPrice: 2999,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Scented candle, bath salts, herbal tea, diary, silk eye mask',
    rating: 4.9,
    reviews: 456,
    inStock: true,
    tags: ['Self-Care', 'Wellness', 'Relaxation'],
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'cb2',
    name: 'Office Hustle Essentials',
    price: 2199,
    originalPrice: 2699,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Planner, premium pen, mug, coaster set, stress ball',
    rating: 4.7,
    reviews: 345,
    inStock: true,
    tags: ['Office', 'Professional', 'Productivity'],
    featured: true
  },
  {
    id: 'cb3',
    name: 'Celebration Treats',
    price: 1899,
    originalPrice: 2299,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Artisanal chocolates, sparkling juice, dry fruits, festive décor item',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    tags: ['Celebration', 'Party', 'Festive'],
    featured: true
  },
  {
    id: 'cb4',
    name: 'Romantic Moments',
    price: 2799,
    originalPrice: 3299,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Personalized photo frame, chocolates, scented candle, roses/flower soap',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    tags: ['Romantic', 'Love', 'Special'],
    featured: true,
    badge: 'Romantic'
  },
  {
    id: 'cb5',
    name: 'New Parent Box',
    price: 3299,
    originalPrice: 3799,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Baby blanket, organic baby lotion, plush toy, milestone cards',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    tags: ['Baby', 'New Parent', 'Essential'],
    featured: true
  },
  {
    id: 'cb6',
    name: 'Diwali Festive Hamper',
    price: 2999,
    originalPrice: 3499,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Traditional sweets, decorative diyas, candles, personalized greeting card',
    rating: 4.9,
    reviews: 678,
    inStock: true,
    tags: ['Festive', 'Diwali', 'Traditional'],
    featured: true,
    badge: 'Festive'
  },
  {
    id: 'cb7',
    name: 'Christmas Festive Hamper',
    price: 2799,
    originalPrice: 3299,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Christmas cookies, decorative ornaments, scented candle, personalized card',
    rating: 4.8,
    reviews: 456,
    inStock: true,
    tags: ['Festive', 'Christmas', 'Holiday'],
    featured: true
  },
  {
    id: 'cb8',
    name: 'Rakhi Festive Hamper',
    price: 1999,
    originalPrice: 2499,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Designer rakhi, sweets, chocolates, personalized greeting card',
    rating: 4.7,
    reviews: 345,
    inStock: true,
    tags: ['Festive', 'Rakhi', 'Sibling'],
    featured: true
  },
  {
    id: 'cb9',
    name: 'Corporate Thank You Box',
    price: 2499,
    originalPrice: 2999,
    image: '/api/placeholder/300/300',
    category: 'Curated Gift Boxes',
    description: 'Branded stationery, artisanal coffee, gourmet snacks, customized notebook',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    tags: ['Corporate', 'Business', 'Professional'],
    featured: true
  }
]

// Subscription Boxes
export const subscriptionBoxes: Product[] = [
  {
    id: 'sb1',
    name: 'Book Lovers\' Box',
    price: 899,
    originalPrice: 1199,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'Trending book, bookmark, coffee/tea, snack',
    rating: 4.8,
    reviews: 789,
    inStock: true,
    tags: ['Books', 'Reading', 'Monthly'],
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'sb2',
    name: 'Plant Parents\' Box',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'Indoor plant, ceramic pot, care card',
    rating: 4.7,
    reviews: 678,
    inStock: true,
    tags: ['Plants', 'Nature', 'Monthly'],
    featured: true
  },
  {
    id: 'sb3',
    name: 'Gourmet Food Box',
    price: 999,
    originalPrice: 1299,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'Chocolates, exotic spices, teas, honey jars',
    rating: 4.9,
    reviews: 890,
    inStock: true,
    tags: ['Gourmet', 'Food', 'Monthly'],
    featured: true,
    badge: 'Premium'
  },
  {
    id: 'sb4',
    name: 'Wellness & Self-Care Box',
    price: 1299,
    originalPrice: 1599,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'Essential oils, sheet masks, candles, herbal teas',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    tags: ['Wellness', 'Self-Care', 'Monthly'],
    featured: true
  },
  {
    id: 'sb5',
    name: 'Corporate Employee Engagement Box',
    price: 1499,
    originalPrice: 1899,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'Quarterly motivational hampers with stationery, snacks, self-care items',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    tags: ['Corporate', 'Employee', 'Quarterly'],
    featured: true
  },
  {
    id: 'sb6',
    name: 'Kids\' Creativity Box',
    price: 699,
    originalPrice: 899,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'DIY craft kits, puzzles, coloring sets, educational toys',
    rating: 4.9,
    reviews: 456,
    inStock: true,
    tags: ['Kids', 'Creative', 'Educational'],
    featured: true,
    badge: 'Kids Favorite'
  },
  {
    id: 'sb7',
    name: 'Eco-Friendly Lifestyle Box',
    price: 799,
    originalPrice: 999,
    image: '/api/placeholder/300/300',
    category: 'Subscription Boxes',
    description: 'Bamboo toothbrush, jute tote, recycled stationery, organic soap',
    rating: 4.8,
    reviews: 678,
    inStock: true,
    tags: ['Eco-Friendly', 'Sustainable', 'Monthly'],
    featured: true
  }
]

// Featured products for homepage (mix of all categories)
export const featuredProducts: Product[] = [
  individualProducts[0], // Personalized Photo Mug
  individualProducts[5], // Name Jewelry
  individualProducts[10], // Premium Planner
  individualProducts[15], // Scented Candles
  individualProducts[20], // Artisanal Chocolates
  curatedBoxes[0], // Self-Care Sanctuary
  curatedBoxes[3], // Romantic Moments
  subscriptionBoxes[0], // Book Lovers' Box
]

export const features = [
  {
    title: 'Free Shipping',
    description: 'Free shipping on all orders above ₹999',
    icon: '🚚'
  },
  {
    title: 'Secure Payment',
    description: '100% secure payment processing',
    icon: '🔒'
  },
  {
    title: '24/7 Support',
    description: 'Round the clock customer support',
    icon: '📞'
  }
]