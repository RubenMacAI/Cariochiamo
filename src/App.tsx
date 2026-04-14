
import { useGameStore } from './store';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';

function App() {
  const players = useGameStore(state => state.players);

  return (
    <>
      {players.length < 2 ? <SetupScreen /> : <GameScreen />}
    </>
  );
}

export default App;
