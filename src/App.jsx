import GameCanvas from './Containers/GameCanvas/GameCanvas';
import logo from './images/memory.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="game-logo">
          <img src={logo} alt="logo" />
        </div>
        <h2 className="name">Memory Game</h2>
      </header>
      <GameCanvas />
    </div>
  );
}

export default App;
