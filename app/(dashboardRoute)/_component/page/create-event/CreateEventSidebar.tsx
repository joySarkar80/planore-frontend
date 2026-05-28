'use client'

import { Globe, Lock, DollarSign, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreateEventFormData } from './CreateEventForm'

interface CreateEventSidebarProps {
    formData: CreateEventFormData
    errors: Record<string, string>
    loading: boolean
    onChange: (data: Partial<CreateEventFormData>) => void
}

export default function CreateEventSidebar({
    formData,
    errors,
    loading,
    onChange,
}: CreateEventSidebarProps) {
    return (
        <div className="space-y-8">
            <Card className="rounded-[2rem] border-none shadow-xl bg-white p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Privacy & Fee
                </h3>

                <div className="space-y-8">
                    {/* Visibility */}
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            Visibility
                        </Label>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => onChange({ visibility: 'PUBLIC' })}
                                className={`h-14 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-2 font-bold ${formData.visibility === 'PUBLIC'
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                                    }`}
                            >
                                <Globe className="h-4 w-4" />
                                Public
                            </button>

                            <button
                                type="button"
                                onClick={() => onChange({ visibility: 'PRIVATE' })}
                                className={`h-14 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-2 font-bold ${formData.visibility === 'PRIVATE'
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                                    }`}
                            >
                                <Lock className="h-4 w-4" />
                                Private
                            </button>
                        </div>

                        {errors.visibility && (
                            <p className="text-sm text-red-500 font-medium">{errors.visibility}</p>
                        )}
                    </div>

                    {/* Fee */}
                    <div className="space-y-4">
                        <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            Registration Fee
                        </Label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                type="number"
                                min="0"
                                className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-black text-xl"
                                value={formData.fee}
                                onChange={(e) => onChange({ fee: e.target.value })}
                            />
                        </div>
                        {errors.registrationFee && (
                            <p className="text-sm text-red-500 font-medium">{errors.registrationFee}</p>
                        )}
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
    )
}