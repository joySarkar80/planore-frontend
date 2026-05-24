const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserStatus = async (
    userId: string,
    status: string
) => {
    const res = await fetch(`${BASE}/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
    });
    return res.json();
};

export const deleteUser = async (userId: string) => {
    const res = await fetch(`${BASE}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return res.json();
};

export const getAllUsers = async (page: number, search?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('searchTerm', search);
    params.append('page', String(page));
    params.append('limit', '20');

    const res = await fetch(`${BASE}/users/all?${params}`, {
        credentials: 'include',
        cache: 'no-store',
    });
    return res.json();
};