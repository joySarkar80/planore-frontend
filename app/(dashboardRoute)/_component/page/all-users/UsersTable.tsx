'use client';

import { AdminUser, UserRole, UserStatus } from './types';

const STATUS_OPTIONS: UserStatus[] = ['ACTIVE', 'BANNED'];

const STATUS_BADGE: Record<UserStatus, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    BANNED: 'bg-red-100 text-red-800',
};

const ROLE_BADGE: Record<UserRole, string> = {
    ADMIN: 'bg-purple-100 text-purple-800',
    USER: 'bg-blue-100 text-blue-800',
};

interface UsersTableProps {
    users: AdminUser[];
    loading: boolean;
    statusMap: Record<string, UserStatus>;
    changedRows: Set<string>;
    savingId: string | null;
    onStatusChange: (id: string, val: UserStatus) => void;
    onSave: (id: string) => void;
    onOpenModal: (userId: string, userName: string, action: 'delete' | 'ban') => void;
}

export default function UsersTable({
    users,
    loading,
    statusMap,
    changedRows,
    savingId,
    onStatusChange,
    onSave,
    onOpenModal,
}: UsersTableProps) {
    const formatDateTime = (d: string, type: 'date' | 'time') => {
        const dt = new Date(d);
        return type === 'date'
            ? dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (users.length === 0) {
        return <div className="text-center py-20 text-gray-400 text-sm">No users found</div>;
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left">
                        {['Name', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map((h) => (
                            <th key={h} className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users.map((user) => {
                        const currentStatus = statusMap[user.id] ?? user.status;
                        return (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                {/* Name */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
                                                {user.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                        <span className="font-medium text-gray-900 whitespace-nowrap">{user.name}</span>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">{user.email}</td>

                                {/* Role */}
                                <td className="px-4 py-3">
                                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_BADGE[user.role]}`}>
                                        {user.role}
                                    </span>
                                </td>

                                {/* Joined */}
                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                    <div>{formatDateTime(user.createdAt, 'date')}</div>
                                    <div className="text-xs text-gray-400">{formatDateTime(user.createdAt, 'time')}</div>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3">
                                    <select
                                        value={currentStatus}
                                        onChange={(e) => onStatusChange(user.id, e.target.value as UserStatus)}
                                        className={`text-xs font-semibold px-2 py-1 rounded-full cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 ${STATUS_BADGE[currentStatus]}`}
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onSave(user.id)}
                                            disabled={!changedRows.has(user.id) || savingId === user.id}
                                            className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                                        >
                                            {savingId === user.id ? 'Saving…' : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => onOpenModal(user.id, user.name, 'ban')}
                                            disabled={currentStatus === 'BANNED'}
                                            className="text-xs px-3 py-1 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Ban
                                        </button>
                                        <button
                                            onClick={() => onOpenModal(user.id, user.name, 'delete')}
                                            className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}