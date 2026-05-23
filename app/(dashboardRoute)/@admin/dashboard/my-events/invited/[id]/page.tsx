import * as React from 'react'
import InvitedUsersContainer from '@/app/(dashboardRoute)/_component/page/my-events/InvitedUsersContainer'

type PageProps = {
    params: Promise<{ id: string }>
}

export default async function InvitedUsersPage({ params }: PageProps) {
    const { id } = await params
    return <InvitedUsersContainer eventId={id} />
}