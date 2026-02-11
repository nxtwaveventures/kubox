import { Player } from "./types";

const STORAGE_KEY = "cubox-players";

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
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLAYERS));
    return DEFAULT_PLAYERS;
  }
  return JSON.parse(stored);
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
