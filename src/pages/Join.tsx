import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayer, joinFormSchema, JoinFormValues } from "@/lib/store";
import { PlayerStatus } from "@/lib/types";
import { Check, ExternalLink } from "lucide-react";

const Join = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [robloxUsername, setRobloxUsername] = useState("");
  const [status, setStatus] = useState<PlayerStatus>("online");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof JoinFormValues, string>>>({});

  const robloxProfileUrl = robloxUsername.trim()
    ? `https://www.roblox.com/users/profile?username=${encodeURIComponent(robloxUsername.trim())}`
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = joinFormSchema.safeParse({ displayName, robloxUsername });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof JoinFormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    addPlayer({
      displayName: result.data.displayName,
      robloxUsername: result.data.robloxUsername,
      status,
    });

    setSubmitted(true);
    setTimeout(() => navigate("/players"), 1200);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="animate-fade-in text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <p className="font-medium text-foreground">You're in!</p>
          <p className="mt-1 text-sm text-muted-foreground">Redirecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm animate-fade-in">
        <h1 className="mb-1 font-display text-lg font-bold tracking-wider text-foreground">
          CREATE PROFILE
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Join the Cubox player directory
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              maxLength={50}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            {errors.displayName && (
              <p className="mt-1 text-xs text-destructive">{errors.displayName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={robloxUsername}
              onChange={(e) => setRobloxUsername(e.target.value)}
              placeholder="Roblox username"
              maxLength={20}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            {errors.robloxUsername && (
              <p className="mt-1 text-xs text-destructive">{errors.robloxUsername}</p>
            )}
          </div>

          {/* Preview link */}
          {robloxProfileUrl && (
            <a
              href={robloxProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Preview Roblox profile for @{robloxUsername.trim()}
            </a>
          )}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PlayerStatus)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          >
            <option value="online">🟢 Online</option>
            <option value="in-game">🎮 In Game</option>
            <option value="offline">🔴 Offline</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
          >
            Join Cubox
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
