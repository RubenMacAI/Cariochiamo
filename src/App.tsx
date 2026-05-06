
import { useGameStore } from './store';
import { GameSelectionScreen } from './components/GameSelectionScreen';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';

function App() {
  const { selectedGame, players } = useGameStore(state => ({
    selectedGame: state.selectedGame,
    players: state.players
  }));

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
