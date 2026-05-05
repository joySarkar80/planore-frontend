export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  organizer: string;
  organizerId: string;
  category: "Public Free" | "Public Paid" | "Private Free" | "Private Paid";
  fee: number;
  imageUrl: string;
  isFeatured?: boolean;
  participants: string[];
  pendingRequests: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Invitation {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  fee: number;
  status: "pending" | "accepted" | "declined";
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2025",
    date: "2025-06-15",
    time: "10:00 AM",
    venue: "Main Convention Center",
    description: "Join industry leaders for a day of networking and insights into the future of technology, AI, and sustainable innovation.",
    organizer: "TechFlow Labs",
    organizerId: "joy123",
    category: "Public Paid",
    fee: 49,
    imageUrl: "https://picsum.photos/seed/tech/800/600",
    isFeatured: true,
    participants: ["user1", "user2", "user3"],
    pendingRequests: ["user4"],
    reviews: [
      { id: "r1", userId: "user1", userName: "Alice Morgan", rating: 5, comment: "Incredible lineup of speakers!", date: "2024-12-01" }
    ]
  },
  {
    id: "2",
    title: "Community Beach Cleanup",
    date: "2025-05-20",
    time: "08:30 AM",
    venue: "Pacific Coast",
    description: "Let's work together to keep our beaches clean. All equipment provided. Family friendly!",
    organizer: "Green Earth Org",
    organizerId: "org2",
    category: "Public Free",
    fee: 0,
    imageUrl: "https://picsum.photos/seed/beach/800/600",
    participants: ["joy123", "user1"],
    pendingRequests: [],
    reviews: []
  },
  {
    id: "3",
    title: "Exotic Coffee Tasting",
    date: "2025-07-02",
    time: "03:00 PM",
    venue: "The Roastery",
    description: "A private workshop for coffee enthusiast to taste rare beans from Ethiopia and Panama.",
    organizer: "Bean Master",
    organizerId: "user3",
    category: "Private Paid",
    fee: 25,
    imageUrl: "https://picsum.photos/seed/coffee/800/600",
    participants: ["joy123"],
    pendingRequests: ["user2"],
    reviews: []
  },
  {
    id: "4",
    title: "Intro to UI/UX Design",
    date: "2025-05-25",
    time: "06:00 PM",
    venue: "Online - Zoom",
    description: "Learn the basics of Figma and user-centric design principles in this 2-hour workshop.",
    organizer: "Design Academy",
    organizerId: "joy123",
    category: "Public Free",
    fee: 0,
    imageUrl: "https://picsum.photos/seed/design/800/600",
    participants: ["user5", "user6"],
    pendingRequests: [],
    reviews: []
  },
  {
    id: "5",
    title: "Saturday Night Jazz",
    date: "2025-06-10",
    time: "08:00 PM",
    venue: "Blue Note Club",
    description: "An evening of smooth jazz featuring the Miles Trio. Limited seating.",
    organizer: "Blue Note",
    organizerId: "user8",
    category: "Public Paid",
    fee: 30,
    imageUrl: "https://picsum.photos/seed/jazz/800/600",
    participants: [],
    pendingRequests: [],
    reviews: []
  },
  {
    id: "6",
    title: "Startup Founders Brunch",
    date: "2025-06-22",
    time: "11:00 AM",
    venue: "Lakeside Bistro",
    description: "Exclusive meetup for early-stage founders to share challenges and successes.",
    organizer: "Founder Network",
    organizerId: "user10",
    category: "Private Free",
    fee: 0,
    imageUrl: "https://picsum.photos/seed/brunch/800/600",
    participants: ["user11"],
    pendingRequests: ["joy123"],
    reviews: []
  },
  {
    id: "7",
    title: "Modern Art Workshop",
    date: "2025-07-15",
    time: "01:00 PM",
    venue: "Modern Art Gallery",
    description: "Explore abstract techniques with local artists. All materials included.",
    organizer: "Arts Collective",
    organizerId: "user12",
    category: "Public Paid",
    fee: 15,
    imageUrl: "https://picsum.photos/seed/art/800/600",
    participants: [],
    pendingRequests: [],
    reviews: []
  },
  {
    id: "8",
    title: "Yoga in the Park",
    date: "2025-05-30",
    time: "07:00 AM",
    venue: "Central Park",
    description: "Energizing morning flow for all levels. Bring your own mat.",
    organizer: "Serenity Yoga",
    organizerId: "user13",
    category: "Public Free",
    fee: 0,
    imageUrl: "https://picsum.photos/seed/yoga/800/600",
    participants: [],
    pendingRequests: [],
    reviews: []
  },
  {
    id: "9",
    title: "Game Dev Meetup",
    date: "2025-08-05",
    time: "05:00 PM",
    venue: "Gamer's Hub",
    description: "Showcase your indie projects and get feedback from fellow developers.",
    organizer: "Indie Hub",
    organizerId: "joy123",
    category: "Public Free",
    fee: 0,
    imageUrl: "https://picsum.photos/seed/game/800/600",
    participants: [],
    pendingRequests: [],
    reviews: []
  }
];

export const MOCK_INVITATIONS: Invitation[] = [
  { id: "i1", eventId: "3", eventTitle: "Exotic Coffee Tasting", date: "2025-07-02", fee: 25, status: "pending" },
  { id: "i2", eventId: "6", eventTitle: "Startup Founders Brunch", date: "2025-06-22", fee: 0, status: "accepted" }
];
