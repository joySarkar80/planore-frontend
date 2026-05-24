const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyInvitations = async () => {
  const res = await fetch(`${BASE}/invitations/my-invitations`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });
  const data = await res.json();
  return data.data;
};

export const respondToInvitation = async (registrationId: string, action: 'ACCEPT' | 'REJECT') => {
  const res = await fetch(`${BASE}/invitations/${registrationId}/respond`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
    credentials: 'include',
  });
  return await res.json();
};

export const initiatePayment = async (
  eventId: string,
  registrationId: string,
  successUrl: string,
  cancelUrl: string
) => {
  const res = await fetch(`${BASE}/payments/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventId, registrationId, successUrl, cancelUrl }),
    credentials: 'include',
  });
  return await res.json();
};

export const joinEvent = async (eventId: string) => {
  try {
    const res = await fetch(`${BASE}/registrations/join/${eventId}`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: 'Something went wrong' };
  }
};