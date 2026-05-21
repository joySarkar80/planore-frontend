export type ParticipantType = {
    id: string;
    eventId: string;
    userId: string;
    status: 'INVITED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'BANNED';
    paymentStatus: 'PAID' | 'UNPAID' | 'FREE';
    createdAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
};