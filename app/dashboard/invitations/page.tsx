'use client'

import * as React from 'react'
import { MOCK_INVITATIONS } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  CreditCard,
  History
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function InvitationsPage() {
  const [invitations, setInvitations] = React.useState(MOCK_INVITATIONS)

  const pendingInvs = invitations.filter(i => i.status === 'pending')
  const historyInvs = invitations.filter(i => i.status !== 'pending')

  const handleAction = (id: string, status: 'accepted' | 'declined') => {
    setInvitations(prev => prev.map(inv => 
      inv.id === id ? { ...inv, status } : inv
    ))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Invitations</h1>
          <p className="text-slate-500 font-medium">Manage pending event invitations and requests sent to you.</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-8 h-12 p-1 bg-white border border-slate-200 rounded-xl max-w-md">
          <TabsTrigger value="pending" className="px-6 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold transition-all flex items-center gap-2">
            <Mail className="h-4 w-4" /> Pending ({pendingInvs.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="px-6 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold transition-all flex items-center gap-2">
            <History className="h-4 w-4" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingInvs.length > 0 ? (
            pendingInvs.map((inv) => (
              <Card key={inv.id} className="rounded-2xl border-slate-200/60 bg-white shadow-sm overflow-hidden border-l-4 border-l-indigo-600">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 w-full">
                    <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Mail className="h-7 w-7 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">{inv.eventTitle}</h3>
                      <div className="flex items-center text-sm font-bold text-slate-400 gap-4">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {inv.date}</span>
                        {inv.fee > 0 && <Badge variant="outline" className="border-indigo-200 text-indigo-600 font-bold">${inv.fee} Fee</Badge>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      className="flex-1 md:flex-none border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold h-11 rounded-xl"
                      onClick={() => handleAction(inv.id, 'declined')}
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Decline
                    </Button>
                    <Button 
                      className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 rounded-xl px-6"
                      onClick={() => handleAction(inv.id, 'accepted')}
                    >
                      {inv.fee > 0 ? (
                        <><CreditCard className="h-4 w-4 mr-2" /> Pay & Accept</>
                      ) : (
                        <><CheckCircle2 className="h-4 w-4 mr-2" /> Accept</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
              <Mail className="h-14 w-14 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold italic">No pending invitations for you.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {historyInvs.length > 0 ? (
            historyInvs.map((inv) => (
              <Card key={inv.id} className="rounded-2xl border-slate-200/60 bg-white/50 shadow-sm opacity-80">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${inv.status === 'accepted' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                      {inv.status === 'accepted' ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{inv.eventTitle}</h3>
                      <p className="text-sm font-medium text-slate-400">{inv.date}</p>
                    </div>
                  </div>
                  <Badge variant={inv.status === 'accepted' ? 'secondary' : 'outline'} className={`rounded-lg py-1 px-3 ${inv.status === 'accepted' ? 'bg-green-100 text-green-700' : 'text-slate-400'}`}>
                    {inv.status.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400 font-bold italic">No history yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
