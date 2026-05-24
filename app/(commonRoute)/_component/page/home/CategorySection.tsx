import Link from 'next/link';
import { Globe, DollarSign, Lock, Zap } from 'lucide-react';

const CATEGORIES = [
    {
        name: 'Public Free',
        description: 'Open to everyone at no cost. Great for community events.',
        icon: Globe,
        color: 'bg-green-50 text-green-600',
        ring: 'hover:ring-green-500/30',
        query: '?visibility=PUBLIC&isFree=true',
    },
    {
        name: 'Public Paid',
        description: 'Premium public events worth every penny.',
        icon: DollarSign,
        color: 'bg-blue-50 text-blue-600',
        ring: 'hover:ring-blue-500/30',
        query: '?visibility=PUBLIC&isFree=false',
    },
    {
        name: 'Private Free',
        description: 'Exclusive invite-only and owner approved events — free to attend.',
        icon: Lock,
        color: 'bg-purple-50 text-purple-600',
        ring: 'hover:ring-purple-500/30',
        query: '?visibility=PRIVATE&isFree=true',
    },
    {
        name: 'Private Paid',
        description: 'Curated premium experiences for exclusive circles.',
        icon: Zap,
        color: 'bg-amber-50 text-amber-600',
        ring: 'hover:ring-amber-500/30',
        query: '?visibility=PRIVATE&isFree=false',
    },
] as const;

export default function CategorySection() {
    return (
        <section className="bg-slate-50 py-24 border-y border-slate-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    Browse by Category
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto mb-14 text-sm leading-relaxed">
                    Find events that match your interests and budget. From free community
                    meetups to exclusive paid experiences.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/events${cat.query}`}
                            className={`group bg-white border border-slate-200 rounded-2xl p-8 text-left hover:shadow-lg hover:-translate-y-1 hover:ring-2 ${cat.ring} transition-all duration-300`}
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:rotate-6 ${cat.color}`}
                            >
                                <cat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                {cat.name}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {cat.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}