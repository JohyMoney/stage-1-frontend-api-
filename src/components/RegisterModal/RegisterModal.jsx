import { useMemo, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onSubmit, errorMessage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const isSubmitDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || !name.trim()
  }, [email, password, name])

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      email: email.trim(),
      password,
      name: name.trim(),
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
      isSubmitDisabled={isSubmitDisabled}
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  )
}

export default RegisterModal
