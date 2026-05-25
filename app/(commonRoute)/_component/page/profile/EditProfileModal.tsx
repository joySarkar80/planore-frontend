'use client';

import { useEffect, useRef, useState } from 'react';
import { X, User, Link as LinkIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateMyProfile } from '@/services/users';

type Props = {
    open: boolean;
    currentName: string;
    currentAvatar: string | null;
    onClose: () => void;
    onSuccess: () => void;
};

export default function EditProfileModal({
    open,
    currentName,
    currentAvatar,
    onClose,
    onSuccess,
}: Props) {
    const [name, setName] = useState(currentName);
    const [avatar, setAvatar] = useState(currentAvatar ?? '');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset fields when modal opens
    useEffect(() => {
        if (open) {
            setName(currentName);
            setAvatar(currentAvatar ?? '');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open, currentName, currentAvatar]);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error('Name cannot be empty');
            return;
        }
        setLoading(true);
        try {
            const payload: { name?: string; avatar?: string } = {};
            if (name.trim() !== currentName) payload.name = name.trim();
            if (avatar.trim() !== (currentAvatar ?? '')) {
                payload.avatar = avatar.trim() || undefined;
            }

            const res = await updateMyProfile(payload);
            if (res.success) {
                toast.success('Profile updated!');
                onSuccess();
                onClose();
            } else {
                toast.error(res.message || 'Update failed');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Avatar Preview */}
                {/* <div className="flex justify-center pt-6 pb-2">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Preview"
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                            <span className="text-2xl font-bold text-white">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div> */}

                {/* Form */}
                <div className="px-6 py-4 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full pl-9 pr-4 h-11 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Avatar URL */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Avatar URL
                            <span className="ml-1.5 text-xs font-normal text-slate-400">(optional)</span>
                        </label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="url"
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full pl-9 pr-4 h-11 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>
                        {avatar && (
                            <p className="text-xs text-slate-400 mt-1.5">Preview updates above as you type</p>
                        )}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 px-6 py-5 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !name.trim()}
                        className="flex-1 h-11 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? 'Updating…' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
}