'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { getEventById, updateEvent } from '@/services/events'

import EventDetailsForm from './EventDetailsForm'
import EventSettingsForm from './EventSettingsForm'

type FormDataType = {
    title: string
    date: string
    time: string
    venue: string
    eventLink: string
    description: string
    visibility: string
    fee: string
}

interface EditEventContainerProps {
    eventId: string
}

export default function EditEventContainer({
    eventId,
}: EditEventContainerProps) {

    const router = useRouter()

    const [loading, setLoading] = React.useState(true)
    const [updating, setUpdating] = React.useState(false)
    const [errors, setErrors] = React.useState<Record<string, string>>({})

    const [formData, setFormData] = React.useState<FormDataType>({
        title: '',
        date: '',
        time: '',
        venue: '',
        eventLink: '',
        description: '',
        visibility: 'PUBLIC',
        fee: '0',
    })

    const handleFieldChange = (
        field: keyof FormDataType,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    React.useEffect(() => {

        const fetchSingleEvent = async () => {

            try {

                const response = await getEventById(eventId)

                if (response.success && response.data) {

                    const event = response.data

                    const dateObj = new Date(event.startAt)

                    const formattedDate =
                        dateObj.toLocaleDateString('en-CA')

                    const formattedTime =
                        dateObj
                            .toTimeString()
                            .split(' ')[0]
                            .slice(0, 5)

                    setFormData({
                        title: event.title,
                        date: formattedDate,
                        time: formattedTime,
                        venue: event.venue || '',
                        eventLink: event.eventLink || '',
                        description: event.description,
                        visibility: event.visibility,
                        fee: Number(event.registrationFee).toString(),
                    })
                }

            } catch (error: any) {

                toast.error(
                    error.message ||
                    'Failed to load event details'
                )

            } finally {
                setLoading(false)
            }
        }

        if (eventId) {
            fetchSingleEvent()
        }

    }, [eventId])

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        try {

            setUpdating(true)
            setErrors({})

            const startAt = new Date(
                `${formData.date}T${formData.time}`
            ).toISOString()

            const payload = {
                title: formData.title,
                description: formData.description,
                startAt,
                venue: formData.venue || undefined,
                eventLink: formData.eventLink || undefined,
                visibility: formData.visibility,
                registrationFee: Number(formData.fee),
            }

            const result = await updateEvent(
                eventId,
                payload
            )

            if (!result.success) {

                toast.error(
                    result.message || 'Validation failed'
                )

                const fieldErrors: Record<string, string> = {}

                result.errorSources?.forEach(
                    (err: {
                        path: string
                        message: string
                    }) => {
                        fieldErrors[err.path] = err.message
                    }
                )

                setErrors(fieldErrors)

                return
            }

            toast.success('Event updated successfully')

            router.push('/dashboard/my-events')
            router.refresh()

        } catch (error: any) {

            toast.error(
                error.message ||
                'Something went wrong while updating'
            )

        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <p className="font-bold text-slate-500">
                    Loading event details...
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-4">

            <button
                type="button"
                onClick={() => router.back()}
                className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700 cursor-pointer"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>
            {/* Header */}
            <div className="flex items-center gap-4">


                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit Event
                    </h1>

                    <p className="text-slate-500 font-medium">
                        Update the details of your event.
                    </p>
                </div>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left */}
                    <div className="lg:col-span-2 space-y-8">

                        <EventDetailsForm
                            formData={formData}
                            errors={errors}
                            onChange={handleFieldChange}
                        />

                    </div>

                    {/* Right */}
                    <div className="space-y-8">

                        <EventSettingsForm
                            formData={formData}
                            errors={errors}
                            onChange={handleFieldChange}
                        />

                        <Button
                            type="submit"
                            disabled={updating}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 h-16 rounded-[2rem] font-black text-xl"
                        >
                            {updating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>

                    </div>

                </div>

            </form>

        </div>
    )
}