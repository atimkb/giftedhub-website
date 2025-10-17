'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())

  const navigation = [
    { name: 'Categories', href: '/categories' },
    { name: 'Gift Finder', href: '/giftfinder' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="The Gifted Hub" 
                className="h-30 w-auto drop-shadow-md hover:drop-shadow-lg transition-shadow duration-200"
                width="180"
                height="48"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart button */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-orange-500">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Sign In button */}
            <Button variant="outline" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}