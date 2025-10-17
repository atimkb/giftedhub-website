'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  Users, 
  Gift, 
  Calendar, 
  Star, 
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Award,
  Shield,
  Clock,
  Package,
  CreditCard,
  FileText
} from 'lucide-react'
import { toast } from 'sonner'

export default function CorporatePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    industry: '',
    requirements: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const corporatePackages = [
    {
      name: 'Starter Package',
      price: '₹5,000 - ₹25,000',
      description: 'Perfect for small teams and occasional gifting',
      features: [
        'Customized gift boxes',
        'Company branding',
        'Bulk discounts (10-15%)',
        'Standard delivery',
        'Basic customization'
      ],
      popular: false
    },
    {
      name: 'Professional Package',
      price: '₹25,000 - ₹1,00,000',
      description: 'Ideal for growing companies and regular gifting',
      features: [
        'Premium gift curation',
        'Advanced branding options',
        'Bulk discounts (15-25%)',
        'Express delivery',
        'Dedicated account manager',
        'Gift tracking portal'
      ],
      popular: true
    },
    {
      name: 'Enterprise Package',
      price: '₹1,00,000+',
      description: 'Comprehensive solution for large organizations',
      features: [
        'Bespoke gift creation',
        'Full branding integration',
        'Bulk discounts (25-40%)',
        'Priority delivery',
        '24/7 dedicated support',
        'Advanced analytics dashboard',
        'Multi-location delivery',
        'Custom packaging solutions'
      ],
      popular: false
    }
  ]

  const corporateBenefits = [
    {
      icon: TrendingUp,
      title: 'Employee Satisfaction',
      description: 'Boost morale and show appreciation with thoughtful gifts'
    },
    {
      icon: Award,
      title: 'Brand Recognition',
      description: 'Strengthen brand identity with customized corporate gifts'
    },
    {
      icon: Users,
      title: 'Client Relations',
      description: 'Build stronger relationships with clients and partners'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Premium products with our satisfaction guarantee'
    }
  ]

  const successStories = [
    {
      company: 'TechCorp Solutions',
      industry: 'Technology',
      employees: '500+',
      challenge: 'Needed employee recognition gifts for annual awards',
      solution: 'Customized tech accessories with company branding',
      result: '95% employee satisfaction rate'
    },
    {
      company: 'Global Finance Ltd',
      industry: 'Banking',
      employees: '1000+',
      challenge: 'Client appreciation gifts for festive season',
      solution: 'Premium gift boxes with personalized messages',
      result: '40% increase in client retention'
    },
    {
      company: 'HealthCare Plus',
      industry: 'Healthcare',
      employees: '200+',
      challenge: 'Welcome kits for new employees',
      solution: 'Curated wellness packages with company merchandise',
      result: 'Improved onboarding experience'
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Corporate inquiry submitted successfully! Our team will contact you within 24 hours.')
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      companySize: '',
      industry: '',
      requirements: '',
      budget: '',
      timeline: ''
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Corporate Gifting Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Elevate your corporate gifting strategy with our premium, customized solutions designed to strengthen relationships and build brand loyalty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setActiveTab('packages')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                size="lg"
              >
                View Packages
              </Button>
              <Button 
                onClick={() => setActiveTab('contact')}
                variant="outline" 
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            {/* Benefits Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Corporate Gifting?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Transform your corporate culture and business relationships with strategic gifting
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {corporateBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <benefit.icon className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                      <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Services Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Corporate Services</h2>
                <p className="text-lg text-gray-600">
                  Comprehensive gifting solutions tailored to your business needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gift className="w-5 h-5 text-orange-500" />
                      <span>Employee Recognition</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Performance awards</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Work anniversary gifts</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Welcome kits</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Holiday gifts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span>Client Relations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Business anniversary gifts</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Festival greetings</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Partnership celebrations</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Thank you gestures</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span>Event Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Conference giveaways</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Product launch events</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Trade show materials</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Corporate retreats</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
                <p className="text-lg text-gray-600">
                  Simple, streamlined, and stress-free corporate gifting
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Consultation</h3>
                  <p className="text-sm text-gray-600">Understand your requirements and objectives</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customization</h3>
                  <p className="text-sm text-gray-600">Create personalized gift solutions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Production</h3>
                  <p className="text-sm text-gray-600">Quality manufacturing and branding</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
                  <p className="text-sm text-gray-600">Timely delivery to multiple locations</p>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Corporate Packages</h2>
              <p className="text-lg text-gray-600">
                Choose the perfect package for your corporate gifting needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corporatePackages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'border-orange-500 border-2' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 hover:bg-orange-600">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <div className="text-2xl font-bold text-orange-600">{pkg.price}</div>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => setActiveTab('contact')}
                      className={`w-full ${pkg.popular ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Features */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Features Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Package className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Custom Packaging</h4>
                      <p className="text-sm text-gray-600">Branded boxes and wrapping</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Express Delivery</h4>
                      <p className="text-sm text-gray-600">Same-day delivery available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Flexible Payment</h4>
                      <p className="text-sm text-gray-600">Credit terms for businesses</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Detailed Reporting</h4>
                      <p className="text-sm text-gray-600">Analytics and insights</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Multi-location</h4>
                      <p className="text-sm text-gray-600">Nationwide delivery network</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-medium">Quality Guarantee</h4>
                      <p className="text-sm text-gray-600">Satisfaction guaranteed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-lg text-gray-600">
                See how we've helped businesses transform their gifting strategy
              </p>
            </div>

            <div className="space-y-8">
              {successStories.map((story, index) => (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <span>{story.industry}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{story.employees} employees</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Challenge</h4>
                        <p className="text-gray-600 text-sm">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Solution & Result</h4>
                        <p className="text-gray-600 text-sm mb-2">{story.solution}</p>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-medium">{story.result}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Get Started with Corporate Gifting</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-50">1-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance & Banking</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Estimated Budget</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5000-25000">₹5,000 - ₹25,000</SelectItem>
                            <SelectItem value="25000-100000">₹25,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="100000+">₹1,00,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (within 1 week)</SelectItem>
                            <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                            <SelectItem value="1-3-months">1-3 months</SelectItem>
                            <SelectItem value="3+months">3+ months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirements">Requirements & Special Instructions</Label>
                      <Textarea
                        id="requirements"
                        value={formData.requirements}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        rows={4}
                        placeholder="Tell us about your gifting needs, quantity, special requirements, etc."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Inquiry'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Contact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">corporate@thegiftedhub.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">+91 98765 43211</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Office</p>
                          <p className="text-gray-600">123 Gift Street, Mumbai, Maharashtra 400001</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Time</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Email inquiries</span>
                        <Badge variant="outline">Within 24 hours</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Phone calls</span>
                        <Badge variant="outline">Immediate</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Quote preparation</span>
                        <Badge variant="outline">2-3 business days</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Mumbai</Badge>
                      <Badge variant="outline">Delhi</Badge>
                      <Badge variant="outline">Bangalore</Badge>
                      <Badge variant="outline">Hyderabad</Badge>
                      <Badge variant="outline">Chennai</Badge>
                      <Badge variant="outline">Pune</Badge>
                      <Badge variant="outline">Ahmedabad</Badge>
                      <Badge variant="outline">Kolkata</Badge>
                      <Badge variant="outline">Pan India</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}