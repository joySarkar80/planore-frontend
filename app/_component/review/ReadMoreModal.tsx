import { Review } from "@/app/(dashboardRoute)/_component/page/my-reviews/types";
import { X } from "lucide-react";
import { ReviewCardReview } from "./type";



interface ReadMoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    review: ReviewCardReview | null;
}

export default function ReadMoreModal({ isOpen, onClose, review }: ReadMoreModalProps) {
    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{review.event.title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {review.comment}
                </div>
            </div>
        </div>
    );
}