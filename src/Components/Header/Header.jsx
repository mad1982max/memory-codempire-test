import logo from '../../assets/images/memory.svg';
import './header.css'

const Header = () => {
  return (
    <header className="App-header">
      <div className="game-logo">
        <img src={logo} alt="logo" />
      </div>
      <h2 className="name">Memory Game</h2>
      <div className="game-logo reverse">
        <img src={logo} alt="logo" />
      </div>
    </header>
  )
}

export default Header;