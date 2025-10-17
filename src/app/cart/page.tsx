'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cart'
import { Gift, Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function CartPage() {
  const router = useRouter()
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalItems, 
    getTotalPrice, 
    getOriginalTotalPrice, 
    getDiscount 
  } = useCartStore()
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    router.push('/checkout')
  }
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(id, newQuantity)
    }
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gift className="w-12 h-12 text-orange-500 opacity-50" />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeItem(item.id)
                            toast.success('Item removed from cart')
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-center min-w-[40px] text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Total: ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Continue Shopping */}
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{getOriginalTotalPrice().toLocaleString()}</span>
                </div>
                
                {/* Discount */}
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{getDiscount().toLocaleString()}</span>
                  </div>
                )}
                
                {/* Shipping */}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                
                {/* Divider */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-orange-600">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter promo code" 
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                {/* Clear Cart */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    clearCart()
                    toast.success('Cart cleared')
                  }}
                  className="w-full text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </Button>
                
                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 pt-4 border-t">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Secure Checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}