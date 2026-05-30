import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { RegisterForm } from '../_component/page/register/RegisterForm';

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
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">Join Krowdly</CardTitle>
          <p className="text-sm font-medium text-slate-500">Create an account to start hosting and joining events.</p>
        </CardHeader>
        <RegisterForm />
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
