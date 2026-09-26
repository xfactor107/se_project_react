import { useState, useEffect } from "react";
import "./App.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getInitialCards,
  addItem,
  deleteItem,
  likeItem,
  dislikeItem,
  updateUserProfile,
} from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Turns an API rejection (JSON error body or Error) into text for the user.
const getErrorMessage = (err) => {
  if (err instanceof TypeError) {
    return "Couldn't reach the server. It may be waking up, so try again in a minute.";
  }
  return (
    err?.validation?.body?.message ||
    err?.message ||
    "Something went wrong. Please try again."
  );
};

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weather, setWeather] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleOpenModal = (modalName) => {
    setFormError("");
    setActiveModal(modalName);
  };

  const handleOpenItemModal = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenConfirmModal = () => {
    setActiveModal("confirm");
  };

  const handleCloseModal = () => {
    setFormError("");
    setActiveModal("");
  };

  // Runs a form request, closing the modal on success and showing the error
  // inside it on failure.
  const handleSubmit = (request) => {
    setIsLoading(true);
    setFormError("");
    return request()
      .then(handleCloseModal)
      .catch((err) => {
        console.error(err);
        setFormError(getErrorMessage(err));
      })
      .finally(() => setIsLoading(false));
  };

  const handleOpenRegisterModal = () => {
    handleOpenModal("register");
  };

  const handleOpenLoginModal = () => {
    handleOpenModal("login");
  };

  const handleAddItem = (item, onReset) => {
    handleSubmit(() =>
      addItem(item).then((newItem) => {
        setClothingItems((items) => [newItem.data, ...items]);
        onReset();
      })
    );
  };

  const handleCardDelete = () => {
    if (!selectedCard._id) {
      return;
    }
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        handleCloseModal();
        setSelectedCard({});
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleCardLike = (id, isLiked) => {
    const cardAction = isLiked ? dislikeItem : likeItem;
    cardAction(id)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard.data : item))
        );
      })
      .catch((error) => console.error("Error toggling like:", error));
  };

  const logIn = ({ email, password }) =>
    login({ email, password }).then((res) => {
      localStorage.setItem("jwt", res.token);
      return checkToken(res.token).then((userRes) => {
        setCurrentUser(userRes.data);
        setIsLoggedIn(true);
      });
    });

  const handleRegister = ({ name, avatar, email, password }) => {
    handleSubmit(() =>
      register({ name, avatar, email, password }).then(() =>
        logIn({ email, password })
      )
    );
  };

  const handleLogin = ({ email, password }) => {
    handleSubmit(() => logIn({ email, password }));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleUpdateUser = (data) => {
    handleSubmit(() =>
      updateUserProfile(data).then((res) => setCurrentUser(res.data))
    );
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }
    checkToken(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeather(parseWeatherData(data));
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      })
      .finally(() => setIsWeatherLoading(false));
  }, []);

  useEffect(() => {
    getInitialCards()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  if (isWeatherLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="app">
          <Header
            onAddClick={() => handleOpenModal("add-garment")}
            city={weather?.city}
            onRegisterClick={handleOpenRegisterModal}
            onLoginClick={handleOpenLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  weather={weather}
                  onCardLike={handleCardLike}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems.filter(
                      (item) => item.owner === currentUser?._id
                    )}
                    onAddClick={() => handleOpenModal("add-garment")}
                    onCardClick={handleOpenItemModal}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                    onEditProfileClick={() => handleOpenModal("edit-profile")}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
          <AddItemModal
            isLoading={isLoading}
            errorMessage={formError}
            isOpen={activeModal === "add-garment"}
            onClose={handleCloseModal}
            onAddItem={handleAddItem}
          />
          <RegisterModal
            isLoading={isLoading}
            errorMessage={formError}
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onLoginClick={handleOpenLoginModal}
          />
          <LoginModal
            isLoading={isLoading}
            errorMessage={formError}
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onSignUpClick={handleOpenRegisterModal}
          />
          <EditProfileModal
            isLoading={isLoading}
            errorMessage={formError}
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            card={selectedCard}
            onDeleteClick={handleOpenConfirmModal}
            onCardLike={handleCardLike}
          />
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm"}
            onClose={handleCloseModal}
            onDelete={handleCardDelete}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
