import { getUserFromToken } from "@/services/auth";
import { AppSidebar } from "./_component/dashboard/app-sidebar";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const currentUser = await getUserFromToken();

  return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar role={currentUser.role} />

      <div className="lg:ml-64 min-h-screen">
        {/* Top Header */}
        <header className="hidden lg:flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Dashboard Area
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {currentUser.name?.slice(0, 2).toUpperCase()}
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {currentUser.name}
            </span>
          </div>
        </header>

        <main className="p-6 md:p-10">
          {currentUser.role === "ADMIN" && admin}
          {currentUser.role === "USER" && user}
        </main>
      </div>
    </div>
  );
}