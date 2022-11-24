import { useState } from "react";
import Display from "./Display";

const Countries = ({ data }) => {
  const [clickedCountry, setClickedCountry] = useState("");
  if (data.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (data.length === 1) {
    return <Display country={data[0]} />;
  } else {
    return (
      <div>
        {Object.values(data).map((country) => {
          return (
            <li key={country.name.official}>
              {country.name.common}
              <button
                onClick={() => {
                  setClickedCountry(country);
                }}
              >
                show
              </button>
            </li>
          );
        })}
        {clickedCountry ? <Display country={clickedCountry} /> : null}
      </div>
    );
  }
};

export default Countries;
