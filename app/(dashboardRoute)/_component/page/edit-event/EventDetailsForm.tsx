'use client'

import * as React from 'react'
import { Calendar, Clock, MapPin, Link as LinkIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

type FormData = {
    title: string
    date: string
    time: string
    venue: string
    eventLink: string
    description: string
    visibility: string
    fee: string
}

type EventDetailsFormProps = {
    formData: FormData
    errors: Record<string, string>
    onChange: (field: keyof FormData, value: string) => void
}

export default function EventDetailsForm({ formData, errors, onChange }: EventDetailsFormProps) {
    return (
        <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8 md:p-10 space-y-8">
            {/* TITLE */}
            <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Event Title</Label>
                <Input
                    placeholder="Design Systems Workshop"
                    className="h-14 bg-slate-50 border-none rounded-2xl text-lg font-bold"
                    value={formData.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    required
                />
                {errors.title && <p className="text-sm text-red-500 font-medium">{errors.title}</p>}
            </div>

            {/* DATE & TIME */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Date</Label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            type="date"
                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                            value={formData.date}
                            onChange={(e) => onChange('date', e.target.value)}
                            required
                        />
                    </div>
                    {errors.startAt && <p className="text-sm text-red-500 font-medium">{errors.startAt}</p>}
                </div>

                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Time</Label>
                    <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            type="time"
                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                            value={formData.time}
                            onChange={(e) => onChange('time', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* VENUE */}
            <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Venue</Label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder="Central Park"
                        className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                        value={formData.venue}
                        onChange={(e) => onChange('venue', e.target.value)}
                    />
                </div>
                {errors.venue && <p className="text-sm text-red-500 font-medium">{errors.venue}</p>}
            </div>

            {/* EVENT LINK */}
            <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Event Link</Label>
                <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder="https://zoom.us/j/123"
                        className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                        value={formData.eventLink}
                        onChange={(e) => onChange('eventLink', e.target.value)}
                    />
                </div>
                {errors.eventLink && <p className="text-sm text-red-500 font-medium">{errors.eventLink}</p>}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Description</Label>
                <Textarea
                    placeholder="Describe your event..."
                    className="min-h-[200px] bg-slate-50 border-none rounded-2xl p-6 font-medium text-lg"
                    value={formData.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    required
                />
                {errors.description && <p className="text-sm text-red-500 font-medium">{errors.description}</p>}
            </div>
        </Card>
    )
}