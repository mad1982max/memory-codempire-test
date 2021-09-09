import './modal.css';

const Modal = ({ close, isWin = false }) => {
  const win = <p>Congratulation! <br /> You win!</p>
  const lose = <p>Sorry! You lose!</p>

  return (
    <div className="modal" onClick={close}>
      <div className="modal-wrapper">
        <div className="modal-body">
          {isWin ? win : lose}
        </div>
        <button onClick={close}>Continue</button>
      </div>
    </div>
  )
}

export default Modal