export interface ICreateEvent {
    title: string;
    description: string;
    startAt: string;

    venue?: string;
    eventLink?: string;

    visibility: "PUBLIC" | "PRIVATE";

    registrationFee: number;
}

export interface EventOwner {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
}

export interface Review {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface EventDetails {
    id: string;
    title: string;
    description: string;
    startAt: string;
    venue: string;
    eventLink: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    visibility: 'PUBLIC' | 'PRIVATE';
    registrationFee: string; // From API it comes as string
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    owner: EventOwner;
    reviews: Review[];
    _count: {
        registrations: number;
    };
}

export interface SingleEvent {
    id: string;
    title: string;
    description: string;
    startAt: string;
    venue: string | null;
    eventLink: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    visibility: 'PUBLIC' | 'PRIVATE';
    registrationFee: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}
