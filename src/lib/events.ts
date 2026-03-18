export interface GameEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  points: number;
  date: string; // ISO date string
  link?: string;
  game?: string;
}

export const UPCOMING_EVENTS: GameEvent[] = [
  {
    id: "1",
    title: "Mega Party Night",
    description: "Join the biggest party of the year!",
    emoji: "🎉",
    points: 500,
    date: new Date(Date.now() + 99 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest",
    game: "99 Nights in the Forest",
  },
  {
    id: "2",
    title: "PvP Tournament",
    description: "1v1 battles — top 3 win prizes",
    emoji: "⚔️",
    points: 1000,
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest",
    game: "99 Nights in the Forest",
  },
  {
    id: "3",
    title: "Treasure Hunt",
    description: "Find hidden items across the map",
    emoji: "💎",
    points: 300,
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest",
    game: "99 Nights in the Forest",
  },
  {
    id: "4",
    title: "Build Battle",
    description: "Show off your building skills",
    emoji: "🏗️",
    points: 750,
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest",
    game: "99 Nights in the Forest",
  },
  {
    id: "5",
    title: "Daily Quest",
    description: "Complete daily challenges for bonus points!",
    emoji: "📋",
    points: 200,
    date: new Date(Date.now() + 99 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest",
    game: "99 Nights in the Forest",
  },
];

export function getCountdown(dateStr: string): { days: number; hours: number; label: string } {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, label: "NOW!" };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return { days, hours, label: `${days}d ${hours}h` };
  return { days: 0, hours, label: `${hours}h` };
}
