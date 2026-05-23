import * as React from 'react'
import InviteUserContainer from '@/app/(dashboardRoute)/_component/page/my-events/InviteUserContainer'

type PageProps = {
    params: Promise<{ id: string }>
}

export default async function InviteUserPage({ params }: PageProps) {
    const { id } = await params

    // Auth layer implementation depends on your context
    // Fetch current user session data server-side
    const currentUserEmail = "owner@example.com" // Provide actual dynamic session email here

    return <InviteUserContainer eventId={id} currentUserEmail={currentUserEmail} />
}