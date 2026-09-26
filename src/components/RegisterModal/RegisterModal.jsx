import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  onLoginClick,
  isLoading,
  errorMessage,
}) => {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      buttonText="Next"
      altButtonText="or Log in"
      onAltClick={onLoginClick}
    >
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-email">
          Email*
        </label>
        <input
          id="register-email"
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
        <label className="modal__label" htmlFor="register-password">
          Password*
        </label>
        <input
          id="register-password"
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-name">
          Name*
        </label>
        <input
          id="register-name"
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-avatar">
          Avatar URL*
        </label>
        <input
          id="register-avatar"
          className="modal__input"
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
