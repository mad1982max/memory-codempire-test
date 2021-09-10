import { useState, useContext, useEffect, useMemo } from 'react';
import Modal from '../../Components/Modal/Modal';
import ControlPanel from '../../Components/ControlPanel/ControlPanel';
import Cell from '../../Components/Cell/Cell';
import Context from '../../context';
import arrayFn from '../../Helpers/array';
import { classHelper } from '../../Helpers/classManipulation';
import { configs, heroes } from '../../configs';
import './canvasStyle.css';

const GameCanvas = () => {

  const [gameTable, setGameTable] = useState([]);
  const [pairsInGame, setPairsInGame] = useState([]);
  const [choseCard, setChoseCard] = useState({ clickedHero: '', clickedHeroId: '' });
  const [showModal, setShowModal] = useState(false);
  const [guessedInARow, setGuessedInARow] = useState({ count: 0, prevId: null });
  const { analytics, setAnalytics } = useContext(Context);

  const generateNewGameData = (dimension, heroes) => {
    const { nestedTableWithHeroes, pairs } = arrayFn.buildNestedPairsArray(dimension, heroes);
    setGameTable(nestedTableWithHeroes);
    setPairsInGame(pairs);
  }

  useMemo(() => { generateNewGameData(configs.gameDimension, heroes) }, [configs.gameDimension, heroes.length]);

  useEffect(() => {
    if (guessedInARow.count >= analytics.maxPairs) {
      setAnalytics((prev) => ({ ...prev, maxPairs: guessedInARow.count }));
    }
  }, [guessedInARow.count]);

  const repeatGame = () => {
    setGuessedInARow({ count: 0, prevId: null });
    setAnalytics({ ...analytics, gameStatus: 'NOT STARTED' });
    setChoseCard({ clickedHero: '', clickedHeroId: '' });
    setShowModal(false);

    classHelper.manipulation('cell', ['rotated', 'freezed', 'guessed'], 'remove');

    setTimeout(() => {
      generateNewGameData(configs.gameDimension, heroes);
    }, 1000);
  }

  const handleClick = (e) => {
    if (analytics.gameStatus === 'NOT STARTED') {
      setAnalytics({ ...analytics, gameStatus: 'IN PROGRESS' });
    }
    const clickedCard = e.currentTarget;
    clickedCard.classList.toggle('rotated');
    const clickedHero = clickedCard.dataset.hero;
    const clickedHeroId = clickedCard.dataset.id;

    if (!choseCard.clickedHero) {
      if (clickedHero === 'empty') {
        setGuessedInARow({ count: 0, prevId: null });
        classHelper.manipulation('cell', ['freezed'], 'add');
        setTimeout(() => {
          clickedCard.classList.toggle('rotated');
          classHelper.manipulation('cell', ['freezed'], 'remove');
        }, 1000);
      } else {
        setChoseCard({ clickedHero, clickedHeroId });
      }
      return;
    }

    if (choseCard.clickedHero === clickedHero && choseCard.clickedHeroId !== clickedHeroId) {
      const pairsRemains = pairsInGame.filter(hero => hero !== clickedHero);
      setPairsInGame(pairsRemains);
      setGuessedInARow(prev => ({ ...prev, count: prev.count + 1 }));

      if (pairsRemains.length === 0) {
        setAnalytics(prevState => ({ ...prevState, gameStatus: 'END' }));
        setTimeout(() => {
          classHelper.manipulationIfNotContain('cell', 'rotated', ['rotated', 'freezed'], 'add');

          setGuessedInARow({ count: 0, prevId: null });

          setTimeout(() => {
            setShowModal(true);
          }, 1000);
        }, 1000);
      }
      classHelper.manipulation('rotated', ['guessed'], 'add');
      setChoseCard({ clickedHero: '', clickedHeroId: '' });

    } else {
      classHelper.manipulation('cell', ['freezed'], 'add');
      setGuessedInARow({ count: 0, prevId: null });

      setTimeout(() => {
        setChoseCard({ clickedHero: '', clickedHeroId: '' });
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
            {row.map(hero => <Cell key={hero.id} clicker={handleClick} hero={hero} />)}
          </div>)
      }
    </div>
  )
}

export default GameCanvas;