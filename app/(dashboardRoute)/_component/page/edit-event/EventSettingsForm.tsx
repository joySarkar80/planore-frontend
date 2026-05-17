'use client'

import * as React from 'react'
import { Globe, Lock, DollarSign, Image as ImageIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
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

type EventSettingsFormProps = {
    formData: FormData
    errors: Record<string, string>
    onChange: (field: keyof FormData, value: string) => void
}

export default function EventSettingsForm({ formData, errors, onChange }: EventSettingsFormProps) {
    return (
        <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">
            <h3 className="text-xl font-black text-slate-900 mb-8">Privacy & Fee</h3>
            <div className="space-y-8">

                {/* VISIBILITY */}
                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Visibility</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => onChange('visibility', 'PUBLIC')}
                            className={`h-14 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-2 font-bold ${formData.visibility === "PUBLIC" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"}`}
                        >
                            <Globe className="h-4 w-4" /> Public
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('visibility', 'PRIVATE')}
                            className={`h-14 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-2 font-bold ${formData.visibility === "PRIVATE" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300"}`}
                        >
                            <Lock className="h-4 w-4" /> Private
                        </button>
                    </div>
                    {errors.visibility && <p className="text-sm text-red-500 font-medium">{errors.visibility}</p>}
                </div>

                {/* REGISTRATION FEE */}
                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Registration Fee (BDT)</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            type="number"
                            min="0"
                            className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-black text-xl"
                            value={formData.fee}
                            onChange={(e) => onChange('fee', e.target.value)}
                        />
                    </div>
                    {errors.registrationFee && <p className="text-sm text-red-500 font-medium">{errors.registrationFee}</p>}
                </div>

                {/* IMAGE BANNER PLACEHOLDER */}
                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Event Banner</Label>
                    <div className="aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="h-8 w-8 mb-2" />
                        <span className="text-xs font-bold">Coming Soon</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}