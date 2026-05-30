import { InvitedRegistrationType, SearchUserType } from "@/types/invite";
import { getApiUrl } from "../api/apiConfig";



export const searchUsersService = async (
    searchTerm: string,
    eventId: string
): Promise<{ success: boolean; data: SearchUserType[]; message?: string }> => {
    try {
        const res = await fetch(`${getApiUrl()}/registrations/search-users?query=${encodeURIComponent(searchTerm)}&eventId=${eventId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await res.json();

        if (!res.ok) {
            return { success: false, data: [], message: data.message || 'Failed to search users.' };
        }
        return { success: true, data: data.data || [] };
    } catch (error) {
        return { success: false, data: [], message: 'Failed to connect to the server.' };
    }
};

export const inviteUserService = async (
    eventId: string,
    email: string
): Promise<{ success: boolean; message: string }> => {
    try {
        const res = await fetch(`${getApiUrl()}/registrations/invite`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, email }),
            credentials: 'include'
        });
        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || 'Failed to send invitation.' };
        }
        return { success: true, message: data.message || 'User invited successfully.' };
    } catch (error) {
        return { success: false, message: 'Could not connect to the server.' };
    }
};

export const getInvitedUsersService = async (
    eventId: string
): Promise<{ success: boolean; data: InvitedRegistrationType[]; message?: string }> => {
    try {
        const res = await fetch(`${getApiUrl()}/registrations/invited?eventId=${eventId}`, {

            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await res.json();

        if (!res.ok) {
            return { success: false, data: [], message: data.message || 'Failed to load invitation list.' };
        }
        return { success: true, data: data.data || [] };
    } catch (error) {
        return { success: false, data: [], message: 'Failed to connect to the server.' };
    }
};