"use server";

import { cookies } from "next/headers";
import { ICreateEvent } from "@/types/event";

export const createEvent = async (payload: ICreateEvent) => {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("accessToken");

  const cookieString = tokenCookie
    ? `${tokenCookie.name}=${tokenCookie.value}`
    : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const data = await res.json();

  // IMPORTANT
  if (!res.ok) {
    return {
      success: false,
      message: data.message,
      errorSources: data.errorSources || [],
    };
  }

  return {
    success: true,
    data: data.data,
  };
};



export const getAllEvents = async (query: Record<string, any>) => {
  try {
    const params = new URLSearchParams();

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
  })

  if (!res.ok) {
    throw new Error('Failed to fetch single event')
  }

  return res.json()
}


