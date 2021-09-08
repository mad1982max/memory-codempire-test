import GameCanvas from './Containers/GameCanvas/GameCanvas';
import Header from './Components/Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <GameCanvas />
    </div>
  );
}

export default App;
