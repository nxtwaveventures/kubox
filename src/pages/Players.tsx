import { useState, useEffect } from "react";
import { getPlayers } from "@/lib/store";
import { Player } from "@/lib/types";
import PlayerCard from "@/components/PlayerCard";
import { Users } from "lucide-react";

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const loadPlayers = () => setPlayers(getPlayers());

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Users className="h-4 w-4" />
          {players.length} Players
        </div>
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground sm:text-4xl">
          CUBOX PLAYERS
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find your squad and join the game
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((player, i) => (
          <div
            key={player.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <PlayerCard player={player} onStatusChange={loadPlayers} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
