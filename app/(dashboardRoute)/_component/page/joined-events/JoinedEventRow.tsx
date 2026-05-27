'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import ReviewModal from './ReviewModal';
import { payPrivateEvent } from '@/services/registrations/clientRegistration';

export function JoinedEventRow({
    registration,
    onRefresh,
}: {
    registration: any;
    onRefresh: () => void;
}) {
    const { event, status, paymentStatus, createdAt } = registration;
    

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isPrivatePaidEvent =
        event.visibility === 'PRIVATE' && Number(event.registrationFee) > 0;
    const hasPaid = paymentStatus === 'PAID';

    const eventStartTime = new Date(event.startAt).getTime();
    const minutesPassed = (Date.now() - eventStartTime) / (1000 * 60);
    const is3MinutesPassed = minutesPassed >= 1;

    const existingReview = event.reviews?.length > 0 ? event.reviews[0] : null;
    const hasReviewed = !!existingReview;

    const showPayButton = isPrivatePaidEvent && !hasPaid;

    const fmtDate = (d: string) =>
        new Date(d).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    const fmtTime = (d: string) =>
        new Date(d).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

    const handleReviewClick = () => {
        if (hasReviewed) {
            setIsReviewModalOpen(true);
            return;
        }
        if (!is3MinutesPassed) {
            toast.error(
                'Reviews cannot be submitted at this moment. You can submit a review 2 minutes after the event starts.'
            );
            return;
        }
        setIsReviewModalOpen(true);
    };

    const handlePrivatePayment = async (eventId: string) => {
        try {
            setLoading(true);
            const response = await payPrivateEvent(eventId);
            if (response.success && response.data?.checkoutUrl) {
                window.location.assign(response.data.checkoutUrl);
                return;
            }
            toast.error(response.message || 'Failed to initialize payment');
            setLoading(false);
        } catch {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <>
            <tr className="hover:bg-gray-50 transition-colors">
                {/* Event Name */}
                <td className="px-4 py-3 font-medium text-gray-900 max-w-[180px]">
                    <p className="truncate">{event.title}</p>
                </td>

                {/* Visibility */}
                <td className="px-4 py-3 whitespace-nowrap">
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${event.visibility === 'PUBLIC'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                    >
                        {event.visibility}
                    </span>
                </td>

                {/* Join Date */}
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {fmtDate(event.startAt)}
                </td>

                {/* Join Time */}
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {fmtTime(event.startAt)}
                </td>

                {/* Join Status */}
                <td className="px-4 py-3 whitespace-nowrap">
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full border ${status === 'APPROVED'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : status === 'PENDING'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                    >
                        {status}
                    </span>
                </td>

                {/* Payment Status */}
                <td className="px-4 py-3 whitespace-nowrap">
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full border ${paymentStatus === 'PAID'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : paymentStatus === 'FREE'
                                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                                    : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}
                    >
                        {paymentStatus}
                    </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                        <Link
                            href={`/events/${event.id}`}
                            className="text-xs px-3 py-1.5 font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors whitespace-nowrap"
                        >
                            View Event
                        </Link>

                        {showPayButton && (
                            <button
                                onClick={() => handlePrivatePayment(event.id)}
                                disabled={loading}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                            >
                                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                                Pay
                            </button>
                        )}

                        {hasReviewed ? (
                            <button
                                onClick={handleReviewClick}
                                className="text-xs px-3 py-1.5 font-semibold text-purple-700 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors whitespace-nowrap"
                            >
                                View Review
                            </button>
                        ) : (
                            <button
                                onClick={handleReviewClick}
                                className="text-xs px-3 py-1.5 font-semibold text-indigo-700 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors whitespace-nowrap"
                            >
                                Leave a Review
                            </button>
                        )}
                    </div>
                </td>
            </tr>

            {isReviewModalOpen && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    eventId={event.id}
                    existingReview={existingReview}
                    onReviewSubmit={onRefresh}
                />
            )}
        </>
    );
}