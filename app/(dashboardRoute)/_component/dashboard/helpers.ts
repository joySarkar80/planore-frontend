import { RecentEventType } from '@/services/dashboard';

export function timeAgo(dateStr: string): string {
    const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

// Last 7 days created, startAt not yet passed
export function filterRecentEvents(events: RecentEventType[]): RecentEventType[] {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return events.filter(
        (e) => new Date(e.createdAt) >= sevenDaysAgo && new Date(e.startAt) >= now
    );
}

// Card 1: approved + upcoming (startAt >= now)
export function countUpcomingApproved(events: RecentEventType[]): number {
    const now = new Date();
    return events.filter(
        (e) => e.status === 'APPROVED' && new Date(e.startAt) >= now
    ).length;
}