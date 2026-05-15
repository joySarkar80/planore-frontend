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
                {
                    title: "All Events",
                    url: "/dashboard/events",
                    icon: Calendar,
                },
                {
                    title: "All Users",
                    url: "/dashboard/users",
                    icon: Users,
                },
                {
                    title: "Reports",
                    url: "/dashboard/reports",
                    icon: ShieldCheck,
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
                    title: "Overview",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    title: "My Events",
                    url: "/dashboard/events",
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