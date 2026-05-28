import EditEventContainer from "@/app/(dashboardRoute)/_component/page/edit-event/EditEventContainer"


interface EditEventPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditEventPage({
    params,
}: EditEventPageProps) {

    const { id } = await params

    return (
        <EditEventContainer eventId={id} />
    )
}