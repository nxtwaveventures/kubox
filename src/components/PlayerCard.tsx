import { Player, PlayerStatus, STATUS_CONFIG } from "@/lib/types";
import { updatePlayerStatus } from "@/lib/store";
import { ExternalLink, UserPlus, ChevronDown } from "lucide-react";
import { useState } from "react";

interface PlayerCardProps {
  player: Player;
  onStatusChange?: () => void;
}

const PlayerCard = ({ player, onStatusChange }: PlayerCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const initials = player.displayName.slice(0, 2).toUpperCase();

  const handleStatusChange = (status: PlayerStatus) => {
    updatePlayerStatus(player.id, status);
    setShowDropdown(false);
    onStatusChange?.();
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
          {player.avatar ? (
            <img src={player.avatar} alt={player.displayName} className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div
          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
            player.status === "online" ? "bg-online" : player.status === "in-game" ? "bg-in-game" : "bg-offline"
          }`}
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{player.displayName}</p>
        <p className="truncate text-xs text-muted-foreground">@{player.robloxUsername}</p>
      </div>

      {/* Status dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary transition-colors"
        >
          {STATUS_CONFIG[player.status].emoji}
          <ChevronDown className="h-3 w-3" />
        </button>
        {showDropdown && (
          <div className="absolute right-0 top-full z-20 mt-1 rounded-lg border border-border bg-card p-1 shadow-xl min-w-[120px]">
            {(Object.keys(STATUS_CONFIG) as PlayerStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
              >
                {STATUS_CONFIG[s].emoji} {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-1.5">
        <a
          href={`https://www.roblox.com/users/profile?username=${player.robloxUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title="View Roblox Profile"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={`https://www.roblox.com/users/profile?username=${player.robloxUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-primary p-2 text-primary-foreground transition-all hover:brightness-110"
          title="Add Friend"
        >
          <UserPlus className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default PlayerCard;
