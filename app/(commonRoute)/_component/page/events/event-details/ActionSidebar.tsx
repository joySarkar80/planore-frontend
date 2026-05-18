'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

interface ActionSidebarProps {
    event: {
        visibility: 'PUBLIC' | 'PRIVATE';
        registrationFee: string;
        owner: {
            name: string;
            email: string;
        };
        _count: {
            registrations: number;
        };
    };
}

export function ActionSidebar({ event }: ActionSidebarProps) {
    const isPaid = Number(event.registrationFee) > 0;

    const getButtonText = () => {
        if (event.visibility === 'PUBLIC') {
            return isPaid ? 'Pay and Join' : 'Join Now';
        }
        if (event.visibility === 'PRIVATE') {
            return 'Request to Join'; 
        }
        return 'Join Event';
    };

    return (
        <Card className="rounded-[2rem] shadow-2xl border-none overflow-hidden bg-white sticky top-24">
            <CardContent className="p-8">
                {/* Dynamic Button Section */}
                <div className="mb-8">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
                        Registration
                    </label>

                    <Button
                        size="lg"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl font-extrabold text-lg shadow-lg"
                    >
                        {getButtonText()}
                    </Button>
                </div>

                <Separator className="bg-slate-100 my-8" />

                {/* Organizer Section */}
                <div className="space-y-6">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                        Organized By
                    </label>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-lg shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xl">
                                {event.owner.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <div className="font-black text-slate-900 text-lg truncate capitalize">
                                {event.owner.name}
                            </div>
                            <div className="text-sm font-bold text-indigo-600">{event.owner.email}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                            <div className="text-sm font-bold text-slate-400 mb-1">Participants</div>
                            <div className="text-xl font-black text-slate-900">
                                {event._count.registrations}
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                            <div className="text-sm font-bold text-slate-400 mb-1">Visibility</div>
                            <div className="text-sm font-black text-slate-900 mt-1 uppercase">
                                {event.visibility}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}