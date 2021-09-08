import { useState, useEffect } from 'react';
import { configs } from '../../configs'

const Timer = () => {

 const [timer, setTimer] = useState(configs.timer);

 console.log('rerender');

 useEffect(() => {

 }, [timer])

 const startGame = () => {
  console.log('start');

  setTimeout(() => {
   console.log('timer2', timer);
  }, 5000)

  const interval = setInterval(() => {
   console.log('timer', timer);

   if (timer == 0) {
    clearInterval(interval);
    console.log('Game is over');
   } else {
    setTimer(prev => prev - 1)
   }

  }, 1000)
 }

 const createTimerString = (timer) => {

 }


 return (
  <>
   <div className="timer-wrapper">{timer}</div>
   <button onClick={startGame}>START</button>
  </>

 )
}

export default Timer;