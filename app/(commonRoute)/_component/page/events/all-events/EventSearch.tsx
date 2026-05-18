import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface EventSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const EventSearch = ({ value, onChange }: EventSearchProps) => {
    return (
        <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-center">Discover Events</h1>
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                    placeholder="Search by event title or organizer..."
                    className="pl-12 h-14 bg-white shadow-sm border-slate-200 rounded-2xl focus-visible:ring-indigo-600"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    )
}