import ManageParticipantsContainer from "@/app/(dashboardRoute)/_component/page/my-events/ManageParticipantsContainer";

type Props = {
    params: Promise<{ id: string }>
}

export default async function ManageParticipantsPage({ params }: Props) {
    const { id } = await params;

    return <ManageParticipantsContainer eventId={id} />;
}