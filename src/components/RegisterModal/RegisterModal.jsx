import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onSubmit, errorMessage }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    onSubmit({
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString() || '',
      name: formData.get('name')?.toString().trim() || '',
    })
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      submitText="Sign up"
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      footer={
        <p className="modal__footer">
          or{' '}
          <button className="modal__switch" type="button" onClick={onSwitchToLogin}>
            Sign in
          </button>
        </p>
      }
    >
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          id="register-email"
          name="email"
          className="modal__input"
          type="email"
          placeholder="Enter email"
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          id="register-password"
          name="password"
          className="modal__input"
          type="password"
          placeholder="Create password"
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-name">
        Name
        <input
          id="register-name"
          name="name"
          className="modal__input"
          type="text"
          placeholder="Enter username"
          required
        />
      </label>
    </ModalWithForm>
  )
}

export default RegisterModal
