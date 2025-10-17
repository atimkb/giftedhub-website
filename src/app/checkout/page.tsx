'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { useCartStore } from '@/store/cart'
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  MapPin, 
  Phone, 
  Mail,
  User,
  Lock,
  CheckCircle,
  Clock,
  Gift,
  IndianRupee
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const router = useRouter()
  const {
    items,
    getTotalItems,
    getTotalPrice,
    getOriginalTotalPrice,
    getDiscount,
    clearCart
  } = useCartStore()

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Shipping Information
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Billing Information
    sameAsShipping: true,
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingPincode: ''
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'pincode', 'phone']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const requiredFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all payment details')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)
      toast.success('Payment successful!')
    }, 3000)
  }

  const handlePlaceOrder = () => {
    // In a real app, this would process the order and redirect to a confirmation page
    clearCart()
    toast.success('Order placed successfully!')
    router.push('/')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to proceed with checkout.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-orange-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <Badge variant="secondary">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Shipping', icon: MapPin },
              { step: 2, label: 'Payment', icon: CreditCard },
              { step: 3, label: 'Review', icon: CheckCircle }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= item.step 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  step >= item.step ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span>Shipping Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@email.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="John"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <Input
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <Input
                        value={formData.apartment}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        placeholder="Apt 4B"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <Input
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Mumbai"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <Input
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="Maharashtra"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PIN Code *
                        </label>
                        <Input
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          placeholder="400001"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    >
                      Continue to Payment
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                          maxLength={19}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <Input
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="password"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            className="pl-10"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <Input
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onCheckedChange={(checked) => handleInputChange('sameAsShipping', checked as boolean)}
                      />
                      <label htmlFor="sameAsShipping" className="text-sm text-gray-700">
                        Billing address same as shipping address
                      </label>
                    </div>

                    {!formData.sameAsShipping && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900">Billing Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Street Address *
                            </label>
                            <Input
                              value={formData.billingAddress}
                              onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                              placeholder="123 Main Street"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Apartment, suite, etc.
                            </label>
                            <Input
                              value={formData.billingApartment}
                              onChange={(e) => handleInputChange('billingApartment', e.target.value)}
                              placeholder="Apt 4B"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City *
                            </label>
                            <Input
                              value={formData.billingCity}
                              onChange={(e) => handleInputChange('billingCity', e.target.value)}
                              placeholder="Mumbai"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State *
                            </label>
                            <Input
                              value={formData.billingState}
                              onChange={(e) => handleInputChange('billingState', e.target.value)}
                              placeholder="Maharashtra"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            PIN Code *
                          </label>
                          <Input
                            value={formData.billingPincode}
                            onChange={(e) => handleInputChange('billingPincode', e.target.value)}
                            placeholder="400001"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      >
                        {isProcessing ? 'Processing...' : 'Review Order'}
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Order Review</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        <p className="text-gray-600">{formData.address}</p>
                        {formData.apartment && <p className="text-gray-600">{formData.apartment}</p>}
                        <p className="text-gray-600">{formData.city}, {formData.state} {formData.pincode}</p>
                        <p className="text-gray-600">{formData.phone}</p>
                        <p className="text-gray-600">{formData.email}</p>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{formData.cardName}</p>
                        <p className="text-gray-600">Card ending in •••• {formData.cardNumber.slice(-4)}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      >
                        Place Order
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{getOriginalTotalPrice().toLocaleString()}</span>
                    </div>
                    {getDiscount() > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{getDiscount().toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>₹0</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-orange-500" />
                      <span>Free shipping on orders above ₹999</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Estimated delivery: 3-5 business days</span>
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