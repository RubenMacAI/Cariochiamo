
import { useGameStore } from './store';
import { GameSelectionScreen } from './components/GameSelectionScreen';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';

function App() {
  const selectedGame = useGameStore(state => state.selectedGame);
  const players = useGameStore(state => state.players);

  return (
    <>
      {!selectedGame ? (
        <GameSelectionScreen />
      ) : players.length < 2 ? (
        <SetupScreen />
      ) : (
        <GameScreen />
      )}
    </>
  );
}

export default App;
