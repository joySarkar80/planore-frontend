export type Review = {
    id: string;
    eventId: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    event: {
        title: string;
        startAt: string;
        venue: string | null;
    };
};