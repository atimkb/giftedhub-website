import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface CustomBoxOrder {
  items: Array<{
    id: string
    name: string
    price: number
    category: string
  }>
  personalization: {
    name: string
    message: string
    packaging: string
    handwrittenNote: boolean
    wrappingPaper: string
    letterStyle: string
    addPhoto: boolean
    photoMessage: string
  }
  corporateOptions: {
    isCorporate: boolean
    companyName: string
    logoText: string
    employeeFocus: boolean
  }
  totalPrice: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData: CustomBoxOrder = await request.json()
    
    // Validate required fields
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item must be selected' },
        { status: 400 }
      )
    }
    
    if (!orderData.customerInfo || !orderData.customerInfo.email || !orderData.customerInfo.name) {
      return NextResponse.json(
        { error: 'Customer name and email are required' },
        { status: 400 }
      )
    }
    
    // Calculate custom box total price
    const itemsTotal = orderData.items.reduce((sum, item) => sum + item.price, 0)
    
    // Add packaging costs
    let packagingPrice = 0
    if (orderData.personalization.packaging === 'premium') packagingPrice = 99
    if (orderData.personalization.packaging === 'luxury') packagingPrice = 199
    
    // Add wrapping paper cost
    const wrappingPaperPrices: Record<string, number> = {
      'classic': 0,
      'premium': 49,
      'eco-friendly': 29,
      'luxury': 99,
      'floral': 39
    }
    const wrappingPrice = wrappingPaperPrices[orderData.personalization.wrappingPaper] || 0
    
    // Add handwritten letter cost
    const letterStylePrices: Record<string, number> = {
      'elegant': 49,
      'modern': 39,
      'calligraphy': 79,
      'playful': 59
    }
    const letterPrice = orderData.personalization.handwrittenNote 
      ? (letterStylePrices[orderData.personalization.letterStyle] || 49)
      : 0
    
    // Add photo cost
    const photoPrice = orderData.personalization.addPhoto ? 29 : 0
    
    const calculatedTotal = itemsTotal + packagingPrice + wrappingPrice + letterPrice + photoPrice
    
    // Verify the total price matches
    if (Math.abs(calculatedTotal - orderData.totalPrice) > 0.01) {
      return NextResponse.json(
        { error: 'Price calculation mismatch' },
        { status: 400 }
      )
    }
    
    // Generate order ID
    const orderId = `CBOX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Create order in database
    const order = await db.customBoxOrder.create({
      data: {
        orderId,
        items: orderData.items,
        personalization: orderData.personalization,
        corporateOptions: orderData.corporateOptions,
        totalPrice: orderData.totalPrice,
        customerInfo: orderData.customerInfo,
        status: 'pending',
        createdAt: new Date()
      }
    })
    
    // Return success response
    return NextResponse.json({
      success: true,
      orderId,
      order: {
        id: order.id,
        orderId: order.orderId,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt
      },
      message: 'Custom box order created successfully'
    })
    
  } catch (error) {
    console.error('Custom box order API error:', error)
    
    return NextResponse.json(
      { error: 'Failed to create custom box order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    
    if (orderId) {
      // Get specific order by order ID
      const order = await db.customBoxOrder.findFirst({
        where: { orderId }
      })
      
      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        order
      })
    } else {
      // Get all orders (for admin purposes)
      const orders = await db.customBoxOrder.findMany({
        orderBy: { createdAt: 'desc' }
      })
      
      return NextResponse.json({
        success: true,
        orders
      })
    }
    
  } catch (error) {
    console.error('Get custom box orders API error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}