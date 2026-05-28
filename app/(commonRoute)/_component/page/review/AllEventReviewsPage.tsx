'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Star } from 'lucide-react'
import { getEventReviewsService } from '@/services/review'
import ReviewCard from '@/app/_component/review/ReviewCard'
import ReadMoreModal from '@/app/_component/review/ReadMoreModal'
import { ReviewCardReview } from '@/app/_component/review/type'


export default function AllEventReviewsPage() {
    const { id: eventId } = useParams() as { id: string }
    const router = useRouter()

    const [reviews, setReviews] = useState<ReviewCardReview[]>([])
    const [loading, setLoading] = useState(true)
    const [readMoreReview, setReadMoreReview] = useState<ReviewCardReview | null>(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getEventReviewsService(eventId)
                if (res.success) setReviews(res.data || [])
            } finally {
                setLoading(false)
            }
        }
        fetch()
        window.scrollTo(0, 0)
    }, [eventId])

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <div className="h-4 w-px bg-gray-200" />
                    <h1 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                        All Reviews
                        {!loading && (
                            <span className="text-sm font-normal text-gray-400">
                                ({reviews.length})
                            </span>
                        )}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl bg-white">
                        No reviews yet for this event.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onReadMore={setReadMoreReview}
                            // onEdit / onDelete intentionally omitted
                            />
                        ))}
                    </div>
                )}
            </div>

            <ReadMoreModal
                isOpen={!!readMoreReview}
                onClose={() => setReadMoreReview(null)}
                review={readMoreReview}
            />
        </div>
    )
}