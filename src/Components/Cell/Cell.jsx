import './cell.css'

const Cell = ({ clicker, hero }) => {
 const style = {
  'backgroundPosition': hero?.position
 }
 const isEmpty = hero.name === 'empty';

 return (
  <div
   onClick={clicker}
   data-hero={hero.name}
   className="cell">
   <div className="face front">
    <div className="logo"><span>{hero.name}</span></div>
   </div>
   <div className="face back">
    <div className={isEmpty ? 'empty-hero' : 'hero'} style={style}></div>
   </div>
  </div>
 )
}

export default Cell;