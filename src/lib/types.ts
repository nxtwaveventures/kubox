export type PlayerStatus = "online" | "in-game" | "offline";

export interface Player {
  id: string;
  displayName: string;
  robloxUsername: string;
  avatar?: string;
  status: PlayerStatus;
}

export const STATUS_CONFIG: Record<PlayerStatus, { label: string; emoji: string; color: string }> = {
  online: { label: "Online", emoji: "🟢", color: "online" },
  "in-game": { label: "In Game", emoji: "🎮", color: "in-game" },
  offline: { label: "Offline", emoji: "🔴", color: "offline" },
};
