'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getMyProfile } from '@/services/users';
import type { MyProfile } from '@/services/users';
import ProfileHeader from '../_component/page/profile/ProfileHeader';
import UpcomingJoinedEvents from '../_component/page/profile/UpcomingJoinedEvents';
import EditProfileModal from '../_component/page/profile/EditProfileModal';

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<MyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        const data = await getMyProfile();
        if (!data) {
            router.push('/login');
            return;
        }
        setProfile(data);
        setLoading(false);
    }, [router]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <>
            <div className="min-h-screen bg-slate-50 py-10">
                <div className="container mx-auto px-4 max-w-2xl space-y-6">
                    {/* Header Card */}
                    <ProfileHeader
                        profile={profile}
                        onEditClick={() => setEditOpen(true)}
                    />

                    {/* Upcoming Events */}
                    <UpcomingJoinedEvents registrations={profile.registrations} />
                </div>
            </div>

            {/* Edit Modal */}
            <EditProfileModal
                open={editOpen}
                currentName={profile.name}
                currentAvatar={profile.avatar}
                onClose={() => setEditOpen(false)}
                onSuccess={fetchProfile}
            />
        </>
    );
}