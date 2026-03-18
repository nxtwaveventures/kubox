import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, ExternalLink, Clock, Star } from "lucide-react";
import { UPCOMING_EVENTS, getCountdown } from "@/lib/events";

const Index = () => {
  const [username, setUsername] = useState("");
  const [, setTick] = useState(0);

  // Update countdowns every minute
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const robloxProfileUrl = username.trim()
    ? `https://www.roblox.com/users/profile?username=${encodeURIComponent(username.trim())}`
    : "";

  const sortedEvents = [...UPCOMING_EVENTS].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="animate-fade-in">
        {/* Logo */}
        <h1 className="mb-1 text-center font-display text-4xl font-bold tracking-wider text-foreground">
          CUBOX
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Find Roblox friends. No fluff.
        </p>

        {/* Quick Roblox Lookup */}
        <div className="mb-4 rounded-xl border border-border bg-card p-5">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Find a Roblox player
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Roblox username"
                className="w-full rounded-lg border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <a
              href={robloxProfileUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !robloxProfileUrl && e.preventDefault()}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                robloxProfileUrl
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              }`}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Go</span>
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Link
            to="/join"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <UserPlus className="h-4 w-4 text-primary" />
            Create Profile
          </Link>
          <Link
            to="/players"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
          >
            <Search className="h-4 w-4" />
            Browse Players
          </Link>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {sortedEvents.map((event) => {
              const countdown = getCountdown(event.date);
              return (
                <a
                  key={event.id}
                  href={event.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3 transition-colors hover:border-primary/30 hover:bg-secondary/80 group"
                >
                  <span className="text-2xl">{event.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground flex items-center gap-1.5">
                      {event.title}
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {event.description}
                      {event.game && <span className="ml-1 text-primary">• {event.game}</span>}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="rounded-md bg-primary/15 px-2 py-0.5 font-display text-xs font-bold text-primary">
                      {countdown.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-primary" />
                      {event.points} pts
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
