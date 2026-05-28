import { Star, Edit, Trash2, UserCircle } from "lucide-react";
import { ReviewCardReview } from "./type";



interface ReviewCardProps {
    review: ReviewCardReview;
    onReadMore: (review: ReviewCardReview) => void;
    // ये দুটো না দিলে edit/delete button দেখাবে না
    onEdit?: (review: ReviewCardReview) => void;
    onDelete?: (review: ReviewCardReview) => void;
}

const truncateText = (text: string | null | undefined, maxWords: number, maxChars: number) => {
    if (!text) return "";
    const words = text.split(" ");
    const byWords = words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
    const byChars = text.length > maxChars ? text.slice(0, maxChars).trim() + "..." : text;
    if (byWords.length < text.length || byChars.length < text.length) {
        return byWords.length < byChars.length ? byWords : byChars;
    }
    return text;
};

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const fmtTime = (d: string) =>
    new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

export default function ReviewCard({ review, onReadMore, onEdit, onDelete }: ReviewCardProps) {
    // console.log("from",review)
    const wordCount = review.comment ? review.comment.split(" ").length : 0;
    const isLongText = wordCount > 15 || (review.comment?.length || 0) > 100;
    const showActions = !!(onEdit && onDelete);

    return (
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white flex flex-col justify-start gap-4 h-full">
            {/* Header: reviewer info + review date */}
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between gap-2 flex-wrap">
                {/* Reviewer */}
                {review.user && (
                    <div className="flex items-center gap-2 min-w-0">
                        {review.user.avatar ? (
                            <img
                                src={review.user.avatar}
                                alt={review.user.name}
                                className="h-6 w-6 rounded-full object-cover flex-shrink-0"
                            />
                        ) : (
                            <UserCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="text-xs font-medium text-gray-700 truncate">
                            {review.user.name}
                        </span>
                    </div>
                )}

                {/* Review date & time */}
                <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">
                    {fmtDate(review.createdAt)} · {fmtTime(review.createdAt)}
                </span>
            </div>

            {/* Main Body Area */}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    {/* Event title */}
                    <h3 className="font-semibold text-base line-clamp-1 text-gray-900">
                        {review.event.title}
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mt-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={15}
                                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                            />
                        ))}
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-gray-700 break-words leading-relaxed">
                        {truncateText(review.comment, 15, 100)}
                        {isLongText && (
                            <button
                                onClick={() => onReadMore(review)}
                                className="text-blue-600 font-medium ml-1 hover:underline text-xs"
                            >
                                Read More
                            </button>
                        )}
                    </p>
                </div>

                {/* Edit / Delete Actions */}
                {showActions && (
                    <div className="flex items-center justify-end gap-2 mt-4 pt-2">
                        <button
                            onClick={() => onEdit!(review)}
                            className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                        >
                            <Edit size={13} /> Edit
                        </button>
                        <button
                            onClick={() => onDelete!(review)}
                            className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                        >
                            <Trash2 size={13} /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

}