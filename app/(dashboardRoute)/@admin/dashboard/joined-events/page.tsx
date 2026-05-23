import JoinedEventsContainer from '@/app/(dashboardRoute)/_component/page/joined-events/JoinedEventsContainer';
import React from 'react';

export default function JoinedEventsPage() {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Joined Events</h1>
                <p className="text-slate-500 mt-1">Manage your event participations, payments, and reviews.</p>
            </div>

            <JoinedEventsContainer />
        </div>
    );
}