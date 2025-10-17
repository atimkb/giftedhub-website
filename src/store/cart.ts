import { create } from 'zustand'
import { CartItem } from '@/types/product'

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getOriginalTotalPrice: () => number
  getDiscount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item, quantity = 1) => {
    const existingItem = get().items.find((i) => i.id === item.id)
    
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        ),
      }))
    } else {
      set((state) => ({
        items: [...state.items, { ...item, quantity }],
      }))
    }
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }))
  },
  
  clearCart: () => {
    set({ items: [] })
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  
  getOriginalTotalPrice: () => {
    return get().items.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price
      return total + (originalPrice * item.quantity)
    }, 0)
  },
  
  getDiscount: () => {
    return get().getOriginalTotalPrice() - get().getTotalPrice()
  },
}))