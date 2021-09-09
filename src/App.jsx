import { useState } from 'react';
import GameCanvas from './Containers/GameCanvas/GameCanvas';
import Header from './Components/Header/Header';
import Context from './context';
import { configs } from './configs'
import './App.css';

function App() {
  const [analytics, setAnalytics] = useState(configs.analyticsInfo);

  return (
    <Context.Provider value={{ analytics, setAnalytics }}>
      <div className="App">
        <Header />
        <GameCanvas />
      </div>
    </Context.Provider>
  );
}

export default App;


