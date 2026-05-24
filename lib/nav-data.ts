import {
    LayoutDashboard,
    Calendar,
    Mail,
    MessageSquare,
    ShieldCheck,
    Users,
} from "lucide-react";

export const NAV_DATA = {
    ADMIN: [
        {
            title: "Admin Dashboard",
            url: "/dashboard",
            items: [
                {
                    title: "Overviewsssss",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    title: "All Events",
                    url: "/dashboard/all-events",
                    icon: Calendar,
                },
                {
                    title: "All Users",
                    url: "/dashboard/all-users",
                    icon: Users,
                },
                {
                    title: "Create Event",
                    url: "/dashboard/create-event",
                    icon: Calendar,
                },
                {
                    title: "My created Events",
                    url: "/dashboard/my-events",
                    icon: Calendar,
                },
                {
                    title: "Invitations",
                    url: "/dashboard/invitations",
                    icon: Mail,
                },
                {
                    title: "Joined Events",
                    url: "/dashboard/joined-events",
                    icon: Calendar,
                },
                {
                    title: "My Reviews",
                    url: "/dashboard/reviews",
                    icon: MessageSquare,
                },
            ],
        },
    ],

    USER: [
        {
            title: "User Dashboard",
            url: "/dashboard",
            items: [
                {
                    title: "Overviewsssss",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    title: "Create Event",
                    url: "/dashboard/create-event",
                    icon: Calendar,
                },
                {
                    title: "My created Events",
                    url: "/dashboard/my-events",
                    icon: Calendar,
                },
                {
                    title: "Invitations",
                    url: "/dashboard/invitations",
                    icon: Mail,
                },
                {
                    title: "Joined Events",
                    url: "/dashboard/joined-events",
                    icon: Calendar,
                },
                {
                    title: "My Reviews",
                    url: "/dashboard/reviews",
                    icon: MessageSquare,
                },
            ],
        },
    ],
};