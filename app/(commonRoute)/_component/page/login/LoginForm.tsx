"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { FormEvent, useState } from "react";

const formSchema = z.object({
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // লোডিং স্টেট

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const rawData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        const validation = formSchema.safeParse(rawData);

        if (!validation.success) {
            toast.error(validation.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await loginUser(validation.data); 

            if (res?.success) {
                toast.success(res.message || "Login Successful");
                // router.replace("/");
                router.refresh();

                setTimeout(() => {
                    window.dispatchEvent(new Event("authChanged"));
                    router.push("/"); // হোম পেজে রিডাইরেক্ট
                }, 500);
            } else {
                toast.error(res?.message || "Invalid credentials");
            }
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <CardContent className="space-y-6 px-10 pb-10">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="email">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                            className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="password">Password</label>
                        <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                            className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100 rounded-xl"
                >
                    {loading ? "Logging in..." : "Log In"}
                </Button>
            </CardContent>
        </form >
    );
}
