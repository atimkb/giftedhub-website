// Centralized fallback image URLs
export const FALLBACK_IMAGES = {
  main: 'https://images.unsplash.com/photo-1523315238856-4f1b0e9e1b9f?q=80&w=300&h=300&auto=format&fit=crop',
  thumbnails: [
    'https://images.unsplash.com/photo-1523315238856-4f1b0e9e1b9f?q=80&w=300&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=300&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?q=80&w=300&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585464039168-7a26ba7b0421?q=80&w=300&h=300&auto=format&fit=crop'
  ]
} as const

// Common image transformation options
export const IMAGE_OPTIONS = {
  width: 300,
  height: 300,
  quality: 80,
  fit: 'crop'
} as const