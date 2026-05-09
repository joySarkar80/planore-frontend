"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { FormEvent, useState } from "react";

// ১. ভ্যালিডেশন স্কিমা
const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const rawData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        const validation = registerSchema.safeParse(rawData);

        if (!validation.success) {
            toast.error(validation.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            const res = await registerUser(validation.data);

            if (res?.success) {
                toast.success("Account created successfully!");
                router.push("/login");
            } else {
                toast.error(res?.message || "Registration failed");
            }
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <CardContent className="space-y-5 px-10 pb-10">
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="name">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                            name="name"
                            className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                </div>

                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="email">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                            name="email"
                            className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                </div>

                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="password">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                            name="password"
                            className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100 rounded-xl mt-4"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </Button>
            </CardContent>
        </form>
    );
}
