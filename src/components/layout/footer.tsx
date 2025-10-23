import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.png" 
                alt="The Gifted Hub" 
                className="h-30 w-auto drop-shadow-lg brightness-110"
                width="240"
                height="64"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Discover perfect gifts for every occasion. We curate the finest selection of gifts, experiences, and subscription boxes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/curated-boxes" className="text-gray-300 hover:text-white transition-colors">
                  Curated Gift Boxes
                </Link>
              </li>
              <li>
                <Link href="/custom-box" className="text-gray-300 hover:text-white transition-colors">
                  Custom Gift Boxes
                </Link>
              </li>
              <li>
                <Link href="/individual-products" className="text-gray-300 hover:text-white transition-colors">
                  Individual Products
                </Link>
              </li>
              <li>
                <Link href="/subscription-boxes" className="text-gray-300 hover:text-white transition-colors">
                  Subscription Boxes
                </Link>
              </li>
              <li>
                <Link href="/giftfinder" className="text-gray-300 hover:text-white transition-colors">
                  Gift Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-gray-300 hover:text-white transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="text-gray-300 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/policies/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@thegiftedhub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  123 Gift Street,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 The Gifted Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}