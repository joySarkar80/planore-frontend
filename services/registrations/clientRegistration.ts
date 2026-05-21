import { ParticipantType } from "@/types/registration";

export const joinEvent = async (eventId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/registrations/join/${eventId}`,
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/registrations/pay/${eventId}`,
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

export const getEventParticipantsService = async (
    eventId: string
): Promise<{ success: boolean; data: ParticipantType[]; message?: string }> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/registrations/participants?eventId=${eventId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) return { success: false, data: [], message: data.message };
        return { success: true, data: data.data || [] };
    } catch (error) {
        return { success: false, data: [], message: 'Failed to fetch participants.' };
    }
};

export const updateParticipantStatusService = async (
    registrationId: string,
    status: string
): Promise<{ success: boolean; message: string }> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/registrations/participants/${registrationId}/status`, {
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


export const getMyJoinedEventsService = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/registrations/my-joined-events`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                cache: 'no-store',
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Failed to fetch joined events',
                data: null
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            message: 'Failed to fetch joined events',
            data: null
        };
    }
};
