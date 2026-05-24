'use client'

import { cn } from '@/lib/utils'

interface EventFiltersProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    categories: string[];
}

export const EventFilters = ({ activeTab, setActiveTab, categories }: EventFiltersProps) => {
    return (
        <div className="flex flex-col items-center gap-6 mb-12">
            {/* Container */}
            <div className="flex flex-wrap justify-center gap-3 p-2 bg-slate-200/50 rounded-2xl border border-slate-300 shadow-inner">
                {categories.map((cat) => {
                    const isActive = activeTab === cat;

                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={cn(
                                "relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",

                                "text-slate-600 hover:text-slate-900 hover:bg-slate-300/50",

                                isActive && [
                                    "bg-indigo-600 text-white shadow-lg scale-105",
                                    "ring-2 ring-indigo-600 ring-offset-2"
                                ]
                            )}
                        >
                            <span className="flex items-center gap-2">
                                {isActive && (
                                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                )}
                                {cat}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}