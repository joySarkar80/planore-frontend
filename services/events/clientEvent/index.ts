
export const getMyEvents = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/events/my-events`,
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`,
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


// Update Event
export const updateEvent = async (id: string, data: any) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`,
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

// Delete Event
export const deleteEvent = async (id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`,
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
