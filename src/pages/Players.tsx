import { useState, useEffect, useMemo } from "react";
import { getPlayers } from "@/lib/store";
import { Player, PlayerStatus } from "@/lib/types";
import PlayerCard from "@/components/PlayerCard";
import { Search } from "lucide-react";

const FILTERS: { label: string; value: PlayerStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "🟢 Online", value: "online" },
  { label: "🎮 In Game", value: "in-game" },
  { label: "🔴 Offline", value: "offline" },
];

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PlayerStatus | "all">("all");

  const loadPlayers = () => setPlayers(getPlayers());
  useEffect(() => { loadPlayers(); }, []);

  const filtered = useMemo(() => {
    let list = players;
    if (filter !== "all") list = list.filter((p) => p.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.displayName.toLowerCase().includes(q) ||
          p.robloxUsername.toLowerCase().includes(q)
      );
    }
    return list;
  }, [players, search, filter]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-wider text-foreground">
            PLAYERS
          </h1>
          <p className="text-sm text-muted-foreground">{filtered.length} found</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players…"
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No players found
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((player, i) => (
            <div
              key={player.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <PlayerCard player={player} onStatusChange={loadPlayers} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
