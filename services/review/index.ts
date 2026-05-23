export const createReviewService = async (reviewData: { eventId: string; rating: number; comment?: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Failed to submit review',
                data: null
            };
        }

        return data;
    } catch (error: any) {
        return {
            success: false,
            message: 'Failed to submit review',
            data: null
        };
    }
};

export const getMyReviewsService = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/my-reviews`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return { success: false, message: 'Failed to fetch reviews', data: null };
    }
};

export const updateReviewService = async (reviewId: string, payload: { rating?: number; comment?: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return { success: false, message: 'Failed to update review', data: null };
    }
};

export const deleteReviewService = async (reviewId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return { success: false, message: 'Failed to delete review', data: null };
    }
};