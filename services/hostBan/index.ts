const API = process.env.NEXT_PUBLIC_BASE_URL;

export const getBannedUsersService = async () => {
    const res = await fetch(`${API}/host-ban/banned-users`, {
        credentials: 'include',
        cache: 'no-store',
    });
    return res.json();
};

export const banUserService = async (userId: string, reason?: string) => {
    const res = await fetch(`${API}/host-ban/ban`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason }),
    });
    return res.json();
};

export const unbanUserService = async (userId: string) => {
    const res = await fetch(`${API}/host-ban/unban/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return res.json();
};