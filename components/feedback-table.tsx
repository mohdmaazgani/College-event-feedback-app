"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Filter, Search, SlidersHorizontal } from "lucide-react"
import { getFeedbackData } from "@/app/actions/feedback-actions"

export function FeedbackTable() {
  const [feedbackData, setFeedbackData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filterSentiment, setFilterSentiment] = useState<string | null>(null)
  const [filterEventType, setFilterEventType] = useState<string | null>(null)

  // Fetch feedback data
  useEffect(() => {
    async function loadFeedbackData() {
      try {
        setLoading(true)
        const data = await getFeedbackData()
        setFeedbackData(data)
      } catch (error) {
        console.error("Error loading feedback data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeedbackData()
  }, [])

  // Filter and sort the data
  const filteredData = feedbackData.filter((item) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedback.toLowerCase().includes(searchTerm.toLowerCase())

    // Sentiment filter
    const matchesSentiment = filterSentiment === null || item.sentiment === filterSentiment

    // Event type filter
    const matchesEventType = filterEventType === null || item.eventType === filterEventType

    return matchesSearch && matchesSentiment && matchesEventType
  })

  // Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    let aValue = a[sortField as keyof typeof a]
    let bValue = b[sortField as keyof typeof b]

    if (sortField === "timestamp") {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Positive</Badge>
      case "neutral":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Neutral</Badge>
      case "negative":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negative</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (loading) {
    return <div className="py-8 text-center">Loading feedback data...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search feedback..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Sentiment
                {filterSentiment && (
                  <Badge className="ml-2" variant="secondary">
                    {filterSentiment}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterSentiment(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterSentiment("positive")}>Positive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterSentiment("neutral")}>Neutral</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterSentiment("negative")}>Negative</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Event Type
                {filterEventType && (
                  <Badge className="ml-2" variant="secondary">
                    {filterEventType}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterEventType(null)}>All Types</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterEventType("academic")}>Academic</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterEventType("social")}>Social</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterEventType("cultural")}>Cultural</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterEventType("sports")}>Sports</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterEventType("club")}>Club</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterEventType("workshop")}>Workshop</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("timestamp")}>
                Date
                {sortField === "timestamp" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="inline h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                Rating
                {sortField === "rating" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="inline h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("sentiment")}>
                Sentiment
                {sortField === "sentiment" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="inline h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4 ml-1" />
                  ))}
              </TableHead>
              <TableHead>Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No feedback found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">{formatDate(item.timestamp)}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.eventName}
                    <Badge variant="outline" className="ml-2">
                      {item.eventType}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.rating}/5</TableCell>
                  <TableCell>
                    {getSentimentBadge(item.sentiment)}
                    <div className="text-xs text-gray-500 mt-1">Score: {item.sentimentScore.toFixed(2)}</div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    <div className="max-w-xs truncate" title={item.feedback}>
                      {item.feedback}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
