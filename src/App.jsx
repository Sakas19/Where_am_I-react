import React, { useState } from "react";
import "./App.css";

function App() {
  const [countryData, setCountryData] = useState(null);

  function fetchCountryData() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_ENDPOINT = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9c85f4b51667436ca0b5191b7d0ae57d`;
        fetch(API_ENDPOINT)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.results[0]?.components);
            setCountryData(data.results[0]?.components);
          });
      },
      () => alert("Could not get your position")
    );
  }

  return (
    <div>
      <button className="btn-country" onClick={fetchCountryData}>
        Where am I?
      </button>
      {countryData && (
        <div className="country__data">
          <h3 className="country__name">{countryData.country}</h3>
          <h4 className="country__region">{countryData.region}</h4>
          <p className="country__row">
            <span>👫</span>
            {countryData.population != null
              ? (+countryData.population / 1000000).toFixed(1) + " million people"
              : "Population data not available"}
          </p>
          <p className="country__row">
            <span>🗣️</span>
            {countryData.languages && countryData.languages.length > 0
              ? countryData.languages[0].name
              : "Language data not available"}
          </p>
          <p className="country__row">
            <span>💰</span>
            {countryData.currencies && countryData.currencies.length > 0
              ? countryData.currencies[0].name
              : "Currency data not available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

