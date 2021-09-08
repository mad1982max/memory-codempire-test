import { useState, useRef } from 'react'
import { configs, heroes } from '../../configs';
import Timer from '../../Components/Timer/Timer'
import arrayFn from '../../Helpers/array';
import "./canvasStyle.css";

const GameCanvas = () => {
  const [gameTable, setGameTable] = useState(() => arrayFn.buildNestedPairsArray(configs.gameDimension, heroes), []);
  const [choseCard, setChoseCard] = useState('');
  const [score, setScore] = useState([]);
  const cells = [...document.querySelectorAll('.cell')];

  console.log(gameTable);

  const handleClick = (e) => {
    const clickedCard = e.currentTarget;
    clickedCard.classList.toggle('rotated');
    const clickedHero = clickedCard.dataset.hero;



    // if (clickedHero === 'empty') {
    //   clickedCard.classList.add('guessed');
    //   return;
    // }

    if (choseCard.length !== 0) {
      if (choseCard === clickedHero) {
        const guessedElements = [...document.querySelectorAll('.rotated')];
        guessedElements.forEach(item => item.classList.add('guessed'));
        setChoseCard('');

      } else {
        cells.forEach(cell => cell.classList.add('freezed'));

        setTimeout(() => {
          setChoseCard('');

          cells.forEach(item => {
            item.classList.remove('freezed');
            if (!item.classList.contains('guessed')) {
              item.classList.remove('rotated');
            }
          })
        }, 1000)

      }
    } else {
      setChoseCard(clickedHero)
    }
  }
  return (
    <div className="game-wrapper">
      <div className="canvas">
        {
          gameTable.map((row, i) =>
            <div key={i} className='row'>
              {row.map((hero, i) => {
                const style = {
                  'backgroundPosition': hero.position
                }
                const isEmpty = hero.name === 'empty'

                return (
                  <div
                    onClick={handleClick}
                    key={i + hero.name}
                    data-hero={hero.name}
                    className="cell">
                    <div className="face front">
                      <div className="logo"></div>
                    </div>
                    <div className="face back">
                      <div className={isEmpty ? 'empty-hero' : 'hero'} style={style}></div>
                    </div>
                  </div>
                )
              }
              )}
            </div>)
        }
      </div>
      <Timer></Timer>
    </div>
  )
}

export default GameCanvas;