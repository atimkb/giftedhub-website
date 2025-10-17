import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { featuredProducts } from '@/data/products'

export async function POST(request: NextRequest) {
  try {
    const { preferences } = await request.json()
    
    // Initialize ZAI SDK
    const zai = await ZAI.create()
    
    // Create a prompt for the AI to analyze preferences and recommend gifts
    const prompt = `
    You are an expert gift recommendation AI for The Gifted Hub, a premium curated gifting platform.
    
    Based on the following user preferences, recommend the most suitable gifts from our product catalog:
    
    User Preferences:
    - Recipient: ${preferences.recipient}
    - Occasion: ${preferences.occasion}
    - Relationship: ${preferences.relationship}
    - Interests: ${preferences.interests}
    - Budget Range: ₹${preferences.budget[0]} - ₹${preferences.budget[1]}
    - Personality: ${preferences.personality}
    
    Available Products:
    ${featuredProducts.map(product => `
    - ${product.name} (₹${product.price})
      Category: ${product.category}
      Description: ${product.description}
      Tags: ${product.tags?.join(', ') || 'N/A'}
      Rating: ${product.rating}/5 (${product.reviews} reviews)
    `).join('\n')}
    
    Please analyze these preferences and return:
    1. A list of the top 3-5 most suitable product IDs
    2. A brief explanation for each recommendation
    3. The reasoning behind your choices
    
    Format your response as JSON:
    {
      "recommendations": [
        {
          "productId": "product_id",
          "reason": "Brief explanation of why this gift is suitable",
          "score": 0.95
        }
      ],
      "analysis": "Overall analysis of the user's preferences and gift recommendations"
    }
    `
    
    // Get AI recommendations
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert gift recommendation AI. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
    
    const responseContent = completion.choices[0]?.message?.content
    
    if (!responseContent) {
      throw new Error('No response from AI')
    }
    
    // Parse the AI response
    let aiResponse
    try {
      aiResponse = JSON.parse(responseContent)
    } catch (error) {
      // If JSON parsing fails, return a fallback response
      return NextResponse.json({
        recommendations: getFallbackRecommendations(preferences),
        analysis: 'AI service temporarily unavailable. Showing filtered recommendations based on your preferences.',
        fallback: true
      })
    }
    
    // Map AI recommendations to full product objects
    const recommendedProducts = aiResponse.recommendations
      .map((rec: any) => {
        const product = featuredProducts.find(p => p.id === rec.productId)
        return product ? { ...product, reason: rec.reason, score: rec.score } : null
      })
      .filter(Boolean)
    
    return NextResponse.json({
      recommendations: recommendedProducts,
      analysis: aiResponse.analysis,
      fallback: false
    })
    
  } catch (error) {
    console.error('Gift finder API error:', error)
    
    // Return fallback recommendations
    const preferences = await request.json().catch(() => ({}))
    return NextResponse.json({
      recommendations: getFallbackRecommendations(preferences.preferences || {}),
      analysis: 'Service temporarily unavailable. Showing filtered recommendations.',
      fallback: true
    })
  }
}

// Fallback recommendation logic based on preferences
function getFallbackRecommendations(preferences: any) {
  let filtered = [...featuredProducts]
  
  // Budget filter
  if (preferences.budget) {
    filtered = filtered.filter(product => 
      product.price >= preferences.budget[0] && product.price <= preferences.budget[1]
    )
  }
  
  // Interest-based filtering
  if (preferences.interests) {
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
    
    const keywords = interestMap[preferences.interests] || []
    filtered = filtered.filter(product =>
      keywords.some(keyword => 
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )
    )
  }
  
  // Occasion-based filtering
  if (preferences.occasion === 'wedding') {
    filtered = filtered.filter(product => product.price > 1000)
  } else if (preferences.occasion === 'just-because') {
    filtered = filtered.filter(product => product.price < 2000)
  }
  
  // Sort by rating and limit results
  filtered.sort((a, b) => b.rating - a.rating)
  
  return filtered.slice(0, 5).map(product => ({
    ...product,
    reason: 'Based on your preferences and budget',
    score: 0.8
  }))
}