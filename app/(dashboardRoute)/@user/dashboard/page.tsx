import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Users, 
  Eye,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { name: 'Active Events', value: '12', icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Total Registrations', value: '8422', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Profile Views', value: '1.2k', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Conversion Rate', value: '24%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, Joy! Here&apos;s what&apos;s happening with your events today.</p>
        </div>
        <Link href="/dashboard/create-event">
          <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 font-bold shadow-lg shadow-indigo-100">
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-slate-200/60 shadow-sm bg-white overflow-hidden group hover:border-indigo-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.icon}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">+12% vs last month</div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.name}</p>
                <div className="flex items-baseline space-x-2">
                   <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Events Table */}
        <Card className="lg:col-span-2 border-slate-200/60 bg-white overflow-hidden rounded-2xl shadow-sm">
          <CardHeader className="border-b border-slate-50 p-6 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-extrabold text-slate-900">Recently Created</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50">View All</Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Event Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-slate-900">Modern Web Design Series #{i}</td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-500">Oct 2{i}, 2026</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase border border-indigo-100">Public</span>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex items-center text-[10px] font-bold text-emerald-600 uppercase">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                        Active
                       </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="border-slate-200/60 bg-white rounded-2xl shadow-sm">
           <CardHeader className="border-b border-slate-50 p-6">
            <CardTitle className="text-xl font-extrabold text-slate-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 relative">
                  {i < 4 && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-100"></div>}
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">New registration for Web Summit</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">User: user_482{i}</p>
                    <p className="text-[10px] font-bold text-indigo-500 mt-2 uppercase tracking-tight">{i * 2} mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
