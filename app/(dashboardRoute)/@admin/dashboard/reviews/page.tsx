import MyReviewsContainer from "@/app/(dashboardRoute)/_component/page/my-reviews/MyReviewsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Reviews | Dashboard",
  description: "Manage your reviews for different events.",
};

export default function MyReviewsPage() {
  return (
    <div className="p-6 md:p-8">
      <MyReviewsContainer />
    </div>
  );
}