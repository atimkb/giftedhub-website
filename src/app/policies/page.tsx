import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Truck, 
  RotateCcw, 
  FileText, 
  CheckCircle, 
  Clock,
  Package,
  CreditCard,
  User,
  ArrowRight,
  Info
} from 'lucide-react'
import Link from 'next/link'

export default function PoliciesPage() {
  const policies = [
    {
      id: 'shipping',
      title: 'Shipping Policy',
      icon: Truck,
      description: 'Information about shipping methods, delivery times, and costs',
      content: [
        {
          heading: 'Shipping Methods',
          text: 'We offer several shipping options to meet your needs:\n• Standard Shipping: 3-5 business days\n• Express Shipping: 1-2 business days\n• Same Day Delivery: Available in select cities\n• International Shipping: Coming soon'
        },
        {
          heading: 'Shipping Costs',
          text: '• Free shipping on orders above ₹999\n• Standard shipping: ₹99 for orders below ₹999\n• Express shipping: ₹199\n• Same Day Delivery: ₹299 (available in Mumbai, Delhi, Bangalore, Hyderabad, Chennai)'
        },
        {
          heading: 'Order Processing',
          text: 'Orders are processed within 24 hours on business days. Orders placed after 2 PM or on weekends/holidays will be processed the next business day.'
        },
        {
          heading: 'Delivery Tracking',
          text: 'Once your order ships, you\'ll receive a tracking number via email. You can track your order in real-time through our website or the courier\'s website.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Return & Refund Policy',
      icon: RotateCcw,
      description: 'Our return policy and refund process',
      content: [
        {
          heading: 'Return Period',
          text: 'You can return most items within 30 days of delivery. Items must be unused, in their original packaging, and in resalable condition.'
        },
        {
          heading: 'Non-Returnable Items',
          text: 'The following items cannot be returned:\n• Personalized or customized products\n• Perishable items\n• Digital downloads or gift cards\n• Items marked as "Final Sale"'
        },
        {
          heading: 'Return Process',
          text: '1. Contact our customer service team\n2. Provide your order number and reason for return\n3. We\'ll send you a return shipping label\n4. Pack the item securely and ship it back\n5. Once received, we\'ll process your refund within 5-7 business days'
        },
        {
          heading: 'Refund Method',
          text: 'Refunds are issued to the original payment method. Please allow 5-7 business days for the refund to appear in your account after we receive the returned item.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: User,
      description: 'How we collect, use, and protect your personal information',
      content: [
        {
          heading: 'Information We Collect',
          text: 'We collect information you provide directly to us, such as:\n• Name, email address, and contact information\n• Shipping and billing addresses\n• Payment information\n• Order history and preferences'
        },
        {
          heading: 'How We Use Your Information',
          text: 'We use your information to:\n• Process and fulfill your orders\n• Communicate with you about your orders\n• Improve our products and services\n• Send promotional communications (with your consent)'
        },
        {
          heading: 'Information Sharing',
          text: 'We do not sell your personal information. We only share your information with:\n• Payment processors to complete transactions\n• Shipping partners to deliver your orders\n• Service providers who help us operate our business'
        },
        {
          heading: 'Data Security',
          text: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        }
      ]
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: FileText,
      description: 'Terms and conditions for using our website and services',
      content: [
        {
          heading: 'Account Registration',
          text: 'By creating an account, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.'
        },
        {
          heading: 'Product Information',
          text: 'We strive to provide accurate product information, but we do not guarantee that all information is complete, accurate, or current. Prices and availability are subject to change without notice.'
        },
        {
          heading: 'Order Acceptance',
          text: 'Your order constitutes an offer to purchase. We reserve the right to accept or decline your order for any reason, including but not limited to product availability, errors in pricing, or suspicious activity.'
        },
        {
          heading: 'Prohibited Activities',
          text: 'You may not use our website for any illegal purposes or to solicit others to perform or participate in any unlawful acts. You agree not to interfere with or disrupt the website or servers.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Policies & Terms
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We believe in transparency and clarity. Here you'll find all the information 
              about our policies, terms, and how we protect your interests.
            </p>
          </div>
        </div>
      </section>

      {/* Policies Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <policy.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{policy.description}</p>
                  <Button variant="outline" size="sm" className="group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-300">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {policies.map((policy, policyIndex) => (
          <section key={policy.id} className={`mb-16 ${policyIndex < policies.length - 1 ? 'pb-16 border-b border-gray-200' : ''}`}>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <policy.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{policy.title}</h2>
                <p className="text-lg text-gray-600">{policy.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {policy.content.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{section.heading}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-600 whitespace-pre-line">
                      {section.text}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Protection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to ensuring your shopping experience is safe, secure, and satisfactory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CreditCard className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                All transactions are encrypted and secure. We never store your payment information.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Package className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                All products are carefully curated and inspected for quality before shipping.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer service team is always available to help with any questions or concerns.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Info className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Policies?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our policies, terms, or how we protect your information, 
              please don't hesitate to reach out to our customer service team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Contact Support
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="lg">
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}