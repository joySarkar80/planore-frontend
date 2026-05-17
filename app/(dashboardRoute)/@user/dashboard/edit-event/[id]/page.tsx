'use client'

import * as React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import {
    ArrowLeft, Calendar, Clock, MapPin, Globe, Lock, DollarSign, Image as ImageIcon, Loader2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

import { getEventById, updateEvent } from '@/services/events/clientEvent'

export default function EditEventPage() {
    const router = useRouter()
    const params = useParams()
    const eventId = params.id as string

    const [loading, setLoading] = React.useState(true)
    const [updating, setUpdating] = React.useState(false)

    const [formData, setFormData] = React.useState({
        title: "",
        date: "",
        time: "",
        venue: "",
        eventLink: "",
        description: "",
        visibility: "PUBLIC",
        fee: "0",
    });

    // ইভেন্ট ডেটা ফেচ করে ফর্মে পপুলেট করা
    React.useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const response = await getEventById(eventId)
                if (response.success && response.data) {
                    const event = response.data

                    // ISO String থেকে Date এবং Time আলাদা করা (Local Timezone অনুযায়ী)
                    const dateObj = new Date(event.startAt)
                    const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
                    const formattedTime = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`

                    setFormData({
                        title: event.title,
                        date: formattedDate,
                        time: formattedTime,
                        venue: event.venue || "",
                        eventLink: event.eventLink || "",
                        description: event.description,
                        visibility: event.visibility,
                        fee: event.registrationFee.toString(),
                    })
                }
            } catch (error: any) {
                toast.error(error.message || "Failed to load event details")
            } finally {
                setLoading(false)
            }
        }

        if (eventId) fetchSingleEvent()
    }, [eventId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setUpdating(true)

            // Date & Time মার্চ করে আবার ISO তে কনভার্ট করা
            const startAt = new Date(`${formData.date}T${formData.time}`).toISOString()

            const payload = {
                title: formData.title,
                description: formData.description,
                startAt,
                venue: formData.venue || undefined,
                eventLink: formData.eventLink || undefined,
                visibility: formData.visibility,
                registrationFee: Number(formData.fee),
            }

            const result = await updateEvent(eventId, payload)

            if (result.success) {
                toast.success("Event updated successfully")
                router.push("/dashboard/my-events")
                router.refresh()
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong while updating")
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <p className="font-bold text-slate-500">Loading event details...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Event</h1>
                    <p className="text-slate-500 font-medium">Update the details of your event.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8 md:p-10 space-y-8">
                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Event Title</Label>
                                <Input
                                    placeholder="Design Systems Workshop"
                                    className="h-14 bg-slate-50 border-none rounded-2xl text-lg font-bold"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            type="date"
                                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            type="time"
                                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Venue</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                    <Input
                                        placeholder="Central Park"
                                        className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                                        value={formData.venue}
                                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Description</Label>
                                <Textarea
                                    placeholder="Describe your event..."
                                    className="min-h-[200px] bg-slate-50 border-none rounded-2xl p-6 font-medium text-lg"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">
                        <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">
                            <h3 className="text-xl font-black text-slate-900 mb-8">Privacy & Fee</h3>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Visibility</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, visibility: "PUBLIC" })}
                                            className={`h-14 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-2 font-bold ${formData.visibility === "PUBLIC" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"}`}
                                        >
                                            <Globe className="h-4 w-4" /> Public
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, visibility: "PRIVATE" })}
                                            className={`h-14 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-2 font-bold ${formData.visibility === "PRIVATE" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"}`}
                                        >
                                            <Lock className="h-4 w-4" /> Private
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Registration Fee (BDT)</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            type="number"
                                            min="0"
                                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-black text-xl"
                                            value={formData.fee}
                                            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Button type="submit" disabled={updating} className="w-full bg-indigo-600 hover:bg-indigo-700 h-16 rounded-[2rem] font-black text-xl">
                            {updating ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...</> : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}