'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { initiatePayment, respondToInvitation } from '@/services/invititions';

export default function InvitationRow({ invitation }: { invitation: any }) {
    const router = useRouter();
    const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const event = invitation.event;
    const isFree = Number(event.registrationFee) === 0;

    const isPublicPaid = event.visibility === 'PUBLIC' && !isFree;

    const acceptButtonText = isFree ? 'Accept' : 'Accept and Pay';

  const handleResponse = async (action: 'ACCEPT' | 'REJECT') => {
    try {
        setLoadingAction(action);

        // ১. Public Paid (Stripe Logic)
        if (action === 'ACCEPT' && isPublicPaid) {
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const successUrl = `${origin}/dashboard/joined-events`;
            const cancelUrl = `${origin}/dashboard/invitations`;

            const paymentRes = await initiatePayment(event.id, invitation.id, successUrl, cancelUrl);

            if (paymentRes.success && paymentRes.data?.paymentUrl) {
                toast.loading('Opening secure payment gateway...');
                window.location.href = paymentRes.data.paymentUrl;
                return; 
            } else {
                toast.error(paymentRes.message || "Failed to open Stripe page.");
                setLoadingAction(null);
            }
        }
        
        else {
            const res = await respondToInvitation(invitation.id, action);

            if (res.success) {
                if (action === 'ACCEPT') {
                    if (event.visibility === 'PRIVATE' && isFree) {
                        toast.success('Registration successfull. Please wait for owner approval.');
                    }
                    else if (event.visibility === 'PRIVATE' && !isFree) {
                        toast.success('Registration successfull. Please wait for event owner approval. Then make payment from the join event page. Dashboard -> then click join events.');
                    }
                    else if (event.visibility === 'PUBLIC' && isFree) {
                        toast.success('Event joined successfully!');
                    }

                    router.push('/dashboard/joined-events');
                }
                else if (action === 'REJECT') {
                    toast.success('Invitation has been rejected.');
                    setIsVisible(false);
                    router.refresh();
                }
            } else {
                toast.error(res.message || 'Action failed.');
                setLoadingAction(null); 
            }
        }
    } catch (error: any) {
        console.error(error);
        toast.error(error.message || 'An unexpected error occurred!');
        setLoadingAction(null); 
    } finally {
        
    }
};

    if (!isVisible) return null;

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-slate-800">{event.title}</h3>
                <p className="text-sm text-slate-500 mt-1">
                    Invited by: <span className="font-medium text-slate-700">{invitation.invitedBy?.name || 'Admin'}</span>
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-medium">
                    <span className={`px-2 py-1 rounded-full ${event.visibility === 'PUBLIC' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                        {event.visibility}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${isFree ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {isFree ? 'FREE' : `$${Number(event.registrationFee).toFixed(2)}`}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link href={`/events/${event.id}`}>
                    <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                        View
                    </button>
                </Link>

                <button
                    onClick={() => handleResponse('ACCEPT')}
                    disabled={loadingAction !== null}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    {loadingAction === 'ACCEPT' ? 'Processing...' : acceptButtonText}
                </button>

                <button
                    onClick={() => handleResponse('REJECT')}
                    disabled={loadingAction !== null}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                    {loadingAction === 'REJECT' ? 'Rejecting...' : 'Reject'}
                </button>
            </div>
        </div>
    );
}