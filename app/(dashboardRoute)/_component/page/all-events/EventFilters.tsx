'use client';

type FilterStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UPCOMING' | 'PAST';

const STATUS_OPTIONS: FilterStatus[] = ['PENDING', 'APPROVED', 'REJECTED', 'UPCOMING', 'PAST'];

interface EventFiltersProps {
    search: string;
    statusFilter: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export default function EventFilters({
    search,
    statusFilter,
    onSearchChange,
    onStatusChange,
}: EventFiltersProps) {
    return (
        <div className="mb-4 flex flex-wrap gap-3">
            <input
                type="text"
                placeholder="Search title or organizer…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option className='cursor-pointer' value="">All Events</option>
                {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    );
}