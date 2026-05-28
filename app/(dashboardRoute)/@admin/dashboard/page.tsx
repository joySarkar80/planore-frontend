'use client';

import * as React from 'react';
import { getMyInvitationsService, getDashboardStats, RecentEventType, InvitationType } from '@/services/dashboard';
import { countUpcomingApproved, filterRecentEvents } from '../../_component/dashboard/helpers';
import DashboardHeader from '../../_component/dashboard/DashboardHeader';
import StatCards from '../../_component/dashboard/StatCards';
import InvitationsFeed from '../../_component/dashboard/InvitationsFeed';
import RecentEventsTable from '../../_component/dashboard/RecentEventsTable';
import NewEventsTable from '../../_component/dashboard/NewEventsTable';
import { getAllEventsForAdmin } from '@/services/events';



export default function DashboardPage() {
    const [newEvents, setNewEvents] = React.useState<RecentEventType[]>([]);
    const [invitations, setInvitations] = React.useState<InvitationType[]>([]);
    const [upcomingApprovedCount, setUpcomingApprovedCount] = React.useState<number | null>(null);
    const [upcomingRegistrationsCount, setUpcomingRegistrationsCount] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAll = async () => {
            const [eventsRes, invitationsRes, statsRes] = await Promise.all([
                getAllEventsForAdmin({
                    status: 'PENDING',
                    limit: 5,
                    page: 1,
                    sortBy: 'createdAt',
                    sortOrder: 'desc',
                    upcoming: 'true'
                }),

                getMyInvitationsService(),
                getDashboardStats(),
            ]);

            if (eventsRes.success) {
                setNewEvents((eventsRes.data.data));
            }
            // console.log(eventsRes.data)
            if (invitationsRes.success) {
                setInvitations(invitationsRes.data);
            }
            // console.log('StatsRes:', statsRes.data);

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
                <NewEventsTable events={newEvents} loading={loading} />
                <InvitationsFeed invitations={invitations} loading={loading} />
            </div>
        </div>
    );
}