import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayer } from "@/lib/store";
import { PlayerStatus } from "@/lib/types";
import { Gamepad2, UserPlus } from "lucide-react";

const Join = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [robloxUsername, setRobloxUsername] = useState("");
  const [status, setStatus] = useState<PlayerStatus>("online");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !robloxUsername.trim()) return;

    addPlayer({
      displayName: displayName.trim(),
      robloxUsername: robloxUsername.trim(),
      status,
    });

    setSubmitted(true);
    setTimeout(() => navigate("/players"), 1500);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="animate-fade-in text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 glow-red">
            <Gamepad2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            WELCOME TO CUBOX!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Redirecting to players...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary glow-red-sm">
            <UserPlus className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-wide text-foreground">
            JOIN CUBOX
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your player profile
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-border bg-card p-6"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. xBlaze"
              required
              className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Roblox Username
            </label>
            <input
              type="text"
              value={robloxUsername}
              onChange={(e) => setRobloxUsername(e.target.value)}
              placeholder="e.g. BlazeMaster2025"
              required
              className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PlayerStatus)}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            >
              <option value="online">🟢 Online</option>
              <option value="in-game">🎮 In Game</option>
              <option value="offline">🔴 Offline</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3 font-display text-sm font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110 glow-red-sm"
          >
            CREATE PROFILE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
