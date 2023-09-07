import React from "react";
import { useState, useEffect } from "react";
import countries from "./services/countries";

const Search = ({ searchString, handleSearch }) => {
  return (
    <div>
      Find countries{" "}
      <input type="text" value={searchString} onChange={handleSearch} />
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;
  const languages = Object.keys(country.languages).map((key) => {
    return country.languages[key];
  });
  const flag = country.flag;

  return (
    <>
      <h3>{name}</h3>

      <p>Capital {capital}</p>
      <p>area {area}</p>
      <ul>
        {languages.map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
      <div style={{ width: 50, height: 50 }}>{flag}</div>
    </>
  );
};

const ResultList = ({ searchString, countryData, setSearchString }) => {
  if (!searchString) return;

  const filtered_countries = countryData.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchString.toLowerCase());
  });

  if (filtered_countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filtered_countries.length === 1) {
    return <CountryInfo country={filtered_countries[0]} />;
  }

  return (
    <>
      {filtered_countries.map((country) => {
        return (
          <p key={country.name.common}>
            {" "}
            {country.name.common}{" "}
            <button onClick={() => setSearchString(country.name.common)}>
              show
            </button>
          </p>
        );
      })}
    </>
  );
};

function App() {
  useEffect(() => {
    countries.getAll().then((result) => {
      setCountryData(result);
    });
  }, []);

  const [countryData, setCountryData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <div>
      <Search searchString={searchString} handleSearch={handleSearch} />

      <ResultList
        searchString={searchString}
        setSearchString={setSearchString}
        countryData={countryData}
      />
    </div>
  );
}

export default App;
