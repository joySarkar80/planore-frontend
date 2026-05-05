'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Lock, 
  DollarSign,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    isPublic: 'true',
    fee: '0',
    imageUrl: 'https://picsum.photos/seed/event/800/600'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would hit an API
    console.log('Submitting:', formData)
    router.push('/dashboard/events')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create New Event</h1>
          <p className="text-slate-500 font-medium">Fill in the details to launch your next experience.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8 md:p-10 space-y-8">
              <div className="space-y-4">
                <Label htmlFor="title" className="text-sm font-bold uppercase tracking-widest text-slate-400">Event Title</Label>
                <Input 
                  id="title"
                  placeholder="e.g. Design Systems Workshop 2025" 
                  className="h-14 bg-slate-50 border-none rounded-2xl text-lg font-bold"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="date" className="text-sm font-bold uppercase tracking-widest text-slate-400">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                      id="date"
                      type="date" 
                      className="h-14 pl-12 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="time" className="text-sm font-bold uppercase tracking-widest text-slate-400">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                      id="time"
                      type="time" 
                      className="h-14 pl-12 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="venue" className="text-sm font-bold uppercase tracking-widest text-slate-400">Venue / Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input 
                    id="venue"
                    placeholder="e.g. Central Park, NY or Zoom Link" 
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="description" className="text-sm font-bold uppercase tracking-widest text-slate-400">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your event, agenda, and what attendees should expect..." 
                  className="min-h-[200px] bg-slate-50 border-none rounded-2xl p-6 font-medium text-lg leading-relaxed"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
            </Card>
          </div>

          {/* Settings & Privacy */}
          <div className="space-y-8">
            <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">
              <h3 className="text-xl font-black text-slate-900 mb-8">Privacy & Fee</h3>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Accessibility</Label>
                  <Tabs value={formData.isPublic} onValueChange={(v) => setFormData({...formData, isPublic: v})} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-slate-50 rounded-2xl">
                      <TabsTrigger value="true" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Public
                      </TabsTrigger>
                      <TabsTrigger value="false" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold flex items-center gap-2">
                        <Lock className="h-4 w-4" /> Private
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="text-xs text-slate-400 font-medium px-2 italic">
                    {formData.isPublic === 'true' 
                      ? "Anyone can find and join this event." 
                      : "Only invited users or approved requests can join."}
                  </p>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="fee" className="text-sm font-bold uppercase tracking-widest text-slate-400">Registration Fee ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                      id="fee"
                      type="number" 
                      min="0"
                      className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-black text-xl"
                      value={formData.fee}
                      onChange={(e) => setFormData({...formData, fee: e.target.value})}
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-medium px-2 italic">Set to 0 for a free event.</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Event Banner</Label>
                  <div className="aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors">
                     <ImageIcon className="h-8 w-8 mb-2" />
                     <span className="text-xs font-bold">Upload Image</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-16 rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-100">
              Launch Event
            </Button>
            
            <p className="text-center text-xs text-slate-400 font-bold px-8 leading-relaxed italic">
              By clicking &quot;Launch Event&quot;, you agree to our Terms of Host Service and secure payment processing policies.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
