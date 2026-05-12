import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const EventCard = ({ event }: { event: any }) => {
    return (
        <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white rounded-2xl">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={event.imageUrl || "https://picsum.photos/seed/picsum/800/450"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-900 font-bold backdrop-blur-sm border-none shadow-sm">
                        {event.visibility} {Number(event.registrationFee) === 0 ? "Free" : "Paid"}
                    </Badge>
                </div>
            </div>
            <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xs font-bold text-indigo-600 uppercase">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(event.startAt).toLocaleDateString()}
                    </div>
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-600">
                        {Number(event.registrationFee) === 0 ? "Free" : `$${event.registrationFee}`}
                    </Badge>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 line-clamp-1">
                    {event.title}
                </h3>
                <div className="space-y-3 mb-8 pt-4 border-t border-slate-50">
                    <div className="flex items-center text-sm text-slate-600">
                        <Users className="h-4 w-4 mr-3 text-indigo-500" />
                        <span>{event.owner?.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mr-3 text-indigo-500" />
                        <span className="truncate">{event.venue || "Online"}</span>
                    </div>
                </div>
                <Link href={`/events/${event.id}`}>
                    <Button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold h-12 rounded-xl">
                        View Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}