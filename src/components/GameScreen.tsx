import { useState } from 'react';
import { useGameStore, ROUNDS_SEQUENCE } from '../store';

export const GameScreen: React.FC = () => {
  const { players, history, insertRoundScores, undoLastRound, resetGame } = useGameStore();
  const currentRoundIndex = history.length;
  const isGameOver = currentRoundIndex >= ROUNDS_SEQUENCE.length;

  // Local state for the current round inputs
  const [currentScores, setCurrentScores] = useState<Record<string, string>>({});

  // Calculate totals
  const totals = players.map(player => {
    const score = history.reduce((sum, round) => {
      const pScore = round.scores.find(s => s.playerId === player)?.score || 0;
      return sum + pScore;
    }, 0);
    return { player, score };
  });

  // Sort leaderboard (lowest score first)
  const leaderboard = [...totals].sort((a, b) => a.score - b.score);

  const handleScoreChange = (player: string, val: string) => {
    // Only numbers
    if (val !== '' && !/^-?\d*$/.test(val)) return;
    setCurrentScores(prev => ({ ...prev, [player]: val }));
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGameOver) return;

    // Check if everyone has a score entered
    for (const player of players) {
      if (currentScores[player] === undefined || currentScores[player] === '') {
        alert(`Inserisci un punteggio valido per ${player}`);
        return;
      }
    }

    const scoresToInsert = players.map(player => ({
      playerId: player,
      score: parseInt(currentScores[player], 10) || 0
    }));

    insertRoundScores(scoresToInsert);
    setCurrentScores({}); // reset for next round
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-textLight">
      {/* HEADER / LEADERBOARD (Pinned Top) */}
      <div className="sticky top-0 z-10 bg-surface shadow-2xl border-b border-gray-800 p-4">
        <h2 className="text-xl font-bold text-center mb-4 text-primary">Classifica</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {leaderboard.map((entry, idx) => (
            <div 
              key={entry.player} 
              className={`snap-center flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl w-24 border ${idx === 0 ? 'bg-primary/20 border-primary' : 'bg-background border-gray-700'}`}
            >
              <span className="text-xs text-gray-400 font-medium truncate w-full text-center">{entry.player}</span>
              <span className={`text-2xl font-black mt-1 ${idx === 0 ? 'text-primary' : 'text-white'}`}>{entry.score}</span>
              {idx === 0 && <span className="text-[10px] text-primary uppercase font-bold mt-1 tracking-widest">1°</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 max-w-lg w-full mx-auto pb-24">
        {!isGameOver ? (
          <>
            <div className="mb-6 mt-4 flex items-center justify-between bg-surface p-4 rounded-xl border border-gray-800">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Tound {currentRoundIndex + 1}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{ROUNDS_SEQUENCE[currentRoundIndex]}</h3>
              </div>
              {history.length > 0 && (
                <button 
                  onClick={undoLastRound}
                  type="button"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
                >
                  ↩ Undo
                </button>
              )}
            </div>

            <form onSubmit={handleInsert} className="space-y-4">
              {players.map(player => (
                <div key={player} className="flex items-center gap-4 bg-surface p-3 rounded-xl border border-gray-800">
                  <label className="flex-1 font-medium text-lg truncate">{player}</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="-?[0-9]*"
                    value={currentScores[player] !== undefined ? currentScores[player] : ''}
                    onChange={(e) => handleScoreChange(player, e.target.value)}
                    className="w-24 bg-background border border-gray-700 rounded-lg p-3 text-xl text-center font-bold focus:outline-none focus:border-primary transition-colors min-h-[44px]"
                    placeholder="0"
                  />
                </div>
              ))}

              <button 
                type="submit"
                className="w-full mt-8 bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-red-600 transition-colors transform active:scale-[0.98] min-h-[44px]"
              >
                Salva Round
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-12 text-center bg-surface p-8 rounded-2xl border border-primary shadow-2xl shadow-primary/20">
            <span className="text-5xl mb-4">🏆</span>
            <h2 className="text-3xl font-bold text-white mb-2">Partita Conclusa!</h2>
            <p className="text-gray-400 mb-8 max-w-[250px]">Il vincitore assoluto di questa sessione è <span className="font-bold text-primary">{leaderboard[0].player}</span></p>
            
            <button 
              onClick={resetGame}
              className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-red-600 transition-colors min-h-[44px]"
            >
              Nuova Partita
            </button>
            
            {history.length > 0 && (
              <button 
                onClick={undoLastRound}
                className="mt-4 text-gray-400 font-medium hover:text-white transition-colors"
              >
                Cancella e recedi (Undo ultimo round)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
