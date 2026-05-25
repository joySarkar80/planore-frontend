'use client';

import * as React from 'react';
import { getRecentEventsService, getMyInvitationsService, getDashboardStats, RecentEventType, InvitationType } from '@/services/dashboard';
import { countUpcomingApproved, filterRecentEvents } from '../../_component/dashboard/helpers';
import DashboardHeader from '../../_component/dashboard/DashboardHeader';
import StatCards from '../../_component/dashboard/StatCards';
import InvitationsFeed from '../../_component/dashboard/InvitationsFeed';
import RecentEventsTable from '../../_component/dashboard/RecentEventsTable';



export default function DashboardPage() {
    const [recentEvents, setRecentEvents] = React.useState<RecentEventType[]>([]);
    const [invitations, setInvitations] = React.useState<InvitationType[]>([]);
    const [upcomingApprovedCount, setUpcomingApprovedCount] = React.useState<number | null>(null);
    const [upcomingRegistrationsCount, setUpcomingRegistrationsCount] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAll = async () => {
            const [eventsRes, invitationsRes, statsRes] = await Promise.all([
                getRecentEventsService(),
                getMyInvitationsService(),
                getDashboardStats(),
            ]);

            if (eventsRes.success) {
                setRecentEvents(filterRecentEvents(eventsRes.data));
            }
            
            if (invitationsRes.success) {
                setInvitations(invitationsRes.data);
            }
            console.log('StatsRes:', statsRes.data);
            
            if (statsRes.success && statsRes.data) {
                setUpcomingApprovedCount(statsRes.data.upcomingApprovedEventsCount);
                setUpcomingRegistrationsCount(statsRes.data.upcomingRegistrationsCount);
            }

            setLoading(false);
        };

        fetchAll();
    }, []);

    return (
        <div className="space-y-10">
            <DashboardHeader />
            <StatCards
                upcomingApprovedCount={upcomingApprovedCount}
                upcomingRegistrationsCount={upcomingRegistrationsCount}
                loading={loading}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RecentEventsTable events={recentEvents} loading={loading} />
                <InvitationsFeed invitations={invitations} loading={loading} />
            </div>
        </div>
    );
}