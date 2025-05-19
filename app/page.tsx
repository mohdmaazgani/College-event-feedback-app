import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ChevronRight, BarChart3, MessageSquare, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 neon-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-black border border-neon-pink text-neon-pink hover:bg-black/50 text-sm py-1 px-3">
              Student Voice Matters
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight neon-text bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue">
              Transform Campus Events With Your Feedback
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Share your thoughts, see the impact, and help shape the future of campus activities through powerful
              sentiment analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="neon-button text-white">
                <Link href="/submit">Submit Feedback</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
              >
                <Link href="/events">Browse Events</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 h-20 bottom-0 top-auto"></div>
            <div className="neon-border bg-black/60 backdrop-blur-sm rounded-t-xl p-4 shadow-2xl">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Dashboard Preview"
                className="rounded-t-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black border border-neon-cyan text-neon-cyan hover:bg-black/50">
              Key Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text text-white">
              Why Students & Administrators Love Campus Pulse
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform makes it easy to collect, analyze, and act on student feedback for campus events and
              activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-neon-pink" />}
              title="Easy Feedback Submission"
              description="Simple, intuitive forms make it quick for students to share their thoughts on events and activities."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-neon-cyan" />}
              title="Sentiment Analysis"
              description="Advanced AI analyzes feedback to identify positive, negative, and neutral sentiments automatically."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-neon-green" />}
              title="Insightful Analytics"
              description="Visual dashboards help administrators identify trends and areas for improvement."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-neon-yellow" />}
              title="Community Building"
              description="Foster a stronger campus community by showing students their feedback matters."
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-neon-lime" />}
              title="Event Improvement"
              description="Make data-driven decisions to enhance future campus events and activities."
            />
            <FeatureCard
              icon={<ChevronRight className="h-10 w-10 text-neon-blue" />}
              title="Actionable Insights"
              description="Convert student feedback into concrete action items for event organizers."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black border border-neon-green text-neon-green hover:bg-black/50">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text text-white">How Campus Pulse Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our streamlined process makes it easy to collect and analyze student feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="1"
              title="Attend an Event"
              description="Participate in campus events, club activities, or workshops."
            />
            <StepCard
              number="2"
              title="Submit Feedback"
              description="Share your thoughts, ratings, and suggestions through our simple form."
            />
            <StepCard
              number="3"
              title="See the Impact"
              description="Organizers review analyzed feedback and improve future events."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black border border-neon-yellow text-neon-yellow hover:bg-black/50">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text text-white">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Students and administrators alike are seeing the benefits of data-driven event planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Campus Pulse has transformed how we plan our club events. The sentiment analysis helps us understand what students really want."
              author="Jamie Chen"
              role="Student Club President"
            />
            <TestimonialCard
              quote="As an administrator, I can now make data-driven decisions about which events to fund and how to improve them."
              author="Dr. Sarah Williams"
              role="Director of Student Activities"
            />
            <TestimonialCard
              quote="I love being able to share my thoughts and see that organizers are actually listening and making changes based on feedback."
              author="Michael Rodriguez"
              role="Undergraduate Student"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StatCard number="500+" label="Events Analyzed" color="pink" />
            <StatCard number="10,000+" label="Feedback Submissions" color="cyan" />
            <StatCard number="85%" label="Positive Sentiment Rate" color="green" />
            <StatCard number="92%" label="Student Satisfaction" color="yellow" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black border border-neon-lime text-neon-lime hover:bg-black/50">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about Campus Pulse.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqCard
              question="Is my feedback anonymous?"
              answer="While we collect your name and email for verification purposes, administrators only see aggregated data and sentiment analysis in reports. Your individual feedback remains confidential."
            />
            <FaqCard
              question="How is sentiment analysis performed?"
              answer="We use advanced natural language processing (NLP) techniques to analyze the text of your feedback, identifying positive, negative, and neutral sentiments automatically."
            />
            <FaqCard
              question="Can I see feedback from other students?"
              answer="Currently, feedback is only visible to event organizers and administrators. However, we're working on a feature to share anonymized, aggregated feedback with the student body."
            />
            <FaqCard
              question="How do I know my feedback makes a difference?"
              answer="Event organizers are required to review feedback and document actions taken in response. Many also post 'You Said, We Did' updates after events."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text">Ready to Make Your Voice Heard?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of students who are shaping the future of campus events and activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="neon-button text-white">
              <Link href="/submit">Submit Feedback</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
            >
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-neon-pink text-lg font-semibold mb-4 neon-text">Campus Pulse</h3>
              <p className="text-sm">Transforming campus events through student feedback and sentiment analysis.</p>
            </div>
            <div>
              <h4 className="text-white text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-neon-pink transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-neon-pink transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-neon-pink transition-colors">
                    Submit Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-neon-pink transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-neon-cyan transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neon-cyan transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neon-cyan transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neon-cyan transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm">Subscribe to our newsletter for updates on new features and events.</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-black/50 border border-neon-purple/30 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-neon-pink/50 text-sm w-full"
                />
                <Button className="rounded-l-none neon-button">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} Campus Pulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for feature cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="neon-card hover:translate-y-[-5px] transition-all duration-300">
      <CardContent className="p-6">
        <div className="mb-4 rounded-full bg-black/60 border border-neon-purple/20 w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

// Component for step cards
function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 animate-pulse">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

// Component for testimonial cards
function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="neon-card">
      <CardContent className="p-6">
        <svg className="h-8 w-8 text-neon-pink mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-300 mb-4">{quote}</p>
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-neon-blue text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Component for stat cards
function StatCard({ number, label, color }: { number: string; label: string; color: string }) {
  const colorClass = `text-neon-${color}`

  return (
    <div className="text-center p-6 rounded-lg neon-card">
      <p className={`text-4xl font-bold ${colorClass} mb-2 neon-text`}>{number}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  )
}

// Component for FAQ cards
function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <Card className="neon-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-neon-cyan">{question}</h3>
        <p className="text-gray-400">{answer}</p>
      </CardContent>
    </Card>
  )
}
