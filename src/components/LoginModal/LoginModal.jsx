import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function LoginModal({ isOpen, onClose, onSwitchToRegister, onSubmit, errorMessage }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    onSubmit({
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString() || '',
    })
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      submitText="Sign in"
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      footer={
        <p className="modal__footer">
          or{' '}
          <button
            className="modal__switch"
            type="button"
            onClick={onSwitchToRegister}
          >
            Sign up
          </button>
        </p>
      }
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          id="login-email"
          name="email"
          className="modal__input"
          type="email"
          placeholder="Enter email"
          required
        />
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          id="login-password"
          name="password"
          className="modal__input"
          type="password"
          placeholder="Enter password"
          required
        />
      </label>
    </ModalWithForm>
  )
}

export default LoginModal
