import logo from '../../assets/images/memory.svg';
import './header.css';

const Header = () => {
  return (
    <header className="App-header">
      <div className="game-logo">
        <img src={logo} alt="logo" />
      </div>
      <p className="name">MEMORY GAME</p>
      <div className="game-logo reverse">
        <img src={logo} alt="logo" />
      </div>
    </header>
  )
}

export default Header;