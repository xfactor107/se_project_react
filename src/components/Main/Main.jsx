import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { getWeatherCondition } from "../../utils/weatherApi";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ clothingItems, onCardClick, weather, onCardLike }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weather) {
    return (
      <main className="main">
        <p className="main__notice" role="alert">
          Weather data is unavailable right now, so we can&apos;t recommend
          clothes. Please refresh the page to try again.
        </p>
      </main>
    );
  }

  const temp = weather.temperature[currentTemperatureUnit];

  const fahrenheitTemp =
    currentTemperatureUnit === "C" ? (temp * 9) / 5 + 32 : temp;

  const weatherType = getWeatherCondition(fahrenheitTemp);

  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType.toLowerCase();
  });

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <section className="main__clothing-section">
        <div className="main__clothing-section-info">
          <div className="main__clothing-section-title">
            Today is {temp}°{currentTemperatureUnit} / You may want to wear:
          </div>
        </div>
        <div className="main__items">
          {filteredClothingItems.map((item) => {
            const key = item._id || item.id;
            const itemWithId = item._id ? item : { ...item, _id: item.id };
            return (
              <ItemCard
                key={key}
                item={itemWithId}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </div>
      </section>
      <div className="main__notice" role="status" aria-live="polite">
        Note: The backend API is hosted on Render&apos;s free tier. Initial
        requests may take 30–60 seconds to spin up due to instance spin-down
        after periods of inactivity. Once awake, performance returns to normal.
      </div>
    </main>
  );
};

export default Main;
