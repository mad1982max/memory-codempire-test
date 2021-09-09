import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import Context from '../../context';
import './controlPanel.css';

const ControlPanel = ({ restart }) => {
  const [timer, setTimer] = useState(0);
  const [int, setInt] = useState(null);
  const { analytics, setAnalytics } = useContext(Context);
  const gameStatusCell = useRef();

  useEffect(() => {
    switch (analytics.gameStatus) {
      case 'NOT STARTED':
        setTimer(0);
        clearInterval(int);
        gameStatusCell.current.style.background = 'rgb(0, 102, 255)';
        break;
      case 'IN PROGRESS':
        setTimer(0);
        gameStatusCell.current.style.background = 'rgba(7, 138, 7, 0.863)';
        let interval = setInterval(() => {
          setInt(interval);
          setTimer(prev => prev + 1);
        }, 1000)
        break;
      case 'END':
        gameStatusCell.current.style.background = 'rgba(141, 5, 5, 0.836)';
        setAnalytics({ ...analytics, totalPlayedTime: analytics.totalPlayedTime + timer, totalGames: analytics.totalGames + 1 });
        clearInterval(int);
        break;
      default:
        console.log('default');
    }
    return () => clearInterval(int);
  }, [analytics.gameStatus]);

  return (
    <>
      <div className="panel">
        <div className="info game-start">
          <p className='info-label'>Game status: </p>
          <p ref={gameStatusCell} className='info-value status'>{analytics.gameStatus}</p>
        </div>
        <div className="info total-timer-wrapper">
          <p className='info-label'>Total Timer, sec: </p>
          <p className='info-value'>{analytics.totalPlayedTime}</p>
        </div>
        <div className="info total-games-wrapper">
          <p className='info-label'>Total Games: </p>
          <p className='info-value'>{analytics.totalGames}</p>
        </div>
        <div className="info timer-wrapper">
          <p className='info-label'>Current Timer: </p>
          <p className='info-value'>{timer}</p>
        </div>
        <div className="info score-wrapper">
          <p className='info-label'>Max Pairs: </p>
          <p className='info-value'>{analytics.maxPairs}</p>
        </div>
        <button onClick={restart} className='restartBtn'>RESTART GAME</button>
      </div>
    </>
  )
}

export default ControlPanel;