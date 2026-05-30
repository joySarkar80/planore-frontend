// services/api/config.ts
export const getApiUrl = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_BASE_URL;
    }
    return "/server";
};
