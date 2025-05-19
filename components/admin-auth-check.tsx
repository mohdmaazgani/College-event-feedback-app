"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, AlertCircle } from "lucide-react"

// In a real app, this would be handled by a proper auth system like NextAuth.js or Clerk
// This is just a simple demo implementation
export function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem("admin-auth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Demo password - in a real app, use proper authentication
    if (password === "admin123") {
      localStorage.setItem("admin-auth", "true")
      setIsAuthenticated(true)
      setError("")
    } else {
      setAttempts(attempts + 1)
      setError(`Invalid password. ${attempts >= 2 ? "Hint: try 'admin123'" : "Please try again."}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-pink mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md neon-card">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full flex items-center justify-center animate-pulse">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-neon-pink neon-text">Admin Login</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Please enter your password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center neon-input text-white"
                  />
                  {error && (
                    <Alert variant="destructive" className="mt-2 bg-black/60 border border-red-500/50 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full neon-button">
                Login
              </Button>
            </CardFooter>
          </form>
          <div className="px-6 pb-6 text-center text-sm text-gray-500">
            <p>For demo purposes, use the password: "admin123"</p>
            <p className="mt-1">In a production app, this would use a proper authentication system.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-black/80 border-b border-neon-purple/20 p-4 flex justify-between items-center">
        <h2 className="font-semibold text-neon-pink neon-text">Admin Dashboard</h2>
        <Button
          variant="outline"
          size="sm"
          className="border-neon-pink text-neon-pink hover:bg-neon-pink/10"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      {children}
    </div>
  )
}
