import { ICreateEvent } from "@/types/event";

export type PublicEvent = {
    id: string;
    title: string;
    description: string;
    startAt: string;
    venue: string | null;
    visibility: 'PUBLIC' | 'PRIVATE';
    registrationFee: string;
    owner: { id: string; name: string; avatar: string | null };
    _count: { registrations: number; reviews: number };
};

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const createEvent = async (payload: ICreateEvent) => {
    const res = await fetch(
        `${BASE}/events`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: data.message,
            errorSources: data.errorSources || [],
        };
    }

    return {
        success: true,
        data: data.data,
        message: data.message,
    };
};

export const getUpcomingEvents = async (): Promise<PublicEvent[]> => {
    try {
        const res = await fetch(
            `${BASE}/events?limit=9&upcoming=true&visibility=PUBLIC`,
            { next: { revalidate: 60, tags: ['events'] } }
        );
        if (!res.ok) return [];
        const json = await res.json();
        return json.data?.data ?? [];
    } catch {
        return [];
    }
};

export const getAllEvents = async (query: Record<string, any>) => {
    try {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== "" && value !== null) {
                params.append(key, value.toString());
            }
        });

        const queryString = params.toString() ? `?${params.toString()}` : "";

        const res = await fetch(`${BASE}/events${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 5,
                tags: ["events"],
            },
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Error fetching events:", error);
        return {
            success: false,
            message: "Could not fetch events",
            data: [],
        };
    }
};

export const getMyEvents = async () => {
    const res = await fetch(
        `${BASE}/events/my-events`,
        {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch events')
    }

    return res.json()
}

// path: src/services/events/clientEvent.ts

// Get Single Event
export const getEventById = async (id: string) => {
    try {
        const res = await fetch(
            `${BASE}/events/${id}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            return { success: false, data: null };
        }

        const result = await res.json();

        return { success: true, data: result.data };
    } catch (error) {
        return { success: false, data: null };
    }
};


// edit Event
export const updateEvent = async (id: string, data: any) => {
    try {
        const res = await fetch(
            `${BASE}/events/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update event');
        }

        return res.json();
    } catch (error: any) {
        throw new Error(error.message || 'Network error');
    }
};

// Delete Event for user
export const deleteEvent = async (id: string) => {
    console.log('Deleting event with ID:', id); // Debug log
    const res = await fetch(
        `${BASE}/events/${id}`,
        {
            method: 'DELETE',
            credentials: 'include',
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Failed to delete event');
    }

    return res.json();
};

// for admin to update event status
export const UpdateEventStatus = async (
    eventId: string,
    status: string
) => {
    const res = await fetch(`${BASE}/events/${eventId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
    });
    return res.json();
};

// for admin to delete event
export const adminDeleteEvent = async (eventId: string) => {
    const res = await fetch(`${BASE}/events/admin/${eventId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return res.json();
};

// Fetch Admin Events
export const getAllEventsForAdmin = async (query: Record<string, any>) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
            params.append(key, String(value));
        }
    });

    const res = await fetch(
        `${BASE}/events/admin?${params.toString()}`,
        {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch admin events');
    }

    return res.json();
};