import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { LoginForm } from '../_component/page/login/LoginForm';

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
        <LoginForm />
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
