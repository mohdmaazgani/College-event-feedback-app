"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { submitFeedback } from "@/app/actions/feedback-actions"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  eventType: z.string({
    required_error: "Please select an event type.",
  }),
  rating: z.number().min(1).max(5),
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
})

export default function SubmitFeedback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Get event name from URL if available
  const eventFromUrl = searchParams.get("event")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      eventName: eventFromUrl || "",
      eventType: "",
      rating: 3,
      feedback: "",
    },
  })

  // Update form when URL parameters change
  useEffect(() => {
    if (eventFromUrl) {
      form.setValue("eventName", eventFromUrl)
    }
  }, [eventFromUrl, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await submitFeedback(values)
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      })
      router.push("/thank-you")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-neon-pink neon-text">Submit Your Feedback</h1>
        <p className="text-gray-400">Help us improve campus events by sharing your experience</p>
      </div>

      <div className="neon-card p-6 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="neon-input text-white" />
                    </FormControl>
                    <FormMessage className="text-neon-pink" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} className="neon-input text-white" />
                    </FormControl>
                    <FormMessage className="text-neon-pink" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the event" {...field} className="neon-input text-white" />
                    </FormControl>
                    <FormMessage className="text-neon-pink" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="neon-input text-gray-300">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/90 border border-neon-purple/30 text-white">
                        <SelectItem value="academic" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Academic
                        </SelectItem>
                        <SelectItem value="social" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Social
                        </SelectItem>
                        <SelectItem value="cultural" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Cultural
                        </SelectItem>
                        <SelectItem value="sports" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Sports
                        </SelectItem>
                        <SelectItem value="club" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Club Activity
                        </SelectItem>
                        <SelectItem value="workshop" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Workshop
                        </SelectItem>
                        <SelectItem value="other" className="focus:bg-gray-800 focus:text-neon-cyan">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-neon-pink" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Rating (1-5)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Poor</span>
                        <span>Average</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-neon-cyan">Current rating: {field.value}</FormDescription>
                  <FormMessage className="text-neon-pink" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share your thoughts about the event..."
                      className="min-h-32 neon-input text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400">
                    Your feedback will be analyzed to help improve future events.
                  </FormDescription>
                  <FormMessage className="text-neon-pink" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full neon-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
