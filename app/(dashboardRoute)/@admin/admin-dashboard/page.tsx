'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Save,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium">Manage your account preferences and security settings.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings */}
        <Card className="rounded-[2rem] border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black flex items-center gap-3">
              <User className="h-6 w-6 text-indigo-600" /> Profile Information
            </CardTitle>
            <CardDescription className="font-medium">Update your public profile details.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</Label>
                <Input id="name" defaultValue="Joy Sarkar" className="h-12 bg-slate-50 border-none rounded-xl font-bold" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                <Input id="email" defaultValue="joy@example.com" className="h-12 bg-slate-50 border-none rounded-xl font-bold" />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-slate-400">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself..." className="h-12 bg-slate-50 border-none rounded-xl font-bold" />
            </div>
            <Button className="bg-indigo-600 font-bold h-11 rounded-xl px-6">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="rounded-[2rem] border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black flex items-center gap-3">
              <Bell className="h-6 w-6 text-indigo-600" /> Notifications
            </CardTitle>
            <CardDescription className="font-medium">Choose how you want to be notified about event updates.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <div className="font-bold text-slate-900">Email Notifications</div>
                <div className="text-xs text-slate-400 font-medium">Receive all updates via email</div>
              </div>
              <div className="h-6 w-11 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <div className="font-bold text-slate-900">SMS Alerts</div>
                <div className="text-xs text-slate-400 font-medium">Get urgent updates on your phone</div>
              </div>
              <div className="h-6 w-11 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-[2rem] border-none shadow-xl bg-red-50/50 overflow-hidden border border-red-100">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black text-red-600 flex items-center gap-3">
              <Shield className="h-6 w-6" /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <p className="text-sm text-red-500 font-bold mb-4 italic">
              Warning: Deleting your account is permanent and cannot be undone. All your events and data will be removed.
            </p>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white font-bold h-11 rounded-xl">
              <Trash2 className="h-4 w-4 mr-2" /> Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
