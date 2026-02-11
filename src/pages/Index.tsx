import { Link } from "react-router-dom";
import { Users, UserPlus, Gamepad2, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-24 text-center sm:pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
            <Zap className="h-4 w-4" />
            The Roblox Friend Hub
          </div>

          <h1
            className="font-display text-5xl font-bold tracking-wider text-foreground sm:text-7xl glow-red-text animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            CUBOX
          </h1>

          <p
            className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Create your player profile, find your squad, and jump into Roblox
            together. No hassle, just gaming.
          </p>

          <div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              to="/join"
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-display text-sm font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110 glow-red animate-pulse-glow"
            >
              <UserPlus className="h-5 w-5" />
              JOIN NOW
            </Link>
            <Link
              to="/players"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 font-display text-sm font-bold tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              <Users className="h-5 w-5" />
              VIEW PLAYERS
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: UserPlus,
              title: "Quick Profiles",
              desc: "Sign up in seconds with just your display name and Roblox username.",
            },
            {
              icon: Users,
              title: "Find Friends",
              desc: "Browse player cards, see who's online, and add them on Roblox instantly.",
            },
            {
              icon: Gamepad2,
              title: "Jump In",
              desc: "One-click links to Roblox profiles. No ads, no tracking, just gaming.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="card-hover rounded-xl border border-border bg-card p-6 text-center animate-fade-in"
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-sm font-bold tracking-wider text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
