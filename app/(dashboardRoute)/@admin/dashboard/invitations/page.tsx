import InvitationsContainer from "@/app/(dashboardRoute)/_component/page/invititions/InvitationsContainer";

export default function InvitationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Event Invitations</h1>
        <p className="text-slate-500 mt-1">
          Review and respond to events you have been invited to.
        </p>
      </div>

      <InvitationsContainer />
    </div>
  );
}
