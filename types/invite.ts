export type RegistrationStatus =

    | 'INVITED'
    | 'PENDING'
    | 'APPROVED'

    | 'REJECTED'
    | 'BANNED';

export type SearchUserType = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    registrationStatus: RegistrationStatus | null;
};

export type InvitedRegistrationType = {
    id: string;
    status: RegistrationStatus;
    createdAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
};
