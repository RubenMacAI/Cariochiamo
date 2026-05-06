import React from 'react';
import { useGameStore } from '../store';
import type { GameType } from '../store';

const games: { id: GameType; name: string; icon: string; description: string }[] = [
  { id: 'Carioca', name: 'Carioca', icon: '🃏', description: 'Le classiche 8 mani fisse' },
  { id: 'Burraco', name: 'Burraco', icon: '🎴', description: 'Canaste e chiusure' },
  { id: 'Scala 40', name: 'Scala 40', icon: '♠️', description: 'Punteggi a salire' },
  { id: 'Briscola', name: 'Briscola', icon: '🏆', description: 'Punti a chi vince' }
];

export const GameSelectionScreen: React.FC = () => {
  const setGame = useGameStore(state => state.setGame);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-textLight p-4">
      <div className="w-full max-w-md bg-surface p-6 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-2 text-center text-primary">Cariochiamo!</h1>
        <p className="text-gray-400 mb-8 text-center text-sm">Scegli il gioco da tracciare</p>
        
        <div className="flex flex-col gap-4">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => setGame(game.id)}
              className="flex items-center gap-4 bg-background border border-gray-700 p-4 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors transform active:scale-[0.98] text-left"
            >
              <div className="text-4xl bg-surface p-3 rounded-xl border border-gray-800 shadow-inner">
                {game.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{game.name}</h3>
                <p className="text-sm text-gray-400">{game.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
