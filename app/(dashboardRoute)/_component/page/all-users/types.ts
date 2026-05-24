export type UserStatus = 'ACTIVE' | 'BANNED';
export type UserRole = 'USER' | 'ADMIN';

export type AdminUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar: string | null;
    createdAt: string;
};

export type ConfirmModalState = {
    open: boolean;
    userId: string | null;
    userName: string;
    action: 'delete' | 'ban' | null;
};