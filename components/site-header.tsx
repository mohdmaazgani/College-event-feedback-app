"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()

  // Check if we're on the landing page
  const isLandingPage = pathname === "/"

  // Don't show the header on the landing page as it has its own navigation
  if (isLandingPage) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <span className="font-bold text-xl text-neon-pink neon-text">Campus Pulse</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/events"
            className={`transition-colors hover:text-neon-pink ${pathname === "/events" ? "text-neon-cyan" : "text-gray-400"}`}
          >
            Events
          </Link>
          <Link
            href="/submit"
            className={`transition-colors hover:text-neon-pink ${pathname === "/submit" ? "text-neon-cyan" : "text-gray-400"}`}
          >
            Submit Feedback
          </Link>
          <Link
            href="/admin"
            className={`transition-colors hover:text-neon-pink ${pathname === "/admin" ? "text-neon-cyan" : "text-gray-400"}`}
          >
            Admin Dashboard
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="default" size="sm" className="hidden md:flex neon-button">
              <Link href="/submit">Submit Feedback</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-neon-pink hover:bg-gray-800">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border border-neon-purple/30">
                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-neon-pink">
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-neon-pink">
                  <Link href="/events">Events</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-neon-pink">
                  <Link href="/submit">Submit Feedback</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-neon-pink">
                  <Link href="/admin">Admin Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
