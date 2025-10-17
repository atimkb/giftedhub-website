'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { ProductCard } from '@/components/product/product-card'
import { featuredProducts } from '@/data/products'
import { Product } from '@/types/product'
import { 
  Gift, 
  Heart, 
  Star, 
  Users, 
  Calendar, 
  DollarSign, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function GiftFinderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    recipient: '',
    occasion: '',
    relationship: '',
    interests: '',
    budget: [0, 5000],
    personality: ''
  })
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [isFinding, setIsFinding] = useState(false)
  
  const occasions = [
    { value: 'birthday', label: 'Birthday', icon: '🎂' },
    { value: 'anniversary', label: 'Anniversary', icon: '💝' },
    { value: 'wedding', label: 'Wedding', icon: '👰' },
    { value: 'graduation', label: 'Graduation', icon: '🎓' },
    { value: 'valentine', label: 'Valentine\'s Day', icon: '💕' },
    { value: 'christmas', label: 'Christmas', icon: '🎄' },
    { value: 'diwali', label: 'Diwali', icon: '🪔' },
    { value: 'just-because', label: 'Just Because', icon: '✨' }
  ]
  
  const recipients = [
    { value: 'partner', label: 'Partner/Spouse', icon: '💑' },
    { value: 'family', label: 'Family Member', icon: '👨‍👩‍👧‍👦' },
    { value: 'friend', label: 'Friend', icon: '👥' },
    { value: 'colleague', label: 'Colleague', icon: '💼' },
    { value: 'client', label: 'Client/Business', icon: '🤝' }
  ]
  
  const relationships = [
    { value: 'close', label: 'Very Close' },
    { value: 'moderate', label: 'Moderately Close' },
    { value: 'formal', label: 'Formal/Professional' }
  ]
  
  const interests = [
    'Wellness & Self-care',
    'Technology & Gadgets',
    'Art & Creativity',
    'Food & Cooking',
    'Travel & Adventure',
    'Books & Reading',
    'Fashion & Style',
    'Home & Garden',
    'Fitness & Sports',
    'Music & Entertainment'
  ]
  
  const personalities = [
    { value: 'adventurous', label: 'Adventurous & Outgoing' },
    { value: 'creative', label: 'Creative & Artistic' },
    { value: 'practical', label: 'Practical & Organized' },
    { value: 'romantic', label: 'Romantic & Sentimental' },
    { value: 'tech-savvy', label: 'Tech-Savvy & Modern' },
    { value: 'traditional', label: 'Traditional & Classic' }
  ]
  
  const updateAnswer = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }
  
  const findGifts = async () => {
    setIsFinding(true)
    
    // Simulate AI processing with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Filter products based on answers
    let filtered = [...featuredProducts]
    
    // Budget filter
    filtered = filtered.filter(product => 
      product.price >= answers.budget[0] && product.price <= answers.budget[1]
    )
    
    // Interest-based filtering (simplified)
    if (answers.interests) {
      const interestMap: Record<string, string[]> = {
        'Wellness & Self-care': ['Self-Care', 'Wellness'],
        'Technology & Gadgets': ['Tech', 'Gadget'],
        'Art & Creativity': ['Art', 'Creative', 'Handmade'],
        'Food & Cooking': ['Food', 'Cooking', 'Gourmet'],
        'Travel & Adventure': ['Travel', 'Adventure', 'Experience'],
        'Books & Reading': ['Books', 'Reading'],
        'Fashion & Style': ['Fashion', 'Jewelry', 'Style'],
        'Home & Garden': ['Home', 'Garden', 'Decor'],
        'Fitness & Sports': ['Fitness', 'Sports', 'Active'],
        'Music & Entertainment': ['Music', 'Entertainment']
      }
      
      const keywords = interestMap[answers.interests] || []
      filtered = filtered.filter(product =>
        keywords.some(keyword => 
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
        )
      )
    }
    
    // Occasion-based filtering
    if (answers.occasion === 'wedding') {
      filtered = filtered.filter(product => product.price > 1000)
    } else if (answers.occasion === 'just-because') {
      filtered = filtered.filter(product => product.price < 2000)
    }
    
    // Sort by relevance and limit results
    filtered.sort((a, b) => {
      // Prioritize featured products
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
    
    setRecommendations(filtered.slice(0, 6))
    setIsFinding(false)
    setStep(3)
    
    toast.success('Found perfect gifts for you!')
  }
  
  const resetFinder = () => {
    setStep(1)
    setAnswers({
      recipient: '',
      occasion: '',
      relationship: '',
      interests: '',
      budget: [0, 5000],
      personality: ''
    })
    setRecommendations([])
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Gift Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Answer a few questions and let our AI find the perfect gift for your special someone
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step > stepNumber ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Preferences</span>
            <span>Results</span>
          </div>
        </div>
        
        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tell us about the gift recipient
                </h2>
                
                {/* Recipient */}
                <div>
                  <label className="text-lg font-medium text-gray-900 mb-3 block">
                    Who are you shopping for?
                  </label>
                  <RadioGroup 
                    value={answers.recipient} 
                    onValueChange={(value) => updateAnswer('recipient', value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {recipients.map((recipient) => (
                      <div key={recipient.value} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value={recipient.value} id={recipient.value} />
                        <Label htmlFor={recipient.value} className="flex items-center space-x-2 cursor-pointer flex-1">
                          <span className="text-2xl">{recipient.icon}</span>
                          <span className="font-medium">{recipient.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Occasion */}
                <div>
                  <label className="text-lg font-medium text-gray-900 mb-3 block">
                    What's the occasion?
                  </label>
                  <RadioGroup 
                    value={answers.occasion} 
                    onValueChange={(value) => updateAnswer('occasion', value)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {occasions.map((occasion) => (
                      <div key={occasion.value} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value={occasion.value} id={occasion.value} />
                        <Label htmlFor={occasion.value} className="flex flex-col items-center cursor-pointer flex-1">
                          <span className="text-2xl mb-1">{occasion.icon}</span>
                          <span className="text-sm text-center">{occasion.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Relationship */}
                <div>
                  <label className="text-lg font-medium text-gray-900 mb-3 block">
                    How close is your relationship?
                  </label>
                  <RadioGroup 
                    value={answers.relationship} 
                    onValueChange={(value) => updateAnswer('relationship', value)}
                    className="flex flex-col space-y-3"
                  >
                    {relationships.map((relationship) => (
                      <div key={relationship.value} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value={relationship.value} id={relationship.value} />
                        <Label htmlFor={relationship.value} className="cursor-pointer flex-1">
                          {relationship.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!answers.recipient || !answers.occasion || !answers.relationship}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  size="lg"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tell us about their preferences
                </h2>
                
                {/* Interests */}
                <div>
                  <label className="text-lg font-medium text-gray-900 mb-3 block">
                    What are their main interests? (Choose one)
                  </label>
                  <Select value={answers.interests} onValueChange={(value) => updateAnswer('interests', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {interests.map((interest) => (
                        <SelectItem key={interest} value={interest}>
                          {interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Budget */}
                <div>
                  <label className="text-lg font-medium text-gray-900 mb-3 block">
                    What's your budget range?
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={answers.budget}
                      onValueChange={(value) => updateAnswer('budget', value)}
                      max={15000}
                      min={0}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{answers.budget[0].toLocaleString()}</span>
                      <span>₹{answers.budget[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Personality */}
                <div>
                  <label className="text-lg font-medium text-gray-900 mb-3 block">
                    Describe their personality
                  </label>
                  <RadioGroup 
                    value={answers.personality} 
                    onValueChange={(value) => updateAnswer('personality', value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {personalities.map((personality) => (
                      <div key={personality.value} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value={personality.value} id={personality.value} />
                        <Label htmlFor={personality.value} className="cursor-pointer flex-1">
                          {personality.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={findGifts}
                    disabled={isFinding}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    size="lg"
                  >
                    {isFinding ? (
                      <>
                        <Search className="w-4 h-4 mr-2 animate-spin" />
                        Finding Perfect Gifts...
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 mr-2" />
                        Find Gifts
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Perfect Gifts Found! 🎁
                  </h2>
                  <p className="text-gray-600">
                    Based on your preferences, here are our top recommendations
                  </p>
                </div>
                
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gift className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg mb-4">
                      No gifts found matching your criteria
                    </p>
                    <p className="text-gray-400 mb-6">
                      Try adjusting your budget or interests to find more options
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={resetFinder}
                    className="flex-1"
                  >
                    Start Over
                  </Button>
                  <Button 
                    onClick={() => router.push('/')}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    Browse All Products
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-sm text-gray-600">
                Our AI analyzes preferences to find the perfect match
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="font-semibold mb-2">Curated Selection</h3>
              <p className="text-sm text-gray-600">
                Only the highest quality gifts make it to our recommendations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="font-semibold mb-2">User-Approved</h3>
              <p className="text-sm text-gray-600">
                Based on thousands of successful gift matches
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}