import './modal.css';

const Modal = ({ close, isWin = false }) => {
 return (
  <div className="modal">
   <div className="modal-wrapper">
    <div className="modal-body"> {isWin ? "YOU WIN" : "GAME OVER"}</div>
    <button onClick={close}>REPEAT</button>
   </div>
  </div>
 )
}

export default Modal