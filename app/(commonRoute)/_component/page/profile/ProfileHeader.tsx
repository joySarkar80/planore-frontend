import { User, Mail, Shield, CalendarDays } from 'lucide-react';
import type { MyProfile } from '@/services/users';

type Props = {
    profile: MyProfile;
    onEditClick: () => void;
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });
}

export default function ProfileHeader({ profile, onEditClick }: Props) {
    const initials = profile.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top gradient banner */}
            {/* <div className="h-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" /> */}

            <div className="px-8 pb-8">
                {/* Avatar */}
                {/* <div className="flex items-end justify-between -mt-12 mb-6">
                    <div className="relative">
                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">{initials}</span>
                            </div>
                        )}
                        <span
                            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${profile.role === 'ADMIN' ? 'bg-amber-400' : 'bg-green-400'
                                }`}
                        />
                    </div>

                    
                </div> */}
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">{profile.name}</h1>
                    <button
                        onClick={onEditClick}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors shadow-sm"
                    >
                        Edit Profile
                    </button>

                    {/* Info */}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-indigo-400" />
                        <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-indigo-400" />
                        <span className="capitalize">{profile.role}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-indigo-400" />
                        <span>Joined {formatDate(profile.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}