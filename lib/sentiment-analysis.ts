import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// This function integrates with Python for sentiment analysis
// In a production app, you might use a Python microservice or serverless function
export async function analyzeSentiment(text: string) {
  try {
    // For demo purposes, we'll use a simple algorithm to analyze sentiment
    // In a real app, you would call a Python service using TextBlob or VADER
    return simpleSentimentAnalysis(text)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    // Return a default response if analysis fails
    return {
      sentiment: "neutral",
      score: 0.5,
      keywords: [],
    }
  }
}

// Simple sentiment analysis function for demo purposes
function simpleSentimentAnalysis(text: string) {
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 3)
  const keywords = [...new Set(words)].slice(0, 5)

  // Simple sentiment analysis based on keywords
  const positiveWords = [
    "great",
    "excellent",
    "good",
    "enjoyed",
    "amazing",
    "helpful",
    "love",
    "best",
    "wonderful",
    "fantastic",
  ]
  const negativeWords = [
    "bad",
    "poor",
    "terrible",
    "disappointed",
    "waste",
    "boring",
    "worst",
    "awful",
    "horrible",
    "dislike",
  ]

  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  let sentiment = "neutral"
  let score = 0.5

  if (positiveCount > negativeCount) {
    sentiment = "positive"
    score = 0.5 + (positiveCount / (positiveCount + negativeCount + 1)) * 0.5
  } else if (negativeCount > positiveCount) {
    sentiment = "negative"
    score = 0.5 - (negativeCount / (positiveCount + negativeCount + 1)) * 0.5
  }

  return {
    sentiment,
    score,
    keywords,
  }
}

// This function demonstrates how you would integrate with the AI SDK
// Only used if the simple analysis isn't sufficient
export async function aiSentimentAnalysis(text: string) {
  try {
    const prompt = `
      Analyze the sentiment of the following feedback text. 
      Return a JSON object with the following properties:
      - sentiment: "positive", "neutral", or "negative"
      - score: a number between 0 and 1 representing the sentiment score (0 being very negative, 1 being very positive)
      - keywords: an array of up to 5 important keywords from the text
      
      Feedback text: "${text}"
    `

    const { text: result } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt,
    })

    // Parse the JSON response
    try {
      return JSON.parse(result)
    } catch (e) {
      // Fallback in case the response isn't valid JSON
      console.error("Failed to parse sentiment analysis result:", e)
      return {
        sentiment: "neutral",
        score: 0.5,
        keywords: [],
      }
    }
  } catch (error) {
    console.error("Error analyzing sentiment with AI:", error)
    // Return a default response if analysis fails
    return {
      sentiment: "neutral",
      score: 0.5,
      keywords: [],
    }
  }
}
