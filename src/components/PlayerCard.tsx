import { Player, PlayerStatus, STATUS_CONFIG } from "@/lib/types";
import { updatePlayerStatus } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import { ExternalLink, UserPlus, ChevronDown } from "lucide-react";
import { useState } from "react";

interface PlayerCardProps {
  player: Player;
  onStatusChange?: () => void;
}

const PlayerCard = ({ player, onStatusChange }: PlayerCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const initials = player.displayName
    .split("")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleStatusChange = (status: PlayerStatus) => {
    updatePlayerStatus(player.id, status);
    setShowDropdown(false);
    onStatusChange?.();
  };

  return (
    <div className="card-hover group rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Avatar */}
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 bg-secondary text-xl font-bold text-foreground group-hover:border-primary/60 transition-colors">
            {player.avatar ? (
              <img
                src={player.avatar}
                alt={player.displayName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="font-display">{initials}</span>
            )}
          </div>
          <div
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card ${
              player.status === "online"
                ? "bg-online"
                : player.status === "in-game"
                ? "bg-in-game"
                : "bg-offline"
            }`}
          />
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-bold text-foreground">{player.displayName}</h3>
          <p className="text-sm text-muted-foreground">@{player.robloxUsername}</p>
        </div>

        {/* Status */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            <StatusBadge status={player.status} />
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {showDropdown && (
            <div className="absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 rounded-lg border border-border bg-card p-1 shadow-xl min-w-[140px]">
              {(Object.keys(STATUS_CONFIG) as PlayerStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <span>{STATUS_CONFIG[s].emoji}</span>
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-2">
          <a
            href={`https://www.roblox.com/users/profile?username=${player.robloxUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
          >
            <ExternalLink className="h-4 w-4" />
            View Profile
          </a>
          <a
            href={`https://www.roblox.com/users/profile?username=${player.robloxUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 glow-red-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add Friend
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
