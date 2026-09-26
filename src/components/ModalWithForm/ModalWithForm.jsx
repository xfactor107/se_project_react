import "../ItemModal/ItemModal.css";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Submit",
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
  onAltClick,
  altButtonText,
  isLoading = false,
  errorMessage = "",
}) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal__container modal__container_type_form modal_type_${name}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button modal__close-button_type_form"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          {errorMessage && (
            <p className="modal__error" role="alert">
              {errorMessage}
            </p>
          )}
          <div className="modal__button-container">
            <button
              className="modal__submit-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : buttonText}
            </button>
            {altButtonText && (
              <button
                type="button"
                className="modal__alt-button"
                onClick={onAltClick}
              >
                {altButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
