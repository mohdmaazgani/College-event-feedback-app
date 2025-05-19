import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full flex items-center justify-center mb-6 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-neon-pink neon-text">Thank You!</h1>
      <p className="text-xl text-gray-300 max-w-md mb-8">
        Your feedback has been submitted successfully. We appreciate your input!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="neon-button">
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
          <Link href="/submit">Submit Another Feedback</Link>
        </Button>
      </div>
    </div>
  )
}
