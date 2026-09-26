import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";
import "./AddItemModal.css";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onClose,
  isLoading,
  errorMessage,
}) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, () => {
      setValues({});
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
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
        />
      </div>
      <div className="modal__form-field">
        <label className="modal__label">Image URL</label>
        <input
          type="url"
          placeholder="Image URL"
          className="modal__input"
          name="imageUrl"
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
      </div>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-group">
          <div className="modal__radio-option">
            <input
              className="modal__radio-input"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
              checked={values.weather === "hot"}
              onChange={handleChange}
            />
            <label className="modal__label" htmlFor="hot">
              Hot
            </label>
          </div>
          <div className="modal__radio-option">
            <input
              className="modal__radio-input"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              checked={values.weather === "warm"}
              onChange={handleChange}
            />
            <label className="modal__label" htmlFor="warm">
              Warm
            </label>
          </div>
          <div className="modal__radio-option">
            <input
              className="modal__radio-input"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
              checked={values.weather === "cold"}
              onChange={handleChange}
            />
            <label className="modal__label" htmlFor="cold">
              Cold
            </label>
          </div>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
