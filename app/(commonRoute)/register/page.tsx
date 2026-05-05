import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-20">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 overflow-hidden rounded-3xl">
        <CardHeader className="space-y-4 text-center p-10 pb-6">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">Join Planora</CardTitle>
          <p className="text-sm font-medium text-slate-500">Create an account to start hosting and joining events.</p>
        </CardHeader>
        <CardContent className="space-y-5 px-10 pb-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="name">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl" id="name" type="text" placeholder="John Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl" id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500 rounded-xl" id="password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100 rounded-xl mt-4">Create Account</Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-slate-50 py-8 bg-slate-50/50">
          <div className="text-center text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-extrabold hover:underline">Log in</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
