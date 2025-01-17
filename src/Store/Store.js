import { create } from "zustand";

export const useStatsStore = create((set) => ({
  stats: 0,
  setStats: (newStats) => set(() => ({ stats: newStats })),
}));

export const useHighScoreStore = create((set) => ({
  highScore: 0,
  setHighScore: (newHighScore) => set(() => ({ highScore: newHighScore })),
}));
