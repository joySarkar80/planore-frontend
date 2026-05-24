import Link from 'next/link';
import { CalendarIcon, Zap } from 'lucide-react';

export default function CtaSection() {
    return (
        <section className="container mx-auto px-4 pb-8">
            <div className="bg-indigo-600 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 p-20 opacity-10 blur-3xl pointer-events-none">
                    <Zap className="w-64 h-64 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 p-20 opacity-10 blur-3xl pointer-events-none">
                    <CalendarIcon className="w-64 h-64 text-white" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center p-12 md:p-24 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Bring your world{' '}
                        <span className="text-indigo-200 italic">closer</span> together.
                    </h2>
                    <p className="text-indigo-100 text-lg md:text-xl mb-12 leading-relaxed opacity-90 max-w-2xl">
                        Whether you&apos;re hosting an exclusive private workshop or a massive
                        public festival — we give you the tools to make it happen
                        effortlessly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/dashboard/create-event"
                            className="inline-flex items-center justify-center h-14 px-10 rounded-2xl text-lg font-bold bg-white text-indigo-700 hover:bg-slate-100 transition-colors shadow-lg shadow-black/10"
                        >
                            Create Your Event
                        </Link>
                        <Link
                            href="/events"
                            className="inline-flex items-center justify-center h-14 px-10 rounded-2xl text-lg font-bold border border-indigo-400 text-white hover:bg-indigo-500 transition-colors"
                        >
                            Explore Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}