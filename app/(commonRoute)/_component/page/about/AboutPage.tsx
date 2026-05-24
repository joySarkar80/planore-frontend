import Link from "next/link";
import {
  Calendar,
  ShieldCheck,
  Users,
  CreditCard,
  Star,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Event Management",
      description:
        "Create, manage, edit, and organize events from one powerful dashboard.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Invite participants, manage approvals, and build thriving communities.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Handle paid registrations with integrated payment workflows.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Reliable",
      description:
        "JWT authentication, role-based access control, and secure event participation.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-24 md:py-36">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 mb-6">
              ✨ About Planora
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              Create, Discover &
              <span className="text-indigo-500">
                {" "}Manage Events
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10">
              Planora helps organizers create engaging events,
              manage participants, process registrations, and
              build communities through a modern event management
              experience.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/events">
                <button className="h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                  Explore Events
                </button>
              </Link>

              {/* <Link href="/register">
                <button className="h-14 px-8 rounded-xl border border-slate-700 text-white hover:bg-slate-800 font-semibold">
                  Get Started
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">
              What is Planora?
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Planora is a modern event management platform where
              organizers can create public or private events,
              invite participants, manage approvals, collect
              registration fees, and gather reviews after every
              event. Whether it's a workshop, meetup, seminar, or
              community gathering, Planora provides everything
              needed to run events smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              Why Choose Planora?
            </h2>
            <p className="text-slate-500">
              Built for organizers and participants alike.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-indigo-600" />
                  </div>

                  <h3 className="font-bold text-xl mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Create Event",
              "Join Event or Invite Participants",
              "Manage Requests",
              "Collect Reviews",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border bg-white p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>

                <h3 className="font-bold text-lg">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="h-12 w-12 text-indigo-500 mx-auto mb-6" />

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Join the Community?
            </h2>

            <p className="text-slate-400 text-lg mb-10">
              Discover exciting events, connect with people, and
              create unforgettable experiences with Planora.
            </p>

            <Link href="/events">
              <button className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                Browse Events
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}