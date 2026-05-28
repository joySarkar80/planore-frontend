'use client'

import { useEffect, useState } from 'react'
import { Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getEventReviewsService } from '@/services/review'
import ReviewCard from '@/app/_component/review/ReviewCard'


import ReadMoreModal from '@/app/_component/review/ReadMoreModal'
import { ReviewCardReview } from '@/app/_component/review/type'

interface EventReviewsSectionProps {
    eventId: string
}

export default function EventReviewsSection({ eventId }: EventReviewsSectionProps) {
    const [reviews, setReviews] = useState<ReviewCardReview[]>([])
    const [loading, setLoading] = useState(true)
    const [readMoreReview, setReadMoreReview] = useState<ReviewCardReview | null>(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getEventReviewsService(eventId)
                if (res.success) setReviews(res.data || [])
                    console.log("from review section",  res.data)
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [eventId])

    const previewReviews = reviews.slice(0, 3)
    const hasMore = reviews.length > 3

    return (
        <section className="mt-12 container mx-auto px-4">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                    Reviews
                    <span className="text-base font-normal text-gray-400 ml-1">
                        ({reviews.length})
                    </span>
                </h2>

                {hasMore && (
                    <Link
                        href={`/events/${eventId}/reviews`}
                        className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        View all
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-indigo-600" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-white">
                    No reviews yet. Be the first to leave one!
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {previewReviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onReadMore={setReadMoreReview}
                            // onEdit / onDelete intentionally omitted → buttons hidden
                            />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="mt-6 text-center">
                            <Link
                                href={`/events/${eventId}/reviews`}
                                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                            >
                                View all {reviews.length} reviews
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </>
            )}

            <ReadMoreModal
                isOpen={!!readMoreReview}
                onClose={() => setReadMoreReview(null)}
                review={readMoreReview}
            />
        </section>
    )
}