import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Gift, 
  Heart, 
  Star, 
  Users, 
  Award, 
  Truck, 
  Shield, 
  Leaf,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const coreValues = [
    {
      icon: Heart,
      title: 'Thoughtfulness',
      description: 'Prioritizing emotionally significant products that resonate with recipients.'
    },
    {
      icon: Star,
      title: 'Quality',
      description: 'Committing to excellence through collaborations with distinguished artisans and suppliers.'
    },
    {
      icon: Truck,
      title: 'Convenience',
      description: 'Ensuring a seamless and user-friendly online shopping and delivery experience.'
    },
    {
      icon: Lightbulb,
      title: 'Personalization',
      description: 'Providing bespoke customization options, including personalized notes and engraving services.'
    },
    {
      icon: Award,
      title: 'Joy',
      description: 'Dedicated to creating memorable and uplifting gifting experiences for both givers and receivers.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Adhering to eco-conscious practices through sustainable packaging and environmentally friendly items.'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Curated Products' },
    { number: '4.8/5', label: 'Average Rating' },
    { number: '24/7', label: 'Customer Support' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About The Gifted Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're more than just a gift shop. We're curators of joy, architects of surprise, 
              and believers in the power of thoughtful giving.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                Explore Our Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Gifted Hub was born from a simple belief: every gift should tell a story and 
                create lasting memories. Founded in 2024, we set out to revolutionize the gifting 
                experience by combining thoughtful curation with cutting-edge technology.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a small passion project has grown into India's premier destination 
                for curated gifts, serving thousands of customers who share our vision of making 
                every occasion special.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we work with artisans, designers, and creators from across the country to 
                bring you a carefully selected collection of gifts that are not just beautiful, but 
                meaningful too.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <Target className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-sm text-gray-600">
                  To streamline and enhance the gifting process through intuitive digital platforms 
                  and personalized delivery solutions.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-sm text-gray-600">
                  To be the preeminent online destination for thoughtful, personalized gifts, 
                  fostering meaningful connections worldwide.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product selection to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <value.icon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another e-commerce site. Here's what sets us apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Gift Recommendations</h3>
                  <p className="text-gray-600">Our intelligent gift finder analyzes preferences and occasions to suggest perfect matches.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hand-Curated Collection</h3>
                  <p className="text-gray-600">Every product is carefully selected by our team of gift experts for quality and uniqueness.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personalization Options</h3>
                  <p className="text-gray-600">From custom engravings to personalized messages, make every gift uniquely yours.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sustainable Practices</h3>
                  <p className="text-gray-600">We're committed to eco-friendly packaging and partnering with sustainable brands.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Exceptional Customer Service</h3>
                  <p className="text-gray-600">Our dedicated team is here to help you find the perfect gift, 24/7.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fast & Reliable Delivery</h3>
                  <p className="text-gray-600">Get your gifts delivered on time, every time, with our tracked shipping service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find the Perfect Gift?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy customers who have discovered the joy of giving with The Gifted Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/giftfinder">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                <Target className="w-5 h-5 mr-2" />
                Try Our Gift Finder
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                Browse Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}