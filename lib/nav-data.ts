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
                    title: "Overview",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                },
                // {
                //     title: "All Events",
                //     url: "/dashboard/",
                //     icon: Calendar,
                // },
                // {
                //     title: "All Users",
                //     url: "/dashboard/",
                //     icon: Users,
                // },
                // {
                //     title: "Reports",
                //     url: "/dashboard/",
                //     icon: ShieldCheck,
                // },
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
                    title: "My Events",
                    url: "/dashboard/my-events",
                    icon: Calendar,
                },
                {
                    title: "Invitations",
                    url: "/dashboard/invitations",
                    icon: Mail,
                },
                {
                    title: "Reviews",
                    url: "/dashboard/reviews",
                    icon: MessageSquare,
                },
            ],
        },
    ],
};