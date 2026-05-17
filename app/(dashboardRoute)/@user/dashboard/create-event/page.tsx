'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
// import { createEvent } from "@/services/event";

import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Globe,
    Lock,
    DollarSign,
    Image as ImageIcon,
    Loader2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createEvent } from '@/services/events'

export default function CreateEventPage() {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = React.useState({
        title: "",
        date: "",
        time: "",
        venue: "",
        eventLink: "",
        description: "",
        visibility: "",
        fee: "0",
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setErrors({});

            const startAt = new Date(
                `${formData.date}T${formData.time}`
            ).toISOString();

            const payload = {
                title: formData.title,
                description: formData.description,
                startAt,

                venue: formData.venue || undefined,
                eventLink: formData.eventLink || undefined,

                visibility: formData.visibility as "PUBLIC" | "PRIVATE",

                registrationFee: Number(formData.fee),
            };

            const result = await createEvent(payload);

            // FAILED
            if (!result.success) {

                // toast
                toast.error(result.message);

                // zod field errors
                const fieldErrors: Record<string, string> = {};

                result.errorSources?.forEach(
                    (err: { path: string; message: string }) => {
                        fieldErrors[err.path] = err.message;
                    }
                );

                setErrors(fieldErrors);

                return;
            }

            toast.success("Event created successfully");

            setFormData({
                title: "",
                date: "",
                time: "",
                venue: "",
                eventLink: "",
                description: "",
                visibility: "PUBLIC",
                fee: "0",
            });

            setErrors({});

            setTimeout(() => {
                // router.replace("/dashboard/events");
                router.refresh();
            }, 500);

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Create New Event
                    </h1>

                    <p className="text-slate-500 font-medium">
                        Fill in the details to launch your next experience.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8 md:p-10 space-y-8">

                            {/* TITLE */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                    Event Title
                                </Label>

                                <Input
                                    placeholder="Design Systems Workshop"
                                    className="h-14 bg-slate-50 border-none rounded-2xl text-lg font-bold"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                />
                                {
                                    errors.title && (
                                        <p className="text-sm text-red-500 font-medium">
                                            {errors.title}
                                        </p>
                                    )
                                }
                            </div>

                            {/* DATE TIME */}
                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        Date
                                    </Label>

                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                                        <Input
                                            type="date"
                                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                                            value={formData.date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    date: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        Time
                                    </Label>

                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                                        <Input
                                            type="time"
                                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                                            value={formData.time}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    time: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* VENUE */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                    Venue
                                </Label>

                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                                    <Input
                                        placeholder="Central Park"
                                        className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                                        value={formData.venue}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                venue: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {/* EVENT LINK */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                    Event Link
                                </Label>

                                <Input
                                    placeholder="https://zoom.us/j/123"
                                    className="h-14 bg-slate-50 border-none rounded-2xl font-bold"
                                    value={formData.eventLink}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            eventLink: e.target.value,
                                        })
                                    }
                                />
                                {
                                    errors.eventLink && (
                                        <p className="text-sm text-red-500 font-medium">
                                            {errors.eventLink}
                                        </p>
                                    )
                                }
                            </div>

                            {/* DESCRIPTION */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                    Description
                                </Label>

                                <Textarea
                                    placeholder="Describe your event..."
                                    className="min-h-[200px] bg-slate-50 border-none rounded-2xl p-6 font-medium text-lg"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                />
                                {
                                    errors.description && (
                                        <p className="text-sm text-red-500 font-medium">
                                            {errors.description}
                                        </p>
                                    )
                                }
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-8">
                        <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">

                            <h3 className="text-xl font-black text-slate-900 mb-8">
                                Privacy & Fee
                            </h3>

                            <div className="space-y-8">

                                {/* VISIBILITY */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        Visibility
                                    </Label>


                                    <div className="grid grid-cols-2 gap-4">

                                        {/* PUBLIC */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    visibility: "PUBLIC",
                                                })
                                            }
                                            className={`
                h-14 rounded-2xl border transition-all duration-200
                flex items-center justify-center gap-2 font-bold

                ${formData.visibility === "PUBLIC"
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"
                                                }
            `}
                                        >
                                            <Globe className="h-4 w-4" />
                                            Public
                                        </button>

                                        {/* PRIVATE */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    visibility: "PRIVATE",
                                                })
                                            }
                                            className={`
                h-14 rounded-2xl border transition-all duration-200
                flex items-center justify-center gap-2 font-bold

                ${formData.visibility === "PRIVATE"
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"
                                                }
            `}
                                        >
                                            <Lock className="h-4 w-4" />
                                            Private
                                        </button>

                                        
                                    </div>

                                    {
                                        errors.visibility && (
                                            <p className="text-sm text-red-500 font-medium">
                                                {errors.visibility}
                                            </p>
                                        )
                                    }

                                </div>

                                {/* FEE */}
                                <div className="space-y-4">
                                    <Label>
                                        Registration Fee
                                    </Label>

                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                                        <Input
                                            type="number"
                                            min="0"
                                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-black text-xl"
                                            value={formData.fee}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    fee: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {
                                        errors.registrationFee && (
                                            <p className="text-sm text-red-500 font-medium">
                                                {errors.registrationFee}
                                            </p>
                                        )
                                    }
                                </div>

                                {/* IMAGE PLACEHOLDER */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                        Event Banner
                                    </Label>

                                    <div className="aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                                        <ImageIcon className="h-8 w-8 mb-2" />
                                        <span className="text-xs font-bold">
                                            Coming Soon
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 h-16 rounded-[2rem] font-black text-xl"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Launch Event'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}