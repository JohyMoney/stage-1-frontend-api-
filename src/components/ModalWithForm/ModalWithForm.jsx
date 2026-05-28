import { useEffect } from 'react'
import './ModalWithForm.css'

function ModalWithForm({
  isOpen,
  title,
  children,
  onClose,
  submitText,
  footer,
  onSubmit,
  errorMessage,
  isSubmitDisabled,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscClose)
    return () => document.removeEventListener('keydown', handleEscClose)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(event) => event.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose}>
          x
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {errorMessage && <p className="modal__error">{errorMessage}</p>}
          <button className="modal__submit" type="submit" disabled={isSubmitDisabled}>
            {submitText}
          </button>
        </form>
        {footer}
      </div>
    </div>
  )
}

export default ModalWithForm
