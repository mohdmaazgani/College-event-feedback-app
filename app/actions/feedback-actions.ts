"use server"

import { revalidatePath } from "next/cache"
import { analyzeSentiment } from "@/lib/sentiment-analysis"

// This would be replaced with your actual database implementation
// For a real app, you would use Prisma, Drizzle, or another ORM
const feedbackData: any[] = []

export async function submitFeedback(data: any) {
  try {
    // Validate the input data
    if (!data.name || !data.email || !data.eventName || !data.eventType || !data.feedback) {
      throw new Error("Missing required fields")
    }

    // Analyze sentiment using our sentiment analysis function
    let sentimentResult
    try {
      sentimentResult = await analyzeSentiment(data.feedback)
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      // Provide default sentiment values if analysis fails
      sentimentResult = {
        sentiment: "neutral",
        score: 0.5,
        keywords: [],
      }
    }

    // Create feedback entry with sentiment analysis results
    const feedbackEntry = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      sentiment: sentimentResult.sentiment,
      sentimentScore: sentimentResult.score,
      keywords: sentimentResult.keywords,
    }

    // In a real app, you would save to a database here
    // For now, we'll use our in-memory array
    feedbackData.push(feedbackEntry)

    // Revalidate the admin dashboard path to show new data
    revalidatePath("/admin")

    return { success: true, data: feedbackEntry }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    throw new Error("Failed to submit feedback")
  }
}

export async function getFeedbackData() {
  try {
    // In a real app, you would fetch from a database
    // Example with Prisma:
    // const feedback = await prisma.feedback.findMany({
    //   orderBy: { timestamp: 'desc' }
    // });
    // return feedback;

    // For demo purposes, we'll return the in-memory data
    // or generate some sample data if none exists
    if (feedbackData.length === 0) {
      // Generate sample data for demonstration
      generateSampleData()
    }

    return feedbackData
  } catch (error) {
    console.error("Error fetching feedback data:", error)
    return []
  }
}

export async function getFeedbackStats() {
  try {
    const data = await getFeedbackData()

    if (!data.length) {
      return {
        totalFeedback: 0,
        averageRating: "0.0",
        sentimentCounts: { positive: 0, neutral: 0, negative: 0 },
        eventTypeCounts: {},
      }
    }

    const totalFeedback = data.length
    const averageRating = data.reduce((sum, item) => sum + item.rating, 0) / totalFeedback

    const sentimentCounts = data.reduce((counts: any, item) => {
      counts[item.sentiment] = (counts[item.sentiment] || 0) + 1
      return counts
    }, {})

    const eventTypeCounts = data.reduce((counts: any, item) => {
      counts[item.eventType] = (counts[item.eventType] || 0) + 1
      return counts
    }, {})

    return {
      totalFeedback,
      averageRating: averageRating.toFixed(1),
      sentimentCounts,
      eventTypeCounts,
    }
  } catch (error) {
    console.error("Error calculating feedback stats:", error)
    return {
      totalFeedback: 0,
      averageRating: "0.0",
      sentimentCounts: { positive: 0, neutral: 0, negative: 0 },
      eventTypeCounts: {},
    }
  }
}

// Helper function to generate sample data for demonstration
function generateSampleData() {
  const eventTypes = ["academic", "social", "cultural", "sports", "club", "workshop"]
  const sentiments = ["positive", "neutral", "negative"]

  for (let i = 0; i < 20; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
    const rating = Math.floor(Math.random() * 5) + 1

    // Create random date within the last 30 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    feedbackData.push({
      id: `sample-${i}`,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      eventName: `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event ${i + 1}`,
      eventType,
      rating,
      feedback: getSampleFeedback(sentiment),
      timestamp: date.toISOString(),
      sentiment,
      sentimentScore: getSentimentScore(sentiment),
      keywords: ["event", "campus", eventType],
    })
  }
}

function getSampleFeedback(sentiment: string) {
  if (sentiment === "positive") {
    return "I really enjoyed this event. The organization was excellent and I learned a lot. Would definitely attend again!"
  } else if (sentiment === "neutral") {
    return "The event was okay. Some parts were interesting, but others could use improvement. The venue was good though."
  } else {
    return "I was disappointed with this event. It was disorganized and didn't meet my expectations. The content wasn't relevant."
  }
}

function getSentimentScore(sentiment: string) {
  if (sentiment === "positive") return Math.random() * 0.5 + 0.5 // 0.5 to 1.0
  if (sentiment === "neutral") return Math.random() * 0.4 + 0.3 // 0.3 to 0.7
  return Math.random() * 0.3 // 0.0 to 0.3
}
