const arrayFn = {

 shuffle: function (array) {
  for (let i = array.length - 1; i > 0; i--) {
   let j = Math.floor(Math.random() * (i + 1));
   [array[i], array[j]] = [array[j], array[i]];
   return array
  }
 },

 buildFlatPairsArray: function (dimension, heroes) {
  let helperHerosTable = [];
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

  this.shuffle(helperHerosTable);
  return helperHerosTable;
 },

 buildNestedPairsArray: function (dimension, heroes) {
  const nestedTableWithHeroes = [];
  let pairsArrayWithHeroes = this.buildFlatPairsArray(dimension, heroes);

  while (pairsArrayWithHeroes.length > 0) {
   const row = pairsArrayWithHeroes.splice(0, dimension);
   nestedTableWithHeroes.push(row);
  }
  return nestedTableWithHeroes;
 }
}

export default arrayFn;