import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 overflow-hidden rounded-3xl">
        <CardHeader className="space-y-4 text-center p-10 pb-6">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome Back</CardTitle>
          <p className="text-sm font-medium text-slate-500">Log in to manage your events and registrations.</p>
        </CardHeader>
        <CardContent className="space-y-6 px-10 pb-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl" id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="password">Password</label>
              <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl" id="password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100 rounded-xl">Log In</Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-slate-50 py-8 bg-slate-50/50">
          <div className="text-center text-sm font-medium text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-600 font-extrabold hover:underline">Sign up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
