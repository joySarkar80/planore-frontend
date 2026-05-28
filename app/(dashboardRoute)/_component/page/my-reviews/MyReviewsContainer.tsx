"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getMyReviewsService, updateReviewService, deleteReviewService } from "@/services/review";




import ReadMoreModal from "@/app/_component/review/ReadMoreModal";
import EditReviewModal from "../shared/EditReviewModal";
import DeleteConfirmModal from "../shared/DeleteConfirmModal";
import { ReviewCardReview } from "@/app/_component/review/type";
import ReviewCard from "@/app/_component/review/ReviewCard";


export default function MyReviewsContainer() {
    const router = useRouter();
    const [reviews, setReviews] = useState<ReviewCardReview[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal Control States
    const [selectedReview, setSelectedReview] = useState<ReviewCardReview | null>(null);
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchReviews = async () => {
        setLoading(true);
        const res = await getMyReviewsService();
        // console.log("from my review page", res.data)
        if (res?.success) {
            setReviews(res.data);
        } else {
            toast.error(res?.message || "Failed to load reviews");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Action Triggers
    const handleOpenReadMore = (review: ReviewCardReview) => {
        setSelectedReview(review);
        setIsReadMoreOpen(true);
    };

    const handleOpenEdit = (review: ReviewCardReview) => {
        setSelectedReview(review);
        setIsEditOpen(true);
    };

    const handleOpenDelete = (review: ReviewCardReview) => {
        setSelectedReview(review);
        setIsDeleteOpen(true);
    };

    // API Request Handlers
    const handleUpdateReview = async (rating: number, comment: string) => {
        if (!selectedReview) return;
        setIsActionLoading(true);
        const res = await updateReviewService(selectedReview.id, { rating, comment });

        if (res?.success) {
            toast.success("Review updated successfully!");
            setIsEditOpen(false);
            fetchReviews();
            router.refresh();
        } else {
            toast.error(res?.message || "Failed to update");
        }
        setIsActionLoading(false);
    };

    const handleDeleteReview = async () => {
        if (!selectedReview) return;
        setIsActionLoading(true);
        const res = await deleteReviewService(selectedReview.id);

        if (res?.success) {
            toast.success("Review deleted successfully!");
            setIsDeleteOpen(false);
            fetchReviews();
            router.refresh();
        } else {
            toast.error(res?.message || "Failed to delete");
        }
        setIsActionLoading(false);
    };

    if (loading) return <div className="p-8 text-center animate-pulse">Loading your reviews...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">My Reviews</h2>

            {reviews.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">You haven't written any reviews yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onReadMore={handleOpenReadMore}
                            onEdit={handleOpenEdit}
                            onDelete={handleOpenDelete}
                        />
                    ))}
                </div>
            )}

            {/* Read More Modal */}
            <ReadMoreModal
                isOpen={isReadMoreOpen}
                onClose={() => setIsReadMoreOpen(false)}
                review={selectedReview}
            />

            {/* Edit Modal */}
            <EditReviewModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                review={selectedReview}
                onUpdate={handleUpdateReview}
                isUpdating={isActionLoading}
            />

            {/* Delete Modal */}
            <DeleteConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                review={selectedReview}
                onDelete={handleDeleteReview}
                isDeleting={isActionLoading}
            />
        </div>
    );
}