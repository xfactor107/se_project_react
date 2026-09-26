import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onSignUpClick,
  isLoading,
  errorMessage,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      buttonText="Log in"
      altButtonText="or Sign Up"
      onAltClick={onSignUpClick}
    >
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="login-email">
          Email*
        </label>
        <input
          id="login-email"
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="login-password">
          Password*
        </label>
        <input
          id="login-password"
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
