'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import ReviewModal from './ReviewModal';

export function JoinedEventRow({ registration, onRefresh }: { registration: any, onRefresh: () => void }) {
    const { event, status, paymentStatus, reviews } = registration;
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isPaying, setIsPaying] = useState(false);

    // ==========================================
    // বিজনেস লজিক কন্ডিশনস
    // ==========================================

    const isApproved = status === 'APPROVED';
    const isPending = status === 'PENDING';

    // আপনার স্কিমা অনুযায়ী ইভেন্টটি পেইড এবং প্রাইভেট কিনা তা এখানে চেক করুন
    // উদাহরণ: event.type === 'PRIVATE' && event.price > 0 (আপনার আসল ফিল্ডের নাম বসান)
    const isPrivatePaidEvent = event.type === 'PRIVATE' && event.isPaid;
    const hasPaid = paymentStatus === 'PAID';

    // ১২ ঘণ্টা পার হয়েছে কিনা তা চেক করার ক্যালকুলেশন (startAt ফিল্ড ধরে)
    const eventStartTime = new Date(event.startAt).getTime();
    const currentTime = new Date().getTime();
    const hoursPassed = (currentTime - eventStartTime) / (1000 * 60 * 60);
    const is12HoursPassed = hoursPassed >= 12;

    // রিভিউ চেক লজিক (সার্ভিস থেকে ফিল্টার হয়ে আসা রিভিউ অ্যারে চেক করা হচ্ছে)
    const existingReview = reviews && reviews.length > 0 ? reviews[0] : (event.reviews && event.reviews.length > 0 ? event.reviews[0] : null);
    const hasReviewed = !!existingReview;

    // রিভিউ বাটন শো করার ৩টি শর্ত: Approved হতে হবে, পেইড হলে পেমেন্ট Paid হতে হবে, এবং ১২ ঘণ্টা পার হতে হবে
    const canLeaveReview = isApproved && (!isPrivatePaidEvent || hasPaid) && is12HoursPassed;

    // পে বাটন লজিক: প্রাইভেট পেইড ইভেন্ট এবং এখনো আনপেইড থাকলে দেখাবে। ওনার এক্সেপ্ট (APPROVED) করলে এনাবল হবে, পেন্ডিং থাকলে ডিজেবল।
    const showPayButton = isPrivatePaidEvent && !hasPaid;
    const isPayButtonDisabled = isPending || !isApproved || isPaying;

    const handlePayment = async () => {
        setIsPaying(true);
        try {
            toast.info("Redirecting to Stripe...");
            // আপনার পেমেন্ট গেটওয়ে বা স্ট্রাইপ রিডাইরেকশনের লজিক এখানে হবে
        } catch (err) {
            toast.error("Payment initiation failed");
            setIsPaying(false);
        }
    };

    return (
        <>
            <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-800">{event.title}</td>
                <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' :
                            status === 'PENDING' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                        {status}
                    </span>
                </td>
                <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${paymentStatus === 'PAID' ? 'bg-blue-50 text-blue-700' :
                            paymentStatus === 'FREE' ? 'bg-slate-100 text-slate-600' : 'bg-orange-50 text-orange-700'
                        }`}>
                        {paymentStatus}
                    </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                    {/* VIEW BUTTON */}
                    <Link href={`/events/${event.id}`} className="px-3 py-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition">
                        View
                    </Link>

                    {/* PAY BUTTON */}
                    {showPayButton && (
                        <button
                            disabled={isPayButtonDisabled}
                            onClick={handlePayment}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-white bg-slate-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition"
                        >
                            {isPaying && <Loader2 className="h-3 w-3 animate-spin" />}
                            Pay
                        </button>
                    )}

                    {/* REVIEW BUTTON SWITCH */}
                    {hasReviewed ? (
                        <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="px-3 py-1.5 text-sm font-semibold text-purple-600 border border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                        >
                            View Your Review
                        </button>
                    ) : (
                        <button
                            disabled={!canLeaveReview}
                            onClick={() => setIsReviewModalOpen(true)}
                            title={!is12HoursPassed ? "You can review 12 hours after the event starts" : ""}
                            className="px-3 py-1.5 text-sm font-semibold text-slate-700 border border-slate-200 bg-white rounded-lg disabled:opacity-40 disabled:bg-slate-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                        >
                            Leave a Review
                        </button>
                    )}
                </td>
            </tr>

            {/* REVIEW MODAL */}
            {isReviewModalOpen && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    registration={registration}
                    existingReview={existingReview}
                    onReviewSubmit={onRefresh}
                />
            )}
        </>
    );
}