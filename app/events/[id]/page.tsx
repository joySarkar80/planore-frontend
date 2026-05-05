'use client'

import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MOCK_EVENTS, Event, Review } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  MoreVertical,
  Trash2,
  Edit2,
  UserX
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const [event, setEvent] = React.useState<Event | null>(null)
  const [newReview, setNewReview] = React.useState({ rating: 5, comment: '' })

  // Mock current user
  const currentUser = { id: "joy123", name: "Joy Sarkar" }

  React.useEffect(() => {
    const foundEvent = MOCK_EVENTS.find(e => e.id === eventId)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [eventId])

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    )
  }

  const isOwner = event.organizerId === currentUser.id
  const isJoined = event.participants.includes(currentUser.id)
  const isPending = event.pendingRequests.includes(currentUser.id)

  const renderActionButtons = () => {
    if (isOwner) {
      return (
        <div className="flex flex-col gap-3">
          <Link href={`/dashboard/events/edit/${event.id}`} className="w-full">
            <Button className="w-full bg-slate-900 h-12 rounded-xl font-bold">
              <Edit2 className="h-4 w-4 mr-2" /> Edit Event
            </Button>
          </Link>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-200 font-bold hover:bg-slate-50">
              Manage Requests
            </Button>
            <Button variant="outline" className="h-12 w-12 rounded-xl border-slate-200 text-red-500 hover:bg-red-50 p-0">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )
    }

    if (isJoined) {
      return (
        <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <div className="font-bold text-green-800">You&apos;re registered for this event!</div>
        </div>
      )
    }

    if (isPending) {
      return (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
          <Clock className="h-6 w-6 text-amber-600" />
          <div className="font-bold text-amber-800">Your request is pending approval.</div>
        </div>
      )
    }

    // Join login based on category
    switch (event.category) {
      case "Public Free":
        return (
          <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl font-extrabold text-lg shadow-lg shadow-indigo-100">
            Join Event for Free
          </Button>
        )
      case "Public Paid":
        return (
          <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl font-extrabold text-lg shadow-lg shadow-indigo-100">
            Pay ${event.fee} & Join
          </Button>
        )
      case "Private Free":
        return (
          <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl font-extrabold text-lg shadow-lg shadow-indigo-100">
            Request to Join
          </Button>
        )
      case "Private Paid":
        return (
          <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl font-extrabold text-lg shadow-lg shadow-indigo-100">
            Pay ${event.fee} & Request
          </Button>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Image / Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <div className="absolute top-6 left-6 z-10">
          <Button variant="ghost" className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/20" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5 mr-1" /> Back
          </Button>
        </div>
        <div className="absolute bottom-10 left-0 w-full z-10">
          <div className="container mx-auto px-4">
            <Badge className="bg-indigo-600 text-white mb-4 border-none shadow-md">
              {event.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-[2rem] shadow-xl border-none overflow-hidden bg-white">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Date</div>
                      <div className="text-lg font-bold text-slate-900">{event.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Time</div>
                      <div className="text-lg font-bold text-slate-900">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Location</div>
                      <div className="text-lg font-bold text-slate-900 truncate max-w-[200px]">{event.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Fee</div>
                      <div className="text-lg font-bold text-slate-900">{event.fee === 0 ? "Free Access" : `$${event.fee} per person`}</div>
                    </div>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">About this event</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
                  Reviews ({event.reviews.length})
                </h3>
              </div>

              {/* Add Review */}
              {!isOwner && isJoined && (
                <Card className="rounded-2xl border-indigo-100 bg-indigo-50/30 overflow-hidden">
                  <CardContent className="p-6">
                    <Label className="font-bold text-slate-700 mb-2 block">Leave a review</Label>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${newReview.rating >= star ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        />
                      ))}
                    </div>
                    <Textarea
                      placeholder="What did you think about the event?"
                      className="bg-white mb-4 rounded-xl border-slate-200"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                    <Button className="bg-indigo-600 text-white font-bold h-11 rounded-xl px-6">Submit Review</Button>
                  </CardContent>
                </Card>
              )}

              {event.reviews.length > 0 ? (
                <div className="space-y-4">
                  {event.reviews.map(review => (
                    <Card key={review.id} className="rounded-2xl border-slate-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                              <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">{review.userName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-slate-900">{review.userName}</div>
                              <div className="text-xs text-slate-400 font-medium">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-2xl border-dashed border-slate-300 bg-transparent">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No reviews yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="rounded-[2rem] shadow-2xl border-none overflow-hidden bg-white sticky top-24">
              <CardContent className="p-8">
                <div className="mb-8">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Registration</label>
                  {renderActionButtons()}
                </div>

                <Separator className="bg-slate-100 my-8" />

                <div className="space-y-6">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Organized By</label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-white shadow-lg shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xl">
                        {event.organizer[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-black text-slate-900 text-lg truncate">{event.organizer}</div>
                      <div className="text-sm font-bold text-indigo-600">Pro Organizer</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <div className="text-sm font-bold text-slate-400 mb-1">Participants</div>
                      <div className="text-xl font-black text-slate-900">{event.participants.length}</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <div className="text-sm font-bold text-slate-400 mb-1">Avg. Rating</div>
                      <div className="text-xl font-black text-slate-900">4.9</div>
                    </div>
                  </div>
                </div>

                {isOwner && (
                  <div className="mt-8 pt-8 border-t border-slate-100 border-dashed">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Owner Controls</span>
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200">
                        View All Participants
                      </Button>
                      <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200">
                        Export CSV Data
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Guidelines */}
            <Card className="rounded-[2rem] border-none bg-slate-900 text-white overflow-hidden p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-indigo-400" />
                </div>
                <h4 className="font-bold italic">Community Safety</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                All events on Evently are protected by our SecurePay system. Payments are held in escrow until the event successfully completes.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
