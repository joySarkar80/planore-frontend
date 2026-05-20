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