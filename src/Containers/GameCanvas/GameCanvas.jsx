import { useState, useContext, useEffect } from 'react';
import Modal from '../../Components/Modal/Modal';
import ControlPanel from '../../Components/ControlPanel/ControlPanel';
import Cell from '../../Components/Cell/Cell';
import Context from '../../context';
import arrayFn from '../../Helpers/array';
import { classHelper } from '../../Helpers/classManipulation';
import { configs, heroes } from '../../configs';
import './canvasStyle.css';

const GameCanvas = () => {

  const [gameTable, setGameTable] = useState(() => arrayFn.buildNestedPairsArray(configs.gameDimension, heroes));
  const [pairsInGame, setPairsInGame] = useState(() => gameTable.flat().map(item => item.name).filter(item => item !== 'empty'));
  const [choseCard, setChoseCard] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [guessedInARow, setGuessedInARow] = useState(0);

  const { analytics, setAnalytics } = useContext(Context);

  useEffect(() => {
    if (guessedInARow >= analytics.maxPairs) {
      setAnalytics((prev) => ({ ...prev, maxPairs: guessedInARow }));
    }
  }, [guessedInARow]);

  const generateNewGameData = () => {
    const generateNewArray = arrayFn.buildNestedPairsArray(configs.gameDimension, heroes);
    const pairs = () => generateNewArray.flat().map(item => item.name).filter(item => item !== 'empty');
    return ({ generateNewArray, pairs });
  }

  const repeatGame = () => {
    setGuessedInARow(0);
    setAnalytics({ ...analytics, gameStatus: 'NOT STARTED' });
    setChoseCard('');
    setShowModal(false);

    classHelper.manipulation('cell', ['rotated', 'freezed', 'guessed'], 'remove');

    const { generateNewArray, pairs } = generateNewGameData();
    setTimeout(() => {
      setGameTable(generateNewArray);
      setPairsInGame(pairs);
    }, 1000)
  }

  const handleClick = (e) => {

    if (analytics.gameStatus === 'NOT STARTED') {
      setAnalytics({ ...analytics, gameStatus: 'IN PROGRESS' });
    }

    const clickedCard = e.currentTarget;
    clickedCard.classList.toggle('rotated');
    const clickedHero = clickedCard.dataset.hero;

    if (choseCard.length === 0) {

      if (clickedHero === 'empty') {
        setGuessedInARow(0)
        classHelper.manipulation('cell', ['freezed'], 'add');
        setTimeout(() => {
          clickedCard.classList.toggle('rotated');
          classHelper.manipulation('cell', ['freezed'], 'remove');
        }, 1000)

      } else {
        setChoseCard(clickedHero);
      }
      return;
    }

    if (choseCard === clickedHero) {
      const pairsRemains = pairsInGame.filter(hero => hero !== clickedHero);
      setPairsInGame(pairsRemains);
      setGuessedInARow(prev => (prev + 1));

      if (pairsRemains.length === 0) {
        setAnalytics(prevState => ({ ...prevState, gameStatus: 'END' }));
        setTimeout(() => {
          classHelper.manipulationIfNotContain('cell', 'rotated', ['rotated', 'freezed'], 'add');

          setGuessedInARow(0)

          setTimeout(() => {
            setShowModal(true);
          }, 1000);
        }, 1000);
      }

      classHelper.manipulation('rotated', ['guessed'], 'add');
      setChoseCard('');

    } else {
      classHelper.manipulation('cell', ['freezed'], 'add');
      setGuessedInARow(0)

      setTimeout(() => {
        setChoseCard('');
        classHelper.manipulationIfNotContain('cell', 'guessed', ['rotated', 'freezed'], 'remove');
      }, 1000);
    }

  }
  return (
    <div className='game-wrapper'>
      <ControlPanel restart={repeatGame} />
      <Table
        gameTable={gameTable}
        handleClick={handleClick}
      />

      {showModal &&
        <Modal
          isWin={pairsInGame.length === 0}
          close={repeatGame}
        />
      }
    </div>
  )
}

const Table = ({ gameTable, handleClick }) => {
  return (
    <div className='canvas'>
      {
        gameTable.map((row, i) =>
          <div key={i} className='row'>
            {row.map((hero, i) => <Cell key={i + hero.name} clicker={handleClick} hero={hero} />)}
          </div>)
      }
    </div>
  )
}

export default GameCanvas;