import "./EditProfileModal.css";
import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  errorMessage,
}) => {
  const { values, handleChange, setValues } = useForm({});
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
    >
      <div className="modal__form-field">
        <label className="modal__label">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="modal__input"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          minLength="1"
          maxLength="30"
          required
        />
      </div>
      <div className="modal__form-field">
        <label className="modal__label">Avatar URL</label>
        <input
          type="url"
          placeholder="Avatar URL"
          className="modal__input"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
