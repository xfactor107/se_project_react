import { useContext } from "react";
import logo from "../../assets/wtwr.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const Header = ({ onAddClick, city, onRegisterClick, onLoginClick }) => {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const getAvatarPlaceholder = () => {
    const name = currentUser?.name || "";
    return name ? name[0].toUpperCase() : "";
  };

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr}
            {city && ","}
          </time>{" "}
          {city}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch onToggle={handleToggleSwitchChange} />
        {isLoggedIn ? (
          <div className="header__info-group">
            <button onClick={onAddClick} className="header__add-clothes-btn">
              + Add clothes
            </button>
            <Link className="header__link" to="/profile">
              <p className="header__username">
                {currentUser ? currentUser.name : ""}
              </p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser?.name || "User avatar"}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {getAvatarPlaceholder()}
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div className="header__info-group">
            <button
              onClick={onRegisterClick}
              className="header__register-btn"
              type="button"
            >
              Sign up
            </button>
            <button
              onClick={onLoginClick}
              className="header__login-btn"
              type="button"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
