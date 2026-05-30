import { getApiUrl } from "../api/apiConfig";

export type FeaturedEventData = {
  id: string;
  eventId: string;
  event: {
    id: string;
    title: string;
    description: string;
    startAt: string;
    venue: string | null;
    registrationFee: string;
    owner: { id: string; name: string; avatar: string | null };
    _count: { registrations: number };
  };
};


export const setFeaturedEvent = async (eventId: string) => {
  const res = await fetch(`${getApiUrl()}/featured-events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId }),
    credentials: 'include',

  });
  return res.json();
};

export const getFeaturedEvent = async (): Promise<FeaturedEventData | null> => {
  try {
    const res = await fetch(`${getApiUrl()}/featured-events`, {
      next: { revalidate: 2, tags: ['featured-event'] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
};