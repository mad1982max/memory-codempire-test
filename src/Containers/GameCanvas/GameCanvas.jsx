
import { configs, heroes } from '../../configs';
import arrayFn from '../../Helpers/array';
import "./canvasStyle.css";

const GameCanvas = () => {

  const table = [];


  const initGame = dimension => {

    let helperHerosTable = [];
    let totalCells = dimension ** 2;

    let remainHeroes = heroes.slice();
    const isEven = totalCells % 2 === 0;
    const pairsOfHeroes = Math.floor(totalCells / 2);

    for (let i = 0; i < pairsOfHeroes; i++) {
      const heroIndex = Math.floor(Math.random() * (remainHeroes.length));
      const randomHero = remainHeroes[heroIndex];
      remainHeroes.splice(heroIndex, 1);
      helperHerosTable.push(randomHero)
    }

    helperHerosTable.push(...helperHerosTable)
    if (!isEven) helperHerosTable.push({ name: 'empty' })
    arrayFn.shuffle(helperHerosTable);

    while (helperHerosTable.length > 0) {
      const row = helperHerosTable.splice(0, configs.gameDimension);
      table.push(row)
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('click', e.currentTarget);
    e.currentTarget.classList.toggle('rotated')
  }

  initGame(configs.gameDimension);

  return (
    <div className="game-wrapper">
      <div className="canvas">
        {
          table.map((row, i) =>
            <div key={i} className='row'>
              {row.map((hero, i) => {
                console.log(hero);

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
    </div>
  )
}

export default GameCanvas;