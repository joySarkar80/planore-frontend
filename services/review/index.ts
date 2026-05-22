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
