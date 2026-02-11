import { PlayerStatus, STATUS_CONFIG } from "@/lib/types";

interface StatusBadgeProps {
  status: PlayerStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        status === "online"
          ? "bg-online/15 text-online"
          : status === "in-game"
          ? "bg-in-game/15 text-in-game"
          : "bg-offline/15 text-offline"
      }`}
    >
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
