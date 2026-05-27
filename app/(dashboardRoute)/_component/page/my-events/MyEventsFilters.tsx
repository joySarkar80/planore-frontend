'use client';

type FilterStatus =
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'UPCOMING'
    | 'PAST'
    | 'PUBLIC'
    | 'PRIVATE';

const STATUS_OPTIONS: FilterStatus[] = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'UPCOMING',
    'PAST',
    'PUBLIC',
    'PRIVATE',
];

interface MyEventsFiltersProps {
    search: string;
    statusFilter: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export default function MyEventsFilters({
    search,
    statusFilter,
    onSearchChange,
    onStatusChange,
}: MyEventsFiltersProps) {
    return (
        <div className="mb-4 flex flex-wrap gap-3">
            <input
                type="text"
                placeholder="Search by title…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">All Events</option>
                {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    );
}