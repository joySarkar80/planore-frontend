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