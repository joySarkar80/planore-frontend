import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Users,
  Zap,
  Filter,
  DollarSign,
  Globe,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_EVENTS } from '@/lib/mock-data';

export default function HomePage() {
  const featuredEvent = MOCK_EVENTS.find(e => e.isFeatured) || MOCK_EVENTS[0];
  const upcomingEvents = MOCK_EVENTS.slice(0, 9); // Section 2 asks for 9

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* Section 1: Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 py-1 px-4 text-sm font-semibold rounded-full border-indigo-500/50 bg-indigo-500/10 text-indigo-400">
                ⭐ Featured Event
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8">
                {featuredEvent.title}
              </h1>
              <div className="flex items-center gap-4 text-slate-300 mb-8 font-medium">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-500" />
                  <span>{featuredEvent.date} at {featuredEvent.time}</span>
                </div>
              </div>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                {featuredEvent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/events/${featuredEvent.id}`}>
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-indigo-600 hover:bg-indigo-700">
                    Join Event Now
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-700 text-white hover:bg-slate-800">
                    Explore Others
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"></div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={featuredEvent.imageUrl}
                  alt={featuredEvent.title}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Upcoming Events Slider */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Upcoming Events</h2>
            <p className="text-slate-500 mt-2">Find your next big experience.</p>
          </div>
          <Link href="/events" className="text-indigo-600 font-semibold hover:underline flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-6">
          <div className="flex space-x-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="w-[320px] group hover:shadow-xl transition-all duration-300 border-slate-200/60 overflow-hidden bg-white shrink-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant={event.fee === 0 ? 'secondary' : 'default'} className="backdrop-blur-md bg-white/90 text-slate-900 border-none shadow-sm font-bold">
                      {event.fee === 0 ? 'FREE' : `$${event.fee}`}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 whitespace-normal">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-500">
                      <CalendarIcon className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
                      <span className="truncate">By {event.organizer}</span>
                    </div>
                  </div>
                  <Link href={`/events/${event.id}`}>
                    <Button variant="outline" className="w-full group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-sm transition-all font-semibold">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Section 3: Event Categories */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Event Categories</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">
            Filtered collections to help you find precisely what matches your interest.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Public Free', icon: Globe, color: 'bg-green-50 text-green-600' },
              { name: 'Public Paid', icon: DollarSign, color: 'bg-blue-50 text-blue-600' },
              { name: 'Private Free', icon: Lock, color: 'bg-purple-50 text-purple-600' },
              { name: 'Private Paid', icon: Zap, color: 'bg-amber-50 text-amber-600' },
            ].map((cat) => (
              <Card key={cat.name} className="hover:ring-2 hover:ring-indigo-500/20 cursor-pointer group transition-all transform hover:-translate-y-1 bg-white border-slate-200">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-12 ${cat.color}`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{cat.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Browse targeted events in this category
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Call To Action */}
      <section className="container mx-auto px-4">
        <div className="bg-indigo-600 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 p-24 opacity-10 blur-2xl">
            <Zap className="w-64 h-64 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 p-24 opacity-10 blur-2xl">
            <CalendarIcon className="w-64 h-64 text-white" />
          </div>
          <div className="p-12 md:p-24 relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Bring your world <span className="text-indigo-200 italic">closer</span> together.
            </h2>
            <p className="text-indigo-100 text-xl md:text-2xl mb-12 leading-relaxed opacity-90">
              Whether you&apos;re looking to create an exclusive private workshop or a massive public festival, we provide the tools to make it happen effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link href="/dashboard/create">
                <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-slate-100 h-16 px-10 font-bold text-lg rounded-2xl shadow-xl shadow-black/10">
                  Create Your Event
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-indigo-400 text-white hover:bg-indigo-500 h-16 px-10 font-bold text-lg rounded-2xl">
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

