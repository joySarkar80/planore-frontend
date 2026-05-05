'use client'

import * as React from 'react'
import { MOCK_EVENTS, Review } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  MessageSquare, 
  Edit2, 
  Trash2, 
  Search,
  ExternalLink,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function MyReviewsPage() {
  // Mock filter: reviews by Joy
  const myReviews = MOCK_EVENTS.flatMap(event => 
    event.reviews.filter(r => r.userId === "joy123").map(r => ({ ...r, eventTitle: event.title, eventId: event.id }))
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Reviews</h1>
          <p className="text-slate-500 font-medium">Feedback you&apos;ve given for past events.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <Card key={review.id} className="rounded-2xl border-slate-200/60 bg-white shadow-sm overflow-hidden group">
              <CardContent className="p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    <Calendar className="h-3 w-3" /> {review.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{review.eventTitle}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-500' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <Link href={`/events/${review.eventId}`}>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-slate-400 hover:text-indigo-600 font-bold">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Event
                    </Button>
                  </Link>
                </div>
                
                <div className="flex-1 space-y-6">
                  <div className="p-6 bg-slate-50/50 rounded-[1.5rem] border border-slate-100 italic text-slate-600 font-medium leading-relaxed relative">
                    <MessageSquare className="absolute -top-3 -left-3 h-8 w-8 text-indigo-100" />
                    &quot;{review.comment}&quot;
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 px-4 rounded-xl font-bold border-slate-200">
                      <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit Review
                    </Button>
                    <Button variant="outline" className="h-10 px-4 rounded-xl font-bold border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-100">
                      <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/30">
            <MessageSquare className="h-16 w-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900">No reviews yet</h3>
            <p className="text-slate-500 mt-2 font-medium">You haven&apos;t reviewed any events yet.</p>
            <Link href="/events">
              <Button className="mt-8 bg-indigo-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-indigo-100">
                Explore Past Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
