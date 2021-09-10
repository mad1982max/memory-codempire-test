const arrayFn = {

  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      return array;
    }
  },

  buildFlatPairsArray: function (dimension, heroes) {
    let helperHerosTable = [];
    let helperHerosIdTable = [];
    let totalCells = dimension ** 2;

    let remainHeroes = heroes.slice();

    const isEven = totalCells % 2 === 0;
    const pairsOfHeroes = Math.floor(totalCells / 2);

    for (let i = 0; i < pairsOfHeroes; i++) {
      const heroIndex = Math.floor(Math.random() * (remainHeroes.length));
      const randomHero = remainHeroes[heroIndex];
      remainHeroes.splice(heroIndex, 1);
      helperHerosTable.push(randomHero);
    }

    helperHerosTable.push(...helperHerosTable);
    if (!isEven) helperHerosTable.push({ name: 'empty' });

    for (let i = 0; i < helperHerosTable.length; i++) {
      helperHerosTable[i].id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
      helperHerosIdTable.push({ ...helperHerosTable[i] });
    };

    this.shuffle(helperHerosIdTable);
    return helperHerosIdTable;
  },

  buildNestedPairsArray: function (dimension, heroes) {
    const nestedTableWithHeroes = [];

    let pairsArrayWithHeroes = this.buildFlatPairsArray(dimension, heroes);
    const pairs = pairsArrayWithHeroes.map(item => item.name).filter(item => item !== 'empty');

    while (pairsArrayWithHeroes.length > 0) {
      const row = pairsArrayWithHeroes.splice(0, dimension);
      nestedTableWithHeroes.push(row);
    }
    return { nestedTableWithHeroes, pairs };
  }
}
export default arrayFn;