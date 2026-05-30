import { getApiUrl } from "../api/apiConfig";


export const getBannedUsersService = async () => {
    const res = await fetch(`${getApiUrl()}/host-ban/banned-users`, {
        credentials: 'include',
        cache: 'no-store',
    });
    return res.json();
};

export const banUserService = async (userId: string, reason?: string) => {
    const res = await fetch(`${getApiUrl()}/host-ban/ban`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason }),
    });
    return res.json();
};

export const unbanUserService = async (userId: string) => {
    const res = await fetch(`${getApiUrl()}/host-ban/unban/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return res.json();
};