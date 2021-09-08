import logo from '../../assets/images/memory.svg';
import './header.css'

const Header = () => {
 return (
  <header className="App-header">
   <div className="game-logo">
    <img src={logo} alt="logo" />
   </div>
   <h2 className="name">Memory Game</h2>
  </header>
 )
}

export default Header;