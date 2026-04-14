import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ROUNDS_SEQUENCE = [
  'Coppia',
  'Doppia Coppia',
  'Tris',
  'Full',
  'Poker',
  'Scala Reale',
  'Scala 40',
  'Chiusura in mano'
] as const;

export type RoundName = typeof ROUNDS_SEQUENCE[number];

export interface PlayerScoreEntry {
  playerId: string; // we'll use name as id for simplicity or index
  score: number;
}

export interface RoundLog {
  roundIndex: number;
  scores: PlayerScoreEntry[];
}

interface GameState {
  players: string[];
  history: RoundLog[]; // history of round entries
  
  // Actions
  setPlayers: (players: string[]) => void;
  insertRoundScores: (scores: PlayerScoreEntry[]) => void;
  undoLastRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [],
      history: [],

      setPlayers: (newPlayers) => set({ players: newPlayers.slice(0, 8) }),
      
      insertRoundScores: (scores) => {
        const { history } = get();
        // The new round index is just the length of current history
        const roundIndex = history.length;
        if (roundIndex >= ROUNDS_SEQUENCE.length) return; // Game over

        set({
          history: [...history, { roundIndex, scores }]
        });
      },

      undoLastRound: () => {
        const { history } = get();
        if (history.length === 0) return;
        set({
          history: history.slice(0, -1)
        });
      },

      resetGame: () => set({ players: [], history: [] }),
    }),
    {
      name: 'cariochiamo-storage', // key in local storage
    }
  )
);
