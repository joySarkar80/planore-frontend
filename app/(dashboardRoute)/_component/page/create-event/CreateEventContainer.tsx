'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createEvent } from '@/services/events'
import CreateEventForm, { CreateEventFormData } from './CreateEventForm'
import CreateEventSidebar from './CreateEventSidebar'

const INITIAL_FORM: CreateEventFormData = {
    title: '',
    date: '',
    time: '',
    venue: '',
    eventLink: '',
    description: '',
    visibility: '',
    fee: '0',
}

export default function CreateEventContainer() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [formData, setFormData] = React.useState<CreateEventFormData>(INITIAL_FORM)

    const handleChange = (partial: Partial<CreateEventFormData>) => {
        setFormData((prev) => ({ ...prev, ...partial }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})

        try {
            const startAt = new Date(
                `${formData.date}T${formData.time}`
            ).toISOString()

            const payload = {
                title: formData.title,
                description: formData.description,
                startAt,
                venue: formData.venue || undefined,
                eventLink: formData.eventLink || undefined,
                visibility: formData.visibility as 'PUBLIC' | 'PRIVATE',
                registrationFee: Number(formData.fee),
            }

            const result = await createEvent(payload)

            if (!result.success) {
                toast.error(result.message)

                const fieldErrors: Record<string, string> = {}
                result.errorSources?.forEach(
                    (err: { path: string; message: string }) => {
                        fieldErrors[err.path] = err.message
                    }
                )
                setErrors(fieldErrors)
                return
            }

            toast.success(result.message || 'Event created successfully!')
            setFormData(INITIAL_FORM)
            setErrors({})

            router.push('/dashboard/my-events')
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-xl"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Create New Event
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Fill in the details to launch your next experience.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <CreateEventForm
                            formData={formData}
                            errors={errors}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <CreateEventSidebar
                            formData={formData}
                            errors={errors}
                            loading={loading}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}