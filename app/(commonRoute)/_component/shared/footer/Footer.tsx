import Link from 'next/link'
import { Calendar, Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <span>Krowdly</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              The world&apos;s premier platform for creating, discovering, and joining meaningful events.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Twitter className="h-5 w-5 cursor-pointer hover:text-indigo-600 transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-indigo-600 transition-colors" />
              <Github className="h-5 w-5 cursor-pointer hover:text-indigo-600 transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">Features</h3>
            <ul className="flex flex-col gap-2">
              {['Browse Events', 'Create Event', 'Dashboard', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">Support</h3>
            <ul className="flex flex-col gap-2">
              {['Help Center', 'About Us', 'Contact', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">Private Policy</h3>
            <p className="text-sm text-slate-500 mb-4">
              Subscribe to stay updated with the latest events and features.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white border text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-indigo-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 uppercase tracking-widest font-medium">
          <p>© 2025 Krowdly Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms of Use</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
