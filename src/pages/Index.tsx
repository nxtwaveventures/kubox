import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, ExternalLink } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");

  const robloxProfileUrl = username.trim()
    ? `https://www.roblox.com/users/profile?username=${encodeURIComponent(username.trim())}`
    : "";

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <h1 className="mb-1 text-center font-display text-4xl font-bold tracking-wider text-foreground">
          CUBOX
        </h1>
        <p className="mb-10 text-center text-sm text-muted-foreground">
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
        <div className="grid grid-cols-2 gap-3">
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
      </div>
    </div>
  );
};

export default Index;
