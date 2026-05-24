
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

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const setFeaturedEvent = async (eventId: string) => {
  const res = await fetch(`${BASE}/featured-events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId }),
    credentials: 'include',
  });
  return res.json();
};

export const getFeaturedEvent = async (): Promise<FeaturedEventData | null> => {
  try {
    const res = await fetch(`${BASE}/featured-events`, {
      next: { revalidate: 30, tags: ['featured-event'] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
};