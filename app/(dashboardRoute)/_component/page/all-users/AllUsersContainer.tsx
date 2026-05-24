// app/(dashboardRoute)/_component/page/all-users/AllUsersContainer.tsx
'use client';

import { deleteUser, getAllUsers, updateUserStatus } from '@/services/users';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AdminUser, ConfirmModalState, UserStatus } from './types';
import UsersTable from './UsersTable';
import ConfirmUserModal from './ConfirmUserModal';

export default function AllUsersContainer() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusMap, setStatusMap] = useState<Record<string, UserStatus>>({});
    const [changedRows, setChangedRows] = useState<Set<string>>(new Set());
    const [savingId, setSavingId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        open: false,
        userId: null,
        userName: '',
        action: null,
    });

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const json = await getAllUsers(page, search);

            if (json.success) {
                const rows: AdminUser[] = json.data.data;
                setUsers(rows);
                setMeta({ total: json.data.meta.total, totalPages: json.data.meta.totalPage });

                const init: Record<string, UserStatus> = {};
                rows.forEach((u) => { init[u.id] = u.status; });
                setStatusMap(init);
                setChangedRows(new Set());
            } else {
                toast.error(json.message || 'Failed to load users');
            }
        } catch {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    }, [search, page]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleStatusChange = (id: string, val: UserStatus) => {
        setStatusMap((prev) => ({ ...prev, [id]: val }));
        const original = users.find((u) => u.id === id)?.status;
        setChangedRows((prev) => {
            const next = new Set(prev);
            val !== original ? next.add(id) : next.delete(id);
            return next;
        });
    };

    const handleSaveStatus = async (id: string) => {
        setSavingId(id);
        try {
            const res = await updateUserStatus(id, statusMap[id]);
            if (res.success) {
                toast.success('Status updated');
                await fetchUsers();
            } else {
                toast.error(res.message || 'Failed to update status');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setSavingId(null);
        }
    };

    const handleConfirmAction = async () => {
        if (!confirmModal.userId || !confirmModal.action) return;
        setActionLoading(true);

        try {
            const res = confirmModal.action === 'delete'
                ? await deleteUser(confirmModal.userId)
                : await updateUserStatus(confirmModal.userId, 'BANNED');

            if (res.success) {
                toast.success(confirmModal.action === 'delete' ? 'User deleted' : 'User banned');
                closeModal();
                await fetchUsers();
            } else {
                toast.error(res.message || 'Action failed');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setActionLoading(false);
        }
    };

    const openModal = (userId: string, userName: string, action: 'delete' | 'ban') => {
        setConfirmModal({ open: true, userId, userName, action });
    };

    const closeModal = () => {
        setConfirmModal({ open: false, userId: null, userName: '', action: null });
    };

    return (
        <div className="p-6 max-w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
                <p className="text-sm text-gray-500 mt-0.5">{meta.total} total users</p>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
            </div>

            {/* Table Component */}
            <UsersTable
                users={users}
                loading={loading}
                statusMap={statusMap}
                changedRows={changedRows}
                savingId={savingId}
                onStatusChange={handleStatusChange}
                onSave={handleSaveStatus}
                onOpenModal={openModal}
            />

            {/* Pagination Component (Kept inline as it's small, but easily extractable later if reused) */}
            {meta.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Page {page} of {meta.totalPages}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                            disabled={page === meta.totalPages}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Component */}
            <ConfirmUserModal
                modalState={confirmModal}
                actionLoading={actionLoading}
                onClose={closeModal}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
}