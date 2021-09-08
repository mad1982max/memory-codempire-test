import { useState } from 'react'
import Modal from '../../Components/Modal/Modal'
import { configs, heroes } from '../../configs';
import Timer from '../../Components/Timer/Timer'
import Cell from '../../Components/Cell/Cell'
import arrayFn from '../../Helpers/array';
import "./canvasStyle.css";

const GameCanvas = () => {
  const [gameTable, setGameTable] = useState(() => arrayFn.buildNestedPairsArray(configs.gameDimension, heroes));
  const [pairsInGame, setPairsInGame] = useState(() => gameTable.flat().map(item => item.name).filter(item => item !== 'empty'));
  const [choseCard, setChoseCard] = useState('');
  const [showModal, setShowModal] = useState(false);
  const cells = [...document.querySelectorAll('.cell')];

  const closeModal = () => setShowModal(false)

  const handleClick = (e) => {
    const clickedCard = e.currentTarget;
    clickedCard.classList.toggle('rotated');
    const clickedHero = clickedCard.dataset.hero;

    if (choseCard.length === 0) {
      setChoseCard(clickedHero);
      return;
    }

    if (choseCard === clickedHero) {
      const pairsRemains = pairsInGame.filter(hero => hero !== clickedHero);
      setPairsInGame(pairsRemains)

      if (pairsRemains.length === 0) {
        setTimeout(() => {
          cells.forEach(item => {
            if (!item.classList.contains('rotated')) {
              item.classList.add('rotated', 'freezed');
            }
          })
          setShowModal(true)
        }, 1000)
      }

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

  }
  return (
    <div className="game-wrapper">
      <div className="canvas">
        {
          gameTable.map((row, i) =>
            <div key={i} className='row'>
              {row.map((hero, i) => <Cell key={i + hero.name} clicker={handleClick} hero={hero} />)}
            </div>)
        }
      </div>

      {showModal && <Modal isWin={pairsInGame.length === 0} close={closeModal} />}

      <Timer></Timer>
    </div>
  )
}

export default GameCanvas;