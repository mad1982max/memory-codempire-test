import './cell.css';

const Cell = ({ clicker, hero }) => {
  // const style = {
  //   'backgroundPosition': hero?.position
  // };

  return (
    <div
      onClick={clicker}
      data-hero={hero.name}
      data-id={hero.id}
      className='cell'>
      <div className='face front'>
        {/* <div className='logo'><span>{hero.name}</span></div> */}
        <div className='logo'></div>
      </div>
      <div className='face back'>
        <div className={hero.name === 'empty' ? 'empty-hero' : `hero ${hero.className}`}></div>
      </div>
    </div>
  )
}

export default Cell;