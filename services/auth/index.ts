"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const result = await res.json();

        if (result.success && result.data?.accessToken) {
            const storeCookie = await cookies();
            storeCookie.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }
        return result;
    } catch (error) {
        console.error(error);
    }
};



export const getUserFromToken = async () => {
    const storeCookie = await cookies();
    const token = storeCookie.get("accessToken")?.value;
    let decodedData = null;
    if (token) {
        decodedData = await jwtDecode(token);
        return decodedData;
    } else {
        return null;
    }
};

export const UserLogOut = async () => {
    const storeCookie = await cookies();
    storeCookie.delete("accessToken");
};