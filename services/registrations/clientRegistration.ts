// path: src/services/registrations/clientRegistration.ts

// ১. ইভেন্টে জয়েন করার জন্য (Public Free, Public Paid, Private Free, Private Paid সবার জন্য সাধারণ এন্ডপয়েন্ট)
export const joinEvent = async (eventId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/registrations/join/${eventId}`,
            {
                method: 'POST',
                credentials: 'include', // কুকি বা টোকেন পাস করার জন্য জরুরি
                cache: 'no-store',
            }
        );

        const result = await res.json();
        return result;
    } catch (error) {
        return { success: false, message: 'Something went wrong' };
    }
};

// ২. Private Paid ইভেন্টের জন্য: ওনার অ্যাপ্রুভ করার পর ড্যাশবোর্ড থেকে পে করার এন্ডপয়েন্ট
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