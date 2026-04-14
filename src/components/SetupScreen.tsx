import { useState } from 'react';
import { useGameStore } from '../store';

export const SetupScreen: React.FC = () => {
  const [names, setNames] = useState<string[]>(['']);
  const setPlayers = useGameStore(state => state.setPlayers);

  const handleAddName = () => {
    if (names.length < 8) setNames([...names, '']);
  };

  const handleNameChange = (index: number, val: string) => {
    const newNames = [...names];
    newNames[index] = val;
    setNames(newNames);
  };

  const handleRemoveName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const validNames = names.map(n => n.trim()).filter(n => n.length > 0);
    if (validNames.length > 1) {
      setPlayers(validNames);
    } else {
      alert("Inserire almeno 2 giocatori.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-textLight p-4">
      <div className="w-full max-w-md bg-surface p-6 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Cariochiamo!</h1>
        <p className="text-gray-400 mb-6 text-center text-sm">Aggiungi fino a 8 giocatori</p>
        
        <form onSubmit={handleStart} className="flex flex-col gap-4">
          {names.map((name, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input 
                type="text" 
                value={name}
                onChange={(e) => handleNameChange(i, e.target.value)}
                placeholder={`Giocatore ${i + 1}`}
                className="flex-1 bg-background border border-gray-700 rounded-xl p-3 text-lg focus:outline-none focus:border-primary transition-colors min-h-[44px]"
                required={i < 2} // require at least first two
              />
              {names.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveName(i)}
                  className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          
          {names.length < 8 && (
            <button 
              type="button"
              onClick={handleAddName}
              className="mt-2 py-3 px-4 border border-dashed border-gray-600 text-gray-400 rounded-xl font-medium hover:border-gray-400 hover:text-white transition-colors min-h-[44px]"
            >
              + Aggiungi un altro giocatore
            </button>
          )}

          <button 
            type="submit"
            className="mt-6 bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-red-600 transition-colors transform active:scale-[0.98] min-h-[44px]"
          >
            Inizia Partita
          </button>
        </form>
      </div>
    </div>
  );
};
