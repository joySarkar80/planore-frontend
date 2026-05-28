export type ReviewCardReview = {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    event: {
        id: string;
        title: string;
        startAt: string;
        venue: string | null;
    };
    user: {
        id: string;
        name: string;
        avatar: string | null;
    };
};
