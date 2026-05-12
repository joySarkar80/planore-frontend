"use server";

// export const getAllEvents = async (searchTerm?: string) => {
//     try {
//         // যদি সার্চ প্যারামিটার থাকে তবে সেটি ইউআরএল এ যোগ হবে
//         const queryParams = searchTerm ? `?searchTerm=${searchTerm}` : "";

//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events${queryParams}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             next: {
//                 revalidate: 60, // প্রতি ৬০ সেকেন্ড পর ডাটা আপডেট হবে (ISR)
//                 tags: ["events"], // অন-ডিমান্ড রিভ্যালিডেশনের জন্য ট্যাগ
//             },
//         });

//         const result = await res.json();
//         return result;
//     } catch (error) {
//         console.error("Error fetching events:", error);
//         return {
//             success: false,
//             message: "Could not fetch events",
//             data: [],
//         };
//     }
// };

export const getAllEvents = async (query: Record<string, any>) => {
  try {
    const params = new URLSearchParams();

    // অবজেক্টের কী-ভ্যালু জোড়াগুলো কুয়েরি প্যারামিটারে রূপান্তর
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString() ? `?${params.toString()}` : "";

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["events"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      success: false,
      message: "Could not fetch events",
      data: [],
    };
  }
};

// services/index.ts

export const getSingleEvent = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch single event')
    }

    return res.json()
}
