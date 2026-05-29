import { useMemo, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function LoginModal({ isOpen, onClose, onSwitchToRegister, onSubmit, errorMessage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isSubmitDisabled = useMemo(() => {
    return !email.trim() || !password.trim()
  }, [email, password])

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      email: email.trim(),
      password,
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
      isSubmitDisabled={isSubmitDisabled}
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  )
}

export default LoginModal
