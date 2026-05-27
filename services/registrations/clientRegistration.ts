import { SingleEvent } from "@/types/event";
import { ParticipantType } from "@/types/registration";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const joinEvent = async (eventId: string) => {
    try {
        const res = await fetch(
            `${BASE}/registrations/join/${eventId}`,
            {
                method: 'POST',
                credentials: 'include',
                cache: 'no-store',
            }
        );

        const result = await res.json();
        return result;
    } catch (error) {
        return { success: false, message: 'Something went wrong' };
    }
};


export const payPrivateEvent = async (eventId: string) => {
    try {
        const res = await fetch(
            `${BASE}/registrations/pay/${eventId}`,
            {
                method: 'POST',
                credentials: 'include',
                cache: 'no-store',
            }
        );

        const result = await res.json();
        return result;
    } catch (error) {
        return { success: false, message: 'Something went wrong' };
    }
};

interface EventParticipantsResponse {
    event: SingleEvent
    participants: ParticipantType[];
}

export const getEventParticipantsService = async (
    eventId: string
): Promise<{ success: boolean; data: EventParticipantsResponse | null; message?: string }> => {
    try {
        const res = await fetch(`${BASE}/registrations/participants?eventId=${eventId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const data = await res.json();
        // console.log("from service file", data)

        if (!res.ok) return { success: false, data: null, message: data.message };

        return {
            success: true,
            data: data.data ? { event: data.data.event, participants: data.data.participants } : null
        };
    } catch (error) {
        return { success: false, data: null, message: 'Failed to fetch participants.' };
    }
};


export const updateParticipantStatusService = async (
    registrationId: string,
    status: string
): Promise<{ success: boolean; message: string }> => {
    try {
        const res = await fetch(`${BASE}/registrations/participants/${registrationId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) return { success: false, message: data.message || 'Failed to update status.' };
        return { success: true, message: data.message || 'Status updated successfully.' };
    } catch (error) {
        return { success: false, message: 'Network request failed.' };
    }
};


export const getMyJoinedEventsService = async (
    filter: 'ALL EVENTS' | 'UPCOMING' | 'PAST' = 'ALL EVENTS'
) => {
    try {
        const res = await fetch(
            `${BASE}/registrations/my-joined-events?filter=${filter}`,
            {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store',
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                data: [],
                message: data.message || 'Failed to load joined events',
            };
        }

        return {
            success: true,
            data: data.data || [],
        };
    } catch {
        return {
            success: false,
            data: [],
            message: 'Failed to load joined events',
        };
    }
};
