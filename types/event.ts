export interface ICreateEvent {
    title: string;
    description: string;
    startAt: string;

    venue?: string;
    eventLink?: string;

    visibility: "PUBLIC" | "PRIVATE";

    registrationFee: number;
}