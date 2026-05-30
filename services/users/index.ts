import { getApiUrl } from "../api/apiConfig";


export type UpcomingRegistration = {
    id: string;
    paymentStatus: string;
    event: {
        id: string;
        title: string;
        startAt: string;
        visibility: 'PUBLIC' | 'PRIVATE';
        registrationFee: string;
        venue: string | null;
    };
};

export type MyProfile = {
    id: string;
    name: string;
    email: string;
    status: string;
    avatar: string | null;
    role: string;
    createdAt: string;
    registrations: UpcomingRegistration[];
};

export const updateUserStatus = async (
    userId: string,
    status: string
) => {
    const res = await fetch(`${getApiUrl()}/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
    });
    return res.json();
};

export const deleteUser = async (userId: string) => {
    const res = await fetch(`${getApiUrl()}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return res.json();
};

// get all users for admin..
export const getAllUsers = async (page: number, search?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('searchTerm', search);
    params.append('page', String(page));
    params.append('limit', '20');

    const res = await fetch(`${getApiUrl()}/users/all?${params}`, {
        credentials: 'include',
        cache: 'no-store',
    });
    return res.json();
};

export const getMyProfile = async (): Promise<MyProfile | null> => {
    try {
        const res = await fetch(`${getApiUrl()}/users/me`, {
            credentials: 'include',
            cache: 'no-store',
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
};

export const updateMyProfile = async (payload: {
    name?: string;
    avatar?: string;
}) => {
    const res = await fetch(`${getApiUrl()}/users/me`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
    });
    return res.json();
};