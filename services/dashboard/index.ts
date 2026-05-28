const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export type DashboardStatsType = {
    upcomingApprovedEventsCount: number;
    upcomingRegistrationsCount: number;
};

export type RecentEventType = {
    id: string;
    title: string;
    createdAt: string;
    startAt: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    registrationFee: string;
};

export type InvitationType = {
    id: string;
    event: {
        id: string;
        title: string;
    };
    invitedBy: {
        name: string;
        email: string;
    } | null;
    createdAt: string;
};

// Card 1: Upcoming approved events count
// Uses browser date on client — here we pass it as a query param from client side.
// But since this is a server component, we pass current date from server.
export const getDashboardStats = async (): Promise<{
    success: boolean;
    data: DashboardStatsType | null;
    message?: string;
}> => {
    try {
        const res = await fetch(`${BASE}/dashboard/stats`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, data: null, message: data.message || 'Failed to load stats.' };
        }

        // console.log('Stats response:', data.data);
        return { success: true, data: data.data };
    } catch {
        return { success: false, data: null, message: 'Failed to connect to server.' };
    }
};

// Recently created events (last 7 days, non-past)
export const getRecentEventsService = async (): Promise<{
    success: boolean;
    data: RecentEventType[];
    message?: string;
}> => {
    try {
        const res = await fetch(`${BASE}/events/recent-events`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        const data = await res.json();
        console.log(data)

        if (!res.ok) {
            return { success: false, data: [], message: data.message || 'Failed to load events.' };
        }

        return { success: true, data: data.data || [] };
    } catch {
        return { success: false, data: [], message: 'Failed to connect to server.' };
    }
};

// My invitations
export const getMyInvitationsService = async (): Promise<{
    success: boolean;
    data: InvitationType[];
    message?: string;
}> => {
    try {
        const res = await fetch(`${BASE}/invitations/my-invitations`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, data: [], message: data.message || 'Failed to load invitations.' };
        }

        return { success: true, data: data.data || [] };
    } catch {
        return { success: false, data: [], message: 'Failed to connect to server.' };
    }
};