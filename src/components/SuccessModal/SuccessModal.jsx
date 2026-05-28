import './SuccessModal.css'

function SuccessModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(event) => event.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose}>
          x
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <p className="success-modal__text">Now you can sign in with your account.</p>
        <button className="modal__submit" type="button" onClick={onConfirm}>
          Sign in
        </button>
      </div>
    </div>
  )
}

export default SuccessModal
