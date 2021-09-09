import { useState, useEffect } from 'react';
import { configs } from '../../configs';
import './controlPanel.css'

const ControlPanel = () => {

 const [timer, setTimer] = useState(configs.timer);
 const [int, setInt] = useState(null);

 useEffect(() => {
  if (timer <= 0) {
   console.log('gameOver', int);
   clearInterval(int)
  }
 }, [timer])

 const startGame = () => {
  let interval = setInterval(() => {
   setInt(interval)
   setTimer(prev => prev - 1)
  }, 1000)
  console.log('int', int);
 }

 return (
  <>
   <div className="panel">
    <div className="info timer-wrapper">
     <p>Timer, sec:</p>
     <p>{timer}</p>
    </div>
    <div className="info score-wrapper">
     <p>Score, points:</p>
     <p>POINTS</p>
    </div>
    <div className="info wins-wrapper">
     <p>Wins, points:</p>
     <p>POINTS</p>
    </div>
    <button onClick={startGame}>START GAME</button>
   </div>

  </>

 )
}

export default ControlPanel;