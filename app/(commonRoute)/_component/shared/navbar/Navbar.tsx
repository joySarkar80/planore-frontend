'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Calendar, Search, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { getUserFromToken, UserLogOut } from '@/services/auth'

const navLinks = [
  { name: 'Home', href: '/', icon: null },
  { name: 'Events', href: '/events', icon: Search },
  { name: 'About', href: '/about', icon: null },
]

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)

  const handleLogOut = async () => {
    try {
      await UserLogOut();
      window.dispatchEvent(new Event("authChanged"));
      setIsOpen(false); // মোবাইল মেনু খোলা থাকলে বন্ধ হবে
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userdata = await getUserFromToken();
        setUser(userdata);
      } catch (error) {
        setUser(null);
      }
    };

    getCurrentUser();

    window.addEventListener("authChanged", getCurrentUser);

    return () => {
      window.removeEventListener("authChanged", getCurrentUser);
    };
  }, [pathname]);

  const isLoggedIn = !!user

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span>Evently</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-2" />

          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname.startsWith('/dashboard') ? "text-primary" : "text-muted-foreground"
                )}
              >
                Dashboard
              </Link>

              {/* প্রোফাইল লিংকে কালার কন্ডিশন যোগ করা হয়েছে */}
              <Link
                href="/profile"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname.startsWith('/profile') ? "text-primary" : "text-muted-foreground"
                )}
              >
                Profile
              </Link>

              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )
            : (
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Register</Button>
                </Link>
              </div>
            )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>

            <SheetTrigger className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <Menu className="h-6 w-6" />
            </SheetTrigger>


            <SheetContent side="right" className="flex flex-col gap-6 pt-16 w-full max-w-xs bg-white">
              <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base font-semibold px-2 py-1 rounded-md transition-colors",
                      pathname === link.href ? "text-indigo-600 bg-indigo-50/50" : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                {isLoggedIn && (
                  <>
                    <div className="h-px bg-slate-100 my-2" />
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base font-semibold px-2 py-1 rounded-md transition-colors",
                        pathname.startsWith('/dashboard') ? "text-indigo-600 bg-indigo-50/50" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base font-semibold px-2 py-1 rounded-md transition-colors",
                        pathname === '/profile' ? "text-indigo-600 bg-indigo-50/50" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      My Profile
                    </Link>
                  </>
                )}
              </div>


              <div className="border-t border-slate-100 pt-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors w-full py-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
