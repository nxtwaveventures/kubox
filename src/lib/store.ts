import { z } from "zod";
import { Player, PlayerStatus } from "./types";

const STORAGE_KEY = "cubox-players";

const playerSchema = z.object({
  id: z.string(),
  displayName: z.string().min(1).max(50),
  robloxUsername: z.string().min(1).max(20),
  avatar: z.string().optional(),
  status: z.enum(["online", "in-game", "offline"]),
});

const playersArraySchema = z.array(playerSchema);

export const joinFormSchema = z.object({
  displayName: z.string().trim().min(1, "Display name is required").max(50, "Max 50 characters").regex(/^[a-zA-Z0-9_\s]+$/, "Only letters, numbers, underscores, and spaces"),
  robloxUsername: z.string().trim().min(3, "Min 3 characters").max(20, "Max 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
});

export type JoinFormValues = z.infer<typeof joinFormSchema>;

const DEFAULT_PLAYERS: Player[] = [
  {
    id: "1",
    displayName: "xBlaze",
    robloxUsername: "BlazeMaster2025",
    status: "online",
  },
  {
    id: "2",
    displayName: "NovaQueen",
    robloxUsername: "Nova_Queen_X",
    status: "in-game",
  },
  {
    id: "3",
    displayName: "ShadowFox",
    robloxUsername: "ShadowFox99",
    status: "offline",
  },
  {
    id: "4",
    displayName: "PixelKing",
    robloxUsername: "PixelKingRBX",
    status: "online",
  },
  {
    id: "5",
    displayName: "GhostRider",
    robloxUsername: "GhostRider_Pro",
    status: "in-game",
  },
  {
    id: "6",
    displayName: "CyberWolf",
    robloxUsername: "CyberWolf_X",
    status: "offline",
  },
];

export function getPlayers(): Player[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLAYERS));
      return DEFAULT_PLAYERS;
    }
    const parsed = JSON.parse(stored);
    const validated = playersArraySchema.parse(parsed);
    return validated as Player[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLAYERS));
    return DEFAULT_PLAYERS;
  }
}

export function addPlayer(player: Omit<Player, "id">): Player {
  const players = getPlayers();
  const newPlayer: Player = { ...player, id: crypto.randomUUID() };
  players.push(newPlayer);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  return newPlayer;
}

export function updatePlayerStatus(id: string, status: Player["status"]) {
  const players = getPlayers();
  const idx = players.findIndex((p) => p.id === id);
  if (idx !== -1) {
    players[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }
}
